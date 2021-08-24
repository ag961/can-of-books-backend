'use strict';

const BookModel = require('../models/books.js');

let addNewBook = async (obj) => {
  let newBook = new BookModel(obj);
  await newBook.save();
  return newBook;
}

module.exports = addNewBook;