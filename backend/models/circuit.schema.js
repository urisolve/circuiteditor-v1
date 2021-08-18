const mongoose = require('mongoose');
const schematicSchema = require('./schematic.schema');

const circuitSchema = new mongoose.Schema(
  {
    data: { type: schematicSchema, default: {} },
    name: { type: String, default: 'Untitled Circuit' },
    description: { type: String, default: '' },
    isStared: { type: Boolean, default: false },
    thumbnail: Buffer,
  },
  { timestamps: true },
);

module.exports = circuitSchema;
