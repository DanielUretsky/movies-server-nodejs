
const checkAmountOfRequests = (req, res, next) => {
    try {
        if(req.session.user.numberOfRequests === 0) {
            return res.status(403).send('You have exceeded your request limit for the day! Se ya tomorrow');
        }
        console.log(req.session.user.numberOfRequests);
        next();
    } catch (err) {
        console.log(err.name);
        console.log(err.message);
    }
}


module.exports = checkAmountOfRequests;