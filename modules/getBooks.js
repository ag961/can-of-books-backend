'use strict';

const jwt = require('jsonwebtoken');
const BookModel = require('../models/books.js');
const getKey = require('./getKey.js');

const getBooks = (request, response) => {
  const token = request.headers.authorization.split(' ')[1];

  try {
    jwt.verify(token, getKey, {}, function (err, user) {
      if (err) {
        response.status(500).send('invalid token');
      }
      let email = request.query.email;
      if (email === user.email) {

        BookModel.find({ email }, (err, booksdb) => {
          response.send(booksdb);
        });

      } else {
        response.send('you are not who you are');
      }
    });
  }
  catch (error) {
    response.status(500).send('database error!');
  }
};

module.exports = getBooks;
