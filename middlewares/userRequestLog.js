const UserModel = require('../models/userModel');

const userRequestLogDLL = require('../DLL/userRequestLogDLL');

const userRequestLog = async(req, res, next) => {
    console.log('next work');
    const {requestLogs} = await userRequestLogDLL.getUserRequestLogFile();
    console.log(res.statusCode);
    // so the symbol $or means search from user model by parameters in arr
    // but if you dont find user with first parameter, try to find him with second parameter and etc.

    const user = await UserModel.findOne({ 
        $or: [ { email: req.body.email }, { email: req.user?.email } ] 
    });

    const requestLogObj = {
        user: user ? user._id : `First registration ${req.body.email}`,
        requestMethod: req.method,
        route: req.originalUrl,
        requestDate: new Date().toLocaleDateString(),
        requsetTime: new Date().toLocaleTimeString(),
        // i get the response status code from previous function and converted him to string 
        // to get value of the first substr, so if the value is 2 that means our status code 
        // starts from 2, and that means our response is completes without errors, so it can be true or false
        requestCompleted: res.statusCode.toString()[0] == '2' ? true : false,  
        numberOfRequestsBefore: user?.numberOfRequests + 1,
        numberOfRequestsAfter: user?.numberOfRequests
    }

    if(req.originalUrl.includes('/registration')) {
        requestLogObj.numberOfRequestsBefore = 10;
        requestLogObj.numberOfRequestsAfter = 10;
    }
    else if(req.originalUrl.includes('/login')) {
        requestLogObj.numberOfRequestsBefore = user.numberOfRequests;
        requestLogObj.numberOfRequestsAfter = requestLogObj.numberOfRequestsBefore;
    }

    requestLogs.push(requestLogObj);
    await userRequestLogDLL.writetUserRequestLogFile({ requestLogs });

    // requestLogObj.numberOfRequestsAfter = 10
    // requestLogObj.numberOfRequestsBefore = 10
    
    // console.log('method', req.method);
    // console.log('url', req.url);
    // console.log('originalUrl', req.originalUrl);
    // console.log('params', req.params);
    // console.log('query', req.query);
    // console.log('headers', req.headers);
    // console.log('body', req.body);
    next()
}

module.exports = userRequestLog;