const express = require('express');
const router = express.Router();

const authBLL = require('../BLL/authBLL');

router.post('/registration', async(req, res) => {
    try {
        const userData = req.body;
        const response = await authBLL.registration(userData);
        if(!response) res.send(500).send('Unknown server error');

        res.status(response.status).send(response.message);
        next();
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Unknown server error');
    }
});

router.post('/login', async(req, res) => {
    try {
        const {email, password} = req.body;
        const response = await authBLL.login(email, password);
        if(!response) res.send(500).send('Unknown server error');

        res.status(response.status).send(response.message);
        next();
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Unknown server error');
    }
});

module.exports = router;