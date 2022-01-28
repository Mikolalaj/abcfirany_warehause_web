var express = require("express");
var router = express.Router();
var pool = require("../db");
const { v4: uuidv4 } = require('uuid');

router.post("/add", async function(req, res, next) {
    const { sub } = req.user;
    if (!sub) {
        return res.status(401).json({ message: "Błąd autoryzacji" });
    }

    const { cuttingAmount, sewingAmount, orderNumber, destination, comments } = req.body;
    let orderNumberNull;
    orderNumber === undefined ? orderNumberNull = 'NULL' : orderNumberNull = `'${orderNumber}'`;
    
    const uuid = uuidv4();
    const { rows } = await pool.query(`
    INSERT INTO cutting
        (cutting_amount, sewing_amount, order_number, destination, comments, cutting_id, user_id)
    VALUES
        ('${cuttingAmount}', '${sewingAmount}', ${orderNumberNull}, '${destination}', '${comments}', '${uuid}', '${sub}')
    RETURNING
        cutting_id`);
    req.body = rows;
    next();
});

module.exports = router;