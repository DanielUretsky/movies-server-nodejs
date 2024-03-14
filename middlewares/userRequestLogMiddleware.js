const userRequestLogDLL = require('../DLL/userRequestLogDLL');
const userRequestLogUtils = require('../utils/userRequstLogUtils');

const userRequestLog = async (req, res) => {
  
    // console.log('userRequestLog work');
    // console.log(res.statusCode);
    try {
        // i get the response status code from previous function and converted him to string 
        // to get value of the first substr, so if the value is 2 that means our status code 
        // starts from 2, and that means our response is completes without errors, so it can be true or false
        const requestCompleted = res.statusCode.toString()[0] == '2' ? `${true} statusCode: ${res.statusCode}` : `${false} statusCode: ${res.statusCode}`;
        const { requestLogs } = await userRequestLogDLL.getUserRequestLogFile();

        const userSession = req.session.user;
        // trying to get any important user info
        const potentialUserInfo = req.body.email || req.user?.email || req.body.username || req.user?.username;
        
        const [reqBefore, reqAfter] = userRequestLogUtils.setNumberOfRequests(userSession, req.originalUrl, res.statusCode.toString());
        const requestLogObj = {
            user: (userSession || potentialUserInfo) ? userSession?._id || potentialUserInfo : "Unknown",
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
        console.log(`log complition error: ${err.name} => ${err.message}`);
    }
}

module.exports = userRequestLog;