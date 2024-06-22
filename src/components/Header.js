import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import { motion, AnimatePresence } from 'framer-motion';

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLogoHovered, setIsLogoHovered] = useState(false);
  const [showImage, setShowImage] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogoHover = () => {
    setIsLogoHovered(true);
  };

  const handleLogoLeave = () => {
    setIsLogoHovered(false);
  };

  const handleLogoClick = () => {
    setShowImage(true);
  };

  const handleImageClose = () => {
    setShowImage(false);
  };

  const logoVariants = {
    hover: { scale: 1.1, transition: { duration: 0.2 } },
    normal: { scale: 1 }
  };

  const buttonVariants = {
    hover: { scale: 1.05, transition: { duration: 0.2 } },
    normal: { scale: 1 }
  };

  return (
    <header className="header">
      <div className="container">
        <div className="header-content d-flex align-items-center justify-content-between">
          <motion.div
            variants={logoVariants}
            animate={isLogoHovered ? 'hover' : 'normal'}
            onMouseEnter={handleLogoHover}
            onMouseLeave={handleLogoLeave}
            onClick={handleLogoClick}
            className="logo-title d-flex align-items-center"
          >
            <motion.img
              src="../images/logo_guiznotes.png"
              alt="Logo"
              className="logo"
              transition={{ duration: 0.2 }}
              animate={isLogoHovered ? { scale: 1.1 } : { scale: 1 }}
            />
            <h1 className="header-title">GUIZNOTES</h1>
          </motion.div>
          <div className="header-links">
            <motion.div
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              className="btn-wrapper"
            >
              <Link to="/" className="btn btn-light mx-2" style={{ backgroundColor: '#FFE4C4', color: '#483D8B', fontWeight: 'bold' }}>Главная</Link>
            </motion.div>
            <motion.div
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              className="btn-wrapper"
            >
              <Link to="/catalog" className="btn btn-light mx-2" style={{ backgroundColor: '#FFE4C4', color: '#483D8B', fontWeight: 'bold' }}>Каталог</Link>
            </motion.div>
            <motion.div
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              className="btn-wrapper"
            >
              <Link to="/favorites" className="btn btn-light mx-2" style={{ backgroundColor: '#FFE4C4', color: '#483D8B', fontWeight: 'bold' }}>☆ Избранное ☆</Link>
            </motion.div>
            <motion.div
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              className="btn-wrapper"
            >
              <Link to="/order" className="btn btn-light mx-2" style={{ backgroundColor: '#FFE4C4', color: '#483D8B', fontWeight: 'bold' }}>Заказ</Link>
            </motion.div>
            <motion.div
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              className="btn-wrapper"
            >
              <Link to="/cart" className="btn btn-light mx-2" style={{ backgroundColor: '#FFE4C4', color: '#483D8B', fontWeight: 'bold' }}>Корзина</Link>
            </motion.div>


             <div className="left-content">

            </div>
          </div>

        </div>
        <h6 style={{ color: "#D3D3D3" }}>Лучший гитар-р-р-ный магазин</h6>
        <div className="header-separator"></div>
        <AnimatePresence>
          {showImage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="image-overlay"
              onClick={handleImageClose}
            >
              <img src="https://svgsilh.com/svg_v2/306213.svg" alt="Image" className="image" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}

export default Header;