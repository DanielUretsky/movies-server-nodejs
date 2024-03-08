require('dotenv').config();
const jwt = require('jsonwebtoken');

function authenticateToken(req, res, next) {
    const authHeader = req.headers.authorization;
    if(!authHeader) return res.status(401).send('Unauthorized!');

    const token = authHeader.split(' ')[1];
    try {
        const user = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        
        req.user = user;
        next();
    } catch (err) {
        return res.status(401).send('Unauthorized!');
    }
} 

module.exports = authenticateToken;