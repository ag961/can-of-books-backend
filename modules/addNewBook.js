'use strict';

const mongoose = require('mongoose');

const BookModel = require('../models/books.js');

let addNewBook = async (obj) => {
  let newBook = new BookModel(obj);
  await newBook.save();
}

module.exports = addNewBook;