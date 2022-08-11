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

// Getting All Tickets of a User

export const getTickets = createAsyncThunk(
  "tickets/get",
  async (_, thunkApi) => {
    const token = thunkApi.getState().auth.user.token;

    try {
      const tickets = await axios.get("/api/tickets/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return tickets.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

// Getting a Single Ticket Detail
export const getSingleTicket = createAsyncThunk(
  "tickets/getSingle",
  async (id, thunkApi) => {
    const token = thunkApi.getState().auth.user.token;
    try {
      const tickets = await axios.get("/api/tickets/" + id, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return tickets.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

// Creating A single Ticket

export const createTicket = createAsyncThunk(
  "tickets/create",
  async (ticketData, thunkApi) => {
    const token = thunkApi.getState().auth.user.token;
    try {
      const ticket = await axios.post("/api/tickets/", ticketData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return ticket.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

// Closing a Ticket

export const closeTicket = createAsyncThunk(
  "tickets/closing",
  async (id, thunkiApi) => {
    const token = thunkiApi.getState().auth.user.token;

    console.log(token);
    try {
      const ticket = await axios.put(
        "/api/tickets/close/" + id,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
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
    resetTicketDetail: (state) => {
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
      })
      .addCase(closeTicket.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccessFull = true;
        state.tickets.map((t) =>
          t._id === action.payload._id ? action.payload : t
        );
      });
  },
});

export const { reset, resetTicketDetail } = ticketSlice.actions;

export default ticketSlice.reducer;
