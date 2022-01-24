var express = require("express");
var router = express.Router();
var pool = require("../../db");
const { v4: uuidv4 } = require('uuid');

// api/products/towels/

router.get("/search/:productId", async function(req, res, next) {
    productId = req.params.productId;
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
    WHERE product_id = '${productId}'`);
    req.body = rows;
    next();
});

router.delete("/delete/one/:childProductId", async function(req, res) {
    childProductId = req.params.childProductId;
    const response = await pool.query(`
    DELETE FROM towels
    WHERE towel_id = '${childProductId}'`);
    res.send(response);
});

router.delete("/delete/all/:productId", async function(req, res) {
    const productId = req.params.productId;
    const response = await pool.query(`
    DELETE FROM towels
    WHERE product_id = '${productId}'`);
    res.send(response);
});

router.put("/take", async function(req, res) {
    const { childProductId, newAmount } = req.body;
    const response = await pool.query(`
    UPDATE
        towels
    SET
        amount = ${newAmount}
    WHERE
        towel_id = '${childProductId}'`);
    res.send(response);
});

router.post("/add", async function(req, res, next) {
    const { productId, shelving, column, shelf, size, amount, comments } = req.body;
    const uuid = uuidv4();
    const { rows } = await pool.query(`
    INSERT INTO towels
        (product_id, shelving, column_number, shelf, size, amount, comments, towel_id)
    VALUES
        ('${productId}', '${shelving}', '${column}', '${shelf}', '${size}', '${amount}', '${comments}', '${uuid}')
    RETURNING
        towel_id`);
    req.body = rows;
    next();
});

router.put("/update", async function(req, res) {
    const { TowelId, shelving, column, shelf, size, amount, comments } = req.body;
    const response = await pool.query(`
    UPDATE
        towels
    SET
        shelving = '${shelving}',
        column_number = '${column}',
        shelf = '${shelf}',
        size = '${size}',
        amount = ${amount},
        comments = '${comments}'
    WHERE
        towel_id = '${TowelId}'`);
    res.send(response);
});


module.exports = router;