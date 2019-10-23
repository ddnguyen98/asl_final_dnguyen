// setting up a logger
const log = require('debug')('web:logging');
// get the express application
const app = require('./app');

// set the port to either the one passed from the environment variables or 3000
const port = process.env.PORT || 3000;
// spin up the server and log what port it is running on
app.listen(port, () => log(`WEB listening on port ${port}!`));
