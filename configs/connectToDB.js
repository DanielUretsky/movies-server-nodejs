const mongoose = require('mongoose');

const connectToDB = () => {
    mongoose.connect(`${process.env.MONGODB_URI}`)
        .then(() => console.log('Database OK.'))
        .catch(err => console.log(err));
}

module.exports = connectToDB;  