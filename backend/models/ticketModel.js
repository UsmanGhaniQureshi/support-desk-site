const mongoose = require("mongoose");

const ticketSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      require: true,
    },
    product: {
      type: String,
      required: [true, "Must Required This"],
      enum: ["iphone", "ipad", "macbook", "samsung", "others"],
    },
    comment: {
      type: String,
      required: [true, "Must Required This"],
    },
    status: {
      type: String,
      enum: ["new", "closed", "open"],
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
