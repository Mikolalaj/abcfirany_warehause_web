var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
var csrf = require('csurf');
var csrfProtection = csrf({ cookie: true });
const { camelize } = require('./utils');

var usersRouter = require('./routes/users');
var cuttingRouter = require('./routes/cutting');
var lacksRouter = require('./routes/lacks');
var productsRouter = require('./routes/products/products');
var productsPremadeRouter = require('./routes/products/premade');
var productsMeterRouter = require('./routes/products/meter');
var productsPillowRouter = require('./routes/products/pillows');
var productsTowelRouter = require('./routes/products/towels');

var app = express();

const jwt = require('express-jwt');
const jwtDecode = require('jwt-decode');

const attachUser = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ message: 'Błąd autoryzacji' });
  }

  const decodedToken = jwtDecode(token);

  if (!decodedToken) {
    return res.status(401).json({ message: 'Błąd autoryzacji' });
  }
  else {
    req.user = decodedToken;
    next();
  }
};

const checkJwt = jwt({
  secret: process.env.JWT_SECRET,
  algorithms: ['HS256'],
  issuer: 'api.abcfirany',
  audience: 'api.abcfirany',
  getToken: req => req.cookies.token
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(cors({ origin: true, credentials: true }));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/users', usersRouter);

app.use(csrfProtection);

app.get('/api/csrf-token', async function(req, res) {
  res.json({
    csrfToken: req.csrfToken()
  });
})

app.use(attachUser);
app.use(checkJwt);

app.use('/api/cutting', cuttingRouter);
app.use('/api/lacks', lacksRouter);

app.use('/api/products', productsRouter);
app.use('/api/products/premade', productsPremadeRouter);
app.use('/api/products/meter', productsMeterRouter);
app.use('/api/products/pillow', productsPillowRouter);
app.use('/api/products/towels', productsTowelRouter);

// change object keys to camelCase
app.use(function(req, res) {
  if (req.body) {
    res.send(camelize(req.body));
  }
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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
