import { AuthRouter, CircuitsRouter } from './routes';
import cors from 'cors';
import express from 'express';
// import local from './auth/local';
import MongoStore from 'connect-mongo';
import morgan from 'morgan';
import mongoose from 'mongoose';
import passport from 'passport';
import session from 'express-session';

require('dotenv-flow').config();

// Initialize the server
const app = express();
const port = process.env.PORT ?? 5000;

// Connect to the MongoDB database.
const mongoUrl = `mongodb+srv://${process.env.DATABASE_USER}:${process.env.DATABASE_PASS}@${process.env.DATABASE_CLUSTER}`;
mongoose.connect(mongoUrl);
mongoose.connection.once('open', () => {
  console.log('MongoDB database connection established successfully');
});

// Generic Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('tiny'));

// Session Middleware
app.use(
  session({
    cookie: { maxAge: 24 * 3600 * 1000 },
    resave: false,
    saveUninitialized: true,
    secret: process.env.SESSION_SECRET,
    store: MongoStore.create({ mongoUrl, dbName: 'circuit-editor' }),
  }),
);

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

// Apply the API routes
app.use('/api/auth', AuthRouter);
app.use('/api/circuits', CircuitsRouter);

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
