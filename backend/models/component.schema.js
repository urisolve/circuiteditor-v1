const mongoose = require("mongoose");

const componentSchema = new mongoose.Schema({
  id: { type: String, required: true },
  type: String,
  name: {
    value: String,
    position: {
      x: Number,
      y: Number,
    },
  },
  value: {
    unit: String,
    value: Number,
  },
  position: {
    x: Number,
    y: Number,
    z: Number,
    angle: Number,
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
  ports: [
    {
      id: { type: String, requited: true },
      type: String,
      policy: String,
      position: {
        x: Number,
        y: Number,
      },
    },
  ],
});

module.exports = componentSchema;
