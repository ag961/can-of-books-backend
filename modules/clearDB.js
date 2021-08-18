'use strict';

const mongoose = require('mongoose');
const BookModel = require('../models/books.js');

async function clear(){
  try {
    await BookModel.deleteMany({});
    console.log('Cleared Database');
  } catch (error) {
    console.log('Clearing error');
  }
}

module.exports = clear;
