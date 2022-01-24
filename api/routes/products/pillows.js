var express = require("express");
var router = express.Router();
var pool = require("../../db");
const { v4: uuidv4 } = require('uuid');

// api/products/pillows/

router.get("/search/:productId", async function(req, res, next) {
    productId = req.params.productId;
    const { rows } = await pool.query(`
    SELECT
        pillow_id as id,
        shelf,
        size,
        amount,
        finish,
        comments
    FROM pillows
    WHERE product_id = '${productId}'`);
    req.body = rows;
    next();
});

router.delete("/delete/one/:childProductId", async function(req, res) {
    childProductId = req.params.childProductId;
    const response = await pool.query(`
    DELETE FROM pillows
    WHERE pillow_id = '${childProductId}'`);
    res.send(response);
});

router.delete("/delete/all/:productId", async function(req, res) {
    const productId = req.params.productId;
    const response = await pool.query(`
    DELETE FROM pillows
    WHERE product_id = '${productId}'`);
    res.send(response);
});

router.put("/take", async function(req, res) {
    const { childProductId, newAmount } = req.body;
    const response = await pool.query(`
    UPDATE
        pillows
    SET
        amount = ${newAmount}
    WHERE
        pillow_id = '${childProductId}'`);
    res.send(response);
});

router.post("/add", async function(req, res, next) {
    const { productId, shelf, size, amount, finish, comments } = req.body;
    const uuid = uuidv4();
    const { rows } = await pool.query(`
    INSERT INTO pillows
        (product_id, shelf, size, amount, finish, comments, pillow_id)
    VALUES
        ('${productId}', '${shelf}', '${size}', '${amount}', '${finish}', '${comments}', '${uuid}')
    RETURNING
        pillow_id`);
    req.body = rows;
    next();
});

router.put("/update", async function(req, res) {
    const { childProductId, shelf, size, amount, finish, comments } = req.body;
    const response = await pool.query(`
    UPDATE
        pillows
    SET
        shelf = '${shelf}',
        size = '${size}',
        amount = ${amount},
        finish = ${finish},
        comments = '${comments}'
    WHERE
        pillow_id = '${childProductId}'`);
    res.send(response);
});


module.exports = router;