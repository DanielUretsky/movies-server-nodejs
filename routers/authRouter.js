const express = require('express');
const router = express.Router();
const authBLL = require('../BLL/authBLL');

router.post('/registration', async(req, res, next) => {
    const userData = req.body;
    try {
        const response = await authBLL.registration(userData);
        if(!response) res.status(500).send('Unknown server error');

        res.status(response.status).send(response.message);
        next();
    } catch (err) {
        console.log(err.name);
        console.log(err.message);
        res.status(500).send('Unknown server error');
    }
});

router.post('/login', async(req, res, next) => {
    try {
        const {email, password} = req.body;
        const response = await authBLL.login(email, password);
        if(!response) res.send(500).send('Unknown server error');
      
        if(!req.session.user && response.status.toString()[0] == '2') {
            //getting current date 
            const date = new Date('2024-03-15T22:00:00.000Z');
            date.setHours(0, 0, 0, 0);
            req.session.user = {
                ...response.message.userInfo,
                oldReceiptDate: date, 
                numberOfRequests: 10,
            }
            req.session.save();  
        }
        res.status(response.status).send(response.message);
        next();
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Unknown server error');
    }
});

module.exports = router;