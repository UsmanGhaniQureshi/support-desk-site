const asyncHanlder = require("express-async-handler");
const Ticket = require("../models/ticketModel");
const User = require("../models/userModel");

//getting All User tickets
const getTickets = asyncHanlder(async (req, res) => {
  const user = await User.findById(req.user.id);

  if (!user) {
    throw new Error("User Not Exist");
  }
  const tickets = await Ticket.find({
    userId: req.user._id,
  });
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
    const { product, comment } = req.body;

    try {
      ticket = await Ticket.create({
        userId: req.user._id,
        product,
        comment,
      });
    } catch (error) {
      throw new Error(error);
    }
  }

  console.log(ticket);

  res.json(ticket);
});

// Update Ticket
const updateTicket = asyncHanlder(async (req, res) => {
  let updatedTicket;
  try {
    updatedTicket = await Ticket.findByIdAndUpdate(
      req.params.id,
      {
        ...req.body,
      },
      { new: true }
    );
  } catch (error) {
    res.json(error);
  }

  res.json(updatedTicket);
});

// Delete Ticket
const deleteTicket = asyncHanlder(async (req, res) => {
  await Ticket.deleteOne({
    _id: req.params.id,
  });
  res.json({ message: "Ticket Deleted Successfully" });
});

// Closing the Ticket
const closeTicket = asyncHanlder(async (req, res) => {
  let closedTicket;
  try {
    closedTicket = await Ticket.findByIdAndUpdate(
      req.params.id,
      {
        status: "closed",
      },
      { new: true }
    );
  } catch (error) {
    res.json(error);
  }

  res.json(closedTicket);
});

module.exports = {
  getTickets,
  getSingleTicket,
  createTicket,
  updateTicket,
  deleteTicket,
  closeTicket,
};
