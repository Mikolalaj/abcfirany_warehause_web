var express = require('express');
var router = express.Router();
var pool = require('../../db');
const { v4: uuidv4 } = require('uuid');
import { ifNull } from '../../utils'

// api/products/meter/

router.get('/search/:productId', async function(req, res, next) {
    productId = req.params.productId;
    const { rows } = await pool.query(`
    SELECT
        product_child_id,
        shelf_code,
        width,
        amount,
        comments,
        F.name as feature
    FROM products_child
    LEFT JOIN features F ON F.feature_id = products_child.feature_id
    WHERE product_id = '${productId}'
    AND category = 'meter'
    ORDER BY width, amount`);
    req.body = rows;
    next();
});

router.post('/add', async function(req, res, next) {
    const { productId, shelfCode, width, amount, comments, featureId } = req.body;
    const productChildId = uuidv4();
    const { rows } = await pool.query(`
    INSERT INTO products_child
        (product_child_id, product_id, shelf_code, width, amount, comments, feature_id, category)
    VALUES
        ('${productChildId}', '${productId}', '${shelfCode}', '${width}', '${amount}', '${comments}', ${ifNull(featureId)}, 'meter')
    RETURNING
        product_child_id`);
    req.body = rows;
    next();
});

router.put('/update', async function(req, res) {
    const { productChildId, shelfCode, width, amount, comments, featureId } = req.body;
    const response = await pool.query(`
    UPDATE
        products_child
    SET
        shelf_code = '${shelfCode}',
        width = '${width}',
        amount = ${amount},
        comments = '${comments}',
        feature_id = ${ifNull(featureId)}
    WHERE
        product_child_id = '${productChildId}'`);
    res.send(response);
});


module.exports = router;