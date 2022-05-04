const mongoose = require('mongoose');

const labelSchema = require('./label.schema');
const portSchema = require('./port.schema');

const Mixed = mongoose.Schema.Types.Mixed;

const componentSchema = new mongoose.Schema(
  {
    id: { type: String, required: true },
    type: String,
    fullName: String,
    ports: [portSchema],
    position: {
      x: Number,
      y: Number,
      angle: Number,
    },
    label: labelSchema,
    properties: Mixed,
  },
  { _id: false },
);

module.exports = componentSchema;
