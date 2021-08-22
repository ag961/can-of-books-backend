'use strict';

const BookModel = require('../models/books.js');
const addNewBook = require('./addNewBook');


let createBook = (req, res) => {

  let newBook = new BookModel({
    'title': 'The Lord of the Rings',
    'description': 'a book about hobbits',
    'status': 'favorite',
    'email': 'gimranov45@gmail.com'
  });
  addNewBook(newBook);
  res.send('Added a book');
};

module.exports = createBook;
