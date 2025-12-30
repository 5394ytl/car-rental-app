import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as PurchaseRental from '../services/PurchaseRentalService'

export const addPurchaseRental = createAsyncThunk(
  'purchaseRental/addPurchaseRental',
  async (data, { rejectWithValue }) => {
    try {
      const res = await PurchaseRental.addPurchaseRental(data);
      return res;
    }
    catch (err) {
      console.log(err.response);
      return rejectWithValue(err.response?.status || 'add purchase rental failed')
    }
  }
)

const initialState = {
  newRental: [],
  loading: false,
  error: null,
};

export const PurchaseRentalSlice = createSlice({
  name: "purchaseRental",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(addPurchaseRental.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addPurchaseRental.fulfilled, (state, action) => {
        state.loading = false;
        state.newRental = action.payload;
      })
      .addCase(addPurchaseRental.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      })
  },
})

export default PurchaseRentalSlice.reducer;
