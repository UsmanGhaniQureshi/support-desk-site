const express = require("express");
const {
  getAllNotesOfATicket,
  createNote,
  updateNote,
  deleteNote,
} = require("../controllers/noteController");

const router = express.Router();

router.get("/:ticketID", getAllNotesOfATicket);
router.post("/", createNote);
router.put("/:id", updateNote);
router.delete("/:id", deleteNote);

module.exports = router;
