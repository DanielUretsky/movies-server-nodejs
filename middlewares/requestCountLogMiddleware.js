const requestCountLogDLL = require('../DLL/requestCountLogDLL');

const requestCountLog = async(req, res, next) => {
    try {
        const requestCompleted = res.statusCode.toString()[0] == '2';
        const {requests} = await requestCountLogDLL.getRequestsCountFile();
        
        if(requestCompleted) requests.succesfully++;
        if(!requestCompleted) requests.failed++;

        await requestCountLogDLL.writetRequestsCountFile({ requests });

    } catch (err) {
        console.log(err);
    }
} 

module.exports = requestCountLog;