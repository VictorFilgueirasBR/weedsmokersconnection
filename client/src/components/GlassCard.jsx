import { color } from "framer-motion";
import React, { useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

/**
 * GlassCard
 * - Cartão de crédito em vidro (glass) com refração, distorção suave, textura e highlight que segue o mouse
 * - Sem dependências externas (sem Tailwind, sem shadcn)
 * - Personalizável via props
 */
function GlassCard({
  name = "Weed Smokers Pass",
  currency = "R$",
  amount = "47,90",
  delta = "| Semestre",
  subtitle = "Tenha acesso as melhores Espécies e Extrações de THC & CBD.",
  last4 = "THC & CBD",
  cta = "Assinar"
}) {
  const cardRef = useRef(null);
  const navigate = useNavigate();

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
    <div ref={cardRef} className="glass-card" style={styles.card}>
      <div className="edge-chroma" />
      <div className="noise" />

      <div style={styles.contentWrap}>
        <div style={styles.rowTop}>
          <div style={styles.name}>{name}</div>
        </div>

        <div style={styles.valueRow}>
          <span style={styles.value}>{currency}{amount}</span>
          <span style={styles.delta}>{delta}</span>
        </div>

        <div style={styles.subtitle}>{subtitle}</div>

        <div style={styles.bottomRow}>
          <div style={styles.inlineText}>
            <span>{last4}</span>
            <span style={styles.dot} />
            <a href="#" style={styles.viewLink}>Legal</a>
          </div>

          <button
            className="glass-btn"
            style={styles.editBtn}
            onClick={() => navigate("/signup")}
          >
            {cta}
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{ marginLeft: 8 }}
            >
              <path
                d="M7 4h-2l-1 2h2l3.6 7.59-1.35 2.45A1 1 0 0 0 10 18h9v-2h-8.42c-.14 0-.25-.11-.25-.25l.03-.12L12.1 13h6.45a1 1 0 0 0 .92-.63l3.24-7.24A.75.75 0 0 0 22 4H7Z"
                fill="currentColor"
              />
              <circle cx="9" cy="20" r="1.5" fill="currentColor" />
              <circle cx="18" cy="20" r="1.5" fill="currentColor" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

export default function GlassCardPage() {
  return (
    <div
      style={{
        ...styles.page,
        backgroundImage: "url('/images/bg-try-plans-wscb.png')"
      }}
    >
      {/* Estilos locais */}
      <style>{css}</style>
      <style>{responsiveStyle}</style>

      {/* Título e Subtítulo */}
      <div style={styles.header}>
        <h1 style={styles.title}>Nossos Planos</h1>
        <p style={styles.subtitleText}>
          Assine e tenha acesso aos melhores Médicos Prescritores e Fornecedores Nacionais e Importados LEGALIZADOS e autorizados pela ANVISA.
        </p> 
      </div>

      {/* Apenas um card */}
      <div className="plans-grid" style={styles.grid}>
        <GlassCard />
      </div>
    </div>
  );
}

// --- CSS puro (glass + refração + distorção + textura + halo) ---
const css = `
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
    border: 3px solid rgba(236, 236, 236, 0.16);
    box-shadow:
      inset 0 0 0 1px rgba(255,255,255,0.08),
      0 30px 80px rgba(0,0,0,0.45);
    animation: card-wobble 12s ease-in-out infinite;
  }

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

  .glass-btn {
    background: rgba(255,255,255,0.01);
    color: #fff; border: 1px solid rgba(255,255,255,0.25);
    border-radius: 14px; padding: 10px 14px; display: inline-flex; align-items: center;
    box-shadow: inset 0 0 0 1px rgba(255,255,255,0.06), 0 10px 30px rgba(0,0,0,0.25);
    cursor: pointer; transition: transform .15s ease, background .2s ease;
  }
  .glass-btn:hover { transform: translateY(-1px); background: rgba(255,255,255,0.1); }

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
`;

// --- Responsividade simplificada: apenas flex, sem grid ---
const responsiveStyle = `
  .plans-grid {
    display: flex;
    flex-direction: column;
    align-items: center; /* 👈 garante centralização */
    gap: 32px;
    max-width: 100%;
    width: 100%;
    margin: 0 auto;
  }

  @media (min-width: 768px) {
    .plans-grid {
      flex-direction: row;
      flex-wrap: wrap;
      justify-content: center;
    }
  }
`;

const styles = {
  page: {
    minHeight: "45vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: "3rem 1rem",
    backgroundPosition: "center",
    backgroundSize: "cover",
    filter: "saturate(180%) contrast(135%) brightness(0.95)",
  },
  header: {
    textAlign: "center",
    marginBottom: "5rem",
    color: "#fff",
    fontFamily: "ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial",
  },
  title: {
    fontSize: "2rem",
    fontWeight: "800",
    margin: 0,
  },
  subtitleText: {
    fontSize: "1rem",
    opacity: 0.85,
    marginTop: "0.5rem",
    textAlign: "justify", // 👈 agora os parágrafos ficam justificados
  },
  grid: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center", // 👈 garante centralização
    gap: "1rem",
    maxWidth: "100%",
    width: "100%",
  },
  card: {
    width: "95%",
    maxWidth: 900, // 👈 limite opcional para telas grandes
    height: 240,
    zIndex: 1,
    margin: "0 auto", // 👈 centraliza horizontalmente
  },
  contentWrap: {
    position: "relative",
    zIndex: 2,
    height: "100%",
    padding: 18,
    color: "#fff",
    fontFamily: "ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, Apple Color Emoji, Segoe UI Emoji",
  },
  rowTop: { display: "flex", alignItems: "center", justifyContent: "space-between" },
  name: { fontSize: window.innerWidth <= 767 ? "1.7rem" : 40, lineHeight: 1, fontWeight: 800, letterSpacing: 0.3 },
  valueRow: { display: "flex", alignItems: "center", gap: 14, marginTop: 10 },
  value: { fontSize: 20, fontWeight: 600, opacity: 0.92 },
  delta: { display: "inline-flex", alignItems: "center", fontWeight: 600, opacity: 0.9 },
  subtitle: { marginTop: 1, fontSize: 14, opacity: 0.9 },
  bottomRow: { display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 5 },
  inlineText: { display: "flex", alignItems: "center", gap: 14, opacity: 0.92 },
  dot: { width: 6, height: 6, borderRadius: 999, background: "rgba(255,255,255,0.6)" },
  viewLink: { color: "#fff", textDecoration: "none", borderBottom: "1px solid rgba(255,255,255,0.35)" },
  editBtn: { color: "#fff" },
};