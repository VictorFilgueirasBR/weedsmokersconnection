// client/src/components/Header.jsx
import React, { useState, useContext, useRef, useEffect } from 'react';
import { AuthContext } from '../App';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { FaUser } from 'react-icons/fa';
import './Header.scss';

const Header = ({ onShowPopup }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, setUser, setToken } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const menuRef = useRef(null);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
    setToken(null);
    setIsMenuOpen(false);
    navigate('/', { replace: true });
  };

  const handleEditProfile = () => {
    if (location.pathname !== '/profile') {
      navigate('/profile');
    }
    if (typeof onShowPopup === 'function') {
      onShowPopup();
    }
    setIsMenuOpen(false);
  };

  const isLoggedIn = !!user;

  // Fecha o menu ao clicar fora
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Fecha menu ao clicar em qualquer link
  const handleLinkClick = () => {
    setIsMenuOpen(false);
  };

  // Sincroniza o estado do menu com o body para o bloqueio de scroll
  useEffect(() => {
    if (isMenuOpen) {
      document.body.classList.add('menu-active');
    } else {
      document.body.classList.remove('menu-active');
    }
  }, [isMenuOpen]);

  return (
    <header className="main-header">
      <div className="logo">
        <Link to="/" onClick={handleLinkClick}>
          <img src="/logo192.png" alt="WeedSmokersClub" />
        </Link>
      </div>

      <nav ref={menuRef} className={`nav-links ${isMenuOpen ? 'open' : ''}`}>
        <Link to="/" onClick={handleLinkClick} translate="no" lang="en">WSC | HOME</Link>
        {!isLoggedIn && <Link to="/chat" onClick={handleLinkClick}>WSC | TEST IA</Link>}

        {!isLoggedIn ? (
          <>
            <Link to="/signup" onClick={handleLinkClick} translate="no" lang="en">WSC | PLANS</Link>
            <Link to="https://ws-connectioncommerce.com/minha-conta/" onClick={handleLinkClick} translate="no" lang="en">MY ACCOUNT</Link>
            <Link to="https://wa.me/message/WQS3YHS6QHS2I1" onClick={handleLinkClick} translate="no" lang="en">SUPPORT</Link>
          </>
        ) : (
          <>
            <Link to="/club" onClick={handleLinkClick} translate="no" lang="en">Club</Link>
            <button onClick={handleEditProfile} className="edit-profile-btn">
              Edit
            </button>
            <button onClick={handleLogout} className="logout-btn" type="button">
              Sair
            </button>
          </>
        )}
      </nav>

      <div className="header-right-controls">
        {isLoggedIn && (
          <a
            href="/profile"
            className="user-icon-btn"
            onClick={(e) => {
              e.preventDefault();
              handleEditProfile();
            }}
            onMouseMove={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const x = ((e.clientX - rect.left) / rect.width) * 100;
              const y = ((e.clientY - rect.top) / rect.height) * 100;
              e.currentTarget.style.setProperty('--mx', `${x}%`);
              e.currentTarget.style.setProperty('--my', `${y}%`);
            }}
          >
            <FaUser />
          </a>
        )}

        <button
          className="menu-toggle"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
          aria-expanded={isMenuOpen}
        >
          ☰
        </button>
      </div>
    </header>
  );
};

export default Header;