const router = require('express').Router();
const passport = require('passport');
const isAuth = require('./authMiddleware').isAuth;

/**
 * Simplifies the user object.
 *
 * Removes de hashed password field because hackers could use that
 * information to find out which encryption algorithm is being used.
 * Also removes the data of each circuit to save memory space.
 *
 * @param {*} req The HTTP request object.
 * @returns {*} The simplified user object.
 */
function simplifyUser(req) {
  // Grab the full user object
  const user = req.user._doc;

  // Delete the hashed password because hackers could use that information
  // to find out which encryption algorithm is being used.
  delete user.password;

  // Delete the circuit data to save memory
  user.circuits.forEach((circuit) => delete circuit.data);

  // Return the simplified user object
  return user;
}

/**
 * Grab user from cookie
 */
router.get('/', isAuth, (req, res) => {
  res.status(200).send(simplifyUser(req));
});

/**
 * LogIn
 */
router.post('/login', passport.authenticate('local-login'), (req, res) => {
  res.status(200).send(simplifyUser(req));
});

/**
 * SignUp
 */
router.post('/signup', passport.authenticate('local-signup'), (req, res) => {
  res.status(201).send('User created successfully');
});

/**
 * Logout
 */
router.get('/logout', (req, res) => {
  req.session.destroy(function (error) {
    res.clearCookie('connect.sid');
    res.redirect('/');
  });
});

module.exports = router;
