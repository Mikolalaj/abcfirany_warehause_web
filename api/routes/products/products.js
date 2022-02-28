var express = require('express');
var router = express.Router();
var pool = require('../../db');
var {
    connectFeatures,
    addFeatures,
    disconnectFeatures
} = require('./features');
const { ifNull } = require('../../utils')
const { v4: uuidv4 } = require('uuid');

const requireAdmin = (req, res, next) => {
    const { admin } = req.user;
    if (!admin) {
        return res.status(403).json({ message: 'Brak uprawnień' });
    }
    next();
};

router.get('/search', async function(req, res, next) {
    const { searchSymbol } = req.query;
    const { rows } = await pool.query(`
    SELECT
        *,
        (SELECT COUNT(product_child_id) FROM products_child WHERE products_child.product_id = products.product_id AND category = 'meter') AS meter_count,
        (SELECT COUNT(product_child_id) FROM products_child WHERE products_child.product_id = products.product_id AND category = 'premade') AS premade_count,
        (SELECT COUNT(product_child_id) FROM products_child WHERE products_child.product_id = products.product_id AND category = 'pillow') AS pillows_count,
        (SELECT COUNT(product_child_id) FROM products_child WHERE products_child.product_id = products.product_id AND category = 'towel') AS towels_count
    FROM products
    WHERE symbol LIKE '${searchSymbol}%'`);
    req.body = rows;
    next();
});

router.get('/symbols', async function(req, res, next) {
    const { rows } = await pool.query(`
    SELECT
        product_id,
        symbol
    FROM
        products`);
    res.send(rows);
});

router.get('/features', async function(req, res, next) {
    const { rows } = await pool.query(`
    SELECT
        name,
        feature_id
    FROM
        features`);
    res.send(rows);
});

router.post('/features', async function(req, res, next) {
    const { name, productId } = req.body;
    const featureId = uuidv4();

    try {
        const res = await pool.query(`
        INSERT INTO features
            (feature_id, name)
        VALUES
            ('${featureId}', '${name}')`);
        if (res.rowCount === 0) {
            return res
                .status(500)
                .json({ message: 'Nie udało się dodać nowej cechy.' });
        }
    } catch (error) {
        console.log(error);
        return res
            .status(400)
            .json({ message: 'Nie udało się dodać nowej cechy.' });
    }

    try {
        const res = await pool.query(`
        INSERT INTO products_features
            (product_id, feature_id)
        VALUES
            ('${productId}', '${featureId}')`);
        if (res.rowCount === 0) {
            return res
                .status(500)
                .json({ message: 'Nie udało się połączyć cechy z produktem.' });
        }
    } catch (error) {
        console.log(error);
        return res
            .status(400)
            .json({ message: 'Nie udało się połączyć cechy z produktem.' });
    }
    
    return res.json({ featureId })
});

router.get('/features/:productId', async function(req, res, next) {
    productId = req.params.productId;
    if (productId === 'null') {
        res.send([])
        return
    }
    const { rows } = await pool.query(`
    SELECT
        F.name,
        F.feature_id
    FROM
        features F
        JOIN products_features PF ON F.feature_id = PF.feature_id
    WHERE PF.product_id = '${productId}'`);
    res.send(rows);
});

router.get('/details/:productId', async function(req, res, next) {
    productId = req.params.productId;
    const { rows: data } = await pool.query(`
    SELECT
        symbol,
        comments,
        sale,
        img
    FROM products
    WHERE product_id = '${productId}'`);

    let productData = data[0];

    const { rows: features } = await pool.query(`
    SELECT
        name
    FROM features
    JOIN products_features ON products_features.feature_id = features.feature_id
    WHERE product_id = '${productId}'`);

    productData = {
        ...productData,
        features: features.map(feature => feature.name)
    }

    req.body = productData;
    next();
});

router.put('/update', async function(req, res) {
    const { productId, symbol, image, sale, comments, newFeatures, oldFeatures } = req.body;

    let addFeaturesList = newFeatures.filter(feature => feature.__isNew__ === true);
    addFeaturesList.forEach(feature => feature.value = uuidv4());
    let connectFeaturesList = newFeatures.filter(feature => feature.__isNew__ === undefined && oldFeatures.includes(feature.label) === false);
    connectFeaturesList.forEach((feature, index) => connectFeaturesList[index] = feature.value);

    let deleteFeaturesList = oldFeatures;
    for (let i = 0; i < newFeatures.length; i++) {
        if ( deleteFeaturesList.includes(newFeatures[i].label)) { 
            deleteFeaturesList.splice(deleteFeaturesList.indexOf(newFeatures[i].label), 1); 
        }
    }
    
    // connect existing features to product
    // console.log('connect: ', connectFeaturesList);

    connectFeatures(connectFeaturesList, productId);

    // delete existing features from product
    // console.log('delete: ', deleteFeaturesList);

    disconnectFeatures(deleteFeaturesList, productId);

    // add new features to product    
    // console.log('add: ', addFeaturesList);

    addFeatures(addFeaturesList, productId);

    let updatedFeatures = newFeatures.filter(feature => feature.__isNew__ === undefined);
    updatedFeatures = updatedFeatures.concat(addFeaturesList);
    for (let i = 0; i < updatedFeatures.length; i++) {
        updatedFeatures[i] = updatedFeatures[i].label;
    }
    // console.log('updated: ', updatedFeatures);

    // edit product
    const response = await pool.query(`
    UPDATE
        products
    SET
        symbol = '${symbol}',
        img = '${image}',
        sale = '${sale}',
        comments = '${comments}'
    WHERE
        product_id = '${productId}'
    RETURNING
        symbol, img, sale, comments`);
    
    let updatedProduct = response.rows[0];
    updatedProduct = {
        ...updatedProduct,
        features: updatedFeatures
    }

    res.send(updatedProduct);
});

router.post('/add', async function(req, res) {
    let { productId, symbol, features, sale, image, parentComments, category,
        width, size, amount, shelfCode, feature, finish, comments } = req.body;
        
    try {
        // add new parent product
        if ( productId === undefined ) {
            try {
                let response = await pool.query(`
                INSERT INTO products
                    (product_id, symbol, img, sale, comments)
                VALUES
                    ('${uuidv4()}', '${symbol}', '${image}', '${sale}', '${parentComments}')
                RETURNING
                    product_id`);
                productId = response.rows[0].product_id;
            } catch (error) {
                console.log(error)
                let errorMessage;
                if (error.code === '23505') {
                    errorMessage = 'Podany symbol już istnieje.';
                } else {
                    errorMessage = `Wystąpił błąd podczas dodawania produktu rodzica. (${error.code})`;
                }
                return res
                    .status(400)
                    .json({ message: errorMessage });
            }
            let addFeaturesList = features.filter(feature => feature.__isNew__ === true);
            addFeaturesList.forEach(feature => feature.value = uuidv4());
            addFeaturesList.forEach(addFeature => {
                if (addFeature.label === feature) {
                    feature = addFeature.value
                }
            });
            let connectFeaturesList = features.filter(feature => feature.__isNew__ === undefined);
            connectFeaturesList.forEach((feature, index) => connectFeaturesList[index] = feature.value);

            console.log('add: ', addFeaturesList);
            console.log('connect: ', connectFeaturesList);
            console.log('feature: ', feature);
            addFeatures(addFeaturesList, productId);
            connectFeatures(connectFeaturesList, productId);
        }
        // add new child product to existing parent product
        try {
            await pool.query(`
            INSERT INTO products_child
                (product_child_id, product_id, shelf_code, width, size, amount, finish, comments, category, feature_id)
            VALUES
                ('${uuidv4()}', '${productId}', '${shelfCode}', ${ifNull(width)}, ${ifNull(size)}, '${amount}', ${ifNull(finish)}, '${comments}', '${category}', '${feature}')
            `);
        } catch (error) {
            console.log(error)
            return res
                .status(400)
                .json({ message: `Wystąpił błąd podczas dodawania produktu dziecka (${error.code})` });
        }

        res.send(productId);

    } catch (error) {
        console.log(error)
        return res
            .status(400)
            .json({ message: `Wystąpił nieoczekiwany błąd podczas dodawania produktu (${error.code})` });
    }
});

router.delete('/delete/one/:childProductId', async function(req, res) {
    childProductId = req.params.childProductId;
    const response = await pool.query(`
    DELETE FROM products_child
    WHERE product_child_id = '${childProductId}'`);
    res.send(response);
});

router.delete('/delete/all/:productId', async function(req, res) {
    const productId = req.params.productId;
    const response = await pool.query(`
    DELETE FROM products_child
    WHERE product_id = '${productId}'`);
    res.send(response);
});

router.put('/take', async function(req, res) {
    const { childProductId, newAmount } = req.body;
    const response = await pool.query(`
    UPDATE
        products_child
    SET
        amount = ${newAmount}
    WHERE
        product_child_id = '${childProductId}'`);
    res.send(response);
});

module.exports = router;