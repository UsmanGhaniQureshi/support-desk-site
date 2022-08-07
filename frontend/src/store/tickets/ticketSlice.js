import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  isSuccessFull: false,
  isError: false,
  message: "",
  tickets: [],
  ticket: null,
};

export const getTickets = createAsyncThunk(
  "tickets/get",
  async (_, thunkiApi) => {
    try {
      const tickets = await axios.get("/api/tickets/");
      return tickets.data;
    } catch (error) {
      return thunkiApi.rejectWithValue(error);
    }
  }
);

export const getSingleTicket = createAsyncThunk(
  "tickets/getSingle",
  async (id, thunkiApi) => {
    try {
      const tickets = await axios.get("/api/tickets/" + id);
      return tickets.data;
    } catch (error) {
      return thunkiApi.rejectWithValue(error);
    }
  }
);

export const createTicket = createAsyncThunk(
  "tickets/create",
  async (ticketData, thunkiApi) => {
    try {
      const ticket = await axios.post("/api/tickets/", ticketData);
      return ticket.data;
    } catch (error) {
      return thunkiApi.rejectWithValue(error);
    }
  }
);

const ticketSlice = createSlice({
  name: "ticket",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccessFull = false;
      state.message = "";
      state.ticket = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTickets.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getTickets.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccessFull = true;
        state.tickets = action.payload;
      })
      .addCase(getTickets.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.message = action.payload;
      })
      .addCase(createTicket.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createTicket.fulfilled, (state, action) => {
        state.isLoading = false;
        state.tickets.push(action.payload);
        state.isSuccessFull = true;
      })
      .addCase(getSingleTicket.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getSingleTicket.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccessFull = true;
        state.ticket = action.payload;
      });
  },
});

export const { reset } = ticketSlice.actions;

export default ticketSlice.reducer;
