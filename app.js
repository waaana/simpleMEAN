//To generate this, do a npm install express-generator and then express --ejs <name of the created folder>

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
require('./models/articles');
mongoose.connect('mongodb://localhost/articles')

var api = require('./routes/api');
var index= require('./routes/index');

var app = express();



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', api);
app.use('/', index);

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
