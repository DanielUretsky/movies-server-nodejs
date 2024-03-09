const express = require('express');
const router = express.Router();

const usersBLL = require('../BLL/usersBLL');


router.get('/home', async (req, res, next) => {
    try {
        const response = await usersBLL.getAllMovies();
        if(!response) res.status(500).send('Unknown server error');

        res.status(response.status).send(response.message);
        next();
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Unknown server error');
    }
})

router.get('/home/account', async (req, res, next) => {
    try {
        
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Unknown server error');
    }
});

router.post('/home/account/:id', async (req, res, next) => {
    try {
        
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Unknown server error');
    }
});

router.put('/home/account/:id', async (req, res, next) => {
    try {
        
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Unknown server error');
    }
});

router.delete('/home/account/:id', async (req, res, enxt) => {
    try {
        
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Unknown server error');
    }
});


module.exports = router;