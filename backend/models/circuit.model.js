const mongoose = require("mongoose");

const circuitSchema = new mongoose.Schema(
  {
    data: [Object],
    name: { type: String, default: "Untitled Circuit" },
    thumbnail: Buffer,
  },
  { timestamps: true }
);

module.exports = circuitSchema;
