const MovieModel = require('../models/movieModel');

const getAllMovies = async () => {
    try {
        const movies = await MovieModel.find({});
        return { status: 200, message: movies };
    } catch (err) {
        console.log(err.message);
        return { status: 500, message: 'Unknown server error' };
    }
}

const getUserMovies = async (userId) => {
    try {
        if (!userId) res.status(500).send('Unknown server error');
        const movies = await MovieModel.find({ user: userId });

        return { status: 200, message: movies };
    } catch (err) {
        console.log(err.message);
        return { status: 500, message: 'Unknown server error' };
    }
}

const addMovie = async (userId, movieObj) => {
    try {
        const movie = new MovieModel({ ...movieObj, user: userId });
        if (!movie) return { status: 500, message: 'Unknown server error' };

        await movie.save();
        return { status: 201, message: 'New movie added succesfully!' };
    } catch (err) {
        console.log(err.name);
        console.log(err.message);
        if (err.name === 'ValidationError') return { status: 400, message: err.message };
        if (err.name === 'StrictModeError') return { status: 400, message: 'Invalid data' };

        return { status: 500, message: 'Unknown server error' };
    }
}

const updateMovie = async (movieId, updatedMovieData) => {
    try {
        if(!movieId || !updatedMovieData) return { status: 500, message: 'Unknown server error' };
        const updatedMovie = await MovieModel.findByIdAndUpdate(
            movieId,
            updatedMovieData,
            {
                new: true,
                runValidators: true
            }
        );

        if (!updatedMovie) return { status: 500, message: 'Unknown server error' };

        return { status: 200, message: 'Movie updated succesfully!'};
    } catch (err) {
        console.log(err.name);
        console.log(err.message);
        if (err.name === 'ValidationError') return { status: 400, message: err.message };
        if (err.name === 'StrictModeError') return { status: 400, message: 'Invalid data' };

        return { status: 500, message: 'Unknown server error' };
    }
}

const deleteMovie = async (movieId) => {
    try {
        const deletedMovie = await MovieModel.findByIdAndDelete(movieId);
        if(!deletedMovie) return { status: 500, message: ' Unknown server error' };
        
        return { status: 200, message: 'Movie deleted succesfully'};
    } catch (err) {
        console.log(err.name);
        console.log(err.message);
        return { status: 500, message: 'Unknown server error' };
    }
}

module.exports = {
    getAllMovies,
    getUserMovies,
    addMovie,
    updateMovie,
    deleteMovie
}
