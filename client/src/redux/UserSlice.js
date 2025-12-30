import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as UserService from '../services/UserService'

export const SignUpUser = createAsyncThunk(
  'User/signup',
  async (data, { rejectWithValue }) => {
    try {
      const res = await UserService.signUp(data);
      return res;
    }
    catch (err) {
      console.log(err.response);
      return rejectWithValue(err.response?.status || 'Login failed')
    }
  }
)

export const SignInUser = createAsyncThunk(
  'User/signin',
  async (data, { rejectWithValue }) => {
    try {
      const res = await UserService.signIn(data);
      return res;
    }
    catch (err) {
      return rejectWithValue(err.response?.status || 'Login failed')
    }
  }
)

const initialState = {
  user: null,
  loading: false,
  error: null,
};

export const UserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // אמצע פעולה
      .addCase(SignInUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      // הפעולה הצליחה
      .addCase(SignInUser.fulfilled, (state, action) => {
        state.loading = false;
        console.log(action.payload);
        state.user = action.payload;
      })
      // הפעולה נכשלה
      .addCase(SignInUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(SignUpUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(SignUpUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(SignUpUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
})

export const { logout } = UserSlice.actions;

export default UserSlice.reducer;
