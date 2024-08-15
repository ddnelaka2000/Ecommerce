// src/pages/SearchResultsPage.js
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from '../services/axios-instance';

const SearchResultsPage = () => {
    const [results, setResults] = useState([]);
    const query = new URLSearchParams(useLocation().search).get('query');

    useEffect(() => {
        const fetchSearchResults = async () => {
            const response = await axios.get(`/products/search?query=${query}`);
            setResults(response.data);
        };

        fetchSearchResults();
    }, [query]);

    return (
        <div>
            <h1>Search Results</h1>
            <ul>
                {results.map(product => (
                    <li key={product._id}>
                        <h2>{product.name}</h2>
                        <img src={product.featuredImage} alt={product.name} width="200" />
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default SearchResultsPage;
