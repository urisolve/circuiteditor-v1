const mongoose = require("mongoose");
const connectionSchema = require("./connection.schema");

const nodeSchema = new mongoose.Schema({
  id: { type: String, required: true },
  type: String,
  name: {
    value: String,
    position: {
      x: Number,
      y: Number,
    },
  },
  connections: [connectionSchema],
  value: {
    unit: String,
    value: Number,
  },
  position: {
    x: Number,
    y: Number,
  },
  policy: String,
  properties: {
    color: String,
    radius: Number,
  },
});

module.exports = nodeSchema;
