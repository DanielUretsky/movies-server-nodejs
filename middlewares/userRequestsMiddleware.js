function userRequestsHandler(req, res, next) {
    try {
        if(res.statusCode.toString()[0] != '2' || req.originalUrl == '/users/logout') return next();
        
        req.session.user.numberOfRequests--;
        req.session.save();
       
        next();
    } catch (err) {
        console.log(err.name);
        console.log(err.message);
    }
}


module.exports = userRequestsHandler;