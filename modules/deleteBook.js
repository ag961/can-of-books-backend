'use strict';

const jwt = require('jsonwebtoken');
const getKey = require('./getKey.js');
const BookModel = require('../models/books.js');

const deleteBook = (req, res) => {

  const token = req.headers.authorization.split(' ')[1];

  try {
    jwt.verify(token, getKey, {}, async function (err, user) {

      if (err) {
        res.status(500).send('invalid token');
      }

      let myId = req.params.id;
      let email = req.query.email;

      if (email === user.email) {
        try {
          let bookDeleted = await BookModel.findByIdAndDelete(myId);
          res.send(bookDeleted);
        } catch (err) {
          res.status(500).send(err)
          console.log(err);
        }

      } else {
        res.send('You are not who you say you are');
      }
    });
  } catch (error) {
    res.status(500).send('database error!');
  }
};

module.exports = deleteBook;
