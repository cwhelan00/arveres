const HOST = 'http://www.myarveres.com';
const AUTH_ROUTE = '/auth/google'
const RETURN_URL = AUTH_ROUTE + '/return';
const REALM = HOST;
const SUCCESS_URL = '/';
const FAILURE_URL = '/login';

// var urls = require('urls');
var passport = require('passport');
//var User = require('../dao/user.js');
var GoogleStrategy = require('passport-google').Strategy;
var LocalStrategy = require('passport-local').Strategy;

passport.use(new GoogleStrategy(
  {
    returnURL: HOST + RETURN_URL,
    realm: REALM
  },
  function(identifier, profile, done){
    User.findOrCreate({ openId: identifier }, function(err, user){
      done(err, user);
    });
  }
));

passport.use(new LocalStrategy(
  function(username, password, done){
    User.findOne(/*whatever inputs needed for User*/, function(err, user){
      if(err){
        return done(err);
      }
      if(!user){
        return done(null, false, {message: "Username not found"});
      }
      if(/*check that user's password matches entry in db for username*/){
        return done(null, false, {message: "Incorrect password"});
      }

      return done(null, user);
    });
  }
));

//--this code belongs in a router file--------------------------
//send user here to authenticate them
app.get(AUTH_ROUTE, passport.authenticate('google'));

//google will send the user back here after authentication
app.get(RETURN_URL, passport.authenticate('google', { successRedirect: SUCCESS_URL, failureRedirect: FAILURE_URL }));
