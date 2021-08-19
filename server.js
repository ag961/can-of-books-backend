'use strict';

require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');

const clear = require('./modules/clearDB.js');
const seed = require('./modules/seed.js');
const getBooks = require('./modules/getBooks');

app.use(cors());

const PORT = process.env.PORT || 3001;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/books', getBooks) ;

app.get('/clear', clear);

app.get('/seed', seed);

mongoose.connect('mongodb://127.0.0.1:27017/books', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => {
    console.log('Connected to the database');
  });

app.listen(PORT, () => console.log(`listening on ${PORT}`));


