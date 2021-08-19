const mongoose = require('mongoose');
const componentSchema = require('./component.schema');
const nodeSchema = require('./node.schema');
const connectionSchema = require('./connection.schema');

const schematicSchema = new mongoose.Schema(
  {
    schematic: {
      components: [componentSchema],
      nodes: [nodeSchema],
      connections: [connectionSchema],
    },
  },
  { timestamps: true },
);

module.exports = schematicSchema;
