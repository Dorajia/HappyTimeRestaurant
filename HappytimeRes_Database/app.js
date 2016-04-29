var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var passport = require('passport');

var routes = require('./routes/index');
var users = require('./routes/users');
var branchs = require('./routes/branchs');
var catalogs = require('./routes/catalogs');
var dishs = require('./routes/dishs');
var orders = require('./routes/orders');
var comments = require('./routes/comments');
var recommendations = require('./routes/recommendations');
var specials = require('./routes/specials');
var cart = require('./routes/carts');
var inventorys = require('./routes/inventorys');
var paycards = require('./routes/paycards');

var dbConfig = require('./db');

var app = express();

mongoose.connect(dbConfig.url, function(err) {
    if(err) {
        console.log('connection error', err);
    } else {
        console.log('connection successful');
    }
});

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize());

app.use('/', routes);
app.use('/user', users);
app.use('/branch', branchs);
app.use('/catalog',catalogs);
app.use('/dish',dishs);
app.use('/order',orders);
app.use('/comment',comments);
app.use('/special',specials);
app.use('/recommendation', recommendations);
app.use('/inventory', inventorys);
app.use('/cart',cart);
app.use('/paycard',paycards);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}


// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
