// pull in the express package
const express = require('express');
// add the logger
const error = require('debug')('web:error');
// middleware for sessions
const bodyParser = require('body-parser');

const expressSession = require('express-session');
// store for saving sessions
const FileStore = require('session-file-store')(expressSession);
// load in the axios middleware
// load in the protectedRoute middleware
const protectedRoute = require('./utils/protectedRoute');

const API = require('./utils/API');

// load routers

const loginRoute = require('./routes/auth');
const profileRoute = require('./routes/profile');

const app = express();
// session middleware
app.use(expressSession({
  // another secret used for encoding session data
  secret: process.env.SECRET,
  // should the session save again if nothing has changed?
  resave: false,
  // should sessions be created if they have no data?
  saveUninitialized: false,
  // where to store the session data
  store: new FileStore(),
}));

app.use((req, res, next) => {
  // pull the loggedIn state out of the session
  const { loggedIn = false } = req.session;
  // set it to locals (data passed to templates)
  res.locals.loggedIn = loggedIn;
  // go to the next middleware function
  next();
});


app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
// axios middleware
app.use(API);
// setting pug as the view engine
app.set('view engine', 'pug');
// set the view folder as the default place to render from
app.set('views', `${__dirname}/views`);

// setup routers
app.use('/', loginRoute);
app.use('/profile', protectedRoute, profileRoute);


// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  error('ERROR FOUND:', err);
  res.sendStatus(500);
});

// create an express app
// export the express app
module.exports = app;
