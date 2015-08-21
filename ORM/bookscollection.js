var bookshelf = require('../mySQL.js');
var Book = require('./book');

var Books = new bookshelf.Collection();

Books.model = Book;

module.exports = Books;
