
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainPage from './Pages/Mainpage';
import ProductDetailPage from './Pages/ProductDetailPage';
import AddProductPage from './Pages/AddProductPage';
import EditProductPage from './Pages/EditProductPage';
import FavoritesPage from './Pages/FavouritesPage';
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  return (
    <Router>
      <div className="App">
        
        <main>
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/products/:id" element={<ProductDetailPage />} />
            <Route path="/add-product" element={<AddProductPage />} />
            <Route path="/edit-product/:id" element={<EditProductPage />} />
            <Route path="/favorites" element={<FavoritesPage />} /> 
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
