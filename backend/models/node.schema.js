const mongoose = require('mongoose');

const labelSchema = require('./label.schema');

const nodeSchema = new mongoose.Schema(
  {
    id: { type: String, required: true },
    connections: [String],
    type: String,
    position: {
      x: Number,
      y: Number,
    },
    label: labelSchema,
    properties: {
      color: String,
      radius: Number,
    },
  },
  { _id: false },
);

module.exports = nodeSchema;
