import passport from 'passport';
import bcrypt from 'bcrypt';
import { IUser, User } from '../models';
import { IVerifyOptions, Strategy as LocalStrategy } from 'passport-local';
import { Request } from 'express';
import { HydratedDocument } from 'mongoose';

type PassportMiddlewareDone = (
  error: any,
  user?: any,
  options?: IVerifyOptions,
) => void;

passport.serializeUser((user: HydratedDocument<IUser>, done) => {
  done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);

    done(null, user);
  } catch (error) {
    done(error);
  }
});

passport.use(
  'local-login',
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
    },
    async (email: string, password: string, done: PassportMiddlewareDone) => {
      await User.findOne({ email: email })
        .then(async (user: HydratedDocument<IUser>) => {
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

passport.use(
  'local-signup',
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
      passReqToCallback: true,
    },
    async (req: Request, email: string, password: string, done) => {
      await User.findOne({ email: email })
        .then(async (user: HydratedDocument<IUser>) => {
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
