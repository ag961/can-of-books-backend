'use strict';

require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Mongoose is connected');
});

const clear = require('./modules/clearDB.js');
const seed = require('./modules/seed.js');
const getBooks = require('./modules/getBooks');
const createBook = require('./modules/createBook');
const PORT = process.env.PORT || 3001;
const deleteBook = require('./modules/deleteBook');
const updateBook = require('./modules/updateBook');

app.use(cors());
app.use(express.json());

//-------------------routes-------------------------------//

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/books', getBooks) ;

app.get('/clear', clear);

app.get('/seed', seed);

app.post('/books', createBook);

app.delete('/books/:id', deleteBook);

app.put('/books/:id', updateBook);

//----------------------------------------------------------//

mongoose.connect('mongodb://127.0.0.1:27017/books', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => {
    console.log('Connected to the database');
  });

app.listen(PORT, () => console.log(`listening on ${PORT}`));
