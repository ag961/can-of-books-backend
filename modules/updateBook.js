'use strict';

const jwt = require('jsonwebtoken');
const getKey = require('./getKey');
const BookModel = require('../models/books');

const updateBook = (req, res) => {
  
  const token = req.body.headers.authorization.split(' ')[1];

  try {
    jwt.verify(token, getKey, {}, async function (err, user) {

      if (err) {
        res.status(500).send('invalid token')
      }

      let myId = req.params.id;
      let { title, description, status, email } = req.body.params;

      if (email === user.email) {
        await BookModel.findByIdAndUpdate(myId, { title, description, status, email }, { new: true, overwrite: true });
        res.send('updated a book');
      } else {
        res.send('You are not who you say you are')
      }
    })

  } catch (err) {
    res.status(500).send('couldn\'t update a book in database');
  }
};

module.exports = updateBook;
