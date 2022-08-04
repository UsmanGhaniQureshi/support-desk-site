import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const localUser = localStorage.getItem("user");

const initialState = {
  user: localUser ? localUser : null,
  isLoading: false,
  isError: false,
  isSuccessFull: false,
  message: "",
};

export const register = createAsyncThunk(
  "/auth/user",
  async (userData, thunkApi) => {
    try {
      const response = await axios.post("/api/user/register", userData);
      localStorage.setItem("user", response.data);
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const login = createAsyncThunk(
  "/auth/login",
  async (userData, thunkApi) => {
    try {
      const response = await axios.post("/api/user/register", userData);
      localStorage.setItem("user", response.data);
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const logout = createAsyncThunk("/auth/logout", async () => {
  localStorage.removeItem("user");
});
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccessFull = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccessFull = true;
        state.user = action.payload;
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccessFull = true;
        state.user = action.payload;
      })
      .addCase(login.rejected, (state) => {
        state.isLoading = false;
        state.isSuccessFull = false;
        state.user = null;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
      });
  },
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;
