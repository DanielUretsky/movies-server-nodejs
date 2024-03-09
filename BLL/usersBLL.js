const Movie = require('../models/movieModel');

const getAllMovies = async() => {
    try {
        const movies = await Movie.find({});
        return {status: 200, message: movies};
    } catch (err) {
       console.log(err.message);
       return {status: 500, messahe: 'Unknown server error'} 
    }
}

const addProduct = async() => {

}

const updateProduct = async() => {
    
}

const deleteProduct = async() => {
    
}

module.exports = {
    getAllMovies,
}
