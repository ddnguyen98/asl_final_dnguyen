const querystring = require('querystring');
const log = require('debug')('web:request');
const axios = require('axios');

const jwt = require('jsonwebtoken');
const { Users } = require('../models');

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
  const url = process.env.CALLBACK_URL;
  // make an API request to verify the code
  try {
    // make a request to slack for the access_token
    const { data } = await axios.get(
      'https://github.com/login/oauth/access_token',
      {
        headers: { Accept: 'application/json' },
        params: {
          client_id: process.env.CLIENT_ID,
          client_secret: process.env.CLIENT_SECRET,
          redirect_uri: url,
          code,
        },
      },
    );
    const userData = await axios.get(
      `https://api.github.com/user?access_token=${data.access_token}`,
      {
      },
    );
    const [user] = await Users.upsert({
      username: userData.data.email,
      access_token: data.access_token,
      name: userData.data.name,
      type: 'github',
    }, { returning: true });
    req.session.token = jwt.sign({ id: user.id }, process.env.SECRET);
    req.session.loggedIn = true;
    res.redirect('/profile');
  } catch (e) {
    // log the error
    error(e);
    // send an unauthorized response if something above fails to work.
    req.session.loggedIn = false;
    res.redirect('/');
  }
};
