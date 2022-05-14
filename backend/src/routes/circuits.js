const router = require('express').Router();
const passport = require('passport');
const mongoose = require('mongoose');
const HttpStatusCodes = require('http-status-enum').default;
const User = require('../models/user.model');
require('dotenv').config();

const isAuth = require('./authMiddleware').isAuth;

const constants = require('../constants/constants');

function hasCircuitID(req, res, next) {
  if (req.query.id) next();
  else
    res
      .status(HttpStatusCodes.BAD_REQUEST)
      .send("The circuit's ID was not provided");
}

/**
 * Grab the basic information of the user's circuits:
 * Name, Thumbnail, Timestamps, and ID
 */
router.get('/', isAuth, async (req, res) => {
  res.status(HttpStatusCodes.OK).json(
    req.user._doc.circuits.map((circuit) => {
      delete circuit.schematic;
      return circuit;
    }),
  );
});

/**
 * Add a new circuit to the user's collection
 */
router.post('/', isAuth, async (req, res) => {
  if (req.user.circuits.length >= constants.MAX_CIRCUITS)
    return res
      .status(HttpStatusCodes.FORBIDDEN)
      .send(`The limit of ${constants.MAX_CIRCUITS} circuits has been reached`);

  req.user.circuits.push(req.body);
  req.user.save();

  res.status(HttpStatusCodes.CREATED).send('Circuit created');
});

/**
 * Update a circuit by the given id
 */
router.patch('/', isAuth, hasCircuitID, async (req, res) => {
  await User.updateOne(
    { 'circuits._id': mongoose.Types.ObjectId(req.query.id) },
    {
      $set: {
        'circuits.$.schematic': req.body.schematic,
        'circuits.$.name': req.body.name,
        'circuits.$.description': req.body.description,
        'circuits.$.isStared': req.body.isStared,
        'circuits.$.thumbnail': req.body.thumbnail,
      },
    },
    {
      omitUndefined: true,
      timestamps:
        req.body.timestamps !== undefined ? req.body.timestamps : true,
    },
  )
    .then(() => res.status(HttpStatusCodes.OK).send('Circuit updated'))
    .catch((error) => res.status(HttpStatusCodes.BAD_REQUEST).send(error));
});

/**
 * Delete a circuit by the given id
 */
router.delete('/', isAuth, hasCircuitID, async (req, res) => {
  req.user.circuits.pull(req.query.id);
  req.user.save();
  res.status(HttpStatusCodes.OK).send('Circuit deleted (if it existed)');
});

module.exports = router;
