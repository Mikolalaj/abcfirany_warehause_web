var express = require("express");
var router = express.Router();
var pool = require("../db");
const { v4: uuidv4 } = require('uuid');

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
        product_premade_id as id,
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

router.delete("/delete/premade/one/:product_premade_id", async function(req, res) {
    product_premade_id = req.params.product_premade_id;
    const response = await pool.query(`
    DELETE FROM products_premade
    WHERE product_premade_id = '${product_premade_id}'`);
    res.send(response);
});


router.delete("/delete/premade/all/:productId", async function(req, res) {
    const productId = req.params.productId;
    const response = await pool.query(`
    DELETE FROM products_premade
    WHERE product_id = '${productId}'`);
    res.send(response);
});

router.put("/take/premade", async function(req, res) {
    const { productPremadeId, newAmount } = req.body;
    const response = await pool.query(`
    UPDATE
        products_premade
    SET
        amount = ${newAmount}
    WHERE
        product_premade_id = '${productPremadeId}'`);
    res.send(response);
});

router.post("/add/premade", async function(req, res, next) {
    const { productId, shelving, column, shelf, size, amount, finish, comments } = req.body;
    const uuid = uuidv4();
    const { rows } = await pool.query(`
    INSERT INTO products_premade
        (product_id, shelving, column_number, shelf, size, amount, finish, comments, product_premade_id)
    VALUES
        ('${productId}', '${shelving}', '${column}', '${shelf}', '${size}', '${amount}', '${finish}', '${comments}', '${uuid}')
    RETURNING
        product_premade_id`);
    req.body = rows;
    next();
});

router.put("/update/premade", async function(req, res) {
    const { productPremadeId, shelving, column, shelf, size, amount, finish, comments } = req.body;
    const response = await pool.query(`
    UPDATE
        products_premade
    SET
        shelving = '${shelving}',
        column_number = '${column}',
        shelf = '${shelf}',
        size = '${size}',
        amount = ${amount},
        finish = '${finish}',
        comments = '${comments}'
    WHERE
        product_premade_id = '${productPremadeId}'`);
    res.send(response);
});

router.get("/search/meter/:product_id", async function(req, res, next) {
    product_id = req.params.product_id;
    const { rows } = await pool.query(`
    SELECT
        product_meter_id as id,
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

router.get("/search/pillow/:product_id", async function(req, res, next) {
    product_id = req.params.product_id;
    const { rows } = await pool.query(`
    SELECT
        pillow_id as id,
        shelf,
        size,
        amount,
        finish,
        comments
    FROM pillows
    WHERE product_id = '${product_id}'`);
    req.body = rows;
    next();
});

router.get("/search/towel/:product_id", async function(req, res, next) {
    product_id = req.params.product_id;
    const { rows } = await pool.query(`
    SELECT
        towel_id as id,
        shelving,
        column_number as column,
        shelf,
        size,
        amount,
        comments
    FROM towels
    WHERE product_id = '${product_id}'`);
    req.body = rows;
    next();
});

module.exports = router;