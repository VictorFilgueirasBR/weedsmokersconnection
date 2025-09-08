// src/pages/Profile.jsx
import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../App';
import EditProfile from '../components/EditProfile';
import ProfileHeader from '../components/ProfileHeader';
import UserFeed from '../components/UserFeed';
import ProfileFooter from '../components/ProfileFooter';
import EditProfilePopup from '../components/EditProfilePopup';
import './Profile.scss';

// Recebe as props showPopup e setShowPopup do App.jsx
export default function Profile({ showPopup, setShowPopup }) {
  const { user, setUser } = useContext(AuthContext);
  const [isEditing, setIsEditing] = useState(false);

  // Removendo a lógica de useEffect que controlava o popup, pois agora é gerenciada pelo App.jsx
  
  const handleSave = (updatedData) => {
    console.log('Dados salvos (simulado):', updatedData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };
  
  const handleEditClick = () => {
    setIsEditing(true);
  };

  if (!user) {
    return (
      <div className="profile-page">
        <div style={{ textAlign: 'center', padding: '5rem 0' }}>
          <p>Carregando perfil...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="profile-page">
      <div className="profile-header-container relative">
        <ProfileHeader 
          user={user} 
          setUser={setUser} 
          onEditClick={handleEditClick} 
        />
      </div>

      <section className="divider-section">
        <hr className="divider-line" />
        <span className="divider-text">WSC</span>
        <hr className="divider-line" />
      </section>
      
      <div className="profile-body-content">
        <p>Seja bem-vindo(a) ao seu perfil! Gerencie suas informações e configurações aqui.</p>
        
        <UserFeed 
          user={user} 
          isPublicView={false} 
        />
      </div>

      {isEditing && <EditProfile onSave={handleSave} onCancel={handleCancel} />}

      <ProfileFooter />
      <div className="edit-profile-popup-container">
        {/* Agora o componente EditProfilePopup usa a prop showPopup que vem do App.jsx */}
        <EditProfilePopup show={showPopup} />
      </div>
    </div>
  );
}