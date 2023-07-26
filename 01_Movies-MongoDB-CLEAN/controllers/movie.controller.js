const router = require('express').Router();
const Movie = require('../models/movie.model');
const validateSession = require('../middleware/validate-session');

const errorResponse = (res, error) => {
    return(
        res.status(500).json({
            error: error.message
        })
    )
}

router.post('/', validateSession, async (req, res) => {
    try {
        const { title, genre, rating, length, releaseYear } = req.body;

        const movie = new Movie({
            title, genre, rating, length, releaseYear,
            owner_id: req.user.id
        });

        const newMovie = await movie.save();

        res.status(200).json({
            newMovie,
            message: `${newMovie.title} added to collection!`
        })

    } catch (err) {
        errorResponse(res, err);
    }
});

router.get('/:id', validateSession, async (req,res) => {
    try {
        const { id } = req.params;
        const getMovie = await Movie.findOne({_id: id, owner_id: req.user._id});

        getMovie ?
            res.status(200).json({
                getMovie
            }) :
            res.status(404).json({
                message: `No movie found`
            })
        
    } catch (err) {
        errorResponse(res, err)
    }
})

router.get('/', validateSession, async(req, res) => {
    try {
        const getAllMovies = await Movie.find();

        getAllMovies ?
            res.status(200).json({
                getAllMovies
            }) :
            res.status(404).json({
                message: `No movies found`
            });

    } catch (err) {
        errorResponse(res, err);
    }
})

router.get('/genre/:genre',validateSession, async (req, res) => {
    try {
        
        const { genre } = req.params;
        let buildWord;

        if(genre) {
            for(let i = 0; i < genre.length; i++) {
                i === 0 ?
                    buildWord = genre[i].toUpperCase() :
                    buildWord += genre[i].toLowerCase();
            }
        }

        const getMovies = await Movie.find({genre: buildWord, owner_id: req.user._id})

        getMovies.length > 0 ?
            res.status(200).json({
                getMovies
            }) :
            res.status(404).json({
                message: `No movies found`
            })

    } catch (err) {
        errorResponse(res, err);
    }
})


router.patch('/:id', validateSession, async(req, res) => {
    try {

        const { id } = req.params;

        const filter = {_id: id, owner_id: req.user._id};
        console.log(filter);
        const info = req.body;

        const returnOption = {new: true};

        const updated = await Movie.findOneAndUpdate(filter, info, returnOption);

        if(!updated) throw new Error('Movie not owned by user')

        res.status(200).json({
            message: `${updated.title} Updated!`,
            updated
        });

    } catch (err) {
        errorResponse(res,err);
    }
});

router.delete('/:id', validateSession, async(req,res) => {
    try {
        const { id } = req.params;
        
        const deleteMovie = await Movie.deleteOne({_id: id, owner_id: req.user._id});

        deleteMovie.deletedCount ?
            res.status(200).json({message: 'Movie removed'}) :
            res.status(404).json({message: "No movie in collection"});
        
    } catch (err) {
        errorResponse(res, err);
    }
})

module.exports = router;