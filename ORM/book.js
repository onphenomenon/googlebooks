var bookshelf = require('../mySQL.js');
var Promise = require('bluebird');
var List = require('./list');


var Book = bookshelf.Model.extend({
  tableName: 'books',
  hasTimestamps: true,

  list: function() {
    return this.belongsTo(List, 'list_id');
  },

});

module.exports = Book;
