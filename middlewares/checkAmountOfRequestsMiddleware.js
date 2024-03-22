const userRequestLogMiddleware = require('./userRequestLogMiddleware');
const requestCountLogMiddleware = require('./requestCountLogMiddleware');

const checkAmountOfRequests = (req, res, next) => {
    try {
        if(req.session.user.numberOfRequests === 0 && req.originalUrl !== '/users/logout') {
            res.status(403).send('You have exceeded your request limit for the day! Se ya tomorrow');

            //the same case as in token middleware
            requestCountLogMiddleware(req, res);
            userRequestLogMiddleware(req, res, next);
            return;
        }
        next();
    } catch (err) {
        console.log(err.name);
        console.log(err.message);
    }
}


module.exports = checkAmountOfRequests;