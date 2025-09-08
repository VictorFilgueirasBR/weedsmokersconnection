// src/components/UserFeed.jsx
import React, { useState, useRef, useEffect } from "react";
import { FiPlus, FiDownload } from "react-icons/fi"; // Adicionado FiDownload
import { BsThreeDotsVertical } from "react-icons/bs";
import CreatePostModal from "./CreatePostModal";

export default function UserFeed({ user }) {
  const [posts, setPosts] = useState([]);
  const [isCreatePostModalOpen, setIsCreatePostModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [postToDelete, setPostToDelete] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [modalStep, setModalStep] = useState(0); // 0 = opções, 1 = confirmação de exclusão
  const mediaRefs = useRef([]);
  const cardRefs = useRef([]);

  const fetchPosts = async () => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/posts/me`, {
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Falha ao buscar postagens.");
      }

      const data = await response.json();
      setPosts(data.posts);
    } catch (error) {
      console.error("Erro ao buscar postagens:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownloadPost = () => {
    if (postToDelete && postToDelete.mediaUrl) {
      window.open(postToDelete.mediaUrl, '_blank');
    }
    setPostToDelete(null);
    setIsDeleteModalOpen(false);
    setModalStep(0); // Reinicia o modal para o passo 0
  };

  const handleDeletePost = async () => {
    if (!postToDelete) return;

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/posts/${postToDelete._id}`,
        {
          method: "DELETE",
          headers: {
            "Authorization": `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Falha ao excluir a postagem.");
      }

      setPosts(posts.filter((post) => post._id !== postToDelete._id));
      setPostToDelete(null);
      setIsDeleteModalOpen(false);
      setModalStep(0); // Reinicia o modal para o passo 0
    } catch (error) {
      console.error("Erro ao excluir postagem:", error);
      alert("Erro ao excluir a postagem. Tente novamente.");
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleAddPost = (newPost) => {
    setPosts([newPost, ...posts]);
  };

  const defaultBanner = "/images/bg-try-plans-wsc.jpeg";
  const bannerUrl = user?.profileBanner || defaultBanner;

  useEffect(() => {
    const handleMouseMove = (e) => {
      mediaRefs.current.forEach((ref) => {
        if (!ref) return;
        const rect = ref.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const px = (x / rect.width) * 100;
        const py = (y / rect.height) * 100;
        ref.style.setProperty("--mouse-x", `${px}%`);
        ref.style.setProperty("--mouse-y", `${py}%`);
      });

      cardRefs.current.forEach((ref) => {
        if (!ref) return;
        const rect = ref.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const px = (x / rect.width) * 100;
        const py = (y / rect.height) * 100;
        ref.style.setProperty("--mouse-x", `${px}%`);
        ref.style.setProperty("--mouse-y", `${py}%`);
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [posts]);

  const css = `
    .feed-container {
      width: 100%;
      max-width: 800px;
      margin: 2rem auto;
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
      position: relative;
      padding: 0 1rem;
    }
    .post-card {
      position: relative;
      border-radius: 20px;
      background: rgba(255,255,255,0.01);
      backdrop-filter: blur(1.5px) saturate(180%);
      -webkit-backdrop-filter: blur(1.5px) saturate(180%);
      border: 3px solid rgba(255,255,255,0.15);
      box-shadow: inset 0 0 0 1px rgba(255,255,255,0.06), 0 28px 70px rgba(0,0,0,0.45);
      padding: 1rem;
      color: rgba(255,255,255,0.95);
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
      --mouse-x: 50%;
      --mouse-y: 50%;
      overflow: hidden;
    }
    .post-card::before {
      content: "";
      position: absolute;
      inset: 0;
      border-radius: inherit;
      pointer-events: none;
      background: radial-gradient(circle at var(--mouse-x) var(--mouse-y), rgba(255,255,255,0.3) 0%, rgba(255,255,255,0) 60%);
      mix-blend-mode: screen;
      transition: background 0.05s ease-out;
      animation: wave 4s infinite ease-in-out;
    }
    .post-card::after {
      content:"";
      position:absolute;
      inset:-2px;
      border-radius: inherit;
      padding:4px;
      background: rgba(255,255,255,0.06);
      filter: blur(0.2px);
      pointer-events: none;
    }
    .post-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-weight: 600;
      color: #616161ff;
    }
    .post-media {
      width: 100%;
      max-height: 400px;
      border-radius: 12px;
      object-fit: cover;
      background: rgba(255,255,255,0.01);
      backdrop-filter: blur(1.2px) saturate(180%);
      -webkit-backdrop-filter: blur(2px) saturate(180%);
      border: 3px solid rgba(255,255,255,0.15);
      box-shadow: inset 0 0 0 1px rgba(255,255,255,0.06), 0 28px 70px rgba(0,0,0,0.45);
      position: relative;
      --mouse-x: 50%;
      --mouse-y: 50%;
      overflow: hidden;
    }
    .post-media::before {
      content: "";
      position: absolute;
      inset: 0;
      border-radius: inherit;
      pointer-events: none;
      background: radial-gradient(circle at var(--mouse-x) var(--mouse-y), rgba(255,255,255,0.3) 0%, rgba(255,255,255,0) 60%);
      mix-blend-mode: screen;
      transition: background 0.05s ease-out;
      animation: wave 4s infinite ease-in-out;
    }
    .post-media::after {
      content:"";
      position:absolute;
      inset:-2px;
      border-radius: inherit;
      padding:4px;
      background: rgba(255,255,255,0.06);
      filter: blur(0.2px);
    }
    .post-footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 0.9rem;
      color: #5a5a5aff;
    }
    @keyframes wave {
      0%, 100% { transform: scale(1) translateX(0); }
      50% { transform: scale(1.1) translateX(20px); }
    }
    .floating-btn {
      position: fixed;
      bottom: 2rem;
      right: 2rem;
      width: 60px;
      height: 60px;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.25);
      border: 1px solid rgba(255, 255, 255, 0.15);
      backdrop-filter: blur(10px);
      color: #9e9e9e;
      cursor: pointer;
      overflow: hidden;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.3s ease;
      font-size: 2rem;
      z-index: 100;
      box-shadow: 0 10px 25px rgba(0, 0, 0, 0.37);
    }
    .floating-btn img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 50%;
      filter: brightness(0.7);
    }
    .floating-btn::before {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(
        90deg,
        transparent,
        rgba(255, 255, 255, 0.1),
        transparent
      );
      animation: shine-slide 1s linear infinite;
      border-radius: 50%;
      z-index: 1;
      pointer-events: none;
    }
    .floating-btn:hover {
      transform: translateY(-2px);
      background: rgba(255, 255, 255, 0.1);
      box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
      color: rgba(160, 236, 250, 0.9);
    }
    @keyframes shine-slide {
      0% { left: -100%; }
      100% { left: 100%; }
    }
    @media (max-width: 600px) {
      .feed-container { padding: 0 0.5rem; }
      .floating-btn { width: 50px; height: 50px; font-size: 1.7rem; }
    }
    .delete-btn {
      background: none;
      border: none;
      color: #868686ff;
      cursor: pointer;
      font-size: 1.5rem;
      transition: color 0.2s;
    }
    .delete-btn:hover {
      color: #00f7ffff;
    }
    .modal-overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.75);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 1000;
    }
    .modal-content {
      background: #333;
      padding: 2rem;
      border-radius: 10px;
      text-align: center;
      color: white;
    }
    .modal-content button {
      margin: 0.5rem;
      padding: 0.5rem 1rem;
      border-radius: 5px;
      border: none;
      cursor: pointer;
    }
    .modal-content .confirm-btn {
      background-color: #5ffff2ff;
      color: white;
    }
    .modal-content .cancel-btn {
      background-color: #555;
      color: white;
    }
    .modal-content .options-btn-container {
      display: flex;
      justify-content: center;
      gap: 1rem;
      margin-top: 1rem;
    }
  `;

  return (
    <div className="feed-container">
      <style>{css}</style>

      {isLoading && <p style={{ textAlign: "center", color: "rgba(119, 119, 119, 0.7)" }}>Carregando postagens...</p>}

      {!isLoading && posts.length === 0 && (
        <p style={{
          textAlign: "center",
          color: "rgba(119, 119, 119, 0.38)",
          fontSize: "0.8rem"
        }}>
          Clique no botão + para postar ou guardar só pra você!
        </p>
      )}
      {!isLoading && posts.length > 0 && posts.map((post, idx) => {
        const postAuthorId = typeof post.author === 'object' ? post.author?._id : post.author;
        const isAuthor = user?._id === postAuthorId?.toString();

        console.log(`Verificando post ${post.title}: isAuthor = ${isAuthor}`);

        return (
          <div
            key={idx}
            ref={(el) => (cardRefs.current[idx] = el)}
            className="post-card"
          >
            <div className="post-header">
              <span>{post.author?.name || 'Autor Desconhecido'}</span>
              <span>{post.isPublic ? "🌐 Pública" : "🔒 Privada"}</span>
            </div>
            {(post.mediaUrl || post.mediaFile) && (
              <img
                ref={(el) => (mediaRefs.current[idx] = el)}
                src={post.mediaUrl || (post.mediaFile ? URL.createObjectURL(post.mediaFile) : '')}
                alt="post media"
                className="post-media"
              />
            )}
            <div className="post-footer">
              <span>{post.title}</span>
              {isAuthor && (
                <button
                  className="delete-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    console.log("Botão de exclusão clicado!");
                    setPostToDelete(post);
                    setIsDeleteModalOpen(true);
                    setModalStep(0); // Garante que o modal comece na primeira tela
                  }}
                >
                  <BsThreeDotsVertical />
                </button>
              )}
            </div>
          </div>
        );
      })}

      {isDeleteModalOpen && (
        <div className="modal-overlay" onClick={() => setIsDeleteModalOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            {modalStep === 0 ? (
              <>
                <p>O que você gostaria de fazer com esta postagem?</p>
                <div className="options-btn-container">
                  <button
                    className="confirm-btn"
                    onClick={handleDownloadPost}
                  >
                    <FiDownload style={{ marginRight: '8px' }} />
                    Download
                  </button>
                  <button
                    className="cancel-btn"
                    onClick={() => setModalStep(1)} // Avança para o passo de exclusão
                  >
                    Excluir
                  </button>
                </div>
              </>
            ) : (
              <>
                <p>Tem certeza que deseja excluir esta postagem?</p>
                <button className="confirm-btn" onClick={handleDeletePost}>
                  Confirmar
                </button>
                <button
                  className="cancel-btn"
                  onClick={() => setIsDeleteModalOpen(false)}
                >
                  Cancelar
                </button>
              </>
            )}
          </div>
        </div>
      )}

      <div
        className="floating-btn"
        onClick={() => setIsCreatePostModalOpen(true)}
        onMouseMove={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          const x = ((e.clientX - rect.left) / rect.width) * 100;
          const y = ((e.clientY - rect.top) / rect.height) * 100;
          e.currentTarget.style.setProperty("--mx", `${x}%`);
          e.currentTarget.style.setProperty("--my", `${y}%`);
        }}
      >
        <FiPlus />
      </div>

      <CreatePostModal
        isOpen={isCreatePostModalOpen}
        onClose={() => setIsCreatePostModalOpen(false)}
        user={user}
        onCreatePost={(post) => handleAddPost(post)}
      />
    </div>
  );
}