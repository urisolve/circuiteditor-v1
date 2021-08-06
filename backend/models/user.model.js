const mongoose = require("mongoose");
const circuitSchema = require("./circuit.model");
const settingsSchema = require("./settings.schema");

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
    number: { type: Number, required: true },
    institution: { type: String, required: true, trim: true },
    password: { type: String, required: true },

    settings: { type: settingsSchema, default: () => ({}) },
    circuits: [circuitSchema],
  },
  { timestamps: true }
);

/**
 * Calculates the user's full name.
 *
 * @returns {String} the user's full name.
 */
userSchema.methods.fullName = function () {
  return `${this.fullName} ${this.lastName}`;
};

module.exports = mongoose.model("User", userSchema);
