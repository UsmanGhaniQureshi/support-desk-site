const mongoose = require("mongoose");

const noteSchema = mongoose.Schema(
  {
    noteText: {
      type: String,
      required: true,
    },
    ticketID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Ticket",
      required: true,
    },
    noteText: {
      type: String,
      required: true,
    },
  },
  { timesstamp: true }
);

module.exports = mongoose.model("Note", noteSchema);
