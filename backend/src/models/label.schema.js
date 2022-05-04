const mongoose = require('mongoose');

const labelSchema = new mongoose.Schema(
  {
    id: String,
    name: String,
    value: String,
    unit: String,
    position: {
      x: Number,
      y: Number,
    },
    isValueHidden: Boolean,
    isNameHidden: Boolean,
    owner: String,
  },
  { _id: false },
);

module.exports = labelSchema;
