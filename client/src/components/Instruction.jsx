// src/components/InstructionGlass.jsx
import React, { useRef, useEffect } from "react";

export default function Instruction({
  title = "Seja bem-vindo ao CLUB",
  subtitle = "Entre em contato para instruções ou parcelamento em até 12x.",
  whatsappUrl = "https://wa.me/5511999999999",
  telegramUrl = "https://t.me/seuCanal",
  backgroundImage = "/images/hemp222.jpeg", // <--- Sua nova imagem de fundo
  contactTitle = "Fale Conosco",
  contactSubtitle = "Suporte | Dúvidas | Pagamentos",
}) {
  const cardRef = useRef(null);

  // Efeito para o highlight que segue o mouse
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

  return (
    <div style={{ ...styles.page, backgroundImage: `url(${backgroundImage})` }}>
      {/* Estilos locais */}
      <style>{css}</style>

      {/* Card Principal */}
      <div ref={cardRef} className="glass-card instruction-card" style={styles.card}>
        {/* Overlay de chromatic edge (halo sutil nas bordas) */}
        <div className="edge-chroma" />
        {/* Textura de vidro (noise SVG embutido) */}
        <div className="noise" />

        {/* Conteúdo */}
        <div style={styles.contentWrap}>
          {/* Header */}
          <header style={styles.header}>
            <h2 style={styles.title}>{title}</h2>
            <p style={styles.subtitle}>{subtitle}</p>
          </header>

          {/* Área de Contato (no lugar dos dados do 'cartão') */}
          <div style={styles.contactArea}>
            <h3 style={styles.contactTitle}>{contactTitle}</h3>
            <p style={styles.contactSubtitle}>{contactSubtitle}</p>
          </div>

          {/* Ações (Botões) */}
          <div style={styles.actionsRow}>
            <a 
              href={whatsappUrl} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="glass-btn whatsapp-btn" 
              style={styles.actionBtn}
            >
              <img src="/icons/whatsapp.svg" alt="WhatsApp" width="22" height="22" style={{filter: 'brightness(0) invert(1)'}}/>
              WhatsApp
            </a>
            <a 
              href={telegramUrl} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="glass-btn telegram-btn" 
              style={styles.actionBtn}
            >
              <img src="/icons/telegram.svg" alt="Telegram" width="22" height="22" style={{filter: 'brightness(0) invert(1)'}}/>
              Telegram
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

// ----------------------------------------------------------------------
// --- CSS puro (glass + refração + distorção + textura + halo) adaptado ---
// ----------------------------------------------------------------------
const css = `
  :root {
    --whatsapp-color: #25D366;
    --telegram-color: #0088CC;
  }

  .glass-card {
    --mx: 50%;
    --my: 50%;
    position: relative;
    border-radius: 24px;
    overflow: hidden;
    isolation: isolate;
    backdrop-filter: blur(2px) contrast(1.1) saturate(160%);
    -webkit-backdrop-filter: blur(1px) contrast(1.1) saturate(160%);
    background: rgba(255,255,255,0.02);
    border: 6px solid rgba(236, 236, 236, 0.16);
    box-shadow:
      inset 0 0 0 1px rgba(255,255,255,0.08),
      0 30px 80px rgba(0,0,0,0.45);
    animation: card-wobble 12s ease-in-out infinite;
    cursor: default; /* Alterado para default, pois é um cartão de instruções */
    transition: transform 0.3s ease-out;
  }
  .glass-card:hover {
    transform: scale(1.01);
  }

  /* Reflexo/distorção que segue o mouse */
  .glass-card::before {
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

  /* Halo cromático sutil nas bordas (prisma) */
  .edge-chroma {
    position: absolute; inset: -1px; border-radius: inherit; pointer-events:none;
    background: conic-gradient(from 0deg,
      rgba(255,0,122,0.18), rgba(0,255,255,0.2), rgba(255,255,255,0.12), rgba(255,0,122,0.18)
    );
    mask: linear-gradient(#000,#000) content-box, linear-gradient(#000,#000);
    -webkit-mask: linear-gradient(#000,#000) content-box, linear-gradient(#000,#000);
    -webkit-mask-composite: xor; mask-composite: exclude;
    padding: 1px; /* espessura do brilho de borda */
    opacity: .55;
    filter: blur(.5px);
  }

  /* Textura de vidro com noise (SVG fractal noise embutido) */
  .noise {
    position: absolute; inset: 0; border-radius: inherit; pointer-events:none;
    background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='240' height='240'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/><feColorMatrix type='saturate' values='0'/></filter><rect width='100%' height='100%' filter='url(%23n)' opacity='0.18'/></svg>");
    background-size: 240px 240px; background-repeat: repeat;
    mix-blend-mode: overlay; opacity: .35;
  }

  /* Botão de vidro leve base */
  .glass-btn {
    display: inline-flex; align-items: center; justify-content: center;
    gap: 10px;
    font-weight: 600;
    font-size: 1rem;
    padding: 14px 20px;
    border-radius: 14px; 
    border: none;
    text-decoration: none;
    cursor: pointer;
    transition: transform .15s ease, opacity .2s ease;
    width: 100%; /* Para alinhar com o design anterior */
    
    background: rgba(255,255,255,0.08); /* Fundo sutil */
    color: #fff;
    border: 1px solid rgba(255,255,255,0.25);
    box-shadow: inset 0 0 0 1px rgba(255,255,255,0.06), 0 10px 30px rgba(0,0,0,0.25);
  }
  .glass-btn:hover { 
    transform: translateY(-1px); 
    background: rgba(255,255,255,0.15); 
    opacity: 0.9;
  }
  
  /* Estilos específicos para WhatsApp */
  .whatsapp-btn {
    background-color: var(--whatsapp-color); 
    border-color: var(--whatsapp-color);
    box-shadow: 0 4px 14px rgba(37, 211, 102, 0.4);
    background-blend-mode: overlay; /* Mistura o fundo sólido com o glass */
  }
  .whatsapp-btn:hover {
    background-color: #27e06e;
    transform: translateY(-2px);
  }

  /* Estilos específicos para Telegram */
  .telegram-btn {
    background-color: var(--telegram-color);
    border-color: var(--telegram-color);
    box-shadow: 0 4px 14px rgba(0, 136, 204, 0.4);
    background-blend-mode: overlay; /* Mistura o fundo sólido com o glass */
  }
  .telegram-btn:hover {
    background-color: #0099e5;
    transform: translateY(-2px);
  }

  /* Animações */
  @keyframes wave {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.03); }
  }

  @keyframes card-wobble {
    0%   { transform: scale(1) skewX(0deg) skewY(0deg); }
    25%  { transform: scale(1.01) skewX(0.6deg) skewY(-0.6deg); }
    50%  { transform: scale(1.008) skewX(-0.6deg) skewY(0.6deg); }
    75%  { transform: scale(1.012) skewX(0.3deg) skewY(-0.3deg); }
    100% { transform: scale(1) skewX(0deg) skewY(0deg); }
  }
`;

// ----------------------------------------------------------------------
// --- Estilos JS (Layout e Tipografia) adaptados ---
// ----------------------------------------------------------------------
const styles = {
  page: {
    minHeight: "100vh", // Ajustado para centralizar bem
    display: "grid",
    placeItems: "center",
    backgroundPosition: "center",
    backgroundSize: "cover",
    // Aplica um filtro na imagem para melhor contraste com o card de vidro
    filter: "saturate(180%) contrast(135%) brightness(0.95)",
    padding: "20px",
  },
  card: {
    width: "min(500px, 92vw)", // Tamanho mais adequado para um card de contato
    height: "auto", // Altura flexível
    zIndex: 1,
    padding: "30px", // Preenchimento interno
    textAlign: "center",
  },
  contentWrap: {
    position: "relative",
    zIndex: 2,
    height: "100%",
    color: "#fff",
    fontFamily: "ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, Apple Color Emoji, Segoe UI Emoji",
    display: "flex",
    flexDirection: "column",
    gap: "24px",
  },
  header: {
    marginBottom: "10px",
  },
  title: { fontSize: "2rem", lineHeight: 1.1, fontWeight: 800, margin: 0 },
  subtitle: { marginTop: "10px", fontSize: "1rem", opacity: 0.8, fontWeight: 400 },

  contactArea: {
    padding: "16px 0",
    borderTop: "1px solid rgba(255,255,255,0.1)",
    borderBottom: "1px solid rgba(255,255,255,0.1)",
  },
  contactTitle: { fontSize: "1.25rem", fontWeight: 700, margin: 0, opacity: 0.95 },
  contactSubtitle: { marginTop: "4px", fontSize: "0.9rem", opacity: 0.7, fontWeight: 300 },

  actionsRow: { 
    display: "flex", 
    flexDirection: "column", 
    gap: "1rem", 
    marginTop: "10px", 
  },
  actionBtn: { 
    // Garante que o CSS puro cuide da maioria dos estilos
  },
};