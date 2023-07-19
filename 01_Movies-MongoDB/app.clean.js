//! IMPORTS
require('dotenv').config()

const express = require('express');
const app = express();
const mongoose = require('mongoose');
//* Controllers
const users = require('./controllers/user.controller');
//* Global variables
const PORT = process.env.PORT || 4000; 
const MONGO = process.env.MONGO || process.env.MONGOB;
//* QL
const log = console.log;

//! MIDDLEWARE
//* database connections
mongoose.connect(`${MONGO}/moviedb`);
const db = mongoose.connection;
db.once("open", () => log(`Connected: ${MONGO}`));

//* data handling
app.use(express.json());

//! ROUTES
app.use('/user', users)


app.listen(PORT, () => log(`Movie Server running on Port: ${PORT}`));