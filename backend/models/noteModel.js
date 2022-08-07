const mongoose = require("mongoose");

const noteSchema = mongoose.Schema({
  noteText: {
    type: String,
    required: true,
  },
  ticketID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Ticket",
    required: true,
  },
});

module.exports = mongoose.model("Note", noteSchema);
