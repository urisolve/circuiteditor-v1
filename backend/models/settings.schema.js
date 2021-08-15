const mongoose = require('mongoose');

const settingsSchema = new mongoose.Schema({
  darkMode: { type: Boolean, default: false },

  connections: {
    color: { type: String, default: '#808080' },
    stroke: { type: Number, default: 5 },
  },

  nodes: {
    color: { type: String, default: '#808080' },
    radius: { type: Number, default: 10 },
  },
});

module.exports = settingsSchema;
