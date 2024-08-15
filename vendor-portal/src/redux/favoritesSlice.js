// src/redux/favoritesSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../services/axios-instance';

export const fetchFavorites = createAsyncThunk('favorites/fetchFavorites', async () => {
    const response = await axios.get('api/products/favorites');
    return response.data;
});

export const favoritesSlice = createSlice({
    name: 'favorites',
    initialState: {
        items: [],
        status: 'idle',
        error: null
    },
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(fetchFavorites.pending, state => {
                state.status = 'loading';
            })
            .addCase(fetchFavorites.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.items = action.payload;
            })
            .addCase(fetchFavorites.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    }
});

export default favoritesSlice.reducer;
