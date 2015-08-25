var db = require('knex')({
  client: 'mysql',
  connection: {
    host: 'googlebooks.cfvhffrdjo1n.us-west-1.rds.amazonaws.com', // will change for deployment
    user: 'tigers',
    password: process.env.MY_SQL,
    database: 'books',// initials of our names
    // database: process.env.RDS_PORT,
    charset: 'utf8'
    // filename: path.join(__dirname, '../db/codeus.mysql')
  }
});

var bookshelf = require('bookshelf')(db);

db.schema.hasTable('users').then(function(exists) {
  if (!exists) {
    db.schema.createTable('users', function (user) {
      user.increments('user_id').primary();
      user.string('google_id');
      user.string('name', 255);
      // creates created & modified timestamp columns
      user.timestamps();
    }).then(function (table) {
      console.log('Created Table USERS', table);
    });
  }
});


db.schema.hasTable('books').then(function(exists) {
  if (!exists) {
    db.schema.createTable('books', function (book) {
      book.increments('book_id').primary();
      book.integer('list_id');
      book.string('title', 255);
      book.string('author', 255);
      book.timestamps();
    }).then(function (table) {
      console.log('Created Table BOOKS', table);
    });
  }
});
//association table for list and book
db.schema.hasTable('lists').then(function(exists) {
  if (!exists) {
    db.schema.createTable('lists', function (list) {
      list.increments('list_id').primary();
      list.string('name', 255);
      list.string('google_id') //.unsigned().inTable('users').references('user_id'); //foreign key, users table
      list.timestamps();
    }).then(function (table) {
      console.log('Created Table LISTS', table);
    });
  }
});

db.schema.hasTable('list_book_join').then(function(exists) {
  if (!exists) {
    db.schema.createTable('list_book_join', function (join) {
      join.increments('id').primary();
      join.integer('list_id') //.references('list_id').inTable('lists');
      join.integer('book_id') //.references('book_id').inTable('books');
      join.timestamps();
    }).then(function (table) {
      console.log('Created Table list_book_join', table);
    });
  }
});


module.exports = bookshelf;
