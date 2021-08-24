'use strict';

const BookModel = require('../models/books.js');
const addNewBook = require('./addNewBook');

let seedData = [
  {
    'title': 'Crime and Punishment',
    'description': 'depressing novel by a Russian author',
    'status': 'SEED',
    'email': 'gimranov45@gmail.com',
  },
  {
    'title': 'Vinny the Pooh',
    'description': 'children\'s book',
    'status': 'SEED',
    'email': 'gimranov45@gmail.com',
  },
  {
    'title': 'The Godfather',
    'description': 'novel about Italian-American Mafia',
    'status': 'SEED',
    'email': 'gimranov45@gmail.com',
  }
];

let seed = async (req, res) => {
  try {

    let booksdb = await BookModel.find({});
    if (booksdb.length === 0) {
      seedData.map((book) => addNewBook(book));
      res.send('Seeded three books');
    } else {
      res.send('Database is not empty. Didn\'t seed anything!');
    };
  }
  catch (err) {
    res.send('Database is not empty!')
  };
}

module.exports = seed;
