var oAuthController = require('./oAuthController.js');
var List = require('../ORM/list.js');
var Lists = require('../ORM/listscollection.js');
var User = require('../ORM/user.js');
var Book = require('../ORM/book.js');
var Books = require('../ORM/bookscollection.js');
//Passport for user authentication
var passport = require('passport');
module.exports = function(app, express) {

  //root route
  app.get('/login', function(req, res){
    console.log("index req.session ", req.session);
    console.log("index req.user ", req.user);
    console.log("index req.session.passport.user", req.session.passport.user)
    var books = undefined;

    if(req.user !== undefined) {
          Lists.reset().query('where', 'google_id', '=', req.user.id).fetch().then(function(lists) {
              console.log("personal lits", lists.models);

          res.render('index', { user: req.user, lists: lists.models, books: books });
          });
        } else {
          var models = undefined;
          res.render('pages/index', { user: req.user, lists: models, books: books });
      }



  });
  //POST user operations: NEW USER
  app.get('/auth/google', passport.authenticate('google', { scope: 'profile' }));

  app.get('/auth/google/callback',
    passport.authenticate('google', { failureRedirect: '/login' }),
    function(req, res) {

        console.log("index req.user ", req.user);
        var google_id = req.user.id
        console.log("google_id ", google_id);

        User.forge({name: req.user.displayName, google_id: google_id}).save().then(function(){
          console.log("USER CREATED")
        });
        console.log("Successful LOGIN YAY!");




        Lists.reset().query('where', 'google_id', '=', req.user.id).fetch().then(function(lists) {
          console.log("personal lits", lists.models);
          // res.send(200, links.models);
           var books = undefined;
          res.render('index', { user: req.user, lists: lists.models, books: books });
        });


  });
  //POST new LIST assocated with user. (protected authentication with google oAUTH)

  app.post('/auth/google/newList', oAuthController.ensureAuthenticated,
   function(req, res) {
    var google_id = req.user.id;
    var newlist = req.body.list;

    List.forge({name: newlist, google_id: google_id }).save().then(function(list){
      console.log("New list saved ", newlist);
    });

   Lists.reset().query('where', 'google_id', '=', req.user.id).fetch().then(function(lists) {
      console.log("personal lits", lists.models);
      // res.send(200, links.models);
      var books = undefined;
     res.render('partials/lists', {  lists: lists.models });
    });

  });
  //GET USER LISTS
    app.get('/auth/google/lists', oAuthController.ensureAuthenticated, function(req, res) {
        console.log("________________________________")
        console.log("HIT ROUTE! ");



    });
  //GET BOOKS FOR A LIST
    app.get('/auth/google/:list', oAuthController.ensureAuthenticated, function(req, res) {
      console.log("________________________________")
      console.log("HIT BOOKS ROUTE! ");
      console.log("LIst_id ", req.params.list );

       Books.reset().query('where', 'list_id', '=', req.params.list).fetch().then(function(books) {
          console.log("personal books", books.models);
          // res.send(200, links.models);
         res.render('index', { user: req.user, lists: lists.models, books: books.models });
        });


  });



  app.get('/userLists', function(req, res){
    console.log("login req.session ", req.session);
    console.log("login req.user ", req.user);
    console.log("login req.session.passport.user", req.session.passport.user)
    res.render('login', { user: req.user });
  });


  app.get('/logout', function(req, res){
    req.logout();
    res.redirect('/');
  });


}
