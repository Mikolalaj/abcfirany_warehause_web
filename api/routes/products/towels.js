var express = require('express');
var router = express.Router();
var pool = require('../../db');
const { v4: uuidv4 } = require('uuid');

// api/products/towels/

router.get('/search/:productId', async function(req, res, next) {
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

router.post('/add', async function(req, res, next) {
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

router.put('/update', async function(req, res) {
    const { childProductId, shelving, column, shelf, size, amount, comments } = req.body;
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
        towel_id = '${childProductId}'`);
    res.send(response);
});


module.exports = router;