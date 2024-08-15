// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import productsReducer from './productsSlice';
import favoritesReducer from './favoritesSlice';

export const store = configureStore({
    reducer: {
        products: productsReducer,
        favorites: favoritesReducer
    }
});
