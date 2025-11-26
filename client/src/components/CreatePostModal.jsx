// src/components/CreatePostModal.jsx
import React, { useState } from "react";
import { FiX, FiUpload, FiLock, FiGlobe } from "react-icons/fi";

function CreatePostModal({ isOpen, onClose, user, onCreatePost }) {
  const [title, setTitle] = useState("");
  const [mediaFile, setMediaFile] = useState(null);
  const [isPublic, setIsPublic] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) {
    return null;
  }

  const handleFileChange = (e) => {
    setMediaFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData();
    formData.append("title", title);
    formData.append("isPublic", isPublic);
    formData.append("media", mediaFile);

    try {
      const apiURL = import.meta.env.VITE_API_URL;

      const response = await fetch(`${apiURL}/api/posts/create`, {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (!response.ok) {
        throw new Error("Erro ao criar a postagem.");
      }

      const data = await response.json();
      console.log("Postagem criada com sucesso:", data.post);
      
      if (onCreatePost) {
        // CORREÇÃO AQUI: Passa a postagem exatamente como foi retornada do backend
        onCreatePost(data.post);
      }

      setTitle("");
      setMediaFile(null);
      setIsPublic(true);
      onClose();

    } catch (error) {
      console.error("Falha na criação da postagem:", error);
      alert("Erro ao criar a postagem. Tente novamente.");

    } finally {
      setIsLoading(false);
    }
  };

  const defaultBanner = "/images/bg-try-plans-wsc.jpeg";
  const bannerUrl = user?.profileBanner || defaultBanner;

  const css = `
    .modal-overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-image: url("${bannerUrl}");
      background-size: cover;
      background-position: center;
      background-color: rgba(0, 0, 0, 0.6);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 1000;
      backdrop-filter: blur(5px);
    }
    .modal-container {
      --mx: 50%;
      --my: 50%;
      position: relative;
      background: rgba(0, 0, 0, 0.15);
      border-radius: 24px;
      overflow: hidden;
      isolation: isolate;
      backdrop-filter: blur(2px) contrast(1.1) saturate(160%);
      -webkit-backdrop-filter: blur(1px) contrast(1.1) saturate(160%);
      border: 3px solid rgba(236, 236, 236, 0.16);
      box-shadow:
        inset 0 0 0 1px rgba(255, 255, 255, 0.08),
        0 30px 80px rgba(0, 0, 0, 0.45);
      width: 90%;
      max-width: 500px;
      padding: 2rem;
      color: rgba(255,255,255,0.92);
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
      animation: modal-wobble 12s ease-in-out infinite;
      text-shadow: 0 1px 2px rgba(0,0,0,0.6);
    }
    .modal-container::before {
      content: "";
      position: absolute; inset: 0; border-radius: inherit; pointer-events: none;
      background: radial-gradient(
        circle at var(--mx) var(--my),
        rgba(255, 255, 255, 0.28) 0%,
        rgba(255, 255, 255, 0.08) 35%,
        rgba(255, 255, 255, 0) 70%
      );
      backdrop-filter: blur(6px) contrast(1.15);
      -webkit-backdrop-filter: blur(6px) contrast(1.15);
      mix-blend-mode: screen;
      animation: wave 6s ease-in-out infinite;
    }
    .modal-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid rgba(255,255,255,0.25);
      padding-bottom: 1rem;
      color: rgba(255,255,255,1);
    }
    .modal-header h2 {
      margin: 0;
      font-size: 1.5rem;
      font-weight: 600;
    }
    .close-btn {
      background: transparent;
      border: none;
      color: rgba(255,255,255,0.9);
      cursor: pointer;
      font-size: 1.5rem;
      opacity: 0.7;
      transition: opacity 0.2s;
    }
    .close-btn:hover {
      opacity: 1;
    }
    .modal-body {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      color: rgba(255,255,255,0.92);
    }
    .input-group {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      color: rgba(255,255,255,0.92);
    }
    .input-group label {
      font-weight: 500;
      color: rgba(255, 255, 255, 1);
    }
    .input-field {
      width: 100%;
      padding: 0.75rem;
      border: 1px solid rgba(255,255,255,0.7);
      border-radius: 8px;
      background: rgba(0, 0, 0, 0.05);
      color: rgba(255, 255, 255, 1);
      font-size: 1rem;
      text-shadow: 0 1px 2px rgba(0,0,0,0.6);
    }
    .input-field::placeholder {
      color: rgba(255, 255, 255, 1);
    }
    .input-field:focus {
      outline: none;
      border-color: rgba(255, 255, 255, 1);
      background: rgba(255,255,255,0.10);
    }
    .file-input-wrapper {
      display: flex;
      align-items: center;
      gap: 1rem;
      padding: 0.75rem;
      border: 1px solid rgba(255,255,255,0.6);
      border-radius: 8px;
      cursor: pointer;
      transition: background-color 0.2s;
      color: rgba(255, 255, 255, 1);
    }
    .file-input-wrapper:hover {
      background: rgba(255,255,255,0.05);
    }
    .file-input {
      display: none;
    }
    .upload-info {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      font-size: 0.9rem;
      color: rgba(255, 255, 255, 1);
    }
    .privacy-toggle {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      font-weight: 500;
      font-size: 1rem;
      cursor: pointer;
      color: rgba(255, 255, 255, 1);
      padding-top: 1rem;
      border-top: 1px solid rgba(255,255,255,0.25);
    }
    .toggle-switch {
      position: relative;
      display: inline-block;
      width: 44px;
      height: 24px;
    }
    .toggle-switch input {
      opacity: 0;
      width: 0;
      height: 0;
    }
    .slider {
      position: absolute;
      cursor: pointer;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: rgba(200,200,200,0.6);
      transition: 0.4s;
      border-radius: 24px;
    }
    .slider:before {
      position: absolute;
      content: "";
      height: 18px;
      width: 18px;
      left: 3px;
      bottom: 3px;
      background-color: white;
      transition: 0.4s;
      border-radius: 50%;
    }
    input:checked + .slider {
      background-color: #44f321ff;
    }
    input:checked + .slider:before {
      transform: translateX(20px);
    }
    .privacy-icon {
      margin-left: auto;
    }
    .modal-actions {
      display: flex;
      justify-content: flex-end;
      gap: 1rem;
      padding-top: 1rem;
      border-top: 1px solid rgba(255,255,255,0.25);
    }
    .btn {
      padding: 0.75rem 1.5rem;
      border-radius: 10px;
      font-size: 1rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s ease;
    }
    .btn-secondary {
      background: rgba(255,255,255,0.1);
      border: 1px solid rgba(255,255,255,0.6);
      color: rgba(255,255,255,0.92);
    }
    .btn-secondary:hover {
      background: rgba(255,255,255,0.18);
    }
    .btn-primary {
      background: linear-gradient(45deg, #48ff00ff, #75f065ff);
      border: none;
      color: #fff;
      box-shadow: 0 4px 15px rgba(140, 240, 101, 0.4);
      text-shadow: 0 1px 2px rgba(0,0,0,0.6);
    }
    .btn-primary:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 20px rgba(106, 240, 101, 0.6);
    }
    @keyframes modal-wobble {
      0%  { transform: scale(1) skewX(0deg) skewY(0deg); }
      25%  { transform: scale(1.005) skewX(0.3deg) skewY(-0.3deg); }
      50%  { transform: scale(1.002) skewX(-0.3deg) skewY(0.3deg); }
      75%  { transform: scale(1.006) skewX(0.15deg) skewY(-0.15deg); }
      100% { transform: scale(1) skewX(0deg) skewY(0deg); }
    }
    @media (max-width: 420px) {
      .modal-container { padding: 1.5rem; }
      .modal-header h2 { font-size: 1.3rem; }
      .btn { padding: 0.6rem 1.2rem; }
    }
  `;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <style>{css}</style>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <div className="edge-chroma" />
        <div className="noise" />
        <div className="modal-header">
          <h2>Criar Nova Postagem</h2>
          <button className="close-btn" onClick={onClose}>
            <FiX />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="modal-body">
          <div className="input-group">
            <label htmlFor="post-title">Título da Postagem</label>
            <input
              id="post-title"
              type="text"
              className="input-field"
              placeholder="Guarde momentos e documentos importantes no seu perfil"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label>Mídia (Foto ou Vídeo)</label>
            <label htmlFor="media-upload" className="file-input-wrapper">
              <FiUpload />
              <div className="upload-info">
                {mediaFile ? mediaFile.name : "Clique para selecionar na sua galeria"}
              </div>
              <input
                id="media-upload"
                type="file"
                className="file-input"
                onChange={handleFileChange}
                accept="image/*, video/*"
                required
              />
            </label>
          </div>
          <div
            className="privacy-toggle"
            onClick={() => setIsPublic(!isPublic)}
          >
            <span>Tipo de Postagem:</span>
            <label className="toggle-switch">
              <input
                type="checkbox"
                checked={isPublic}
                onChange={() => setIsPublic(!isPublic)}
              />
              <span className="slider" />
            </label>
            <span className="privacy-icon">
              {isPublic ? <FiGlobe /> : <FiLock />}
            </span>
            <span>{isPublic ? "Pública" : "Privada"}</span>
          </div>
          <div className="modal-actions">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onClose}
            >
              Cancelar
            </button>
            <button 
              type="submit" 
              className="btn btn-primary"
              disabled={isLoading}
            >
              {isLoading ? "Publicando..." : "Publicar"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreatePostModal;