const jsonfile = require('jsonfile');

const getRequestsCountFile = async() => {
    return jsonfile.readFile('./log/requestsCount.log.json');
}

const writetRequestsCountFile = async(logObj) => {
    return jsonfile.writeFile('./log/requestsCount.log.json', logObj);
}

module.exports = {
    getRequestsCountFile,
    writetRequestsCountFile
}