const mongoose = require('mongoose');
const schematicSchema = require('./schematic.schema');

const emptySchematic = { components: [], nodes: [], connections: [] };

const circuitSchema = new mongoose.Schema(
  {
    data: { type: schematicSchema, default: emptySchematic },
    name: { type: String, default: 'Untitled Circuit' },
    description: { type: String, default: '' },
    isStared: { type: Boolean, default: false },
    thumbnail: Buffer,
  },
  { timestamps: true },
);

module.exports = circuitSchema;
