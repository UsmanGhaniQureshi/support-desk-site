const express = require("express");
const router = express.Router();

const {
  closeTicket,
  getTickets,
  createTicket,
  deleteTicket,
  getSingleTicket,
  updateTicket,
} = require("../controllers/ticketsController");

router.get("/", getTickets);
router.get("/:id", getSingleTicket);
router.post("/", createTicket);
router.put("/:id", updateTicket);
router.put("/close/:id", closeTicket);
router.delete("/:id", deleteTicket);

module.exports = router;
