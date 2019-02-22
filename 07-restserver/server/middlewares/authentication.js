const jwt = require('jsonwebtoken');

let verifyToken = (req, res, next) => {
    let token = req.get('Authorization');

    jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({
                error: {
                    message: 'JWT is not valid'
                }
            });
        }

        req.user = decoded.user;

        next();
    });
};

module.exports = {
    verifyToken
};