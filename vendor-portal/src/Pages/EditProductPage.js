// src/pages/EditProductPage.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from '../services/axios-instance';
import 'bootstrap/dist/css/bootstrap.min.css';

const EditProductPage = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);

    useEffect(() => {
        console.log('Extracted productId:', id); // Log to verify the correct value
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`/api/products/${id}`);
                setProduct(response.data);
            } catch (error) {
                console.error('Error fetching product:', error);
            }
        };

        if (id) {
            fetchProduct();
        }
    }, [id]);

    useEffect(() => {
        console.log('Product ID:', id); // Log productId to verify
    }, [id]);

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`/api/products/${id}`, product);
            console.log('Product updated successfully');
        } catch (error) {
            console.error('Error updating product:', error);
        }
    };

    const handleChange = (e) => {
        setProduct({ ...product, [e.target.name]: e.target.value });
    };

    return (
        <div className="container mt-5">
            <div className="d-flex align-items-center mb-4">
                <h1 className="me-3">Products</h1>
                <span className="text-primary" style={{ fontSize: '0.875rem' }}>
                    {' > Edit Product'}
                </span>
            </div>
            {product ? (
                <form onSubmit={handleUpdate}>
                    <div className="mb-3">
                        <label htmlFor="sku" className="form-label">SKU</label>
                        <input 
                            type="text" 
                            id="sku"
                            name="sku" 
                            value={product.sku} 
                            onChange={handleChange} 
                            className="form-control" 
                            required 
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Product Name</label>
                        <input 
                            type="text" 
                            id="name"
                            name="name" 
                            value={product.name} 
                            onChange={handleChange} 
                            className="form-control" 
                            required 
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="quantity" className="form-label">Quantity</label>
                        <input 
                            type="number" 
                            id="quantity"
                            name="quantity" 
                            value={product.quantity} 
                            onChange={handleChange} 
                            className="form-control" 
                            required 
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">Product Description</label>
                        <textarea 
                            id="description"
                            name="description" 
                            value={product.description} 
                            onChange={handleChange} 
                            className="form-control" 
                            rows="4"
                        />
                    </div>
                    <button 
                        type="submit" 
                        className="btn" 
                        style={{ backgroundColor: '#001EB9', color: 'white' }}
                    >
                        Update Product
                    </button>
                </form>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default EditProductPage;
