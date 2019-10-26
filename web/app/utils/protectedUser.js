const jwt = require('jsonwebtoken');
// creating a middleware
const protectedUser = (req, res, next) => {
  // get the token out of the header
  const { token } = req.session;
  console.log(token);
  try {
    // pull the id out of the token using the secret
    const { id } = jwt.verify(token, process.env.SECRET);
    // set the userId so that we can use it later
    req.userId = id;
    // if the user is logged in go to the next middleware
    return next();
  } catch (e) {
    const  token  = req.headers;
    // if there is an error decoding the token send an unauthorized response
    return res.json({ token });
  }
};

// export the middleware function
module.exports = protectedUser;