import React, { useState, useEffect, useRef } from 'react';
import emailjs from '@emailjs/browser';
import ReCAPTCHA from 'react-google-recaptcha';

function OrderPage() {
  const [cart, setCart] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [orderDetails, setOrderDetails] = useState({
    name: '',
    address: '',
    payment: '',
    email: '',
  });
  const [isOrderSent, setIsOrderSent] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [captchaVerified, setCaptchaVerified] = useState(false);
  const form = useRef();

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(storedCart);
    calculateTotalPrice(storedCart);
  }, []);

  const calculateTotalPrice = (cartItems) => {
    const total = cartItems.reduce((acc, product) => acc + parseFloat(product.price), 0);
    setTotalPrice(total.toFixed(2));
  };

  const handleOrderDetailsChange = (e) => {
    setOrderDetails({ ...orderDetails, [e.target.name]: e.target.value });
  };

  const handleCaptchaChange = (value) => {
    setCaptchaVerified(!!value);
  };

  const sendOrder = (e) => {
    e.preventDefault();
    if (!captchaVerified) {
      setErrorMessage('Пожалуйста, подтвердите, что вы не робот.');
      return;
    }

    const cartDetails = cart.map((product) => `${product.name} - ${product.price} ₽`).join(', ');

    const templateParams = {
      ...orderDetails,
      cartDetails: cartDetails,
      totalPrice: totalPrice,
    };

    emailjs
      .send('service_jozfmyr', 'template_tmc3jjr', templateParams, 'aNHpnLvCFCG1WnhSN')
      .then(
        () => {
          setIsOrderSent(true);
          alert('SUCCESS: ваш заказ успешно оформлен!');
          setErrorMessage('');
        },
        (error) => {
          alert('FAILED', error.text);
          setIsOrderSent(false);
          setErrorMessage('При оформлении заказа возникла ошибка');
        },
      );
  };

  return (
    <div className="page">
      <h2>Заказ</h2>
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
                <h5 name="guitar" className="card-title">{product.name}</h5>
                <p className="card-text">{product.description}</p>
                <p name="priceee" className="card-text">Цена: {product.price} ₽</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="total-price">
        <p>Итоговая цена: {totalPrice} ₽</p>
      </div>
      <form ref={form} onSubmit={sendOrder} className="order-form">
        <div className="form-group">
          <label htmlFor="name">Имя:</label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={orderDetails.name}
            onChange={handleOrderDetailsChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="address">Адрес доставки:</label>
          <input
            type="text"
            className="form-control"
            id="address"
            name="address"
            value={orderDetails.address}
            onChange={handleOrderDetailsChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="payment">Способ оплаты:</label>
          <select
            className="form-control"
            id="payment"
            name="payment"
            value={orderDetails.payment}
            onChange={handleOrderDetailsChange}
            required
          >
            <option value="card">Карта</option>
            <option value="cash">Наличными</option>
          </select>
        </div><div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={orderDetails.email}
            onChange={handleOrderDetailsChange}
            required
          />
        </div>
        <ReCAPTCHA
          sitekey="6Lfzu_wpAAAAAHR91arXz8h33ICe-exXQ67lNydK"
          onChange={handleCaptchaChange}
        />
        <button type="submit" className="btn btn-primary" disabled={!captchaVerified}>
          Оформить заказ
        </button>
        {isOrderSent && (
          <div className="success-message">
            Заказ успешно оформлен!
          </div>
        )}
        {errorMessage && <div className="error-message">{errorMessage}</div>}
      </form>
    </div>
  );
}

export default OrderPage;