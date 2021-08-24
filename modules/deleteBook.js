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
      console.log(myId);
      let email = req.query.email;
      console.log(email);
      if (email === user.email) {

        await BookModel.findByIdAndDelete(myId);
        res.send('Successfully deleted');
        console.log('deleted one');
        console.log(BookModel.find({}));
        

      } else {
        res.send('You are not who you say you are');
      }
    });
  } catch (error) {
    res.status(500).send('database error!');
  }


};

module.exports = deleteBook;
