'use strict';

require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const jwt = require('jsonwebtoken');
const jwksClient = require('jwks-rsa');
const mongoose = require('mongoose');

const BookModel = require('./models/books.js');
const clear = require('./modules/clearDB.js');
const seed = require('./modules/seed.js');
// const addNewBook = require('./modules/addNewBook.js');

// this function comes directly from the jsonwebtoken docs
const client = jwksClient({
  // this url comes from your app on the auth0 dashboard 
  jwksUri: 'https://dev-kz5f83m7.us.auth0.com/.well-known/jwks.json'
});

app.use(cors());

const PORT = process.env.PORT || 3001;

// this function comes directly from the jsonwebtoken docs
function getKey(header, callback) {
  client.getSigningKey(header.kid, function (err, key) {
    const signingKey = key.publicKey || key.rsaPublicKey;
    callback(null, signingKey);
  });
}

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/test', (request, response) => {
  const token = request.headers.authorization.split(' ')[1];

  jwt.verify(token, getKey, {}, function (err, user) {
    if (err) {
      response.status(500).send('invalid token');
    }
    response.send(user);
    console.log(user);
  });
});

app.get('/books', async (req, res) => {
  try {
    let booksdb = await BookModel.find({});
    res.send(booksdb);
  }
  catch (error) {
    res.status(500).send('database error!');
  }
})

mongoose.connect('mongodb://127.0.0.1:27017/books', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => {
    console.log('Connected to the database');
    seed();  
  });  
  
  app.listen(PORT, () => console.log(`listening on ${PORT}`));

// clear();
