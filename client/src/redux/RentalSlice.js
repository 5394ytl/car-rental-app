import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as RentalService from '../services/RentalService'


export const getRentals = createAsyncThunk(
  "Rental/getRentals",
  async (userData, thunkAPI) => {
    try {      
      const res = await RentalService.getRentals(userData);
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const newRental = createAsyncThunk(
  'Rental/newRental',
  async (data, { rejectWithValue }) => {   
    try {
      const res = await RentalService.newRental(data);
      return res.data;
    }
    catch (err) {
      return rejectWithValue(err.response?.status || 'Login failed')
    }
  }
)

export const deleteRental = createAsyncThunk(
  "Rental/delete",
  async (id, thunkAPI) => {
    try {      
      const res = await RentalService.deleteRental(id);
      const res1 = await RentalService.getRentals(id);
      return res1.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || err.message);
    }
  }
);


const initialState = {
  Rentals: [],
  loading: false,
  error: null,
};

export const RentalSlice = createSlice({
  name: "rentals",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getRentals.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getRentals.fulfilled, (state, action) => {
        state.loading = false;
        state.Rentals = action.payload;
      })
      .addCase(getRentals.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      })
      .addCase(newRental.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(newRental.fulfilled, (state, action) => {
        state.loading = false;        
        // state.Rentals = action.payload;
      })
      .addCase(newRental.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      })
      .addCase(deleteRental.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteRental.fulfilled, (state, action) => {
        state.loading = false;
        state.Rentals = getRentals()
      })
      .addCase(deleteRental.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
})

export default RentalSlice.reducer;
