import React, { useState, useEffect } from 'react';
import './HomePage.css';
import { ContactUs } from './ContactUs';
import axios from 'axios';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

function HomePage() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const controls = useAnimation();
  const [ref, inView] = useInView();

  useEffect(() => {
    if (inView) {
      controls.start({
        scale: 1.1,
        transition: { duration: 0.3, ease: "easeInOut" },
      });
    } else {
      controls.start({ scale: 1 });
    }
  }, [controls, inView]);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/products');
        setProducts(response.data.slice(0, 10));
        setIsLoading(false);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError(err);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="page">
      <h2>Главная</h2>
      <div className="content">
        <div className="store-info">
          <p></p>
          <p></p>
          <p></p>

          <h3>Про 'GuizNotes':</h3>
          <div style={{backgroundColor: '#4B0082', color: '#483D8B', height: '2px', width: '200px', borderRadius: '2px'}}></div>
          <p></p>
          <p style={{ fontFamily: "Arial Black" }}>Однажды рыжий кот по имени Гизмо нечаянно пробежался по струнам
          новенького стратокастера, после чего они разлетелись в стороны.</p>
          <p style={{ fontFamily: "Arial Black" }}>Гизмо это не понравилось, и он решил самостоятельно следить за качеством!</p>
          <p style={{ fontFamily: "Arial Black" }}>GUIZNOTES - популярные бренды, замурчательные бонусы, дружное сообщество и более тысячи музыкальных товаров..</p>
          <p style={{ fontFamily: "Arial Black" }}>Приходите к нам, и Вы сможете поиграть на любом инструменте, до которого только дотянетесь!</p>
        </div>
        <div className="image-container">
          <img
            src="https://s2.stc.all.kpcdn.net/afisha/msk/wp-content/uploads/sites/5/2022/08/music-expert.jpg"
            alt="Изображение магазина"
          />
        </div>
      </div>
      <div className="product-container">
        <h2>Популярные товары</h2>
        <div className="separator"></div>
        {isLoading && <p>Загрузка...</p>}
        {error && <p>Ошибка загрузки данных.</p>}
        {!isLoading && !error && (
          <div className="product-grid">
            {products.map((product, index) => (
              <div key={index} className="product-card">
                <motion.img
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  src={product.imageUrl}
                  alt={product.name}
                />
                <h3>{product.name}</h3>
                <p>{product.description}</p>
                 <div className="price">
                  <motion.p
                    whileHover={{ scale: 1.1, color: 'red' }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    {product.price} ₽
                  </motion.p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
          <h2 className="product-container">Обратная связь</h2>
         <div className="separator"></div>
         <p></p>
       <div className="contact-container">
        <div className="contact-text">
          <h2>Как нас найти и куда обращаться?</h2>
          <div className="separator"></div>
          <p>
            Мы с радостью ответим на все ваши предложения, жалобы, сообщения, песни, рифы, аккорды, стихи и вопросы.
            Вы можете заполнить форму, введя своё имя, а также email-адрес для ответа.
            Гизмо отлично следит за почтой, поэтому Ваш вопрос не останется без ответа!
          </p>
          <p>
            А вообще, поиграть на гитаре вживую или найти нас можно здесь: г. Москва, ул. Неглинная 6/2,
          </p>
          <p>
            и здесь: г. Москва, ул. Вятская 1,
          </p>
          <p>
            и даже здесь: г. Москва, Краснохолмская наб. 3!
          </p>
           <div className="contact-form">
          <h3>Связаться с нами</h3>
          <ContactUs />
        </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;