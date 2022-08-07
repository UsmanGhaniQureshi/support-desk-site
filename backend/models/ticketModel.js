const mongoose = require("mongoose");

const ticketSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Must Required This"],
    },
    email: {
      type: String,
      required: [true, "Must Required This"],
    },
    product: {
      type: String,
      required: [true, "Must Required This"],
    },
    comment: {
      type: String,
      required: [true, "Must Required This"],
    },
    comment: {
      type: String,
      default: "new",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Ticket", ticketSchema);

// In order to register a New User i think the following steps must accomplished

// A user Modal => (name,password,tikcets array that refer the collection of Ticket)
// As in User Modal We have refer ticket collection so in the ticket table a new field that can be user id must also refer

// encrypt the password by using some hashing library
// store the encryted password in the DB collection instead of user enter string
