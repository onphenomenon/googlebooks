var passport = require('passport'),
GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var keys = require('../config.js');

var GOOGLE_CLIENT_ID = keys.GOOGLE_CLIENT_ID
var GOOGLE_CLIENT_SECRET = keys.GOOGLE_CLIENT_SECRET;

// Passport session setup.
//   To support persistent login sessions, Passport needs to be able to
//   serialize users into and deserialize users out of the session.  Typically,
//   this will be as simple as storing the user ID when serializing, and finding
//   the user by ID when deserializing.  However, since this example does not
//   have a database of user records, the complete Intuit profile is
//   serialized and deserialized.
passport.serializeUser(function(user, done) {
  console.log("Passport Serialize: ", user);
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  console.log("Passport Deserialize: ", user);
  done(null, user);
});

// Use the IntuitStrategy within Passport.
//   Strategies in passport require a `verify` function, which accept
//   credentials (in this case, a token, tokenSecret, and Intuit profile), and
//   invoke a callback with a user object.
passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "http://127.0.0.1:3000/auth/google/callback"
  },
 function(accessToken, refreshToken, profile, done) {
   console.log("Profile in controller ", profile);
    // User.findOrCreate({ googleId: profile.id }, function (err, user) {
    //   return done(err, user);
    // });
    return done(null, profile);
  }
));;

module.exports = {
  ensureAuthenticated: function(req, res, next) {
    console.log("Checking isAuthenticated");

    if (req.isAuthenticated()) { console.log("Passport middleware, isAuthenticated");  return next(); }
    console.log("is not authenticated");
    res.redirect('/login')
  }
}
