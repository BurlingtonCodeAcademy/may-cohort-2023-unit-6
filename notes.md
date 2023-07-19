# Traditional Databases

Database:
- Type:
  - Relational
    - tables
    - examples: SQL, PostgreSql, MySQL
  - Non-Relational
    - documents
    - examples: MongoDB, Apache Cassandra, Couchbase
- Collections of tables or documents
- Tables:
  - Primary Keys (ID)
  - Records: Data within rows of table
- Mongo
  - Database = Database
  - Collections = Tables
  - Documents = Records
    - stored as JSON
  - Is a **Document Data Store**

# MERN
- M: Mongo
  - database
- E: Express
  - server
- R: React
  - frontend
- N: Node
  - everything in between

# Express
- Need a `package.json` file
  - `npm init` || `npm init -y`
- Install Dependencies
  - Express: `npm i express`
  - Mongoose: `npm i mongoose`
    - package that connects to MongoDB
  - dotenv: `npm i dotenv`
  - **Note**:
    - We can install multiple dependencies at once
    - ex: `npm i express mongoose dotenv`
- Entry point within `package.json`
  - `index.js` || `app.js`
- `.gitignore`
  - ignore files/folders that shouldn't be in our repo (GitHub)
- Dev Dependencies
  - `npm install --save-dev nodemon`

# .env
- Contains constants that are specific for our environment
- Stores items that we don't want published
  - passwords, API keys, port numbers, deployment routes
- Should be added to `.gitignore`
- Should have a `sample` or `example` file to communicate with your team.

## Quick Note
- MongoDB Connection:
  - mongodb://localhost:27017/
  - OR
  - mongodb://127.0.0.1:27017/

## Mongo & Mongoose
- Need to connect to our database
  - Using **MongoDB Compass**
  - Stateful connection
```js
const mongoose = require('mongoose');
const MONGO = process.env.MONGO;

//MIDDLEWARE
mongoose.connect(`${MONGO}/moviedb`);

const db = mongoose.connection;
db.once("open", () => log(`Connected: ${MONGO}`));
```

# Models
- Define what our database collection will look like.
  - A schema for each object being created.
  - `mongoose` establishes our schema

```js
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        require: true,
    }
});

module.exports = mongoose.model('User', UserSchema);
```
```js
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