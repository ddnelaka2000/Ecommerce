// src/redux/productsSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../services/axios-instance';

export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
    const response = await axios.get('api/products');
    console.log(response.data);
    return response.data;
});

export const productsSlice = createSlice({
    name: 'products',
    initialState: {
        items: [],
        status: 'idle',
        error: null
    },
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(fetchProducts.pending, state => {
                state.status = 'loading';
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.items = action.payload;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    }
});

export default productsSlice.reducer;
