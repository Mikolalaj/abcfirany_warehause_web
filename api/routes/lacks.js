var express = require('express');
var router = express.Router();
var pool = require('../db');
var { ifNull } = require('../utils');

router.post('/', async function(req, res, next) {
    const { sub } = req.user;
    if (!sub) {
        return res.status(401).json({ message: 'Błąd autoryzacji' });
    }

    try {
        const { productId, featureId, size, amount, orderNumber, comments, unit } = req.body;
    
        const { rows } = await pool.query(`
        WITH inserted AS (
        INSERT INTO lacks
            (product_id, feature_id, size, amount, order_number, comments, unit, added_by)
        VALUES
            ('${productId}', ${ifNull(featureId)}, '${size}', '${amount}', '${orderNumber}', '${comments}', '${unit}', '${sub}')
        RETURNING
            to_char(add_date, 'DD.MM HH24:MI') as add_date,
            product_id,
            feature_id,
            size,
            amount,
            order_number,
            comments,
            unit,
            lack_id
        )
        SELECT
            I.add_date,
            I.product_id,
            P.symbol,
            I.feature_id,
            F.name as feature,
            I.size,
            CASE
                WHEN I.unit='meter' THEN I.amount
                ELSE CAST(I.amount AS INTEGER)
            END,
            I.order_number,
            I.comments,
            I.unit,
            I.lack_id
        FROM inserted I
        JOIN products P ON I.product_id = P.product_id
        LEFT JOIN features F ON I.feature_id = F.feature_id
        `);
        req.body = rows[0];
        next();
    } catch (error) {
        return res
            .status(400)
            .json({message: `Wystąpił błąd podczas dodawania braku (${error.message})`});
    }
});

router.get('/:orderNumber?', async function(req, res, next) {
    const orderNumber = req.params.orderNumber;

    let byOrderNumber = '';
    if (orderNumber) {
        byOrderNumber = `AND LOWER(order_number) = LOWER('${orderNumber}')`;
    }

    const { sub } = req.user;
    if (!sub) {
        return res.status(401).json({ message: 'Błąd autoryzacji' });
    }

    try {
        const { rows } = await pool.query(`
        SELECT
            to_char(L.add_date, 'DD.MM HH24:MI') as add_date,
            L.product_id,
            P.symbol,
            L.feature_id,
            F.name as feature,
            L.size,
            CASE
                WHEN L.unit='meter' THEN L.amount
                ELSE CAST(L.amount AS INTEGER)
            END,
            L.unit,
            L.order_number,
            L.comments,
            L.lack_id
        FROM lacks L
        JOIN products P ON L.product_id = P.product_id
        LEFT JOIN features F ON L.feature_id = F.feature_id
        WHERE added_by = '${sub}' ${byOrderNumber}
        ORDER BY add_date DESC
        `);
        
        req.body = rows;
        next();
    } catch (error) {
        return res
            .status(400)
            .json({message: `Wystąpił błąd podczas pobierania braków (${error.message})`});
    }
});

router.put('/', async function(req, res, next) {
    try {
        const { lackId, productId, featureId, size, amount, orderNumber, comments, unit } = req.body;

        if (!lackId) {
            return res.status(400).json({ message: 'Brak id braku' });
        }

        const { rows } = await pool.query(`
        WITH inserted AS (
        UPDATE lacks
        SET
            product_id = '${productId}',
            feature_id = ${ifNull(featureId)},
            size = '${size}',
            amount = '${amount}',
            order_number = '${orderNumber}',
            comments = '${comments}',
            unit = '${unit}'
        WHERE
            lack_id = '${lackId}'
        RETURNING
            to_char(add_date, 'DD.MM HH24:MI') as add_date,
            product_id,
            feature_id,
            size,
            amount,
            order_number,
            comments,
            unit,
            lack_id
        )
        SELECT
            I.add_date,
            I.product_id,
            P.symbol,
            I.feature_id,
            F.name as feature,
            I.size,
            CASE
                WHEN I.unit='meter' THEN I.amount
                ELSE CAST(I.amount AS INTEGER)
            END,
            I.order_number,
            I.comments,
            I.unit,
            I.lack_id
        FROM inserted I
        JOIN products P ON I.product_id = P.product_id
        LEFT JOIN features F ON I.feature_id = F.feature_id
        `);
        req.body = rows[0];
        next();
    } catch (error) {
        return res
            .status(400)
            .json({message: `Wystąpił błąd podczas edytowania braku (${error.message})`});
    }
});

router.delete('/', async function(req, res, next) {
    let lackId

    try {
        lackId = req.body.lackId;
    } catch (error) {
        return res.status(400).json({ message: `Brak id braku` });
    }
    
    try {
        await pool.query(`
        DELETE FROM lacks
        WHERE lack_id = '${lackId}'
        `); 
    } catch (error) {
        return res.status(500).json({ message: `Wystąpił błąd podczas usuwania braku (${error})` });
    }

    return res.sendStatus(204);
});

module.exports = router;