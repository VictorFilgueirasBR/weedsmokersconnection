// src/components/InstructionGlass.jsx

import React, { useRef, useEffect } from "react";
import * as THREE from "three";
import { FaCommentDots } from "react-icons/fa";

export default function InstructionGlass({
  title = "Bem vindo ao CLUB",
  subtitle = "Acesse nossas plataformas para suporte exclusivo e atendimento.",
  whatsappUrl = "https://wa.me/5561995276936",
  
  // URL aponta para o Signal, mantida a variável telegramUrl por compatibilidade
  telegramUrl = "https://signal.group/#CjQKIKc82owGqCZ5x8lLrGEHGKgymEAH3-BuKAqQad5ia_xnEhC8fCjMbEbUvhoj5DQ-flj_",
  
  contactTitle = "Fale Conosco",
  contactSubtitle = "Suporte | Dúvidas | Pagamentos",
}) {
  const cardRef = useRef(null);
  const mountRef = useRef(null);
  const canvasRef = useRef(null);
  const triggerRef = useRef(null);
  const trailRef = useRef(null);
  const shellRef = useRef(null);
  const flareRef = useRef(null);

  // 1. Efeito Glass Card (Mouse Move)
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

  // 2. Three.js: Fundo da Galáxia
  useEffect(() => {
    const currentMount = mountRef.current;
    if (!currentMount) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    currentMount.appendChild(renderer.domElement);

    const geometry = new THREE.BufferGeometry();
    const vertexCount = 1400;
    const spaceCoordinates = new Float32Array(vertexCount * 3);

    for (let i = 0; i < vertexCount * 3; i++) {
      spaceCoordinates[i] = (Math.random() - 0.5) * 12;
    }

    geometry.setAttribute("position", new THREE.BufferAttribute(spaceCoordinates, 3));

    const material = new THREE.PointsMaterial({
      size: 0.012,
      color: 0xffffff,
      transparent: true,
      opacity: 0.8,
    });

    const systemGalaxyPoints = new THREE.Points(geometry, material);
    scene.add(systemGalaxyPoints);
    camera.position.z = 5;

    let animationId;
    const executeSpaceLoop = () => {
      animationId = requestAnimationFrame(executeSpaceLoop);
      systemGalaxyPoints.rotation.y += 0.0008;
      systemGalaxyPoints.rotation.x += 0.0003;
      renderer.render(scene, camera);
    };

    executeSpaceLoop();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationId);
      if (currentMount.contains(renderer.domElement)) {
        currentMount.removeChild(renderer.domElement);
      }
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);

  // 3. Slider: Partículas do Canvas (Nebula)
  useEffect(() => {
    const canvas = canvasRef.current;
    const shell = shellRef.current;
    if (!canvas || !shell) return;

    const ctx = canvas.getContext("2d");
    let particles = [];
    let animationFrame = null;

    const setupCanvas = () => {
      canvas.width = shell.offsetWidth;
      canvas.height = shell.offsetHeight;
      particles = [];

      for (let i = 0; i < 28; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          r: Math.random() * 1.6 + 0.4,
          s: Math.random() * 0.35 + 0.08,
          o: Math.random() * 0.5 + 0.2,
        });
      }
    };

    const animateParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.x += p.s;
        if (p.x > canvas.width) p.x = 0;
        ctx.fillStyle = `rgba(220,245,255,${p.o})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      });
      animationFrame = requestAnimationFrame(animateParticles);
    };

    setupCanvas();
    animateParticles();

    window.addEventListener("resize", setupCanvas);

    return () => {
      window.removeEventListener("resize", setupCanvas);
      cancelAnimationFrame(animationFrame);
    };
  }, []);

  // 4. Slider: Lógica de Drag/Swipe
  useEffect(() => {
    const trigger = triggerRef.current;
    const shell = shellRef.current;
    const trail = trailRef.current;
    const flare = flareRef.current;
    if (!trigger || !shell || !trail || !flare) return;

    let dragging = false;
    let startX = 0;
    const offset = 10;

    const getLimit = () => shell.offsetWidth - trigger.offsetWidth - offset * 2;

    const startDrag = (e) => {
      dragging = true;
      startX = e.type.includes("touch") ? e.touches[0].clientX : e.clientX;
      trigger.style.transition = "none";
      trail.style.transition = "none";
    };

    const moveDrag = (e) => {
      if (!dragging) return;
      const currentX = e.type.includes("touch") ? e.touches[0].clientX : e.clientX;
      let delta = currentX - startX;
      const limit = getLimit();

      if (delta < 0) delta = 0;
      if (delta > limit) delta = limit;

      const progress = delta / limit;
      trigger.style.left = delta + offset + "px";
      trail.style.width = delta + 70 + "px";

      shell.style.boxShadow = `
        0 25px 60px rgba(0,0,0,.45),
        0 0 ${progress * 40}px rgba(139,233,255,.18)
      `;
    };

    const resetSlider = () => {
      trigger.style.transition = "all .55s cubic-bezier(.175,.885,.32,1.275)";
      trail.style.transition = "all .4s ease";
      trigger.style.left = offset + "px";
      trail.style.width = "0px";
      shell.style.boxShadow = "0 25px 60px rgba(0,0,0,.45)";
      flare.classList.remove("nbl-active");
    };

    const endDrag = () => {
      if (!dragging) return;
      dragging = false;

      const current = parseInt(trigger.style.left || offset) - offset;
      const limit = getLimit();

      if (current >= limit * 0.9) {
        trigger.style.transition = "all .3s ease-out";
        trigger.style.left = limit + offset + "px";
        flare.classList.add("nbl-active");

        setTimeout(() => {
          window.open(whatsappUrl, "_blank", "noopener,noreferrer");
          resetSlider();
        }, 400);
      } else {
        resetSlider();
      }
    };

    trigger.addEventListener("mousedown", startDrag);
    trigger.addEventListener("touchstart", startDrag, { passive: true });
    window.addEventListener("mousemove", moveDrag);
    window.addEventListener("touchmove", moveDrag, { passive: false });
    window.addEventListener("mouseup", endDrag);
    window.addEventListener("touchend", endDrag);

    return () => {
      trigger.removeEventListener("mousedown", startDrag);
      trigger.removeEventListener("touchstart", startDrag);
      window.removeEventListener("mousemove", moveDrag);
      window.removeEventListener("touchmove", moveDrag);
      window.removeEventListener("mouseup", endDrag);
      window.removeEventListener("touchend", endDrag);
    };
  }, [whatsappUrl]);

  return (
    <div className="page-wrapper">
      <style>{css}</style>
      
      {/* 3D GALAXY BACKGROUND */}
      <div ref={mountRef} className="three-canvas-container" />
      
      {/* GRID INFINITE BACKGROUND */}
      <div className="grid-bg" />

      {/* CENTRAL CARD */}
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
            <p style={styles.subtitle}>{subtitle}</p>
          </header>

          <div style={styles.contactArea}>
            <h3 style={styles.contactTitle}>{contactTitle}</h3>
            <p style={styles.contactSubtitle}>{contactSubtitle}</p>
          </div>

          <div style={styles.actionsRow}>
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

      {/* NEBULA CINEMA SLIDER */}
      <div id="nbl-cinema-slider-root">
        <div className="nbl-cinema-shell" ref={shellRef}>
          <canvas id="nbl-cinema-particles" ref={canvasRef}></canvas>
          <div id="nbl-cinema-trail" ref={trailRef}></div>
          <div className="nbl-cinema-track">
            <div className="nbl-cinema-label">WHATSAPP SUPORTE</div>
            <div id="nbl-cinema-trigger" ref={triggerRef}>
              <div className="nbl-cinema-trigger-glow"></div>
              <svg viewBox="0 0 24 24" fill="none">
                <path
                  d="M13 17L18 12L13 7M6 17L11 12L6 7"
                  stroke="white"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
          <div id="nbl-cinema-flare" ref={flareRef}></div>
        </div>
      </div>
    </div>
  );
}

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@500;700;800&display=swap');

  /* ==========================
     PAGE LAYOUT & BACKGROUNDS
  ========================== */
  .page-wrapper {
    min-height: 100vh;
    overflow-x: hidden;
    position: relative;
    display: grid;
    place-items: center;
    padding: 24px;
    padding-bottom: 120px; /* Espaço inferior para o Slider Flutuante */
    background: radial-gradient(circle at center, rgba(255,255,255,.05) 0%, rgba(255,255,255,0) 40%), linear-gradient(180deg, #020202 0%, #050505 50%, #000000 100%);
    font-family: 'Plus Jakarta Sans', Inter, sans-serif;
  }

  .grid-bg {
    position: absolute;
    inset: 0;
    background-image: linear-gradient(rgba(255,255,255,.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.025) 1px, transparent 1px);
    background-size: 70px 70px;
    animation: vxCosmosEngine 12s linear infinite;
    pointer-events: none;
    z-index: 1;
  }

  .three-canvas-container {
    position: absolute;
    inset: 0;
    pointer-events: none;
    z-index: 0;
  }

  @keyframes vxCosmosEngine {
    0% { transform: translateY(0px); }
    100% { transform: translateY(70px); }
  }

  /* ==========================
     DARK GLASS CARD
  ========================== */
  .glass-card {
    --mx: 50%;
    --my: 50%;
    position: relative;
    overflow: hidden;
    isolation: isolate;
    border-radius: 28px;
    backdrop-filter: blur(18px) saturate(180%) contrast(115%);
    -webkit-backdrop-filter: blur(18px) saturate(180%) contrast(115%);
    
    background: rgba(15, 15, 15, 0.42);
    border: 1px solid rgba(255, 255, 255, 0.15);
    box-shadow: 0 30px 80px rgba(0,0,0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.1);
    
    animation: card-wobble 12s ease-in-out infinite;
    transition: transform .4s ease, box-shadow .4s ease;
    z-index: 2;
  }

  .glass-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 40px 100px rgba(0,0,0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.2);
  }

  .glass-card::before {
    content: "";
    position: absolute;
    inset: 0;
    border-radius: inherit;
    pointer-events: none;
    background: radial-gradient(circle at var(--mx) var(--my), rgba(255,255,255,.15) 0%, rgba(255,255,255,.05) 35%, rgba(255,255,255,0) 70%);
    mix-blend-mode: screen;
    animation: wave 6s ease-in-out infinite;
  }

  .edge-chroma {
    position: absolute;
    inset: -1px;
    border-radius: inherit;
    pointer-events: none;
    background: conic-gradient(from 0deg, rgba(160,236,250,.15), rgba(0,123,255,.1), rgba(255,255,255,.1), rgba(160,236,250,.15));
    mask: linear-gradient(#000,#000) content-box, linear-gradient(#000,#000);
    -webkit-mask: linear-gradient(#000,#000) content-box, linear-gradient(#000,#000);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    padding: 1px;
    opacity: .55;
  }

  .noise {
    position: absolute;
    inset: 0;
    pointer-events: none;
    border-radius: inherit;
    background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='240' height='240'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/><feColorMatrix type='saturate' values='0'/></filter><rect width='100%' height='100%' filter='url(%23n)' opacity='0.18'/></svg>");
    background-size: 240px 240px;
    background-repeat: repeat;
    mix-blend-mode: overlay;
    opacity: .15;
  }

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
    border-radius: 10px;
    
    background: linear-gradient(135deg, rgba(160,236,250, 0.2) 0%, rgba(30,77,94, 0.8) 100%);
    border: 1px solid rgba(160,236,250, 0.3);
    color: #ffffff !important;
    text-transform: uppercase;
    letter-spacing: .12em;
    text-decoration: none;
    transition: all .4s cubic-bezier(0.16,1,0.3,1);
    box-shadow: 0 4px 16px rgba(0,0,0,.2);
  }

  .glass-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(160,236,250,.2);
    filter: brightness(1.2);
  }

  /* ==========================
     NEBULA CINEMA SLIDER
  ========================== */
  #nbl-cinema-slider-root {
    position: fixed;
    bottom: 3rem;
    left: 0;
    z-index: 9999;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 12px 20px;
    box-sizing: border-box;
  }

  .nbl-cinema-shell {
    position: relative;
    width: 100%;
    max-width: 520px;
    height: 74px;
    overflow: hidden;
    border-radius: 120px;
    background: linear-gradient(180deg, rgba(255,255,255,.08), rgba(255,255,255,.03));
    border: 1px solid rgba(255,255,255,.12);
    backdrop-filter: blur(30px) saturate(180%);
    -webkit-backdrop-filter: blur(30px) saturate(180%);
    box-shadow: 0 25px 60px rgba(0,0,0,.45), inset 0 0 18px rgba(255,255,255,.04);
    transition: box-shadow .35s ease, transform .35s ease;
  }

  #nbl-cinema-particles {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    opacity: .55;
  }

  #nbl-cinema-trail {
    position: absolute;
    left: 0;
    top: 0;
    width: 0%;
    height: 100%;
    pointer-events: none;
    background: linear-gradient(90deg, transparent, rgba(120,255,255,.08), rgba(57,255,182,.22));
    filter: blur(10px);
    transition: width .3s ease;
  }

  .nbl-cinema-track {
    position: relative;
    z-index: 5;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .nbl-cinema-label {
    font-family: 'Plus Jakarta Sans', sans-serif !important;
    font-size: 11px !important;
    font-weight: 800 !important;
    letter-spacing: 6px !important;
    text-transform: uppercase;
    user-select: none;
    color: rgba(255,255,255,.28);
    background: linear-gradient(90deg, transparent 20%, rgba(255,255,255,1) 50%, transparent 80%);
    background-size: 200% 100%;
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    animation: nblCinemaTextScan 2.5s linear infinite;
  }

  #nbl-cinema-trigger {
    position: absolute;
    left: 10px;
    width: 56px;
    height: 56px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: grab;
    touch-action: none;
    background: linear-gradient(180deg, rgba(255,255,255,.18), rgba(255,255,255,.08));
    border: 1px solid rgba(255,255,255,.22);
    box-shadow: 0 10px 30px rgba(0,0,0,.35), inset 0 0 12px rgba(255,255,255,.08);
    transition: transform .3s ease, background .3s ease, box-shadow .3s ease;
  }

  #nbl-cinema-trigger:active {
    cursor: grabbing;
  }

  #nbl-cinema-trigger:hover {
    background: linear-gradient(180deg, rgba(255,255,255,.24), rgba(255,255,255,.12));
    box-shadow: 0 0 20px rgba(255,255,255,.12), 0 12px 35px rgba(0,0,0,.45);
  }

  .nbl-cinema-trigger-glow {
    position: absolute;
    inset: -8px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(139,233,255,.28) 0%, transparent 72%);
    opacity: 0;
    transition: opacity .3s ease;
  }

  #nbl-cinema-trigger:hover .nbl-cinema-trigger-glow {
    opacity: 1;
  }

  #nbl-cinema-trigger svg {
    width: 20px;
    filter: drop-shadow(0 0 8px rgba(255,255,255,.8));
  }

  #nbl-cinema-flare {
    position: absolute;
    inset: 0;
    pointer-events: none;
    opacity: 0;
    z-index: 10;
    background: radial-gradient(circle, rgba(255,255,255,.95) 0%, rgba(57,255,182,.4) 40%, transparent 100%);
  }

  #nbl-cinema-flare.nbl-active {
    animation: nblCinemaFlareAnim .55s ease-out forwards;
  }

  @keyframes wave {
    0%,100% { transform: scale(1); }
    50% { transform: scale(1.03); }
  }

  @keyframes card-wobble {
    0% { transform: scale(1); }
    25% { transform: scale(1.01); }
    50% { transform: scale(1.008); }
    75% { transform: scale(1.012); }
    100% { transform: scale(1); }
  }

  @keyframes nblCinemaTextScan {
    0% { background-position: -200% 0; }
    100% { background-position: 200% 0; }
  }

  @keyframes nblCinemaFlareAnim {
    0% { opacity: 0; transform: scale(.7); }
    50% { opacity: 1; transform: scale(1.2); }
    100% { opacity: 0; transform: scale(1.6); }
  }

  @media(max-width:480px){
    .nbl-cinema-shell{ height:68px; }
    #nbl-cinema-trigger{ width:52px; height:52px; }
    .nbl-cinema-label{ font-size:9px !important; letter-spacing:4px !important; }
  }
`;

const styles = {
  card: {
    width: "min(560px, 94vw)",
    padding: "36px",
    textAlign: "center",
  },

  contentWrap: {
    position: "relative",
    zIndex: 3,
    display: "flex",
    flexDirection: "column",
    gap: "28px",
    color: "#ffffff", // Alterado para branco para combinar com o fundo escuro
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
    letterSpacing: "-0.03em",
  },

  subtitle: {
    margin: 0,
    opacity: 0.85,
    fontSize: "1rem",
    lineHeight: 1.7,
    fontWeight: 500,
  },

  contactArea: {
    padding: "20px 0",
    borderTop: "1px solid rgba(255,255,255,.15)",
    borderBottom: "1px solid rgba(255,255,255,.15)",
  },

  contactTitle: {
    margin: 0,
    fontSize: "1.25rem",
    fontWeight: 700,
  },

  contactSubtitle: {
    marginTop: "8px",
    fontSize: ".95rem",
    opacity: 0.75,
    fontWeight: 500,
  },

  actionsRow: {
    display: "flex",
    flexDirection: "column",
    gap: "14px",
    marginTop: "4px",
  },

  actionBtn: {},
};