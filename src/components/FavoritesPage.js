import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function FavoritesPage() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    setFavorites(JSON.parse(localStorage.getItem('favorites')) || []);
  }, []);

  return (
    <div className="page">
      <h2>Избранное</h2>
      {favorites.length === 0 && (
        <div className="empty-cart text-center">
          <h2>Вам пока ничего не понравилось, вперед на поиски лучшей гитары!</h2>
          <Link to="/catalog" className="btn btn-warning">
            В каталог
          </Link>
        </div>
      )}

      <div className="row">
        {favorites.map((product) => (
          <div key={product.id} className="col-md-4 mb-4">
            <div className="card">
              <img
                src={product.imageUrl}
                alt={product.name}
                className="card-img-top img-fluid"
                style={{ height: '150px', objectFit: 'cover' }}
              />
              <div className="card-body">
                <h5 className="card-title">{product.name}</h5>
                <p className="card-text">{product.description}</p>
                <p className="card-text">Цена: {product.price} ₽</p>
                <Link to={`/products/${product.id}`}  className="btn btn-warning">
                  Подробнее
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FavoritesPage;
