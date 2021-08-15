const mongoose = require('mongoose');

const connectionSchema = new mongoose.Schema({
  id: { type: String, required: true },
  type: String,
  name: {
    value: String,
    position: {
      x: Number,
      y: Number,
    },
  },
  source: {
    id: String,
    port: String,
  },
  target: {
    id: String,
    port: String,
  },
  vertices: [
    {
      x: Number,
      y: Number,
    },
  ],
  policy: String,
  properties: {
    color: String,
    stroke: Number,
    decoration: {
      startpoint: String,
      endpoint: String,
    },
  },
});

module.exports = connectionSchema;
