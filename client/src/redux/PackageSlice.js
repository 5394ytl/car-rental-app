import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as packageService from "../services/packageService"

export const getPackages = createAsyncThunk(
  "Package/get",
  async () => {
    const res = await packageService.fetchPackages()
    return res.data
  }
)

export const updatePackages = createAsyncThunk(
  "Package/update",
  async (pack, thunkAPI) => {
    console.log("pack",pack);
    
    const res = await packageService.updatePackeges(pack)
    return res
  }
)

export const PackageSlice = createSlice({
  name: "package",
  initialState: {
    packages: [],
    loading: false,
    error: null
  },
  extraReducers: (builder) => {
    builder
      // אמצע פעולה
      .addCase(getPackages.pending, (state) => {
        state.loading = true;
      })
      // הפעולה הצליחה
      .addCase(getPackages.fulfilled, (state, action) => {
        state.loading = false;
        state.packages = action.payload;
      })
      // הפעולה נכשלה
      .addCase(getPackages.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // אמצע פעולה
      .addCase(updatePackages.pending, (state) => {
        state.loading = true;
      })
      // הפעולה הצליחה
      .addCase(updatePackages.fulfilled, (state, action) => {
        state.loading = false;
        console.log(action.payload);        
        state.packages = action.payload;
      })
      // הפעולה נכשלה
      .addCase(updatePackages.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
  },
})

export default PackageSlice.reducer;
