import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import './ProductPage.css';

function ProductPage() {
  const [product, setProduct] = useState(null);
  const { productId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/products/${productId}`);
        setProduct(response.data);
      } catch (error) {
        console.error('Ошибка получения данных:', error);
      }
    };

    fetchData();
  }, [productId]);

  const addToCart = (product) => {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push(product);
    localStorage.setItem('cart', JSON.stringify(cart));
    alert('Товар был добавлен в корзину!');
  };

  const removeFromCart = (product) => {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart = cart.filter(item => item.id !== product.id);
    localStorage.setItem('cart', JSON.stringify(cart));
    alert('Товар был удален из корзины!');
  };

  const addToFavorites = (product) => {
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    favorites.push(product);
    localStorage.setItem('favorites', JSON.stringify(favorites));
    alert('Товар был добавлен в избранное!');
  };

  const removeFromFavorites = (product) => {
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    favorites = favorites.filter(item => item.id !== product.id);
    localStorage.setItem('favorites', JSON.stringify(favorites));
     alert('Товар был удален из избранного!');
  };

  if (!product) {
    return <div>Загрузка...</div>;
  }

  const cartButtonLabel =
    localStorage.getItem('cart') && JSON.parse(localStorage.getItem('cart')).find(item => item.id === product.id)
      ? 'Удалить из корзины'
      : 'В корзину';

  const favoritesButtonLabel =
    localStorage.getItem('favorites') && JSON.parse(localStorage.getItem('favorites')).find(item => item.id === product.id)
      ? 'Удалить из избранного'
      : 'В избранное';

  return (
    <div className="product-page">
      <div className="product-info">
        <img style={{ border: "3px solid #FFA07A", borderRadius: "1px" }} src={product.imageUrl} alt={product.name} className="product-image" />
        <div className="product-details">
          <h2>{product.name}</h2>
          <p style={{ fontSize: "18px" }} className="product-description">{product.description}</p>
          <div className="product-extra-info">
            <p>Тип: {product.type}</p>
            <p>Фирма: {product.company}</p>
            <p>Форма: {product.form}</p>
            <p>Конфигурация звукоснимателей: {product.configsound}</p>
            <p>Количество струн: {product.stringscount}</p>
          </div>
        </div>
      </div>
      <div className="product-price">
        <h2 className="pricee">{product.price} ₽</h2>
        <button
          className="add-to-cart"
          onClick={() => {
            if (cartButtonLabel === 'В корзину') {
              addToCart(product);
            } else {
              removeFromCart(product);
            }
          }}
        >
          {cartButtonLabel}
        </button>
        <button
          className="add-to-favorites"
          onClick={() => {
            if (favoritesButtonLabel === 'В избранное') {
              addToFavorites(product);
            } else {
              removeFromFavorites(product);
            }
          }}
        >
          {favoritesButtonLabel}
        </button>
      </div>
    </div>
  );
}

export default ProductPage;
