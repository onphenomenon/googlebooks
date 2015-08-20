var bookshelf = require('../mySQL.js');
var List = require('./list');

var Lists = new bookshelf.Collection();

Lists.model = List;

module.exports = Lists;
