const router = require('express').Router();
const Movie = require('../models/movie.model');

// Error Response function
const errorResponse = (res, error) => {
    return(
        res.status(500).json({
            error: error.message
        })
    )
} // helps us reduce our written code

//TODO POST - create
router.post('/', async (req, res) => {
    try {
        
        //1. Pull data from client (body)
        const { title, genre, rating, length, releaseYear } = req.body;

        //2. Create a new object using the Model
        const movie = new Movie({
            title, genre, rating, length, releaseYear
        });

        //3. Use mongoose method to save to MongoDB
        const newMovie = await movie.save();

        //4. Client response
        res.status(200).json({
            newMovie,
            message: `${newMovie.title} added to collection!`
        })

    } catch (err) {
        errorResponse(res, err);
    }
});

//TODO GET One - read
/* 
!   Challenge
        - By ID
        - Response should consider
            - If found
            - If no document found
        - Test the route within Postman
        
        Hint: Consider login within user.controller.js
        Docs: https://www.mongodb.com/docs/manual/reference/method/db.collection.findOne/
*/
router.get('/:id', async (req,res) => {
    try {
        const { id } = req.params;
        const getMovie = await Movie.findOne({_id: id});
        
        // console.log(getMovie)

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

//TODO GET All - read
/* 
!   Challenge
        - No special endpoint necessary
        - Response should consider
            - If found
            - not found
        - Test the route within Postman
        
        Docs: https://www.mongodb.com/docs/manual/reference/method/db.collection.find/
        
        Hint: parameters within method are optional
*/
router.get('/', async(req, res) => {
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

//TODO GET All by Genre - read
router.get('/genre/:genre', async (req, res) => {
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

        // const getMovies = await Movie.find({genre: genre})
        const getMovies = await Movie.find({genre: buildWord})
        // console.log(getMovies);

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

//TODO PATCH One - update
/* 
    Two ways:
        - PATCH
            - isn't meant to alter the complete document but individual values within it.
        - PUT
            - can work when updating one field within a document but may not be 100%. used mainly to alter the whole document.
*/
router.patch('/:id', async(req, res) => {
    try {
        
        //1. Pull value from paramter
        const { id } = req.params;

        //2. Pull data from the body
        const info = req.body;
        // console.log(info);

        //3. Use method to locate document based off ID and pass in new info.
        const returnOption = {new: true};

        const updated = await Movie.findOneAndUpdate({_id: id}, info, returnOption);
        // const updated = await Movie.findOneAndUpdate({_id: id}, info);
        // console.log(updated);

        //4. Respond to client.
        res.status(200).json({
            message: `${updated.title} Updated!`,
            updated
        });

    } catch (err) {
        errorResponse(res,err);
    }
});

//TODO DELETE One - delete
router.delete('/:id', async(req,res) => {
    try {
        //1. Capture ID
        const { id } = req.params;
        
        //2. Use delete method to locate and remove based off ID
        const deleteMovie = await Movie.deleteOne({_id: id});

        //3. Respond to client.
        deleteMovie.deletedCount ?
            res.status(200).json({message: 'Movie removed'}) :
            res.status(404).json({message: "No movie in collection"});

        // if(deleteMovie.deletedCount) {
        //     res.status(200).json({
        //         message: 'Movie removed'
        //     }) 
        // } else {
        //     res.status(404).json({
        //         message: "No movie in collection"
        //     })
        // }
        
    } catch (err) {
        errorResponse(res, err);
    }
})

module.exports = router;