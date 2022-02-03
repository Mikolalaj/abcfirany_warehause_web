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
        (SELECT COUNT(product_id) FROM meter WHERE meter.product_id = products.product_id) AS meter_count,
        (SELECT COUNT(product_id) FROM premade WHERE premade.product_id = products.product_id) AS premade_count,
        (SELECT COUNT(product_id) FROM pillows WHERE pillows.product_id = products.product_id) AS pillows_count,
        (SELECT COUNT(product_id) FROM towels WHERE towels.product_id = products.product_id) AS towels_count
    FROM products
    WHERE symbol LIKE '${searchSymbol}%'`);
    req.body = rows;
    next();
});

router.get('/symbols', async function(req, res, next) {
    const { rows } = await pool.query('SELECT product_id as value, symbol as label FROM products');
    res.send(rows);
});

router.get('/details/:productId', async function(req, res, next) {
    productId = req.params.productId;
    const { rows } = await pool.query(`
    SELECT
        symbol,
        comments,
        sale,
        img
    FROM products
    WHERE product_id = '${productId}'`);
    req.body = rows;
    next();
});

module.exports = router;