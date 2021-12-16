const mongoose = require('mongoose');
const connectionSchema = require('./connection.schema');

const nodeSchema = new mongoose.Schema(
  {
    id: { type: String, required: true },
    connections: [connectionSchema],
    type: String,
    position: {
      x: Number,
      y: Number,
    },
    label: {
      name: String,
      value: String,
      unit: String,
      position: {
        x: Number,
        y: Number,
      },
    },
    properties: {
      color: String,
      radius: Number,
    },
  },
  { _id: false },
);

module.exports = nodeSchema;
