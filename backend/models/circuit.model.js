const mongoose = require('mongoose');

const circuitSchema = new mongoose.Schema(
  {
    data: [Object],
    name: { type: String, default: 'Untitled Circuit' },
    isStared: { type: Boolean, default: false },
    thumbnail: Buffer,
  },
  { timestamps: true },
);

module.exports = circuitSchema;
