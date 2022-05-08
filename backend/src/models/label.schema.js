const mongoose = require('mongoose');

const labelSchema = new mongoose.Schema(
  {
    id: String,
    owner: String,
    name: String,
    value: String,
    unit: String,
    position: {
      x: Number,
      y: Number,
    },
    isValueHidden: Boolean,
    isNameHidden: Boolean,
  },
  { _id: false },
);

module.exports = labelSchema;
