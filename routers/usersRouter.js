const express = require('express');
const router = express.Router();

const usersBLL = require('../BLL/usersBLL');

router.get('/home', async (req, res, next) => {
    try {
        const response = await usersBLL.getAllMovies();
        if (!response) res.status(500).send('Unknown server error');

        res.status(response.status).send(response.message);
        next();
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Unknown server error');
    }
})

router.get('/home/account/', async (req, res, next) => {
    try {
        const userId = req.user._id;
        const response = await usersBLL.getUserMovies(userId);

        if (!response) res.status(500).send('Unknown server error');

        res.status(response.status).send(response.message);
        next();
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Unknown server error');
    }
});

router.post('/home/account', async (req, res, next) => {
    try {
        const movieObj = req.body;
        const response = await usersBLL.addMovie(movieObj);

        if (!response) res.status(500).send('Unknown server error');

        res.status(response.status).send(response.message);
        next();
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Unknown server error');
    }
});

router.put('/home/account/:id', async (req, res, next) => {
    try {
        const movieId = req.params.id;
        const updatedMovieData = req.body;

        const response = await usersBLL.updateMovie(movieId, updatedMovieData);
        if (!response) res.status(500).send('Unlnown server error');
        
        res.status(response.status).send(response.message);
        next();
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Unknown server error');
    }
});

router.delete('/home/account/:id', async (req, res, next) => {
    try {
        const movieId = req.params.id;

        const response = await usersBLL.deleteMovie(movieId);
        if (!response) res.status(500).send('Unlnown server error');

        res.status(response.status).send(response.message);
        next();
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Unknown server error');
    }
});



module.exports = router; 