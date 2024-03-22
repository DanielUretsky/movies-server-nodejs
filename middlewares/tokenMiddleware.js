const userRequestLogMiddleware = require('./userRequestLogMiddleware');
const requestCountLogMiddleware = require('./requestCountLogMiddleware');

const jwt = require('jsonwebtoken');

function authenticateToken(req, res, next) {
    try {
        if(req.originalUrl === '/users/logout') return next();
        const authHeader = req.headers.authorization;
        if(!authHeader) res.status(401).send('Unauthorized!');
       
        const token = authHeader.split(' ')[1];
        const user = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        
        req.user = user;
        return next();
    } catch (err) { 
        console.log(err.message);
        res.status(401).send('Unauthorized!');
        /* 
        We need to complete log anyway, we cant do it if we dont call
        our 'userRequestLogMiddleware' after 'authenticateToken' is failed 
        and we can't call 'next' because we dont want to continue our routers logic.
        
        So if we in block catch after sending response
        (we do it after all, because we need info about 'req' and 'res' parameters) 
        we call to 'userRequestLogMiddleware' to complete log 
        */
        requestCountLogMiddleware(req, res);
        userRequestLogMiddleware(req, res, next);
        
    }
} 

module.exports = authenticateToken;