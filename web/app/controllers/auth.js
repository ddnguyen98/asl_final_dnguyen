const querystring = require('querystring');
const log = require('debug')('web:request');

exports.renderLogin = (req, res) => {
  res.render('login');
};

exports.redirectToGithub = (req, res) => {
  // the base url
  const GITHUB_URL = 'https://github.com/login/oauth/authorize?';
  const params = querystring.stringify({
    client_id: process.env.CLIENT_ID,
    redirect_uri: process.env.CALLBACK_URL,
    // get the basic info about the user and their email
    scope: 'user,user:email',
  });

  log(GITHUB_URL + params);
  res.redirect(GITHUB_URL + params);
};

exports.verifyGithubCode = async (req, res) => {
  // pull the code sent from slack out of the URL
  const { code } = req.query;
  // make an API request to verify the code
  const { token, loggedIn } = await req.API.post('/auth/github', { code, url: process.env.CALLBACK_URL });
  req.session.loggedIn = loggedIn;
  req.session.token = token;
  // go to the admin dashboard
  res.redirect('/profile');
};
