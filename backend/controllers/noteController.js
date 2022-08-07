const asyncHandler = require("express-async-handler");
const Ticket = require("../models/ticketModel");

const getNote = async (req, res) => {
  const noteID = req.params.id;
  let note;
  try {
    note = await Ticket.findById(noteID);

    res.json(note);
  } catch (error) {
    res.json(error);
  }
};
