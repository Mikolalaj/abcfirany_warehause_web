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
        (SELECT COUNT(product_child_id) FROM products_child WHERE products_child.product_id = products.product_id AND category = 'meter') AS towels_count
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
    const { productId, symbol, image, sale, comments } = req.body;
    const response = await pool.query(`
    UPDATE
        products
    SET
        symbol = '${symbol}',
        img = '${image}',
        sale = '${sale}',
        comments = '${comments}'
    WHERE
        product_id = '${productId}'`);
    res.send(response);
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