var express = require('express');
var router = express.Router();
var pool = require('../../db');
const { v4: uuidv4 } = require('uuid');
const { ifNull } = require('../../utils')

// api/products/pillows/

router.get('/search/:productId', async function(req, res, next) {
    productId = req.params.productId;
    const { rows } = await pool.query(`
    SELECT
        product_child_id,
        shelf_code,
        size,
        amount,
        finish,
        comments,
        F.name as feature
    FROM products_child
    LEFT JOIN features F ON F.feature_id = products_child.feature_id
    WHERE product_id = '${productId}'
    AND category = 'pillow'
    ORDER BY size, amount`);
    req.body = rows;
    next();
});

router.post('/add', async function(req, res, next) {
    const { productId, shelfCode, size, amount, finish, comments, featureId } = req.body;
    const productChildId = uuidv4();
    const { rows } = await pool.query(`
    INSERT INTO products_child
        (product_child_id, product_id, shelf_code, size, amount, finish, comments, feature_id, category)
    VALUES
        ('${productChildId}', '${productId}', '${shelfCode.toUpperCase()}', '${size}', '${amount}', '${finish}', '${comments}', '${ifNull(featureId)}', 'pillow')
    RETURNING
    product_child_id`);
    req.body = rows;
    next();
});

router.put('/update', async function(req, res) {
    const { productChildId, shelfCode, size, amount, finish, comments, featureId } = req.body;
    const response = await pool.query(`
    UPDATE
        products_child
    SET
        shelf_code = '${shelfCode.toUpperCase()}',
        size = '${size}',
        amount = '${amount}',
        finish = '${finish}',
        comments = '${comments}',
        feature_id = ${ifNull(featureId)}
    WHERE
        product_child_id = '${productChildId}'`);
    res.send(response);
});


module.exports = router;