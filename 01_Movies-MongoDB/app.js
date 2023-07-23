//! IMPORTS
require('dotenv').config(); // connects our .env file to our complete project.
const express = require('express');
const app = express();
const PORT = process.env.PORT || 4000; // points to our environment file and puts the value of PORT from that variable into this PORT variable.
const log = console.log;
const mongoose = require('mongoose'); // used from node_modules
const MONGO = process.env.MONGO || process.env.MONGOB; // connection variable from .env
const users = require('./controllers/user.controller');
const movies = require('./controllers/movie.controller');

//! MIDDLEWARE
mongoose.connect(`${MONGO}/moviedb`); // connection middleware. Est. route and defining our Collection we are targeting.
//* Doesn't display until there is a document within the collection.

const db = mongoose.connection; // event listener to check if connected.
db.once("open", () => log(`Connected: ${MONGO}`)); // event listener to check connection.

app.use(express.json());

//! ROUTES
app.use('/user', users);
app.use('/movies', movies);


app.listen(PORT, () => log(`Movie Server running on Port: ${PORT}`));