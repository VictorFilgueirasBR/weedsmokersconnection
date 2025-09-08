// src/components/AgeConfirmModal.jsx
import React, { useEffect, useRef, useState } from "react";

/**
 * AgeConfirmModal (melhorado)
 * - Popup glass (70vh) com overlay escuro
 * - Guarda confirmação em localStorage por storageDays
 * - Mantém mouse-follow, trap de foco e prevenção de scroll no body
 * - Melhorias UI/UX: animações, hierarquia, acessibilidade e foco
 */
export default function AgeConfirmModal({
  backgroundImage = "/images/bg-try-plans.jpeg",
  storageKey = "wsc_ageVerified_v1",
  storageDays = 365,
  declineRedirect = "https://www.google.com",
  onConfirm = null,
  name = "CONFIRMAÇÃO",
  subtitle = "Este site é destinado apenas para maiores de idade.",
  delta = "Você tem 18 anos ou mais?",
}) {
  const [open, setOpen] = useState(false);
  const modalRef = useRef(null);
  const confirmBtnRef = useRef(null);

  const titleId = useRef(`age-title-${Math.random().toString(36).slice(2, 9)}`).current;
  const descId = useRef(`age-desc-${Math.random().toString(36).slice(2, 9)}`).current;

  function isVerified() {
    try {
      const raw = localStorage.getItem(storageKey);
      if (!raw) return false;
      const obj = JSON.parse(raw);
      if (!obj || !obj.expiry) return false;
      return Date.now() < obj.expiry;
    } catch (e) {
      return false;
    }
  }

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!isVerified()) setOpen(true);
  }, []);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  useEffect(() => {
    if (!open || !modalRef.current) return;
    const el = modalRef.current;
    const focusable = el.querySelectorAll(
      'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
    );
    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    function handleKey(e) {
      if (e.key === "Tab") {
        if (focusable.length === 0) {
          e.preventDefault();
          return;
        }
        if (e.shiftKey) {
          if (document.activeElement === first) {
            e.preventDefault();
            last.focus();
          }
        } else {
          if (document.activeElement === last) {
            e.preventDefault();
            first.focus();
          }
        }
      }
    }

    window.addEventListener("keydown", handleKey);
    if (confirmBtnRef.current) confirmBtnRef.current.focus();
    return () => window.removeEventListener("keydown", handleKey);
  }, [open]);

  function handleConfirm() {
    try {
      const expiry = Date.now() + storageDays * 24 * 60 * 60 * 1000;
      localStorage.setItem(storageKey, JSON.stringify({ expiry }));
    } catch (err) {}
    setOpen(false);
    if (typeof onConfirm === "function") onConfirm();
  }

  function handleDecline() {
    window.location.href = declineRedirect;
  }

  useEffect(() => {
    const el = modalRef.current;
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

  if (!open) return null;

  return (
    <div className="age-overlay" aria-hidden={open ? "false" : "true"}>
      <style>{modalCss}</style>
      <div
        className="age-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={descId}
        ref={modalRef}
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <div className="age-content">
          <header className="age-header">
            <h2 id={titleId} className="age-delta">{delta}</h2>
            <div className="age-badge" aria-hidden="true">
              <img src="/favicon.ico" alt="Site icon" width="32" height="32" />
            </div>
            <p className="age-sub">{subtitle}</p>
          </header>

          <div className="age-body" id={descId}>
            <ul className="age-points">
              <li>Conteúdo informativo e de comunidade</li>
              <li>Sem incentivo direto ao consumo</li>
              <li>Protegido para maiores de 18 anos</li>
            </ul>
          </div>

          <footer className="age-footer">
            <div className="age-actions">
              <button
                ref={confirmBtnRef}
                type="button"
                className="glass-btn primary"
                onClick={handleConfirm}
                aria-label="Confirmo que tenho 18 anos ou mais"
              >
                Confirmar 18+
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" style={{ marginLeft: 8 }}>
                  <path d="M5 12l5 5L20 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              <button
                type="button"
                className="glass-btn ghost"
                onClick={handleDecline}
                aria-label="Sair do site"
              >
                Sair
              </button>
            </div>
            <div className="age-legal">
              <small>Ao confirmar, você concorda em ver conteúdo destinado a maiores de 18 anos.</small>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
}

/* CSS atualizado */
const modalCss = `
  :root {
    --accent-1: #00c08a;
    --accent-2: #2065ff;
    --overlay-bg: rgba(6,8,12,0.85); /* mais escuro para maior contraste */
    --glass-border: rgba(255,255,255,0.08); /* menos visível */
    --glass-shadow: rgba(255,255,255,0.03);
    --muted: rgba(255,255,255,0.85);
  }

  .age-overlay {
    position: fixed;
    inset: 0;
    background: var(--overlay-bg);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999;
    padding: 1rem;
    animation: overlay-fade .28s ease-out;
  }

  .age-modal {
    --mx: 50%;
    --my: 50%;
    width: 100%;
    max-width: 520px; /* Reduzi a largura para focar no conteúdo */
    height: auto;
    max-height: 80vh;
    position: relative;
    border-radius: 24px;
    overflow: hidden;
    isolation: isolate;
    backdrop-filter: blur(10px) saturate(180%);
    -webkit-backdrop-filter: blur(10px) saturate(180%);
    background: linear-gradient(180deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.02) 100%);
    border: 1px solid var(--glass-border);
    box-shadow:
      inset 0 0 0 1px var(--glass-shadow),
      0 24px 60px rgba(3,6,18,0.7);
    transform-origin: center;
    animation: modal-pop .36s cubic-bezier(.12,.9,.26,1);
    background-position: center;
    background-size: cover;
    display: flex;
    flex-direction: column;
    padding: 2.5rem 2rem;
  }

  .age-modal::before {
    content: "";
    position: absolute;
    inset: 0;
    background: rgba(0,0,0,0.4); /* Overlay escuro para melhorar contraste */
    z-index: -1;
  }

  .age-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    width: 100%;
  }

  .age-header {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 2rem;
  }

  .age-badge {
    color: var(--accent-1);
    width: 50px;
    height: 50px;
    background: rgba(255, 255, 255, 0);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 0.5rem;
  }

  .age-badge img { /* Adicionado para garantir que a imagem se ajuste */
    width: 32px; /* Ou o tamanho desejado para o seu favicon */
    height: 32px;
    object-fit: contain;
  }
  
  .age-delta {
    font-size: 1.875rem; /* 30px */
    font-weight: 700;
    color: #fff;
    margin: 0;
    line-height: 1.2;
  }

  .age-sub {
    font-size: 1rem;
    color: var(--muted);
    font-weight: 500;
    margin: 0;
  }

  .age-body {
    width: 100%;
    margin-bottom: 2rem;
  }

  .age-points {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 0.75rem;
    text-align: left;
    color: var(--muted);
    font-size: 0.95rem;
  }

  .age-points li::before {
    content: '•';
    color: var(--accent-1);
    display: inline-block;
    width: 1em;
    margin-left: -1em;
  }

  .age-footer {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1.5rem;
  }

  .age-actions {
    display: flex;
    flex-direction: column-reverse; /* Inverte a ordem para priorizar o Confirmar em telas pequenas */
    gap: 1rem;
    width: 100%;
  }

  .glass-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 600;
    font-size: 1rem;
    padding: 1rem 1.5rem;
    border-radius: 12px;
    border: 1px solid transparent;
    cursor: pointer;
    transition: all 0.2s cubic-bezier(0.2, 0, 0.38, 0.9);
    min-height: 54px;
  }

  .glass-btn.primary {
    background: var(--accent-1);
    color: #fff;
    box-shadow: 0 4px 12px rgba(0, 192, 138, 0.3);
  }
  .glass-btn.primary:hover {
    background: #00e09a;
    box-shadow: 0 6px 16px rgba(0, 192, 138, 0.4);
    transform: translateY(-2px);
  }
  .glass-btn.primary:active {
    transform: translateY(0);
  }

  .glass-btn.ghost {
    background: rgba(255,255,255,0.06);
    color: var(--muted);
    border: 1px solid rgba(255,255,255,0.1);
  }
  .glass-btn.ghost:hover {
    background: rgba(255,255,255,0.1);
    color: #fff;
  }

  .age-legal {
    font-size: 0.8rem;
    color: rgba(255,255,255,0.6);
    text-align: center;
    line-height: 1.4;
  }

  /* Animações */
  @keyframes overlay-fade {
    from { opacity: 0; }
    to { opacity: 1; }
  }

  @keyframes modal-pop {
    from { opacity: 0; transform: scale(0.95) translateY(10px); }
    to { opacity: 1; transform: scale(1) translateY(0); }
  }

  /* Responsividade */
  @media (max-width: 520px) {
    .age-modal {
      padding: 2rem 1.5rem;
      border-radius: 16px;
    }
    .age-header {
      margin-bottom: 1.5rem;
    }
    .age-delta {
      font-size: 1.5rem;
    }
    .age-actions {
      flex-direction: column;
    }
  }
`;