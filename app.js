var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cors = require('cors');
var routes = require('./routes/index');
var users = require('./routes/users');
var dinners= require('./routes/dinners');
var guests= require('./routes/guests');
var app = express();

//Authentication packages
var session = require('express-session');
var passport = require('passport');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(cors());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: false
    })
);
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//Authentication app.use
app.use(session({
    secret: 'akjefmsdryosdlkf',
    resave: false,
    saveUninitialized: false,
    //cookie: { secure: true }
  }))

app.use(passport.initialize());
app.use(passport.session());

app.use('/', routes);
app.use('/users', users);
app.use('/dinners', dinners);
app.use('/guests', guests);
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