const mongoose = require('mongoose');

const connectToDB = () => {
    mongoose.connect('mongodb://127.0.0.1:27017/movies-nodejs')
        .then(() => console.log('Database OK.'))
        .catch(err => console.log(err));
}

module.exports = connectToDB;