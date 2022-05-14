const mongoose = require('mongoose');

const portSchema = new mongoose.Schema(
  {
    id: { type: String, requited: true },
    owner: String,
    connection: String,
    type: { type: String },
    position: {
      x: Number,
      y: Number,
    },
  },
  { _id: false },
);

module.exports = portSchema;
