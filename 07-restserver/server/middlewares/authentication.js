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

let verifyAdminRole = (req, res, next) => {

    let user = req.user;

    if (user.role === 'ADMIN_ROLE') {
        return next();
    }

    return res.json({
        error: {
            message: 'User is not admin'
        }
    });
};

module.exports = {
    verifyToken,
    verifyAdminRole
};