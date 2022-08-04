const asyncHanlder = require("express-async-handler");
const Ticket = require("../models/ticketModel");

//getting All tickets
const getTickets = asyncHanlder(async (req, res) => {
  const tickets = await Ticket.find();
  res.json(tickets);
});

//getting All tickets
const getSingleTicket = asyncHanlder(async (req, res) => {
  res.json({
    message: "Getting Single Ticket " + req.params.id,
  });
});

// Creating A new Ticket
const createTicket = asyncHanlder(async (req, res) => {
    let ticket;
  if (req.body) {
    if (!req.body.text) {
      throw Error("You Need to Add Name Field");
    }

    const { text } = req.body;

    ticket = await Ticket.create({ text });
  }

  res.json(ticket);
});

// Update Ticket
const updateTicket = asyncHanlder(async (req, res) => {
  res.json({
    message: "Update Ticket " + req.params.id,
  });
});

// Delete Ticket
const deleteTicket = asyncHanlder(async (req, res) => {
  res.json({
    message: "Delete Ticket " + req.params.id,
  });
});
module.exports = {
  getTickets,
  getSingleTicket,
  createTicket,
  updateTicket,
  deleteTicket,
};
