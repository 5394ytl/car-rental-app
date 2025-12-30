import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as purchasesService from "../services/PurchasesService"

export const getPurchase = createAsyncThunk(
  "Purchase/getPurchases",
  async (userId) => {  
    console.log("purchaseuserId",userId);
      
    const res = await purchasesService.getPurchases(userId)
    return res.data
  }
)

export const BuyPackage = createAsyncThunk(
  "Package/add",
  async (purc) => {
    const res = await purchasesService.buyPackage(purc)
    return res.status
  }
)

export const MyPurchasesSlice = createSlice({
  name: "MyPurchases",
  initialState: {
    MyPurchases: [],
    status:null,
    loading: false,
    error: null
  },
  extraReducers: (builder) => {
    builder
      .addCase(getPurchase.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getPurchase.fulfilled, (state, action) => {
        state.loading = false;
        state.MyPurchases = action.payload;
      })
      .addCase(getPurchase.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(BuyPackage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(BuyPackage.fulfilled, (state, action) => {
        state.loading = false;
        state.status = action.payload;
      })
      .addCase(BuyPackage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
  },
})


export default MyPurchasesSlice.reducer;
