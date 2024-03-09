const setUser = (userId, potentialUserInfo) => {
    return (userId || potentialUserInfo) ? userId || potentialUserInfo : 'Unknown';
}

const setNumberOfRequests = (user, reqOriginalUrl, resStatusCode) => {
    //console.log(reqOriginalUrl.includes('/registration') && user && resStatusCode[0] != '2');

    console.log(resStatusCode);
    let reqBefore = "";
    let reqAfter = "";
    switch (true) {
        case reqOriginalUrl.includes('/registration') && !user && resStatusCode[0] == '2':
            reqBefore = 10;
            reqAfter = 10;
            return [reqBefore, reqAfter];

        case reqOriginalUrl.includes('/registration') && user && !resStatusCode[0] != '2':
            reqBefore = user.numberOfRequests;
            reqAfter = user.numberOfRequests;
            return [reqBefore, reqAfter];

        case (reqOriginalUrl.includes('/login') && !user) || (reqOriginalUrl.includes('/registration') && !user):
            return [reqBefore, reqAfter];

        case reqOriginalUrl.includes('/login') && user:
            reqBefore = user.numberOfRequests;
            reqAfter = user.numberOfRequests;
            return [reqBefore, reqAfter];

        case user && resStatusCode[0] == '2':
            reqBefore = user.numberOfRequests + 1;
            reqAfter = user.numberOfRequests;
            return [reqBefore, reqAfter];

        case user && resStatusCode[0] != '2':
            reqBefore = user.numberOfRequests;
            reqAfter = user.numberOfRequests;
            return [reqBefore, reqAfter];

        case !user :
            return [reqBefore, reqAfter];   
    };
}

module.exports = {
    setUser,
    setNumberOfRequests
}