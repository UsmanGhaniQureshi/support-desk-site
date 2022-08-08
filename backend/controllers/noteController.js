const asyncHandler = require("express-async-handler");
const Note = require("../models/noteModel");

// Getting a Single Note
const getSingleNote = asyncHandler(async (req, res) => {
  const note = await Note.findById(req.params.id);
  res.json(note);
});

// Creating A New Note
const createNote = async (req, res) => {
  let newTicket;
  try {
    newTicket = await Note.create({
      ...req.body,
    });
  } catch (error) {
    res.json(error);
  }
  res.json(newTicket);
};

// Updating the existing Note
const updateNote = async (req, res) => {
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
};

// Deleting A Single Note

const deleteNote = async (req, res) => {
  await Note.deleteOne({
    _id: req.params.id,
  });

  res.json({
    message: "Note Deleted SuccessFully",
  });
};

module.exports = {
  getSingleNote,
  createNote,
  updateNote,
  deleteNote,
};
