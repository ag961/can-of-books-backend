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
      BookModel.find((err, booksdb) => {
        response.send(booksdb);
      });
    });
  }
  catch (error) {
    response.status(500).send('database error!');
  }
};

module.exports = getBooks;
