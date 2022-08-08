import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const initialState = {
  notes: [],
};

export const fetchNotes = createAsyncThunk(
  "notes/fetching",
  async (id, thunkApi) => {
    try {
      const response = await axios.get("/api/notes/" + id);
      if (response.data) {
        return response.data;
      }
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);
export const addNote = createAsyncThunk("notes/add", async (data, thunkApi) => {
  try {
    const response = await axios.post("/api/notes/", data);
    return response.data;
  } catch (error) {
    return thunkApi.rejectWithValue(error);
  }
});

const noteSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {
    resetNotes: (state) => {
      state.notes = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNotes.fulfilled, (state, action) => {
        state.notes = action.payload;
      })
      .addCase(addNote.fulfilled, (state, action) => {
        state.notes.push(action.payload);
      });
  },
});

export const { resetNotes } = noteSlice.actions;

export default noteSlice.reducer;
