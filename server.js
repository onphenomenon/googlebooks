var express = require('express');

var app = express();

app.set('views', __dirname+'/views');
app.set('view engine', 'ejs');
require('./paths/middleware.js')(app, express);

app.set('port', process.env.PORT || 3000);
app.listen(app.get('port'));
//app.listen(3000);

var port = app.get('port');
var ip = "127.0.0.1";
console.log("Listening on http://"+ip+":"+port);

module.exports = app;
