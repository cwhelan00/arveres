/**
 * @module arveres/app
 */

'use strict';

// basic express modules
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');

// view engine modules
var exphbs = require('express-handlebars');

// authentication
var passport = require('passport');
var session = require('express-session');
var flash = require('connect-flash');

// handlers
var ErrorHandler = require('./handlers/error');
var IndexHandler = require('./handlers/index');
var AuctionsHandler = require('./handlers/auctions');
var UserHandler = require('./handlers/user');

// routers
var indexRouter = require('./routes/index')(IndexHandler);
var auctionsRouter = require('./routes/auctions')(AuctionsHandler);
var userRouter = require('./routes/user')(UserHandler);

var app = express();

// set view engine
app.set('views', path.join(__dirname, 'views'));
app.engine('html', exphbs({defaultLayout: 'layout', extname: '.html'}));
app.set('view engine', '.html');
/*app.get('/search/auctions',function(req,res){
	res.render('auctions');
});*/

// set basic properties
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/auctions', express.static(path.join(__dirname, 'public')));
app.use('/user', express.static(path.join(__dirname, 'public')));

app.post('/myform', function(req, res){ 
    var myText = req.body.itemName; //mytext is the name item of your input box
    res.send('You sent the name "' + req.body.mytext + '".'); 
	console.log(myText);
}); 
// set passport
app.use(session({
  secret: 'whysosalty',
  saveUninitialized: true,
  resave: true
}));

// well put this back once passport is worked out
//app.use(passport.initialize());
//app.use(passport.session());
//app.use(flash());

// set routes
app.use('/', indexRouter);
app.use('/auctions', auctionsRouter);//auctions
app.use('/user', userRouter);

// set error handlers
app.use(ErrorHandler.pageNotFound);
app.use(ErrorHandler.handlePageError);

module.exports = app;
