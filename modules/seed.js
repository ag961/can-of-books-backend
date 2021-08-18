'use strict';

const mongoose = require('mongoose');
const BookModel = require('../models/books.js');
const addNewBook = require('./addNewBook');

let seedData = [
  {
    'title': 'Crime and Punishment',
    'description': 'depressing novel by a Russian author',
    'status': true,
    'email': 'reader@gmail.com',
  },
  {
    'title': 'Vinny the Pooh',
    'description': 'children\'s book',
    'status': true,
    'email': 'reader@gmail.com',
  },
  {
    'title': 'The Gofather',
    'description': 'novel about Italian-American Mafia',
    'status': true,
    'email': 'reader@gmail.com',
  }
];

let seed = async () => {

  let booksdb = await BookModel.find({});
  if (booksdb.length === 0) {
    seedData.map((book) => addNewBook(book));
  }
};


module.exports = seed;
