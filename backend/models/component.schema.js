const mongoose = require('mongoose');

const componentSchema = new mongoose.Schema({
  id: { type: String, required: true },
  type: String,
  ports: [
    {
      id: { type: String, requited: true },
      connection: String,
      type: String,
      position: {
        x: Number,
        y: Number,
      },
    },
  ],
  position: {
    x: Number,
    y: Number,
    angle: Number,
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
  frequency: {
    unit: String,
    value: Number,
  },
  phase: {
    unit: String,
    value: Number,
  },
  properties: {
    impedance: {
      unit: String,
      value: Number,
    },
    temperature: {
      unit: String,
      value: Number,
    },
    initial_value: {
      unit: String,
      value: Number,
    },
  },
});

module.exports = componentSchema;
