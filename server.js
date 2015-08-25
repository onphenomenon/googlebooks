var express = require('express');

var app = express();

process.env.NODE_ENV = process.env.NODE_ENV || 'development';
if(process.env.NODE_ENV === 'development') {
  var keys = require('./config.js');
  process.env.GOOGLE_CLIENT_ID = keys.GOOGLE_CLIENT_ID
  process.env.GOOGLE_CLIENT_SECRET = keys.GOOGLE_CLIENT_SECRET;
  process.env.MY_SQL = keys.MY_SQL;
}

app.set('views', __dirname+'/views');
app.set('view engine', 'ejs');
require('./paths/middleware.js')(app, express);

app.set('port', process.env.PORT || 3000);


app.listen(app.get('port'));
//app.listen(3000);

var port = app.get('port');
app.port = port;
console.log(app.port)

console.log("Listening on http://127.0.0.1:"+app.port);

module.exports = app;
