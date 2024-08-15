// src/pages/ProductDetailPage.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from '../services/axios-instance';

const ProductDetailPage = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);

    useEffect(() => {
        const fetchProduct = async () => {
            const response = await axios.get(`/products/${id}`);
            setProduct(response.data);
        };

        fetchProduct();
    }, [id]);

    return (
        <div>
            {product ? (
                <>
                    <h1>{product.name}</h1>
                    <p>{product.description}</p>
                    <p>Quantity: {product.quantity}</p>
                    <div>
                        {product.images.map((image, index) => (
                            <img key={index} src={image} alt={product.name} width="200" />
                        ))}
                    </div>
                </>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default ProductDetailPage;
