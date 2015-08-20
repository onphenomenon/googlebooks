var bookshelf = require('../mySQL.js');
var Promise = require('bluebird');
var List = require('./list');


var User = bookshelf.Model.extend({
  tableName: 'users',
  hasTimestamps: true,

  lists: function() {
    return this.hasMany(List, 'google_id');
  },

});

module.exports = User;
