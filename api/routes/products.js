var express = require("express");
var router = express.Router();
var pool = require("../db");
const jwt = require('express-jwt');
const jwtDecode = require('jwt-decode');
const cookieParser = require('cookie-parser');

router.use(cookieParser());

const attachUser = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ message: 'Błąd autoryzacji' });
    }

    const decodedToken = jwtDecode(token);

    if (!decodedToken) {
        return res.status(401).json({ message: 'Błąd autoryzacji' });
    }
    else {
        req.user = decodedToken;
        next();
    }
};

router.use(attachUser);

const checkJwt = jwt({
    secret: process.env.JWT_SECRET,
    algorithms: ['HS256'],
    issuer: 'api.abcfirany',
    audience: 'api.abcfirany',
    getToken: req => req.cookies.token
});

router.use(checkJwt);

const requireAdmin = (req, res, next) => {
    const { admin } = req.user;
    if (!admin) {
        return res.status(403).json({ message: 'Brak uprawnień' });
    }
    next();
};

async function searchForProduct(symbol_search) {
    const res = await pool.query(`
    SELECT * FROM products WHERE symbol LIKE '${symbol_search}%'`);
    return res.rows;
}

router.get("/:symbol_search", function(req, res) {
    symbol_search = req.params.symbol_search;
    console.log(req.user);
    searchForProduct(symbol_search)
        .then(result => res.send(result));
});

module.exports = router;