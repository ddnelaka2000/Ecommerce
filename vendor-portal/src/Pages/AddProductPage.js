import React, { useState } from 'react';
import axios from '../services/axios-instance';
import 'bootstrap/dist/css/bootstrap.min.css';

const AddProductPage = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState(0);
    const [sku, setSku] = useState('');
    const [images, setImages] = useState([]);
    const [vendorId] = useState('123'); 

    const handleImageUpload = (e) => {
        const files = Array.from(e.target.files);
        setImages(files); 
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('sku', sku);
        formData.append('name', name);
        formData.append('description', description);
        formData.append('price', price);
        formData.append('vendorId', vendorId); 

        images.forEach((file) => {
            formData.append('images', file);
        });

        try {
            const response = await axios.post('api/products', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log('Product added successfully:', response.data);
        } catch (error) {
            console.error('Error adding product:', error);
        }
    };

    return (
        <div className="container mt-5">
            <h1 className="mb-4">Add New Product</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="sku" className="form-label">SKU</label>
                    <input 
                        type="text" 
                        id="sku"
                        value={sku} 
                        onChange={(e) => setSku(e.target.value)} 
                        className="form-control" 
                        placeholder="SKU" 
                        required 
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Product Name</label>
                    <input 
                        type="text" 
                        id="name"
                        value={name} 
                        onChange={(e) => setName(e.target.value)} 
                        className="form-control" 
                        placeholder="Product Name" 
                        required 
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="price" className="form-label">Price</label>
                    <input 
                        type="number" 
                        id="price"
                        value={price} 
                        onChange={(e) => setPrice(e.target.value)} 
                        className="form-control" 
                        placeholder="Price" 
                        required 
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Product Description</label>
                    <textarea 
                        id="description"
                        value={description} 
                        onChange={(e) => setDescription(e.target.value)} 
                        className="form-control" 
                        placeholder="Product Description" 
                        rows="4"
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="images" className="form-label">Product Images</label>
                    <input 
                        type="file" 
                        id="images"
                        multiple 
                        onChange={handleImageUpload} 
                        className="form-control"
                    />
                </div>
                <button 
                    type="submit" 
                    className="btn" 
                    style={{ backgroundColor: '#001EB9', color: 'white' }}
                >
                    Add Product
                </button>
            </form>
        </div>
    );
};

export default AddProductPage;
