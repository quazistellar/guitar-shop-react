import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import HomePage from './components/HomePage';
import CatalogPage from './components/CatalogPage';
import FavoritesPage from './components/FavoritesPage';
import CartPage from './components/CartPage';
import OrderPage from './components/OrderPage';
import Header from './components/Header';
import Footer from './components/Footer';
import ProductPage from './components/ProductPage';


function App() {
  return (
    <Router>
      <div className="app-container">
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/catalog" element={<CatalogPage />} />
          <Route path="/favorites" element={<FavoritesPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/order" element={<OrderPage />} />
          <Route path="/products/:productId" element={<ProductPage />} />
       </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
