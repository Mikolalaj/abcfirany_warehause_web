const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const hashPassword = password => {
    return new Promise((resolve, reject) => {
        // Generate a salt at level 12 strength
        bcrypt.genSalt(12, (err, salt) => {
            if (err) {
                reject(err);
            }
            bcrypt.hash(password, salt, (err, hash) => {
            if (err) {
                reject(err);
            }
            resolve(hash);
            });
        });
    });
};

const verifyPassword = (passwordAttempt, hashedPassword) => {
    return bcrypt.compare(passwordAttempt, hashedPassword);
};  

const createToken = userData => {
    // Sign the JWT
    return jwt.sign(
    {
        sub: userData.user_id,
        username: userData.username,
        email: userData.email,
        admin: userData.admin,
        iss: 'api.abcfirany',
        aud: 'api.abcfirany'
    },
    process.env.JWT_SECRET,
    { algorithm: 'HS256', expiresIn: '2h' }
    );
};

module.exports = {
    createToken,
    hashPassword,
    verifyPassword
};