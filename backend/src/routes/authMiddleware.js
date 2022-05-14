const HttpStatusCodes = require('http-status-enum').default;

module.exports.isAuth = (req, res, next) => {
  // If the user is authenticated allow passage
  if (req.isAuthenticated()) next();
  // If not, then send an 401 error message
  else
    res.status(HttpStatusCodes.UNAUTHORIZED).send('Login to use this resource');
};
