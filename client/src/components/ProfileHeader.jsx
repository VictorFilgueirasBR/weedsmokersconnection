// src/components/ProfileHeader.jsx
import React, { useRef, useEffect } from "react";
import { FiEdit2 } from "react-icons/fi";

function ProfileHeader({ user, onEditClick }) {
  const cardRef = useRef(null);

  // Efeito highlight mouse
  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    const onMove = (e) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const px = (x / rect.width) * 100;
      const py = (y / rect.height) * 100;
      el.style.setProperty("--mx", `${px}%`);
      el.style.setProperty("--my", `${py}%`);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  // fallback URLs -> precisam estar em /public/images/
  const defaultBanner = "/images/bg-try-plans-wsc.jpeg";
  const defaultAvatar = "/images/profile-image-placeholder.png";

  // Filtro para evitar usar links inválidos do Cloudinary
  const isValidUrl = (url) =>
    url &&
    url.trim() !== "" &&
    !url.includes("res.cloudinary.com/your-cloud-name");

  // Garantindo SEMPRE um banner válido
  const bannerUrl = isValidUrl(user?.profileBanner)
    ? user.profileBanner
    : defaultBanner;

  // Garantindo SEMPRE um avatar válido
  const avatarUrl = isValidUrl(user?.profileImage)
    ? user.profileImage
    : defaultAvatar;

  const css = `
    .profile-header {
      position: relative;
      width: 100%;
      min-height: 200px;
      background-size: cover;
      background-position: center;
      background-color: #000;
      border: 3px solid rgba(236, 236, 236, 0.16);
      padding-top: 100px;
      padding-bottom: 30px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .glass-profile-card {
      --mx: 50%;
      --my: 50%;
      position: relative;
      border-radius: 24px;
      overflow: hidden;
      isolation: isolate;
      backdrop-filter: blur(2px) contrast(1.1) saturate(160%);
      -webkit-backdrop-filter: blur(1px) contrast(1.1) saturate(160%);
      background: rgba(255,255,255,0.02);
      border: 3px solid rgba(236, 236, 236, 0.16);
      box-shadow:
        inset 0 0 0 1px rgba(255,255,255,0.08),
        0 30px 80px rgba(0,0,0,0.45);
      animation: card-wobble 12s ease-in-out infinite;
      width: 95%;
      max-width: 900px;
      min-height: 160px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 1rem 2rem;
    }
    .glass-profile-card::before {
      content: "";
      position: absolute; inset: 0; border-radius: inherit; pointer-events: none;
      background: radial-gradient(
        circle at var(--mx) var(--my),
        rgba(255,255,255,0.28) 0%,
        rgba(255,255,255,0.08) 35%,
        rgba(255,255,255,0.00) 70%
      );
      backdrop-filter: blur(6px) contrast(1.15);
      -webkit-backdrop-filter: blur(6px) contrast(1.15);
      mix-blend-mode: screen;
      animation: wave 6s ease-in-out infinite;
    }
    .edge-chroma {
      position: absolute; inset: -1px; border-radius: inherit; pointer-events:none;
      background: conic-gradient(from 0deg,
        rgba(255,0,122,0.18), rgba(0,255,255,0.2), rgba(255,255,255,0.12), rgba(255,0,122,0.18)
      );
      mask: linear-gradient(#000,#000) content-box, linear-gradient(#000,#000);
      -webkit-mask: linear-gradient(#000,#000) content-box, linear-gradient(#000,#000);
      -webkit-mask-composite: xor; mask-composite: exclude;
      padding: 1px;
      opacity: .55;
      filter: blur(.5px);
    }
    .noise {
      position: absolute; inset: 0; border-radius: inherit; pointer-events:none;
      background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='240' height='240'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/><feColorMatrix type='saturate' values='0'/></filter><rect width='100%' height='100%' filter='url(%23n)' opacity='0.18'/></svg>");
      background-size: 240px 240px; background-repeat: repeat;
      mix-blend-mode: overlay; opacity: .35;
    }
    .profile-info {
      display: flex;
      align-items: center;
      gap: 1rem;
      z-index: 2;
    }
    .profile-image-wrapper {
      width: 80px;
      height: 80px;
      border-radius: 50%;
      border: 2px solid rgba(255,255,255,0.2);
      overflow: hidden;
      flex-shrink: 0;
      box-shadow: 0 4px 15px rgba(0,0,0,0.2);
    }
    .profile-image {
      width: 100%;
      height: 100%;
      background-size: cover;
      background-position: center;
    }
    .user-name {
      font-size: 1rem;
      font-weight: 600;
      color: #000000ff;
    }
    .edit-btn {
      position: relative;
      z-index: 2;
      background: rgba(255,255,255,0.08);
      border: 1px solid rgba(255,255,255,0.2);
      border-radius: 10px;
      padding: 6px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      color: #fff;
      transition: all .2s ease;
      box-shadow: 0 2px 8px rgba(0,0,0,0.25);
    }
    .edit-btn:hover {
      background: rgba(255,255,255,0.18);
      transform: translateY(-2px);
    }
    @keyframes wave {
      0%, 100% { transform: scale(1); }
      50% { transform: scale(1.03); }
    }
    @keyframes card-wobble {
      0%   { transform: scale(1) skewX(0deg) skewY(0deg); }
      25%  { transform: scale(1.01) skewX(0.6deg) skewY(-0.6deg); }
      50%  { transform: scale(1.008) skewX(-0.6deg) skewY(0.6deg); }
      75%  { transform: scale(1.012) skewX(0.3deg) skewY(-0.3deg); }
      100% { transform: scale(1) skewX(0deg) skewY(0deg); }
    }
    @media (max-width: 440px) {
      .glass-profile-card { padding-left: 0.6rem; padding-right: 0.6rem; }
      .glass-profile-card .user-name { font-size: 1rem; }
    }
    @media (max-width: 420px) {
      .glass-profile-card { padding-left: 0.7rem; padding-right: 0.7rem; }
      .glass-profile-card .user-name { font-size: 1rem; }
    }
    @media (max-width: 390px) {
      .glass-profile-card { padding-left: 0.7rem; padding-right: 0.7rem; }
      .glass-profile-card .user-name { font-size: 0.9rem; }
    }
    @media (max-width: 370px) {
      .glass-profile-card { padding-left: 0.7rem; padding-right: 0.7rem; }
      .glass-profile-card .user-name { font-size: 0.8rem; }
    }
  `;

  return (
    <>
      <style>{css}</style>
      <div
        className="profile-header"
        style={{ backgroundImage: `url("${bannerUrl}")` }}
      >
        <div ref={cardRef} className="glass-profile-card">
          <div className="edge-chroma" />
          <div className="noise" />
          <div className="profile-info">
            <div className="profile-image-wrapper">
              <div
                className="profile-image"
                style={{ backgroundImage: `url(${avatarUrl})` }}
              />
            </div>
            <h2 className="user-name">{user?.name || "Usuário"}</h2>
          </div>
          <button className="edit-btn" onClick={onEditClick}>
            <FiEdit2 size={16} />
          </button>
        </div>
      </div>
    </>
  );
}

export default ProfileHeader;
