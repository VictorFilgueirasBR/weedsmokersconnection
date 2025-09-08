// src/components/EditProfile.jsx
import React, { useState, useRef, useEffect, useContext } from 'react';
import { FiUser, FiUpload, FiImage, FiX } from "react-icons/fi";
import axios from 'axios';
import './EditProfile.scss';
import { AuthContext } from '../App'; // Importa o AuthContext

const BASE_URL = import.meta?.env?.VITE_API_URL || 'http://localhost:5000';

export default function EditProfile({ user, onSave, onCancel }) {
  const { user: authUser, setUser: setAuthUser } = useContext(AuthContext); // Use o contexto para obter o usuário logado
  const token = localStorage.getItem('token'); // Pega o token diretamente do localStorage

  const [activeSection, setActiveSection] = useState('main');

  // Form
  const [newUsername, setNewUsername] = useState(user?.name || '');
  const [profileImageFile, setProfileImageFile] = useState(null);
  const [profileBannerFile, setProfileBannerFile] = useState(null);

  // Preview / drag
  const [previewProfileImage, setPreviewProfileImage] = useState(user?.profileImage || null);
  const [isProfileImageDragActive, setIsProfileImageDragActive] = useState(false);
  const profileImageInputRef = useRef(null);

  const [previewProfileBanner, setPreviewProfileBanner] = useState(user?.profileBanner || null);
  const [isProfileBannerDragActive, setIsProfileBannerDragActive] = useState(false);
  const profileBannerInputRef = useRef(null);

  const modalRef = useRef(null);

  // Fechar ao clicar fora
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) onCancel();
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onCancel]);

  // Evitar vazamento de URLs de preview
  useEffect(() => {
    return () => {
      if (previewProfileImage?.startsWith?.('blob:')) URL.revokeObjectURL(previewProfileImage);
      if (previewProfileBanner?.startsWith?.('blob:')) URL.revokeObjectURL(previewProfileBanner);
    };
  }, [previewProfileImage, previewProfileBanner]);

  // Header com o token
  const authHeader = token ? { Authorization: `Bearer ${token}` } : {};

  const handleDrag = (e, setDragActive) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(e.type === "dragenter" || e.type === "dragover");
  };

  const handleFileChange = (e, fileType) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const previewURL = URL.createObjectURL(file);
      if (fileType === 'profileImage') {
        setProfileImageFile(file);
        setPreviewProfileImage(previewURL);
      } else {
        setProfileBannerFile(file);
        setPreviewProfileBanner(previewURL);
      }
    } else {
      alert("Formato inválido. Selecione uma imagem.");
    }
  };

  const handleDrop = (e, fileType, setFile, setPreview) => {
    e.preventDefault();
    e.stopPropagation();
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const previewURL = URL.createObjectURL(file);
      setFile(file);
      setPreview(previewURL);
    } else {
      alert("Formato inválido. Selecione uma imagem.");
    }
  };

  const handleRemove = (fileType) => {
    if (fileType === 'profileImage') {
      setProfileImageFile(null);
      setPreviewProfileImage(user?.profileImage || null);
      if (profileImageInputRef.current) profileImageInputRef.current.value = null;
    } else {
      setProfileBannerFile(null);
      setPreviewProfileBanner(user?.profileBanner || null);
      if (profileBannerInputRef.current) profileBannerInputRef.current.value = null;
    }
  };

  const handleSubmit = async (e, type) => {
    e.preventDefault();

    try {
      if (!token) {
        return alert('Você não está autenticado. Faça login para continuar.');
      }

      if (type === 'username' && newUsername && newUsername !== user?.name) {
        const { data } = await axios.put(
          `${BASE_URL}/api/profile/username`,
          { name: newUsername },
          { headers: { 'Content-Type': 'application/json', ...authHeader } }
        );
        if (onSave) onSave(data.user);
      }

      if (type === 'profileImage' && profileImageFile) {
        const fd = new FormData();
        fd.append('image', profileImageFile);
        const { data } = await axios.put(
          `${BASE_URL}/api/profile/image?type=avatar`,
          fd,
          { headers: { 'Content-Type': 'multipart/form-data', ...authHeader } }
        );
        setPreviewProfileImage(data.url);
        if (onSave) onSave(data.user);
      }

      if (type === 'profileBanner' && profileBannerFile) {
        const fd = new FormData();
        fd.append('image', profileBannerFile);
        const { data } = await axios.put(
          `${BASE_URL}/api/profile/image?type=banner`,
          fd,
          { headers: { 'Content-Type': 'multipart/form-data', ...authHeader } }
        );
        setPreviewProfileBanner(data.url);
        if (onSave) onSave(data.user);
      }

      setActiveSection('main');
    } catch (err) {
      console.error(err);
      alert(err?.response?.data?.message || 'Não foi possível salvar. Tente novamente.');
    }
  };

  const renderMainSettings = () => (
    <>
      <button className="main-option-btn" onClick={() => setActiveSection('username')}>
        <FiUser className="icon" size={16} /> Alterar Nome de Usuário
      </button>
      <button className="main-option-btn" onClick={() => setActiveSection('avatar')}>
        <FiUpload className="icon" size={16} /> Mudar Foto de Perfil
      </button>
      <button className="main-option-btn" onClick={() => setActiveSection('banner')}>
        <FiImage className="icon" size={16} /> Mudar Banner de Perfil
      </button>
    </>
  );

  const renderUsernameSection = () => (
    <form onSubmit={(e) => handleSubmit(e, 'username')}>
      <div className="form-group">
        <label>Nome de Usuário</label>
        <input
          type="text"
          value={newUsername}
          onChange={(e) => setNewUsername(e.target.value)}
          placeholder="Digite o novo nome"
        />
      </div>
      <div className="form-actions">
        <button type="button" onClick={() => setActiveSection('main')} className="cancel-btn">
          Voltar
        </button>
        <button type="submit" className="save-btn">Salvar</button>
      </div>
    </form>
  );

  const renderAvatarSection = () => (
    <form onSubmit={(e) => handleSubmit(e, 'profileImage')}>
      <div className="form-group">
        <label>Imagem de Perfil</label>
        <div
          className={`drag-drop-area ${isProfileImageDragActive ? 'active' : ''}`}
          onDragOver={(e) => handleDrag(e, setIsProfileImageDragActive)}
          onDragLeave={(e) => handleDrag(e, setIsProfileImageDragActive)}
          onDrop={(e) => handleDrop(e, 'profileImage', setProfileImageFile, setPreviewProfileImage)}
          onClick={() => profileImageInputRef.current?.click()}
        >
          {previewProfileImage ? (
            <>
              <img src={previewProfileImage} alt="Pré-visualização" className="image-preview" />
              <button
                type="button"
                className="cancel-btn"
                style={{ position: 'absolute', top: 12, right: 12, padding: '6px 10px' }}
                onClick={(ev) => { ev.stopPropagation(); handleRemove('profileImage'); }}
              >
                Remover
              </button>
            </>
          ) : (
            <>
              <span className="upload-icon">+</span>
              <p>Arraste e solte ou clique para fazer upload</p>
            </>
          )}
        </div>
        <input
          id="profileImageUpload"
          type="file"
          accept="image/jpeg, image/png, image/webp, image/gif"
          onChange={(e) => handleFileChange(e, 'profileImage')}
          ref={profileImageInputRef}
          style={{ display: 'none' }}
        />
      </div>
      <div className="form-actions">
        <button type="button" onClick={() => setActiveSection('main')} className="cancel-btn">Voltar</button>
        <button type="submit" className="save-btn">Salvar</button>
      </div>
    </form>
  );

  const renderBannerSection = () => (
    <form onSubmit={(e) => handleSubmit(e, 'profileBanner')}>
      <div className="form-group">
        <label>Banner de Perfil</label>
        <div
          className={`drag-drop-area ${isProfileBannerDragActive ? 'active' : ''}`}
          onDragOver={(e) => handleDrag(e, setIsProfileBannerDragActive)}
          onDragLeave={(e) => handleDrag(e, setIsProfileBannerDragActive)}
          onDrop={(e) => handleDrop(e, 'profileBanner', setProfileBannerFile, setPreviewProfileBanner)}
          onClick={() => profileBannerInputRef.current?.click()}
        >
          {previewProfileBanner ? (
            <>
              <img src={previewProfileBanner} alt="Pré-visualização" className="image-preview" />
              <button
                type="button"
                className="cancel-btn"
                style={{ position: 'absolute', top: 12, right: 12, padding: '6px 10px' }}
                onClick={(ev) => { ev.stopPropagation(); handleRemove('profileBanner'); }}
              >
                Remover
              </button>
            </>
          ) : (
            <>
              <span className="upload-icon">+</span>
              <p>Arraste e solte ou clique para fazer upload</p>
            </>
          )}
        </div>
        <input
          id="profileBannerUpload"
          type="file"
          accept="image/jpeg, image/png, image/webp, image/gif"
          onChange={(e) => handleFileChange(e, 'profileBanner')}
          ref={profileBannerInputRef}
          style={{ display: 'none' }}
        />
      </div>
      <div className="form-actions">
        <button type="button" onClick={() => setActiveSection('main')} className="cancel-btn">Voltar</button>
        <button type="submit" className="save-btn">Salvar</button>
      </div>
    </form>
  );

  return (
    <div className="edit-profile-overlay">
      <div className="edit-profile-modal" ref={modalRef}>
        <button className="close-btn" onClick={onCancel}><FiX /></button>
        <h3>Editar Perfil</h3>
        {activeSection === 'main' && renderMainSettings()}
        {activeSection === 'username' && renderUsernameSection()}
        {activeSection === 'avatar' && renderAvatarSection()}
        {activeSection === 'banner' && renderBannerSection()}
      </div>
    </div>
  );
}