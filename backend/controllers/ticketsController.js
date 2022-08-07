const asyncHanlder = require("express-async-handler");
const Ticket = require("../models/ticketModel");

//getting All tickets
const getTickets = asyncHanlder(async (req, res) => {
  const tickets = await Ticket.find();
  res.json(tickets);
});

//getting a Single ticket
const getSingleTicket = asyncHanlder(async (req, res) => {
  const ticket = await Ticket.findById(req.params.id);
  res.json(ticket);
});

// Creating A new Ticket
const createTicket = asyncHanlder(async (req, res) => {
  let ticket;
  if (req.body) {
    if (!req.body.product) {
      throw Error("You Need to Add Name Field");
    }

    const { name, email, product, comment } = req.body;

    ticket = await Ticket.create({ name, email, product, comment });
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
