const {verifyToken} = require("../utils/jwt");

const authenticate = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const tokenUser = verifyToken(token);
        if (!token || !tokenUser) {
            return res.status(401).json({message: 'Unauthenticated'});
        }
        if (tokenUser.id !== Number(req.params.userId)) {
            return res.status(403).json({message: 'Unauthorized'});
        }
        next();

    } catch (error) {
        next(error);
    }
}

module.exports = {authenticate};