const mongoose = require('mongoose');

const MovieSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Movie name is required']
    },
    releaseDate: {
        type: String,
        required: [true, 'Release date is required']
    },
    producer: {
        type: String,
        required: [true, 'Producer name is required']
    },
    duration: {
        type: String,
        required: [true, 'Duration is required'],
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, {
    versionKey: false,
    strict: 'throw'
});

const Movie = mongoose.model("movie", MovieSchema, "movies");

module.exports = Movie; 