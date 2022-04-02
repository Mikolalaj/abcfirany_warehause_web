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
            ('${productId}', '${featureId}', '${size}', '${amount}', ${orderNumber}, '${comments}', '${unit}', '${sub}')
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
            inserted.add_date,
            products.symbol,
            features.name,
            inserted.size,
            inserted.amount,
            inserted.order_number,
            inserted.comments,
            inserted.unit,
            inserted.lack_id
        FROM inserted
        JOIN products ON inserted.product_id = products.product_id
        JOIN features ON inserted.feature_id = features.feature_id
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
        byOrderNumber = `AND order_number = '${orderNumber}'`;
    }

    const { sub } = req.user;
    if (!sub) {
        return res.status(401).json({ message: 'Błąd autoryzacji' });
    }

    try {
        const { rows } = await pool.query(`
        SELECT
            to_char(add_date, 'DD.MM HH24:MI') as add_date,
            order_number,
            cutting_amount,
            sewing_amount,
            destination,
            comments,
            cutting_id
        FROM cutting
        WHERE user_id = '${sub}' ${byOrderNumber}
        ORDER BY add_date DESC
        `);
        
        req.body = rows;
        next();
    } catch (error) {
        return res
            .status(400)
            .json({message: `Wystąpił błąd podczas pobierania metrów (${error.message})`});
    }
});

// router.put('/', async function(req, res, next) {
//     try {
//         const { cuttingId, cuttingAmount, sewingAmount, orderNumber, destination, comments } = req.body;

//         if (!cuttingId) {
//             return res.status(400).json({ message: 'Brak id metrów' });
//         }

//         const { rows } = await pool.query(`
//         UPDATE cutting
//         SET
//             cutting_amount = '${cuttingAmount}',
//             sewing_amount = '${sewingAmount}',
//             order_number = ${ifNull(orderNumber)},
//             destination = '${destination}',
//             comments = '${comments}'
//         WHERE
//             cutting_id = '${cuttingId}'
//         RETURNING
//             order_number,
//             cutting_amount,
//             sewing_amount,
//             destination,
//             comments,
//             cutting_id
//         `);
//         req.body = rows[0];
//         next();
//     } catch (error) {
//         return res
//             .status(400)
//             .json({message: `Wystąpił błąd podczas edytowania metrów (${error.message})`});
//     }
// });

// router.delete('/', async function(req, res, next) {
//     let cuttingId

//     try {
//         cuttingId = req.body.cuttingId;
//     } catch (error) {
//         return res.status(400).json({ message: `Brak id metrów` });
//     }

//     try {
//         await pool.query(`
//         DELETE FROM cutting
//         WHERE cutting_id = '${cuttingId}'
//         `); 
//     } catch (error) {
//         return res.status(500).json({ message: `Error deleting cutting (${error})` });
//     }

//     return res.sendStatus(204);
    
// });

module.exports = router;