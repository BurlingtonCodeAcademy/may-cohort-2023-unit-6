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

## Bcrypt
- `npm i bcrypt`
- dependency that handles encryption of data.
  - Most commonly used for passwords (not limited)

## Encryption
- Plain text password are not secure when stored within the database.
- Allows for another layer of security (both user and db)

## Hashing
- An algorithm to change plain text into various characters.
  - practically impossible to turn hashed value back to original string. (not impossible)
- Encryption prior to storing in DB.
- No matter length of string, hash value is the same length.
  - like strings will result in the same hashed value.
  - **needs** `salting`

## Salting
- includes random strings within the plain text being hashed
- Makes for unpredictability for the hashed value
- We can denote the number of "salts"
  - Typically 10-13 interations

example code:
```js
bcrypt.hashSync("abc", 10);
```
- first param = password.
- second param = number of times the password will be salted.

## JWT
- JSON Web Token
- `npm i jsonwebtoken`
- A way for our server to authenticate the user.

```js
const token = jwt.sign({id: user._id}, "secret message", {expiresIn: 60*60*24});
```
- `sign(payload, message, options)`
  - 3 Arguments
    - payload
      - In this sample, we are using an object that details the user
    - encrypt/decrypt message
      - passed in as a string in the sample
      - Typically stored within the `.env` 
    - Options (expiration)
      - represents seconds or a string time span
        - ex: `"2 days"` or `"10h"`