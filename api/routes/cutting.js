var express = require('express');
var router = express.Router();
var pool = require('../db');
var { ifNull } = require('../utils');

router.post('/', async function(req, res, next) {
    const { sub } = req.user;
    if (!sub) {
        return res.status(401).json({ message: 'Błąd autoryzacji' });
    }

    const { cuttingAmount, sewingAmount, orderNumber, destination, comments } = req.body;
    
    const { rows } = await pool.query(`
    INSERT INTO cutting
        (cutting_amount, sewing_amount, order_number, destination, comments, user_id)
    VALUES
        ('${cuttingAmount}', '${sewingAmount}', ${ifNull(orderNumber)}, '${destination}', '${comments}', '${sub}')
    RETURNING
        to_char(add_date, 'DD.MM HH24:MI') as add_date,
        order_number,
        cutting_amount,
        sewing_amount,
        destination,
        comments,
        cutting_id
    `);
    req.body = rows[0];
    next();
});

router.get('/', async function(req, res, next) {
    const { sub } = req.user;
    if (!sub) {
        return res.status(401).json({ message: 'Błąd autoryzacji' });
    }

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
    WHERE user_id = '${sub}'`);
    
    req.body = rows;
    next();
});

router.delete('/', async function(req, res, next) {
    let cuttingId

    try {
        cuttingId = req.body.cuttingId;
    } catch (error) {
        return res.status(400).json({ message: `Missing cutting ID (${error})` });
    }

    try {
        await pool.query(`
        DELETE FROM cutting
        WHERE cutting_id = '${cuttingId}'
        `); 
    } catch (error) {
        return res.status(500).json({ message: `Error deleting cutting (${error})` });
    }

    return res.sendStatus(204);
    
});

module.exports = router;