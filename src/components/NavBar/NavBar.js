import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './NavBar.module.css';
import SearchBar from '../SearchBar';

const NavBar = ({ onSearch }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const buttonRef = useRef(null);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isMobileMenuOpen &&
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
      ) {
        setIsMobileMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMobileMenuOpen]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((open) => !open);
  };

  return (
    <nav className={styles.navBar}>
      <Link to="/" className={styles.logo} tabIndex={0}>
        BlogApp
      </Link>
      <div className={styles.links}>
        <Link to="/">Home</Link>
        <Link to="/blog">Blog</Link>
        <Link to="/about">About</Link>
        <div className={styles.searchBarWrapper}>
          <SearchBar onSearch={onSearch} />
        </div>
      </div>
      <button
        ref={buttonRef}
        className={styles.hamburger}
        onClick={toggleMobileMenu}
        aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
        aria-expanded={isMobileMenuOpen}
        aria-controls="mobile-menu"
        tabIndex={0}
      >
        {isMobileMenuOpen ? '✕' : '☰'}
      </button>
      <div
        id="mobile-menu"
        ref={menuRef}
        className={`${styles.mobileMenu} ${isMobileMenuOpen ? styles.open : ''}`}
        aria-hidden={!isMobileMenuOpen}
      >
        <Link to="/" onClick={toggleMobileMenu}>Home</Link>
        <Link to="/blog" onClick={toggleMobileMenu}>Blog</Link>
        <Link to="/about" onClick={toggleMobileMenu}>About</Link>
        <div className={styles.mobileSearchBarWrapper}>
          <SearchBar onSearch={onSearch} />
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
