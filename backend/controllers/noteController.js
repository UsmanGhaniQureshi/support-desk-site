const asyncHandler = require("express-async-handler");
const Note = require("../models/noteModel");

// Getting all notes of a Single Ticket
const getAllNotesOfATicket = asyncHandler(async (req, res) => {
  const note = await Note.find({
    ticketID: req.params.ticketID,
  });
  res.json(note);
});

// Creating A New Note
const createNote = asyncHandler(async (req, res) => {
  let note;

  try {
    note = await Note.create(req.body);
  } catch (error) {
    res.json(error);
  }
  res.json(note);
});

// Updating the existing Note
const updateNote = asyncHandler(async (req, res) => {
  const noteExist = await Note.findOne({
    _id: req.params.id,
  });
  if (noteExist) {
    const updatedNoted = await Note.updateOne({
      ...req.body,
    });
    res.json(updatedNoted);
  } else {
    res.json({
      message: "Note not exist",
    });
  }
});

// Deleting A Single Note

const deleteNote = asyncHandler(async (req, res) => {
  await Note.deleteOne({
    _id: req.params.id,
  });

  res.json({
    message: "Note Deleted SuccessFully",
  });
});

module.exports = {
  getAllNotesOfATicket,
  createNote,
  updateNote,
  deleteNote,
};
