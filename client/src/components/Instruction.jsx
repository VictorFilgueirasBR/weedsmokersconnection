// src/components/Instruction.jsx
import React from "react";

export default function Instruction({
  title = "Seja bem-vindo ao CLUB",
  subtitle = "Entre em contato para instruções ou parcelamento em até 12x.",
  whatsappUrl = "https://wa.me/5511999999999",
  telegramUrl = "https://t.me/seuCanal",
}) {
  return (
    <div className="contact-card-wrapper">
      <style>{contactCardCss}</style>
      <div className="contact-card glass">
        <header className="contact-header">
          <h2 className="contact-title">{title}</h2>
          <p className="contact-sub">{subtitle}</p>
        </header>

        <div className="contact-actions">
          <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="contact-btn whatsapp">
            <img src="/icons/whatsapp.svg" alt="WhatsApp" width="22" height="22" />
            Falar no WhatsApp
          </a>
          <a href={telegramUrl} target="_blank" rel="noopener noreferrer" className="contact-btn telegram">
            <img src="/icons/telegram.svg" alt="Telegram" width="22" height="22" />
            Entrar no Telegram
          </a>
        </div>
      </div>
    </div>
  );
}

const contactCardCss = `
  :root {
    --accent-1: #00c08a;
    --accent-2: #2065ff;
    --glass-border: rgba(255,255,255,0.08);
    --glass-shadow: rgba(255,255,255,0.04);
    --muted: rgba(255,255,255,0.85);
  }

  .contact-card-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 2rem;
  }

  .contact-card {
    max-width: 480px;
    width: 100%;
    padding: 2rem;
    border-radius: 20px;
    text-align: center;
    background: linear-gradient(180deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%);
    backdrop-filter: blur(12px) saturate(160%);
    -webkit-backdrop-filter: blur(12px) saturate(160%);
    border: 1px solid var(--glass-border);
    box-shadow: inset 0 0 0 1px var(--glass-shadow), 0 20px 60px rgba(3,6,18,0.65);
    color: var(--muted);
    animation: card-pop .4s cubic-bezier(.16,.8,.26,1);
  }

  .contact-header {
    margin-bottom: 1.8rem;
  }

  .contact-title {
    font-size: 1.75rem;
    font-weight: 700;
    color: #fff;
    margin: 0 0 0.5rem;
  }

  .contact-sub {
    font-size: 1rem;
    color: var(--muted);
    line-height: 1.5;
  }

  .contact-actions {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin-top: 1rem;
  }

  .contact-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.6rem;
    font-weight: 600;
    font-size: 1rem;
    padding: 1rem 1.4rem;
    border-radius: 12px;
    border: none;
    text-decoration: none;
    cursor: pointer;
    transition: all 0.25s cubic-bezier(.2, 0, .38, .9);
  }

  .contact-btn.whatsapp {
    background: var(--accent-1);
    color: #fff;
    box-shadow: 0 4px 14px rgba(0,192,138,0.3);
  }
  .contact-btn.whatsapp:hover {
    background: #00e09a;
    transform: translateY(-2px);
  }

  .contact-btn.telegram {
    background: var(--accent-2);
    color: #fff;
    box-shadow: 0 4px 14px rgba(32,101,255,0.3);
  }
  .contact-btn.telegram:hover {
    background: #3c7aff;
    transform: translateY(-2px);
  }

  @keyframes card-pop {
    from { opacity: 0; transform: scale(0.95) translateY(10px); }
    to { opacity: 1; transform: scale(1) translateY(0); }
  }

  @media (max-width: 520px) {
    .contact-card {
      padding: 1.8rem 1.4rem;
      border-radius: 16px;
    }
    .contact-title {
      font-size: 1.5rem;
    }
  }
`;
