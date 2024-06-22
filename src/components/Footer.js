import React from 'react';
import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content d-flex align-items-center justify-content-between">
          <div className="footer-left">
            <img src="../images/logo2.png" alt="Logo" className="footer-logo" />
            <p className="footer-phone">+7 (852) 552-52-52</p>
            <p className="footer-phone">+7 (777) 55-78-01</p>
          </div>
          <div className="footer-right">
            <h2 className="footer-title">GUIZNOTES</h2>
            <p className="footer-copyright">©️ MPT PRODUCTION OOO GUIZNOTES</p>
            <h5 className="footer-copyright">2024</h5>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
