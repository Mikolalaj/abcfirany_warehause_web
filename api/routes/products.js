var express = require("express");
var router = express.Router();
var pool = require("../db");

const requireAdmin = (req, res, next) => {
    const { admin } = req.user;
    if (!admin) {
        return res.status(403).json({ message: 'Brak uprawnień' });
    }
    next();
};

router.get("/search/:symbol_search", async function(req, res, next) {
    symbol_search = req.params.symbol_search;
    const { rows } = await pool.query(`
    SELECT
        *,
        (SELECT COUNT(product_id) FROM products_meter WHERE products_meter.product_id = products.product_id) AS meter_count,
        (SELECT COUNT(product_id) FROM products_premade WHERE products_premade.product_id = products.product_id) AS premade_count,
        (SELECT COUNT(product_id) FROM pillows WHERE pillows.product_id = products.product_id) AS pillows_count,
        (SELECT COUNT(product_id) FROM towels WHERE towels.product_id = products.product_id) AS towels_count
    FROM products
    WHERE symbol LIKE '${symbol_search}%'`);
    req.body = rows;
    next();
});

router.get("/search/premade/:product_id", async function(req, res, next) {
    product_id = req.params.product_id;
    const { rows } = await pool.query(`
    SELECT
        product_premade_id,
        shelving,
        column_number as column,
        shelf,
        size,
        amount,
        finish,
        comments
    FROM products_premade
    WHERE product_id = '${product_id}'`);
    req.body = rows;
    next();
});

router.get("/search/meter/:product_id", async function(req, res, next) {
    product_id = req.params.product_id;
    const { rows } = await pool.query(`
    SELECT
        product_meter_id,
        shelving,
        column_number as column,
        shelf,
        width,
        amount,
        comments
    FROM products_meter
    WHERE product_id = '${product_id}'`);
    req.body = rows;
    next();
});

module.exports = router;