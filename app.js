var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var userAgent = require('express-useragent');

var index = require('./routes/index');
var users = require('./routes/users');
var apiV1 = require('./routes/api_v1.js');
var db = require('./models/db_auth.js');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
// app.set('view engine', 'jsx');
// app.engine('jsx', require('express-react-views').createEngine());

// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(userAgent.express());

// app.use('/', index);
app.use('/users', users);

app.use('/api/v1', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});
app.use('/api/v1', apiV1);

// Documentation
const autoDocs = require('./autoDocs');
const docConfig = require('./apiDoc.config.js');
app.use('/api/v1/docs', autoDocs(docConfig));

// Research interface
const researchInterface = require('./routes/researchInterface');
// app.use('/interface', researchInterface);
app.use('/archiveInterface', researchInterface);

// Use sessions with management interface
var session = require('express-session');
const process = require('process');
app.use(session({
  secret: process.env.SESSION_SECRET || 'session_secret',
  resave: false,
  saveUninitialized: false
}));
var managementRouter = require('./routes/admin/management');
var managementAPI = require('./routes/admin/management_api');
var publicUI = require('./routes/admin/publicUI');
app.use('/admin/api', managementAPI);
app.use('/admin', managementRouter);
// app.use('/interface', publicUI);
app.use('/', publicUI);

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
  res.locals.error = req.app.get('env') === 'production' ? {} : err;

  // render the error page
  res.status(err.status || 500);
  res.render('pug/error', {error: err});
});

module.exports = app;
