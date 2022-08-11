const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name Is required"],
    },
    email: {
      type: String,
      required: [true, "Name Is required"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Password Must require"],
    },
    isAdmin: {
      type: Boolean,
      require: true,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
