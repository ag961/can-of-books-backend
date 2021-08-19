'use strict';

const mongoose = require('mongoose');
const BookModel = require('../models/books.js');

const clear = async (req, res) => {
  try {
    await BookModel.deleteMany({});
    res.send('Cleared Database');
  } catch (error) {
    res.send('Clearing error');
  }
}

module.exports = clear;
