'use strict';

const jwt = require('jsonwebtoken');
const getKey = require('./getKey.js');
const BookModel = require('../models/books.js');

const createBook = (req, res) => {

  const token = req.body.headers.authorization.split(' ')[1];
  try {
    jwt.verify(token, getKey, {}, async function (err, user) {
      if (err) {
        res.status(500).send('invalid token');
      }

      let { title, description, status, email } = req.body.params;
      let newBook = { title, description, status, email };

      if (email === user.email) {

        let addedBook = new BookModel(newBook);
        await addedBook.save();
        res.send(addedBook);
      } else {
        res.send('You are not who you say you are');
      }

    });
  } catch (error) {
    res.status(500).send('database error!');
  }
};

module.exports = createBook;
