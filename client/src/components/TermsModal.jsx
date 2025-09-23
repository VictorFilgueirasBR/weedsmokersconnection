// src/components/TermsModal.jsx
import React, { useEffect, useRef, useState } from "react";

export default function TermsModal({
  storageKey = "wsc_termsAccepted_v1",
  storageDays = 365,
  declineRedirect = "https://www.google.com",
  onAccept = null,
}) {
  const [open, setOpen] = useState(false);
  const modalRef = useRef(null);
  const acceptBtnRef = useRef(null);

  const titleId = useRef(`terms-title-${Math.random().toString(36).slice(2, 9)}`).current;
  const descId = useRef(`terms-desc-${Math.random().toString(36).slice(2, 9)}`).current;

  function isAccepted() {
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
    if (!isAccepted()) setOpen(true);
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
      if (e.key === "Escape") {
        e.preventDefault();
        handleDecline();
      }
    }

    window.addEventListener("keydown", handleKey);
    if (acceptBtnRef.current) acceptBtnRef.current.focus();
    return () => window.removeEventListener("keydown", handleKey);
  }, [open]);

  function handleAccept() {
    try {
      const expiry = Date.now() + storageDays * 24 * 60 * 60 * 1000;
      localStorage.setItem(storageKey, JSON.stringify({ expiry }));
    } catch (err) {}
    setOpen(false);
    if (typeof onAccept === "function") onAccept();
  }

  function handleDecline() {
    window.location.href = declineRedirect;
  }

  if (!open) return null;

  return (
    <div className="terms-overlay" aria-hidden={open ? "false" : "true"}>
      <style>{modalCss}</style>
      <div
        className="terms-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={descId}
        ref={modalRef}
      >
        <div className="terms-content">
          <header className="terms-header">
            <h2 id={titleId} className="terms-title">📄 Termos de Uso do Clube</h2>
            <p className="terms-sub">Leia com atenção antes de continuar</p>
          </header>

          <div className="terms-body" id={descId}>
            <p>Bem-vindo ao Weed Smokers Pass 🚀</p>
            <p>Antes de acessar a área restrita, precisamos alinhar algumas regras:</p>

            <ol className="terms-points">
              <li><strong>Conteúdo educativo</strong><br/>O que você verá aqui é sobre cannabis medicinal, em caráter informativo. Não é propaganda nem venda aberta.</li>
              <li><strong>Prescrição é lei</strong><br/>Apenas médicos podem indicar tratamento com cannabis. Nada substitui consulta médica.</li>
              <li><strong>Acesso restrito</strong><br/>Área exclusiva para assinantes. Não compartilhe prints ou informações externas ao clube.</li>
              <li><strong>Responsabilidade</strong><br/>O clube não vende medicamentos. Produtos listados são referências. O acesso legal segue RDC 327/2019 e RDC 660/2022 da Anvisa.</li>
              <li><strong>Aceite</strong><br/>Ao concordar, você declara que: entende o caráter informativo, que não substitui médico, e respeitará as regras do clube.</li>
            </ol>

            <section className="terms-legal">
              <h3>📌 Sobre tributação e imunidade</h3>
              <p>
                Nos enquadramos estritamente como conteúdo educativo/didático. A Constituição Federal (art. 150, VI) concede <strong>imunidade tributária</strong> para livros, jornais e periódicos, isentando ICMS, IPI e ISS.
              </p>
              <p>
                Isso significa que: a circulação de materiais didáticos (apostilas, e-books, cursos em formato de livro) não sofre tributação nesses impostos. 
                Contudo, <strong>a renda da empresa ainda pode ser tributada por IRPJ/CSLL</strong>, salvo em caso de associação educacional sem fins lucrativos.
              </p>
              <p>
                Estratégias legais incluem atuar como editora de material educacional ou estruturar associação cultural/educacional sem fins lucrativos. 
              </p>
            </section>
          </div>

          <footer className="terms-footer">
            <div className="terms-actions">
              <button
                ref={acceptBtnRef}
                type="button"
                className="glass-btn primary"
                onClick={handleAccept}
                aria-label="Concordo com os termos"
              >
                Concordo
              </button>
              <button
                type="button"
                className="glass-btn ghost"
                onClick={handleDecline}
                aria-label="Não concordo e sair"
              >
                Não concordo
              </button>
            </div>
            <div className="terms-note">
              <small>Ao clicar em "Concordo", você aceita os termos descritos acima.</small>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
}

/* CSS semelhante ao AgeConfirmModal */
const modalCss = `
  .terms-overlay {
    position: fixed;
    inset: 0;
    background: rgba(6,8,12,0.85);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999;
    padding: 1rem;
    animation: overlay-fade .28s ease-out;
  }

  .terms-modal {
    width: 100%;
    max-width: 640px;
    max-height: 85vh;
    border-radius: 24px;
    overflow: hidden auto;
    backdrop-filter: blur(10px) saturate(180%);
    background: linear-gradient(180deg, rgba(255,255,255,0.04), rgba(255,255,255,0.02));
    border: 1px solid rgba(255,255,255,0.08);
    box-shadow: 0 24px 60px rgba(3,6,18,0.7);
    padding: 2.5rem 2rem;
    display: flex;
    flex-direction: column;
    animation: modal-pop .36s cubic-bezier(.12,.9,.26,1);
    color: #fff;
  }

  .terms-header {
    text-align: center;
    margin-bottom: 1.5rem;
  }

  .terms-title {
    font-size: 1.75rem;
    font-weight: 700;
    margin: 0;
  }

  .terms-sub {
    font-size: 1rem;
    color: rgba(255,255,255,0.8);
    margin: 0.5rem 0 0;
  }

  .terms-body {
    font-size: 0.95rem;
    line-height: 1.5;
    margin-bottom: 2rem;
  }

  .terms-points {
    list-style: decimal inside;
    padding-left: 1rem;
    margin: 1rem 0;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  .terms-legal {
    background: rgba(255,255,255,0.05);
    border: 1px solid rgba(255,255,255,0.1);
    border-radius: 12px;
    padding: 1rem;
    font-size: 0.9rem;
    margin-top: 1.5rem;
  }

  .terms-legal h3 {
    margin-top: 0;
    margin-bottom: 0.5rem;
    font-size: 1rem;
    color: #00c08a;
  }

  .terms-footer {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1.25rem;
  }

  .terms-actions {
    display: flex;
    flex-direction: column-reverse;
    gap: 1rem;
    width: 100%;
  }

  .glass-btn {
    padding: 1rem 1.5rem;
    border-radius: 12px;
    font-weight: 600;
    font-size: 1rem;
    cursor: pointer;
    transition: all 0.2s;
    min-height: 54px;
  }

  .glass-btn.primary {
    background: #00c08a;
    color: #fff;
    border: none;
  }

  .glass-btn.ghost {
    background: rgba(255,255,255,0.06);
    border: 1px solid rgba(255,255,255,0.1);
    color: rgba(255,255,255,0.85);
  }

  @keyframes overlay-fade {
    from { opacity: 0; }
    to { opacity: 1; }
  }

  @keyframes modal-pop {
    from { opacity: 0; transform: scale(0.95) translateY(10px); }
    to { opacity: 1; transform: scale(1) translateY(0); }
  }

  @media (max-width: 520px) {
    .terms-modal {
      padding: 2rem 1.25rem;
      border-radius: 16px;
    }
  }
`;
