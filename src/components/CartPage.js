import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function CartPage() {
  const [cart, setCart] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
    calculateTotalPrice();
  }, []);

  useEffect(() => {
  calculateTotalPrice();
  }, [cart]);

  const calculateTotalPrice = () => {
    const total = cart.reduce((acc, product) => acc + parseFloat(product.price), 0);
    setTotalPrice(total.toFixed(2));
  };

  const handleRemoveFromCart = (productId) => {
    const updatedCart = cart.filter((product) => product.id !== productId);
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    calculateTotalPrice();
  };

  return (
    <div className="page">
      <h2 className="text-center">Корзина</h2>
      {cart.length === 0 ? (
        <div className="empty-cart text-center">
          <h2>У вас пока нечем рок-н-роллить, вперед на поиски лучшей гитары!</h2>
          <Link to="/catalog" className="btn btn-warning">
            В каталог
          </Link>
        </div>
      ) : (
        <>
          <div className="row">
            {cart.map((product) => (
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
                    <button className="btn btn-danger" onClick={() => handleRemoveFromCart(product.id)}>
                      Удалить из корзины
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="total-price text-center">
            <p style={{ fontWeight: "bold", fontSize: "30px" }} >Итоговая цена: {totalPrice} ₽</p>
          </div>
        </>
      )}
    </div>
  );
}

export default CartPage;
