'use strict';

var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

// Unused node module
//var favicon = require('serve-favicon');

var routes = require('./routes/index');

var app = express();

// DB connection
require('./lib/connectMongoose');

//Loading the models
require('./models/Anuncio');

require('./models/Usuario');

require('./models/PushToken');

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

app.use('/', routes);

// API routes
app.use('/apiv1/anuncios', require('./routes/apiv1/anuncios'));
app.use('/usuarios', require('./routes/usuarios'));
app.use('/apiv1/tags', require('./routes/apiv1/tags'));
app.use('/pushtokens', require('./routes/apiv1/pushTokens'));
app.use('/pushtokens/auth', require('./routes/apiv1/pushTokensAuth'));

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
    app.use(function(err, req, res) {
        res.status(err.status || 500).json({ success: false, error: { message: err.message, error: err }});
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res) {
    res.status(err.status || 500).json({ success: false, error: { message: err.message, error: err }});
});

module.exports = app;
