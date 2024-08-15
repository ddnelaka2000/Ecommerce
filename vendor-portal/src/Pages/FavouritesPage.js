// src/pages/FavoritesPage.js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFavorites } from '../redux/favoritesSlice';

const FavoritesPage = () => {
    const dispatch = useDispatch();
    const favorites = useSelector(state => state.favorites.items);

    useEffect(() => {
        dispatch(fetchFavorites());
    }, [dispatch]);

    return (
        <div>
            <h1>Favorite Products</h1>
            <ul>
                {favorites.map(product => (
                    <li key={product._id}>
                        <h2>{product.name}</h2>
                        <img src={product.featuredImage} alt={product.name} width="200" />
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default FavoritesPage;
