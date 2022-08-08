import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./auth/authSlice";
import notesSlice from "./notes/notesSlice";
import ticketSlice from "./tickets/ticketSlice";

const store = configureStore({
  reducer: {
    auth: authSlice,
    ticket: ticketSlice,
    notes: notesSlice,
  },
});

export default store;
