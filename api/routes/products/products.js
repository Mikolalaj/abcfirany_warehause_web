var express = require('express');
var router = express.Router();
var pool = require('../../db');
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
    if (productId === 'undefined') {
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

    let addFeatures = newFeatures.filter(feature => feature.__isNew__ === true);
    addFeatures.forEach(feature => feature.value = uuidv4());
    let connectFeatures = newFeatures.filter(feature => feature.__isNew__ === undefined && oldFeatures.includes(feature.label) === false);
    connectFeatures.forEach((feature, index) => connectFeatures[index] = feature.value);

    let deleteFeatures = oldFeatures;
    for (let i = 0; i < newFeatures.length; i++) {
        if ( deleteFeatures.includes(newFeatures[i].label)) { 
            deleteFeatures.splice(deleteFeatures.indexOf(newFeatures[i].label), 1); 
        }
    }
    
    // connect existing features to product
    console.log('connect: ', connectFeatures);

    if (connectFeatures.length > 0) {
        try {
            const res = await pool.query(`
            INSERT INTO products_features
                (product_id, feature_id)
            VALUES
                ${connectFeatures.map(feature => `('${productId}', '${feature}')`).join(',')}`);
            if (res.rowCount === 0) {
                return res
                    .status(500)
                    .json({ message: 'Nie udało się dodać istniejących cech.' });
            }
        } catch (error) {
            console.log(error);
            return res
                .status(400)
                .json({ message: 'Nie udało się dodać istniejących cech.' });
        }
    }

    // delete existing features from product
    console.log('delete: ', deleteFeatures);

    if (deleteFeatures.length > 0) {
        try {
            const res = await pool.query(`
            DELETE FROM
                products_features
            WHERE
                product_id = '${productId}' AND
                feature_id IN
                    (
                        SELECT feature_id FROM features WHERE name IN (${deleteFeatures.map(feature => `'${feature}'`).join(',')})
                    )
            `);
            if (res.rowCount === 0) {
                return res
                    .status(500)
                    .json({ message: 'Nie udało się usunąć istniejących cech.' });
            }
        } catch (error) {
            console.log(error);
            return res
                .status(400)
                .json({ message: 'Nie udało się usunąć istniejących cech.' });
        }
    }

    // add new features to product    
    console.log('add: ', addFeatures);

    if (addFeatures.length > 0) {
        try {
            const res = await pool.query(`
                INSERT INTO features
                (feature_id, name)
            VALUES
                ${addFeatures.map(feature => `('${feature.value}', '${feature.label}')`).join(',')}`);
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
                ${addFeatures.map(feature => `('${productId}', '${feature.value}')`).join(',')}`);
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
    }

    let updatedFeatures = newFeatures.filter(feature => feature.__isNew__ === undefined);
    updatedFeatures = updatedFeatures.concat(addFeatures);
    for (let i = 0; i < updatedFeatures.length; i++) {
        updatedFeatures[i] = updatedFeatures[i].label;
    }
    console.log('updated: ', updatedFeatures);

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