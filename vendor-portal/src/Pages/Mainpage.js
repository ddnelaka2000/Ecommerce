import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../redux/productsSlice';
import { Link, useNavigate } from 'react-router-dom'; 
import axios from '../services/axios-instance'
import './MainPage.css'; 


const MainPage = () => {
    const dispatch = useDispatch();
    const products = useSelector(state => state.products.items);
    const status = useSelector(state => state.products.status);
    const [searchQuery, setSearchQuery] = useState('');
    
    const navigate = useNavigate(); 

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleNewProductClick = () => {
        navigate('/add-product'); 
    };

    const handleEditClick = (productId) => {
        navigate(`/edit-product/${productId}`); 
    };

    const handleDeleteClick = async (productId) => {
        try {
            await axios.delete(`/api/products/${productId}`);
            dispatch(fetchProducts());
        } catch (err) {
            console.error("Error deleting product:", err);
        }
    };

    const handleFavoriteToggle = async (productId, isFavorite) => {
        try {
            await axios.put(`/api/products/${productId}`, {
                isFavorite: !isFavorite
            });
            dispatch(fetchProducts()); 
        } catch (err) {
            console.error("Error toggling favorite:", err);
        }
    };

    const handleFavoritesPageClick = () => {
        navigate('/favorites'); 
    };

    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="main-container">
            <header className="header">
                <div className="admin-info">
                    <span className="font-weight-bold">ADMIN</span>
                    <div className="circle"></div>
                </div>
            </header>

            <main className="content">
                <div className="header-actions">
                    <h1 className="heading">Products</h1>
                    <div className="search-bar-actions">
                        <div className="search-bar-container">
                            <input 
                                type="text" 
                                placeholder="Search products..." 
                                className="search-bar" 
                                value={searchQuery}
                                onChange={handleSearchChange} 
                            />
                            <button className="search-button">Search</button>
                        </div>
                        <div className="actions">
                            <button 
                                className="new-product"
                                onClick={handleNewProductClick} 
                            >
                                New Product
                            </button>
                            <button 
                                className="btn btn-outline-primary favorite-button"
                                onClick={handleFavoritesPageClick} 
                            >
                                <img src="/path-to-star-icon.png" alt="Favorite" />
                            </button>
                        </div>
                    </div>
                </div>

                <table className="product-table">
                    <thead>
                        <tr>
                            <th>SKU</th>
                            <th>Image</th>
                            <th>Product Name</th>
                            <th>Price</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {status === 'loading' && (
                            <tr>
                                <td colSpan="5">Loading...</td>
                            </tr>
                        )}
                        {status === 'succeeded' && products.length > 0 ? (
                            filteredProducts.map(product => (
                                <tr key={product._id} className="product-row">
                                    <td>{product.sku}</td>
                                    <td><img src={`/Images/${product.images[0]}`} alt={product.name} className="product-image" /></td>
                                    <td>
                                        <Link to={`/products/${product._id}`} className="product-name">
                                            {product.name}
                                        </Link>
                                    </td>
                                    <td className="product-price">{product.price}</td>
                                    <td className="product-actions">
                                        {/* Edit Button */}
                                        <button 
                                            className="btn btn-outline-primary me-1" 
                                            onClick={() => handleEditClick(product._id)}
                                        >
                                            ✏️
                                        </button>
                                        {/* Delete Button */}
                                        <button 
                                            className="btn btn-outline-danger me-1" 
                                            onClick={() => handleDeleteClick(product._id)}
                                        >
                                            🗑️
                                        </button>
                                        {/* Favorite Button */}
                                        <button 
                                            className={`btn ${product.isFavorite ? 'btn-warning' : 'btn-outline-warning'} me-1`}
                                            onClick={() => handleFavoriteToggle(product._id, product.isFavorite)}
                                        >
                                            ⭐
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            status === 'failed' && (
                                <tr>
                                    <td colSpan="5">Error loading products</td>
                                </tr>
                            )
                        )}
                    </tbody>
                </table>
            </main>
        </div>
    );
};

export default MainPage;

