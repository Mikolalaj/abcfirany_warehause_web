var express = require("express");
var router = express.Router();
var pool = require("../db");
var sha256 = require('hash.js/lib/hash/sha/256');
const { v4: uuidv4 } = require('uuid');


async function checkCredentials(username, password) {
    var hashedPassword = sha256().update(password).digest('hex');
    const res = await pool.query(`
    SELECT DISTINCT(
        CASE WHEN
            EXISTS (SELECT * FROM users WHERE username = '${username}' AND password = '${hashedPassword}') 
                THEN (SELECT user_id FROM users WHERE username = '${username}' AND password = '${hashedPassword}') 
                ELSE NULL
        END)
    FROM users`);
    return res.rows[0].case;
}

router.post("/auth", function(req, res) {
    userData = req.body;
    checkCredentials(userData.username, userData.password)
        .then(result => res.send(result));
});

async function addUser({ firstName, lastName, email, username, password }) {
    var hashedPassword = sha256().update(password).digest('hex');
    var uuid = uuidv4();
    try {
        const res = await pool.query(`
        INSERT INTO users (user_id, first_name, last_name, username, password, email)
        VALUES ('${uuid}', '${firstName}', '${lastName}', '${username}', '${hashedPassword}', '${email}')`);
        return res;
    } catch (error) {
        console.log(error);
        return error;
    }
}

router.post("/add", function(req, res) {
    userData = req.body;
    console.log(userData);
    addUser(userData)
        .then(result => {
            if (result.rowCount === 1) {
                res.send(true);
            }
            else {
                res.send(false);
            }
        });
});

async function checkUsernameAvailability(username) {
    try {
        const res = await pool.query(`
        SELECT EXISTS(SELECT user_id FROM users WHERE username = '${username}')`);
        return res.rows[0].exists;
    } catch (error) {
        return error;
    }
}

router.get("/checkUsername/:username/", function(req, res) {
    userData = req.params;
    console.log(userData);
    checkUsernameAvailability(userData.username)
        .then(result => res.send(result));
});

module.exports = router;