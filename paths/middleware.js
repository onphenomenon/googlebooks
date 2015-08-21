var morgan = require('morgan'),
 session = require('express-session'),
 partials = require('express-partials');
 methodOverride = require('method-override'),
 passport = require('passport'),
 cookieParser = require('cookie-parser'),
 bodyParser  = require('body-parser'),
 keys = require('../config.js'),
 db = require('../mySQL.js');
 cors = require('express-cors');

module.exports = function(app, express) {

  var authRouter = express.Router();

  app.use(morgan('dev'));
  app.use(methodOverride('X-HTTP-Method-Override'));

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({extended: true}));
  app.use(partials());

  sessionOpts = {
    secret: 'kari',
    saveUninitialized: true,
    resave: true,
    cookie: { maxAge: null }
  }
  app.use(cookieParser());
  // app.use(cookieParser(keys.session.secret));

  app.use(session(sessionOpts));

  console.log(session);
  console.log(session.Cookie)

  app.use(passport.initialize());
  app.use(passport.session());

  app.use(cors({
    allowedOrigins: [
        'http://127.0.0.1:3000'
    ]
}))

  app.use(authRouter);

  require('../oAuth/oAuthRoutes.js')(authRouter);


}
