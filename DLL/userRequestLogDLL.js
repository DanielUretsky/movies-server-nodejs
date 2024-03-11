const jsonfile = require('jsonfile');

const getUserRequestLogFile = async() => {
    return jsonfile.readFile('./log/requests.log.json');
}

const writetUserRequestLogFile = async(logObj) => {
    return jsonfile.writeFile('./log/requests.log.json', logObj);
}

module.exports = {
    getUserRequestLogFile,
    writetUserRequestLogFile
}