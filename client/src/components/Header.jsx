// client/src/components/Header.jsx
import React, { useState, useContext, useRef, useEffect } from 'react';
import { AuthContext } from '../App';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { FaUser } from 'react-icons/fa';
import './Header.scss';

// Recebe a nova propriedade onShowPopup
const Header = ({ onEditProfile, onShowPopup }) => {
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
    // Chame a nova função para exibir o popup
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

  return (
    <header className="main-header">
      <div className="logo">
        <Link to="/" onClick={handleLinkClick}>
          <img src="/logo192.png" alt="WeedSmokersClub" />
        </Link>
      </div>

      <nav ref={menuRef} className={`nav-links ${isMenuOpen ? 'open' : ''}`}>
        <Link to="/" onClick={handleLinkClick}>Home</Link>
        {/* LÓGICA CORRIGIDA: MOSTRA "SOBRE" SOMENTE SE NÃO ESTIVER LOGADO */}
        {!isLoggedIn && <Link to="/chat" onClick={handleLinkClick}>Teste IA</Link>}

        {!isLoggedIn ? (
          <>
            <Link to="/signup" onClick={handleLinkClick}>Assinar</Link>
            <Link to="/login" onClick={handleLinkClick}>Login</Link>
          </>
        ) : (
          <>
            <Link to="/club" onClick={handleLinkClick}>Club</Link>
            {/* O onClick aqui agora usa handleEditProfile para ativar o popup */}
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