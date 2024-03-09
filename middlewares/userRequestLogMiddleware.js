const UserModel = require('../models/userModel');
const userRequestLogDLL = require('../DLL/userRequestLogDLL');
const userRequestLogUtils = require('../utils/userRequstLogUtils');

const userRequestLog = async (req, res, next) => {
    console.log('next work');
    console.log(res.statusCode);
    try {
        // i get the response status code from previous function and converted him to string 
        // to get value of the first substr, so if the value is 2 that means our status code 
        // starts from 2, and that means our response is completes without errors, so it can be true or false
        const requestCompleted = res.statusCode.toString()[0] == '2' ? `${true} statusCode: ${res.statusCode}` : `${false} statusCode: ${res.statusCode}`;
        const { requestLogs } = await userRequestLogDLL.getUserRequestLogFile();

        // trying to get any important user info
        const potentialUserInfo = req.body.email || req.user?.email || req.body.username || req.user?.username;
        const user = await UserModel.findOne({
            // so the symbol $or means search from user model by parameters in arr
            // but if you dont find user with first parameter, try to find him with second parameter and etc.
            $or: [{ email: req.body.email },
            { email: req.user?.email },
            { username: req.body.username },
            { email: req.user?.username }]
        });

        const [reqBefore, reqAfter] = userRequestLogUtils.setNumberOfRequests(user, req.originalUrl, res.statusCode);
        const requestLogObj = {
            user: userRequestLogUtils.setUser(user?.id, potentialUserInfo),
            requestMethod: req.method,
            route: req.originalUrl,
            requestDate: new Date().toLocaleDateString(),
            requsetTime: new Date().toLocaleTimeString(),
            requestCompleted,
            numberOfRequestsBefore: reqBefore,
            numberOfRequestsAfter: reqAfter
        }

        requestLogs.push(requestLogObj);
        await userRequestLogDLL.writetUserRequestLogFile({ requestLogs });

    } catch (err) {
        console.log(err);
    }
}

module.exports = userRequestLog;