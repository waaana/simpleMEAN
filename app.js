//To generate this, do a npm install express-generator and then express --ejs <name of the created folder>

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var passport = require('passport');
var session = require('express-session');
var LocalStrategy = require('passport-local').Strategy;
var bCrypt = require('bcrypt-nodejs');
var pug = require('pug');
require('./models/articles');
require('./models/users');
mongoose.connect('mongodb://localhost/articles')
var calculator = require('./calculator');

var api = require('./routes/api');
var index= require('./routes/index');
var authenticate = require('./routes/authenticate')(passport);

var configuration = require("./config");
var conf = new configuration();
console.log(conf.DB_URI);

var app = express();



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
// to use session module
app.use(session({secret: 'blabla'}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.get('/add', function (req, res, next){
  var x = parseInt(req.query.x);
  var y = parseInt(req.query.y);
  var sum = calculator.add(x, y);
  res.send({"sum": sum});
});

app.get('/subtract', function (req, res, next){
  var x = parseInt(req.query.x);
  var y = parseInt(req.query.y);
  var diff = calculator.subtract(x, y);
  res.send({"diff": diff});
});

// 2 lines added application level midleware
app.use(passport.initialize());
app.use(passport.session());

app.use('/', index);
app.use('/api', api);
app.use('/auth', authenticate)







var initPassport = require('./passport-initialize');
initPassport(passport);

app.use (function (req, res, next) {
  console.log('Request received');
  next();
})

app.get('/', function (req, res, next){
  res.end('Get request received');
});

app.post('/', function (req, res, next){
  res.end('post request received');
});

app.get('/user', function (req, res, next){
  res.end('Get user recieved');
});

app.post('/user/:id', function (req, res, next){
  res.end('User received with the param: ' + req.params.id);
});

app.get('*', function (req, res, next){
  res.end('None fullfilled');
});




// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
