import { createSlice ,createAsyncThunk} from "@reduxjs/toolkit";
import * as productService from "../services/ProductsService"

export const getProducts = createAsyncThunk(
    "Product/get",
    async () => {    
        const res = await productService.fetchProducts()  
        return res.data
    }
)

export const getProductById = createAsyncThunk(
    "Product/get",
    async () => {    
        const res = await productService.getProductById()  
        return res.data
    }
)

export const ProductsSlice = createSlice({
    name: "Products",
    initialState: {
        productList: [],
        loading: false,
        error: null
    },
    extraReducers: (builder) => {
        builder
            // אמצע פעולה
            .addCase(getProducts.pending, (state) => {
                state.loading = true;
            })
            // הפעולה הצליחה
            .addCase(getProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.productList = action.payload;// action.payload=res.data
            })
            // הפעולה נכשלה
            .addCase(getProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
    },
})

export default ProductsSlice.reducer;