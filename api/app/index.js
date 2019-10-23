// load in the imports
const error = require('debug')('api:error');
const express = require('express');
const bodyParser = require('body-parser');
const morganDebug = require('morgan-debug');
// import the protect middleware

const authRouter = require('./routes/auth');
const entryRouter = require('./routes/entrys');


// create an express app
const app = express();
app.use(bodyParser.json());
app.use(morganDebug('api:request', 'dev'));

app.use('/auth', authRouter);
app.use('/entrys', entryRouter);

// four params are required to mark this as a error handling middleware
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  error('ERROR FOUND:', err);
  res.sendStatus(500);
});

// export the express app
module.exports = app;
