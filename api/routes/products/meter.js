var express = require("express");
var router = express.Router();
var pool = require("../../db");
const { v4: uuidv4 } = require('uuid');

// api/products/meter/

router.get("/search/:productId", async function(req, res, next) {
    productId = req.params.productId;
    const { rows } = await pool.query(`
    SELECT
        meter_id as id,
        shelving,
        column_number as column,
        shelf,
        width,
        amount,
        comments
    FROM meter
    WHERE product_id = '${productId}'`);
    req.body = rows;
    next();
});

router.delete("/delete/one/:productMeterId", async function(req, res) {
    productMeterId = req.params.productMeterId;
    const response = await pool.query(`
    DELETE FROM meter
    WHERE meter_id = '${productMeterId}'`);
    res.send(response);
});

router.delete("/delete/all/:productId", async function(req, res) {
    const productId = req.params.productId;
    const response = await pool.query(`
    DELETE FROM meter
    WHERE product_id = '${productId}'`);
    res.send(response);
});

router.put("/take", async function(req, res) {
    const { productMeterId, newAmount } = req.body;
    const response = await pool.query(`
    UPDATE
        meter
    SET
        amount = ${newAmount}
    WHERE
        meter_id = '${productMeterId}'`);
    res.send(response);
});

router.post("/add", async function(req, res, next) {
    const { productId, shelving, column, shelf, width, amount, comments } = req.body;
    const uuid = uuidv4();
    const { rows } = await pool.query(`
    INSERT INTO meter
        (product_id, shelving, column_number, shelf, width, amount, comments, meter_id)
    VALUES
        ('${productId}', '${shelving}', '${column}', '${shelf}', '${width}', '${amount}', '${comments}', '${uuid}')
    RETURNING
        meter_id`);
    req.body = rows;
    next();
});

router.put("/update", async function(req, res) {
    const { productMeterId, shelving, column, shelf, width, amount, comments } = req.body;
    const response = await pool.query(`
    UPDATE
        meter
    SET
        shelving = '${shelving}',
        column_number = '${column}',
        shelf = '${shelf}',
        width = '${width}',
        amount = ${amount},
        comments = '${comments}'
    WHERE
        meter_id = '${productMeterId}'`);
    res.send(response);
});


module.exports = router;