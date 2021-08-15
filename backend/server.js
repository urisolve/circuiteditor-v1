const express = require('express');
const session = require('express-session');
const morgan = require('morgan');

const passport = require('passport');
const local = require('./strategies/local');

const mongoose = require('mongoose');
const MongoStore = require('connect-mongo');

const cors = require('cors');
require('dotenv').config();

// Initialize the server
const app = express();
const port = process.env.PORT || 5000;

// Connect to the MongoDB database.
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});
mongoose.connection.once('open', () => {
  console.log('MongoDB database connection established successfully');
});
mongoose.set('useFindAndModify', false);

// Generic Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('tiny'));

// Session Middleware
app.use(
  session({
    secret: process.env.SESSION_SECRET, // Random Hash
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
      mongoUrl: process.env.MONGODB_URI,
      dbName: 'circuit-editor',
    }),
    cookie: {
      maxAge: 24 * 3600 * 1000, // 24 hours
    },
  }),
);

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

// Apply the API routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/circuits', require('./routes/circuits'));

// Listen to the port
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
