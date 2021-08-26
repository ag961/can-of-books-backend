'use strict';

const BookModel = require('../models/books.js');
const addNewBook = require('./addNewBook');

let seedData = [
  {
    'title': 'Don Quixote',
    'description': 'Alonso Quixano, a retired country gentleman in his fifties, lives in an unnamed section of La Mancha with his niece and a housekeeper. He has become obsessed with books of chivalry, and believes their every word to be true, despite the fact that many of the events in them are clearly impossible. Quixano eventually appears to other people to have lost his mind from little sleep and food and because of so much reading.',
    'status': 'SEED',
    'email': 'gimranov45@gmail.com',
  },
  {
    'title': 'War and Peace',
    'description': 'Epic in scale, War and Peace delineates in graphic detail events leading up to Napoleon\'s invasion of Russia, and the impact of the Napoleonic era on Tsarist society, as seen through the eyes of five Russian aristocratic families.',
    'status': 'SEED',
    'email': 'gimranov45@gmail.com',
  },
  {
    'title': 'The Divine Comedy',
    'description': 'Belonging in the immortal company of the great works of literature, Dante Alighieri\'s poetic masterpiece, The Divine Comedy, is a moving human drama, an unforgettable visionary journey through the infinite torment of Hell, up the arduous slopes of Purgatory, and on to the glorious realm of Paradise — the sphere of universal harmony and eternal salvation.',
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
