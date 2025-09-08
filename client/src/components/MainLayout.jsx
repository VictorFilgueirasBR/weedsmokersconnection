// client/src/components/MainLayout.jsx
import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from './Header'; 
import Footer from './Footer';

const MainLayout = ({ onShowPopup }) => {
  const location = useLocation();
  const isProfilePage = location.pathname.includes('/profile');

  return (
    <div className="home" id="home">
      <Header onShowPopup={onShowPopup} />
      <main>
        <Outlet />
      </main>
      {/* Renderiza o Footer apenas se não for a página de perfil */}
      {!isProfilePage && <Footer />}
    </div>
  );
};

export default MainLayout;