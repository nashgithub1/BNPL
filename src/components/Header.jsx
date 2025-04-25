import React from 'react';
import Logo from '../logo.svg';

const Header = () => {
  return (
    <header className="header">
      <div>
        <img src={Logo} alt="BNPL Logo" className="header-logo" />
      </div>
      <nav className="header-nav">
        <a href="#">Home</a>
        <a href="#">Payments</a>
        <a href="#">Settings</a>
      </nav>
      <div className="user-profile">
        <span className="user-name">User</span>
        <div className="user-avatar"></div>
      </div>
    </header>
  );
};

export default Header;
