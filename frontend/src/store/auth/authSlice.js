import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const localUser = JSON.parse(localStorage.getItem("user"));

const initialState = {
  user: localUser ? localUser : null,
  isLoading: false,
  isError: false,
  isSuccessFull: false,
  message: "",
};

// Registering A New User

export const register = createAsyncThunk(
  "/auth/register",
  async (userData, thunkApi) => {
    try {
      const response = await axios.post("/api/user/register", userData);
      // correction before it was not converting into JSON stringify
      localStorage.setItem("user", JSON.stringify(response.data));
      return response.data;
    } catch (error) {
      //correction
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkApi.rejectWithValue(message);
    }
  }
);

export const login = createAsyncThunk(
  "/auth/login",
  async (userData, thunkApi) => {
    try {
      const response = await axios.post("/api/user/login", userData);
      if (response.data)
        localStorage.setItem("user", JSON.stringify(response.data));
      return response.data;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkApi.rejectWithValue(message);
    }
  }
);

export const logout = createAsyncThunk("/auth/logout", async () => {
  await localStorage.removeItem("user");
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
        state.user = null;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccessFull = true;
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
      });
  },
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;
