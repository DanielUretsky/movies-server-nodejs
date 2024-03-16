
const addDailyRequests = (req, res, next) => {
    try {
        //getting current date 
        const dateToday = new Date();
        //this method allows to se date without hours, minutes, 
        //second and end etc. Ecample date - '2024-03-14T22:00:00.000Z'
        dateToday.setHours(0, 0, 0, 0);
       
        if (req.session.user && (dateToday > req.session.user.oldReceiptDate)) {
            req.session.user.numberOfRequests += 10;
            req.session.user.oldReceiptDate = dateToday;
            req.session.save();
        }

        next();
    } catch (err) {
        console.log(err);
    }
}

module.exports = addDailyRequests;