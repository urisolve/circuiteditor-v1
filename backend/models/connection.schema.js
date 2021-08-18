const mongoose = require('mongoose');

const connectionSchema = new mongoose.Schema({
  id: { type: String, required: true },
  start: { type: String, required: true },
  end: { type: String, required: true },
  type: { type: String, default: 'grid' },
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
    stroke: Number,
    decoration: {
      startPoint: String,
      endPoint: String,
    },
  },
});

module.exports = connectionSchema;
