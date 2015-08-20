var bookshelf = require('../mySQL.js');
var User = require('./user');

var List = bookshelf.Model.extend({
  tableName: 'lists',
  hasTimestamps: true,

  user: function() {
    return this.belongsTo(User, 'google_id');
  }
});

module.exports = List;
