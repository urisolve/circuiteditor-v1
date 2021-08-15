const LocalStrategy = require('passport-local');
const passport = require('passport');
const bcrypt = require('bcrypt');
const User = require('../models/user.model');

/**
 * Serialize and Deserialize the user from the session store
 */
passport.serializeUser((user, done) => {
  done(null, user._id);
});
passport.deserializeUser(async (id, done) => {
  await User.findById(id)
    .then((user) => done(null, user))
    .catch((error) => done(error));
});

/**
 * LogIn
 */
passport.use(
  'local-login',
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
    },
    async (email, password, done) => {
      await User.findOne({ email: email })
        .then(async (user) => {
          // Validate email
          if (!user)
            return done(null, {
              status: false,
              message: 'Incorrect credentials',
            });

          // Validate the password
          const validPassword = await bcrypt.compare(password, user.password);
          if (!validPassword)
            return done(null, {
              status: false,
              message: 'Incorrect credentials',
            });

          // Return the user
          return done(null, user);
        })
        .catch((error) => done(error));
    },
  ),
);

/**
 * SignUp
 */
passport.use(
  'local-signup',
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
      passReqToCallback: true,
    },
    async (req, email, password, done) => {
      await User.findOne({ email: email })
        .then(async (user) => {
          // If the user already exists
          if (user) {
            return done(null, {
              status: false,
              message: 'E-mail already registered',
            });
          }

          // Create a new user with the received data
          const newUser = new User(req.body);

          // Hash the password
          const salt = await bcrypt.genSalt(10);
          newUser.password = await bcrypt.hash(password, salt);

          // Save the user to the database
          await newUser
            .save()
            .then(() => done(null, newUser))
            .catch((error) => done(error));
        })
        .catch((error) => done(error));
    },
  ),
);
