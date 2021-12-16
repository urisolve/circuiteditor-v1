const mongoose = require('mongoose');

/**
 * Subject to change
 */
const settingsSchema = new mongoose.Schema(
  {
    darkMode: { type: Boolean, default: false },
    connections: {
      color: { type: String, default: '#808080' },
      stroke: { type: Number, default: 5 },
    },
    nodes: {
      color: { type: String, default: '#808080' },
      radius: { type: Number, default: 10 },
    },
  },
  { _id: false },
);

module.exports = settingsSchema;
