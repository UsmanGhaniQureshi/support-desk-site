import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./auth/authSlice";
import ticketSlice from "./tickets/ticketSlice";

const store = configureStore({
  reducer: {
    auth: authSlice,
    ticket: ticketSlice,
  },
});

export default store;
