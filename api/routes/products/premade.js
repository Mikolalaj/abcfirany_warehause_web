var express = require('express');
var router = express.Router();
var pool = require('../../db');
const { v4: uuidv4 } = require('uuid');

// api/products/premade/

router.get('/search/:productId', async function(req, res, next) {
    productId = req.params.productId;
    const { rows } = await pool.query(`
    SELECT
        premade_id as id,
        shelving,
        column_number as column,
        shelf,
        size,
        amount,
        finish,
        comments
    FROM premade
    WHERE product_id = '${productId}'`);
    req.body = rows;
    next();
});

router.post('/add', async function(req, res, next) {
    const { productId, shelving, column, shelf, size, amount, finish, comments } = req.body;
    const uuid = uuidv4();
    const { rows } = await pool.query(`
    INSERT INTO premade
        (product_id, shelving, column_number, shelf, size, amount, finish, comments, premade_id)
    VALUES
        ('${productId}', '${shelving}', '${column}', '${shelf}', '${size}', '${amount}', '${finish}', '${comments}', '${uuid}')
    RETURNING
        premade_id`);
    req.body = rows;
    next();
});

router.put('/update', async function(req, res) {
    const { childProductId, shelving, column, shelf, size, amount, finish, comments } = req.body;
    const response = await pool.query(`
    UPDATE
        premade
    SET
        shelving = '${shelving}',
        column_number = '${column}',
        shelf = '${shelf}',
        size = '${size}',
        amount = ${amount},
        finish = '${finish}',
        comments = '${comments}'
    WHERE
        premade_id = '${childProductId}'`);
    res.send(response);
});


module.exports = router;