const axios = require('axios');
const errorLog = require('debug')('web:error');

const api = (req, res, next) => {
  // set the base url
  const API = axios.create({
    baseURL: process.env.API_URL || 'http://localhost:4000',
  });

  // make it so only data is returned from the response and error handling
  API.interceptors.response.use(
    (response) => (response ? response.data : {}),
    (error) => {
      // TODO: handle errors from the API
      errorLog(error);
    },
  );

  // for each api request going out
  API.interceptors.request.use(async (config) => {
    // pull the token out of the session
    const { token } = req.session;
    // if there is no token do nothing
    if (!token) return config;
    // if there is a token, set a header for any request that contains the token
    return {
      ...config,
      headers: { common: { token } },
    };
  });

  req.API = API;
  next();
};
module.exports = api;
