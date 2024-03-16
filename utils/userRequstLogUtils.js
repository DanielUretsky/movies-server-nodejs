const setNumberOfRequests = (user, reqOriginalUrl, resStatusCode) => {
    let reqBefore = "";
    let reqAfter = "";
  
    switch (true) {
        case reqOriginalUrl.includes('/registration') && Boolean(!user) && resStatusCode[0] == '2':
            reqBefore = 10;
            reqAfter = 10;
            return [reqBefore, reqAfter];

        case reqOriginalUrl.includes('/registration') && Boolean(user) && !resStatusCode[0] != '2':
            reqBefore = user.numberOfRequests;
            reqAfter = user.numberOfRequests;
            return [reqBefore, reqAfter];

        case (reqOriginalUrl.includes('/login') && Boolean(!user)) || (reqOriginalUrl.includes('/registration') && Boolean(!user)):
            return [reqBefore, reqAfter];

        case reqOriginalUrl.includes('/login') && Boolean(user):
            reqBefore = user.numberOfRequests;
            reqAfter = user.numberOfRequests;
            return [reqBefore, reqAfter];

        case Boolean(user) && resStatusCode[0] == '2':
            reqBefore = user.numberOfRequests + 1;
            reqAfter = user.numberOfRequests;
            return [reqBefore, reqAfter];

        case Boolean(user) && resStatusCode[0] != '2':
            reqBefore = user.numberOfRequests;
            reqAfter = user.numberOfRequests;
            return [reqBefore, reqAfter];

        case Boolean(!user) :
            return [reqBefore, reqAfter];   
    };
}

module.exports = {
    setNumberOfRequests
}