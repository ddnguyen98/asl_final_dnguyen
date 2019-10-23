// creating a middleware
const protectedRoute = (req, res, next) => {
  // pull the loggedIn variable out of the session (default to false)
  const { loggedIn = false } = req.session;
  // if the user isn't logged in redirect them home
  if (!loggedIn) return res.redirect('/');
  // if the user is logged in go to the next middleware
  return next();
};

// export the middleware function
module.exports = protectedRoute;
