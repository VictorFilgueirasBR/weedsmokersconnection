// src/components/InstructionGlass.jsx

import React, { useRef, useEffect } from "react";
import { FaWhatsapp, FaCommentDots } from "react-icons/fa";

export default function InstructionGlass({
  title = "Seja bem-vindo ao CLUB",
  subtitle = "Entre em contato para suporte",
  whatsappUrl = "https://wa.me/5561995276936",
  
  // URL aponta para o Signal, mantida a variável telegramUrl por compatibilidade
  telegramUrl = "https://signal.group/#CjQKIKc82owGqCZ5x8lLrGEHGKgymEAH3-BuKAqQad5ia_xnEhC8fCjMbEbUvhoj5DQ-flj_",
  
  contactTitle = "Fale Conosco",
  contactSubtitle = "Suporte | Dúvidas | Pagamentos",
}) {
  const cardRef = useRef(null);

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

    return () => {
      window.removeEventListener("mousemove", onMove);
    };
  }, []);

  return (
    <div style={styles.page}>
      <style>{css}</style>

      <div
        ref={cardRef}
        className="glass-card instruction-card"
        style={styles.card}
      >
        <div className="edge-chroma" />
        <div className="noise" />

        <div style={styles.contentWrap}>
          <header style={styles.header}>
            <h2 style={styles.title}>{title}</h2>

            <p style={styles.subtitle}>
              {subtitle}
            </p>
          </header>

          <div style={styles.contactArea}>
            <h3 style={styles.contactTitle}>
              {contactTitle}
            </h3>

            <p style={styles.contactSubtitle}>
              {contactSubtitle}
            </p>
          </div>

          <div style={styles.actionsRow}>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="glass-btn"
              style={styles.actionBtn}
            >
              <FaWhatsapp size={20} />
              WhatsApp
            </a>

            <a
              href={telegramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="glass-btn"
              style={styles.actionBtn}
            >
              <FaCommentDots size={20} />
              Encrypted Chat
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

const css = `
  :root {
    --wsc-start: rgba(160,236,250,1);
    --wsc-end: rgba(30,77,94,1);
  }

  /* ==========================
     Fundo Hospital Premium
  ========================== */

  @keyframes hospitalFlow {
    0% {
      background-position:
        0% 0%,
        100% 0%,
        50% 100%,
        center;
    }
    50% {
      background-position:
        8% 10%,
        92% 18%,
        46% 88%,
        center;
    }
    100% {
      background-position:
        0% 0%,
        100% 0%,
        50% 100%,
        center;
    }
  }

  /* ==========================
     Glass Card Premium
  ========================== */

  .glass-card {
    --mx: 50%;
    --my: 50%;

    position: relative;
    overflow: hidden;
    isolation: isolate;
    border-radius: 28px;

    backdrop-filter:
      blur(18px)
      saturate(180%)
      contrast(115%);

    -webkit-backdrop-filter:
      blur(18px)
      saturate(180%)
      contrast(115%);

    background: rgba(255,255,255,.42);
    border: 1px solid rgba(255,255,255,.55);

    box-shadow:
      0 30px 80px rgba(30,77,94,.12),
      inset 0 1px 0 rgba(255,255,255,.7);

    animation: card-wobble 12s ease-in-out infinite;

    transition:
      transform .4s ease,
      box-shadow .4s ease;
  }

  .glass-card:hover {
    transform: translateY(-4px);
    box-shadow:
      0 40px 100px rgba(30,77,94,.18),
      inset 0 1px 0 rgba(255,255,255,.9);
  }

  /* ==========================
     Reflexo Glass
  ========================== */

  .glass-card::before {
    content: "";
    position: absolute;
    inset: 0;
    border-radius: inherit;
    pointer-events: none;

    background:
      radial-gradient(
        circle at var(--mx) var(--my),
        rgba(255,255,255,.35) 0%,
        rgba(255,255,255,.12) 35%,
        rgba(255,255,255,0) 70%
      );

    mix-blend-mode: screen;
    animation: wave 6s ease-in-out infinite;
  }

  /* ==========================
     Halo Prismático
  ========================== */

  .edge-chroma {
    position: absolute;
    inset: -1px;
    border-radius: inherit;
    pointer-events: none;

    background:
      conic-gradient(
        from 0deg,
        rgba(160,236,250,.28),
        rgba(0,123,255,.18),
        rgba(255,255,255,.20),
        rgba(160,236,250,.28)
      );

    mask:
      linear-gradient(#000,#000) content-box,
      linear-gradient(#000,#000);

    -webkit-mask:
      linear-gradient(#000,#000) content-box,
      linear-gradient(#000,#000);

    -webkit-mask-composite: xor;
    mask-composite: exclude;

    padding: 1px;
    opacity: .55;
  }

  /* ==========================
     Noise
  ========================== */

  .noise {
    position: absolute;
    inset: 0;
    pointer-events: none;
    border-radius: inherit;

    background-image:
      url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='240' height='240'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/><feColorMatrix type='saturate' values='0'/></filter><rect width='100%' height='100%' filter='url(%23n)' opacity='0.18'/></svg>");

    background-size: 240px 240px;
    background-repeat: repeat;
    mix-blend-mode: overlay;
    opacity: .22;
  }

  /* ==========================
     WSC Premium Buttons
  ========================== */

  .glass-btn {
    margin-top: auto;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
    padding: 1.05rem;
    font-size: .85rem;
    font-weight: 700;
    font-family: 'Satoshi', sans-serif;
    border-radius: 10px;

    background:
      linear-gradient(
        135deg,
        rgba(160,236,250,1) 0%,
        rgba(30,77,94,1) 100%
      );

    color: #ffffff !important;
    text-transform: uppercase;
    letter-spacing: .12em;
    text-decoration: none;
    transition: all .4s cubic-bezier(0.16,1,0.3,1);
    border: none;
    box-shadow: 0 4px 16px rgba(30,77,94,.18);
  }

  .glass-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(30,77,94,.32);
    filter: brightness(1.06);
  }

  /* ==========================
     Motion
  ========================== */

  @keyframes wave {
    0%,100% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.03);
    }
  }

  @keyframes card-wobble {
    0% { transform: scale(1); }
    25% { transform: scale(1.01); }
    50% { transform: scale(1.008); }
    75% { transform: scale(1.012); }
    100% { transform: scale(1); }
  }
`;

const styles = {
  page: {
    minHeight: "100vh",
    display: "grid",
    placeItems: "center",
    position: "relative",
    overflow: "hidden",
    padding: "24px",

    background: `
      radial-gradient(circle at 10% 20%, rgba(160,236,250,.55), transparent 30%),
      radial-gradient(circle at 85% 15%, rgba(0,123,255,.18), transparent 35%),
      radial-gradient(circle at 70% 80%, rgba(30,77,94,.14), transparent 40%),
      linear-gradient(
        135deg,
        #edf9ff 0%,
        #dff4ff 50%,
        #f7fcff 100%
      )
    `,
    backgroundSize: "120% 120%",
    animation: "hospitalFlow 16s ease-in-out infinite",
  },

  card: {
    width: "min(560px, 94vw)",
    padding: "36px",
    textAlign: "center",
    zIndex: 2,
  },

  contentWrap: {
    position: "relative",
    zIndex: 3,
    display: "flex",
    flexDirection: "column",
    gap: "28px",
    color: "#000",
    fontFamily: "Satoshi, sans-serif",
  },

  header: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },

  title: {
    margin: 0,
    fontSize: "clamp(2rem, 4vw, 2.8rem)",
    fontWeight: 800,
    lineHeight: 1.05,
    color: "#000",
    letterSpacing: "-0.03em",
    fontFamily: "Satoshi, sans-serif",
  },

  subtitle: {
    margin: 0,
    color: "#000",
    opacity: 0.75,
    fontSize: "1rem",
    lineHeight: 1.7,
    fontWeight: 500,
    fontFamily: "Satoshi, sans-serif",
  },

  contactArea: {
    padding: "20px 0",
    borderTop: "1px solid rgba(0,0,0,.08)",
    borderBottom: "1px solid rgba(0,0,0,.08)",
  },

  contactTitle: {
    margin: 0,
    fontSize: "1.25rem",
    fontWeight: 700,
    color: "#000",
    fontFamily: "Satoshi, sans-serif",
  },

  contactSubtitle: {
    marginTop: "8px",
    fontSize: ".95rem",
    color: "#000",
    opacity: 0.65,
    fontWeight: 500,
    fontFamily: "Satoshi, sans-serif",
  },

  actionsRow: {
    display: "flex",
    flexDirection: "column",
    gap: "14px",
    marginTop: "4px",
  },

  actionBtn: {},
};