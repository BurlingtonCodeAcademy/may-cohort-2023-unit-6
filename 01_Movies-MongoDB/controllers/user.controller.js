const router = require('express').Router();
const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const SECRET = process.env.JWT;

// const testingBcrypt = (password) => {
//     let encrypt = bcrypt.hashSync(password, 10);
//     console.log('Encrypt:', encrypt);
// }


/*
! CHALLENGE:
    - Add a boilerplate code for the controller
    - Create a POST method route ('/signup')
    - Make sure route is working
        - simple response of "Connected"
        - Test in Postman
    - full URL is:
        - localhost:4000/user/signup
*/
router.post('/signup', async (req, res) => {
    // res.send('Connected!')

    // testingBcrypt('myPassword');
    // testingBcrypt('myPassword');
    // testingBcrypt('myNewPassword');

    try {
        
        // Creating a new object based off the Model Schema
        const user = new User({
            firstName: req.body.first,
            lastName: req.body.last,
            email: req.body.email,
            // password: req.body.password,
            password: bcrypt.hashSync(req.body.password,13)
        });

        const newUser = await user.save(); // writes to database. Returns a response - this is why we need an "await"

        // const token = jwt.sign({id: newUser._id}, "My Secret Mesage", {expiresIn: "1 day"});
        const token = jwt.sign({id: newUser._id}, SECRET, {expiresIn: "1 day"});

        res.status(200).json({
            user: newUser,
            message: 'Success!',
            token
        })

    } catch (err) {
        res.status(500).json({
            error: err.message
        })
    }
});

router.post('/login', async (req,res) => {
    try {
        
        //*1. Capture data provided by user (body - req.body)
        // const email = req.body.email
        // const password = req.body.password
        const { email, password } = req.body

        //*2. Check database to see if email supplied exists.
        const user = await User.findOne({email: email});
        // A MongoDB method that accepts a query as an argument. Returns an instance of a document that matches.
        // console.log(user);
        
        //*3. If email exists, consider if passwords match.
        const passwordMatch = await bcrypt.compare(password, user.password); // returns a true/false value
        // compare(string, hashed)
        // console.log(passwordMatch)

        if(!user || !passwordMatch) throw new Error('Email or Password does not match');

        //*4. After verfied, provide a jwt (token).
        const token = jwt.sign({id: user._id}, SECRET, {expiresIn: "1 day"});

        //*5. Provide a response
        res.status(200).json({
            message: `Success!`,
            user, 
            token
        })

    } catch (err) {
        res.status(500).json({
            error: err.message
        })
    }
})

module.exports = router;