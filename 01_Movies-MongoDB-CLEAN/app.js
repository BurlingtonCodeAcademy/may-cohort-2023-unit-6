//! IMPORTS
require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.PORT || 4000;
const log = console.log;
const mongoose = require('mongoose');
const MONGO = process.env.MONGO || process.env.MONGOB;
const users = require('./controllers/user.controller');
const movies = require('./controllers/movie.controller');

//! MIDDLEWARE
mongoose.connect(`${MONGO}/moviedb`);

const db = mongoose.connection;
db.once("open", () => log(`Connected: ${MONGO}`));

app.use(express.json());

//! ROUTES
app.use('/user', users);
app.use('/movies', movies);

app.listen(PORT, () => log(`Movie Server running on Port: ${PORT}`));