const mongoose = require('mongoose');
const circuitSchema = require('./circuit.schema');
const settingsSchema = require('./settings.schema');

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    mechNumber: { type: Number, required: true },
    institution: { type: String, required: true, trim: true },
    password: { type: String, required: true },
    settings: settingsSchema,
    circuits: [circuitSchema],
  },
  { timestamps: true },
);

module.exports = mongoose.model('User', userSchema);
