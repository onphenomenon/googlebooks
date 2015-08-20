var bookshelf = require('../mySQL.js');
var Book = require('./list');

var Books = new bookshelf.Collection();

Books.model = Book;

module.exports = Books;
