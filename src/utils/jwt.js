const jwt = require('jsonwebtoken')
const {secretKey, jwtExpiresIn} = require('../configs/constants')

const generateToken = (user) => {
    const payload = {
        id: user.id,
        email: user.email,
        username: user.username
    };
    return jwt.sign(payload, secretKey, {expiresIn: jwtExpiresIn});
}

const verifyToken = (token) => {
    try {
        return jwt.verify(token, secretKey);
    } catch {
        return null;
    }
}

module.exports = {generateToken, verifyToken}