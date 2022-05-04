const router = require('express').Router();
const passport = require('passport');
const mongoose = require('mongoose');
const User = require('../models/user.model');
require('dotenv').config();

const isAuth = require('./authMiddleware').isAuth;

function hasCircuitID(req, res, next) {
  if (req.query.id) next();
  else res.status(400).send("The circuit's ID was not provided");
}

/**
 * Grab the basic information of the user's circuits:
 * Name, Thumbnail, Timestamps, and ID
 */
router.get('/', isAuth, async (req, res) => {
  res.status(200).json(
    req.user._doc.circuits.map((circuit) => {
      // delete circuit.data;
      return circuit;
    }),
  );
});

/**
 * Add a new circuit to the user's collection
 */
router.post('/', isAuth, async (req, res) => {
  if (req.user.circuits.length >= process.env.MAX_CIRCUITS)
    return res
      .status(405)
      .send(`The limit of ${process.env.MAX_CIRCUITS} has been reached`);

  req.user.circuits.push(req.body);
  req.user.save();
  res.status(201).send('Circuit created');
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
    .then(() => res.status(200).send('Circuit updated'))
    .catch((err) => res.status(400).send(err));
});

/**
 * Delete a circuit by the given id
 */
router.delete('/', isAuth, hasCircuitID, async (req, res) => {
  req.user.circuits.pull(req.query.id);
  req.user.save();
  res.status(200).send('Circuit deleted (if it existed)');
});

module.exports = router;
