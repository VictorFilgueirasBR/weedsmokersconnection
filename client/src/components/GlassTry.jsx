import { color } from "framer-motion";
import React, { useRef, useEffect } from "react";

/**
 * CreditGlassCard
 * - Cartão de crédito em vidro (glass) com refração, distorção suave, textura e highlight que segue o mouse
 * - Sem dependências externas (sem Tailwind, sem shadcn)
 * - Personalizável via props
 */
export default function CreditGlassCard({
  backgroundImage = "/images/medicine-guide-club.jpeg", // fundo simples (troque se quiser)
  name = "MEDICOS",
  currency = "Agende ",
  amount = "AQUI",
  delta = "sua consulta",
  subtitle = "Consulta | Terapia | Receita | Tratamentos",
  last4 = "ver",
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
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <div style={{...styles.page, backgroundImage: `url(${backgroundImage})`}}>
      {/* Estilos locais */}
      <style>{css}</style>

      {/* Card */}
      <div ref={cardRef} className="glass-card" style={styles.card}>

        {/* Overlay de chromatic edge (halo sutil nas bordas) */}
        <div className="edge-chroma" />
        {/* Textura de vidro (noise SVG embutido) */}
        <div className="noise" />

        {/* Conteúdo */}
        <div style={styles.contentWrap}>
          <div style={styles.rowTop}>
            <div style={styles.name}>{name}</div>
          </div>

          <div style={styles.valueRow}>
            <span style={styles.value}>{currency}{amount}</span>
            <span style={styles.delta}>
              {delta}
            </span>
          </div>

          <div style={styles.subtitle}>{subtitle}</div>

          <div style={styles.bottomRow}>
            <div style={styles.inlineText}>
              <span>{last4}</span>
              <span style={styles.dot} />
              <a href="#" style={styles.viewLink}>View</a>
            </div>

            <button className="glass-btn" style={styles.editBtn}>
              Agendar
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style={{ marginLeft: 8 }}
                aria-label="Ícone do WhatsApp"
                >
                <path
                    fill="currentColor"
                    d="M20.52 3.48A11.94 11.94 0 0012 .5 11.96 11.96 0 003.48 3.48 11.96 11.96 0 000 12c0 2.14.56 4.13 1.61 5.88L0 24l6.42-1.65A11.94 11.94 0 0012 24c6.63 0 12-5.37 12-12 0-3.21-1.25-6.22-3.48-8.52zM17.3 14.2c-.3-.15-1.75-.86-2.02-.96-.27-.1-.47-.15-.67.15-.2.3-.77.96-.95 1.16-.18.2-.36.22-.66.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.48-1.77-1.65-2.07-.17-.3 0-.46.13-.61.14-.14.3-.36.45-.54.15-.18.2-.3.3-.5.1-.2 0-.36-.05-.5-.05-.14-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51-.17-.01-.36-.01-.56-.01-.2 0-.5.07-.76.36-.27.3-1.04 1.02-1.04 2.48 0 1.46 1.06 2.88 1.2 3.08.14.2 2.07 3.4 5.02 4.77 2.95 1.36 2.95.91 3.48.86.53-.05 1.75-.69 2-1.36.25-.67.25-1.24.18-1.36-.07-.12-.26-.2-.56-.35z"
                />
                <circle cx="9" cy="20" r="1.5" fill="currentColor"/>
                <circle cx="18" cy="20" r="1.5" fill="currentColor"/>
              </svg>
            </button>
          </div>
        </div>
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
    border: 6px solid rgba(236, 236, 236, 0.16);
    box-shadow:
      inset 0 0 0 1px rgba(255,255,255,0.08),
      0 30px 80px rgba(0,0,0,0.45);
    animation: card-wobble 12s ease-in-out infinite;
    cursor: pointer;
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

  /* Botão de vidro leve */
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

  /* ondulação física leve do cartão inteiro */
  @keyframes card-wobble {
    0%   { transform: scale(1) skewX(0deg) skewY(0deg); }
    25%  { transform: scale(1.01) skewX(0.6deg) skewY(-0.6deg); }
    50%  { transform: scale(1.008) skewX(-0.6deg) skewY(0.6deg); }
    75%  { transform: scale(1.012) skewX(0.3deg) skewY(-0.3deg); }
    100% { transform: scale(1) skewX(0deg) skewY(0deg); }
  }
`;

// --- estilos JS menores (layout e tipografia) ---
const styles = {
  page: {
    minHeight: "48vh",
    display: "grid",
    placeItems: "center",
    backgroundPosition: "center",
    backgroundSize: "cover",
    // Removi a cor sólida para que a imagem seja a única cor de fundo
    // backgroundColor: "#0b0e13",
    filter: "saturate(180%) contrast(135%) brightness(0.95)",
  },
  card: {
    width: "min(720px, 88vw)",
    height: 240,
    zIndex: 1,
  },
  contentWrap: {
    position: "relative",
    zIndex: 2,
    height: "100%",
    padding: 12,
    color: "#fff",
    fontFamily: "ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, Apple Color Emoji, Segoe UI Emoji",
  },
  rowTop: { display: "flex", alignItems: "center", justifyContent: "space-between" },
  name: { fontSize: 50, lineHeight: 1, fontWeight: 800, letterSpacing: 0.3 },
  valueRow: { display: "flex", alignItems: "center", gap: 14, marginTop: 10 },
  value: { fontSize: 22, fontWeight: 600, opacity: 0.92 },
  delta: { display: "inline-flex", alignItems: "center", fontWeight: 600, opacity: 0.9 },
  subtitle: { marginTop: 16, fontSize: 16, opacity: 0.9 },
  bottomRow: { display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 22 },
  inlineText: { display: "flex", alignItems: "center", gap: 14, opacity: 0.92 },
  dot: { width: 6, height: 6, borderRadius: 999, background: "rgba(255,255,255,0.6)" },
  viewLink: { color: "#fff", textDecoration: "none", borderBottom: "1px solid rgba(255,255,255,0.35)" },
  editBtn: { color: "#fff"},
};