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
const { authMiddleware } = require("../middlewares/auth");
router.get("/", authMiddleware, getTickets);
router.get("/:id", authMiddleware, getSingleTicket);
router.post("/", authMiddleware, createTicket);
router.put("/:id", authMiddleware, updateTicket);
router.put("/close/:id", authMiddleware, closeTicket);
router.delete("/:id", authMiddleware, deleteTicket);

module.exports = router;
