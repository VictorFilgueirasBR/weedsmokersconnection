import React, { useState, useEffect, useRef } from "react";
import * as THREE from "three";
import { FaFlag, FaGlobe } from "react-icons/fa";
import "./ChatBot.scss";

const menuSteps = [
  {
    step: 0,
    botMessage: "🌿 Bem-vindo ao nosso conteúdo exclusivo para pacientes medicinais receitados.\n\nEscolha uma das opções abaixo para acessar",
    userOptions: [
      { text: "NACIONAL", icon: <FaFlag color="#00ff84" size={20} />, nextStep: 1 },
      { text: "IMPORTADO", icon: <FaGlobe color="#00ff84" size={20} />, nextStep: 2 },
    ],
  },
  { step: 1, botMessage: (<a href="https://weedsmokersconnection.com/club?access=wsc-club-ice#properties-grid" target="_blank" rel="noopener noreferrer" className="property-wsc">Conteúdo Exclusívo</a>), isFinal: true },
  { step: 2, botMessage: (<a href="https://weedsmokersconnection.com/club?access=wsc-club-ice#properties-imp" target="_blank" rel="noopener noreferrer" className="property-wsc">Conteúdo Exclusívo</a>), isFinal: true },
];

export default function ChatWsc() {
  const mountRef = useRef(null);
  const cardRef = useRef(null);
  const [messages, setMessages] = useState([{ sender: "bot", text: menuSteps[0].botMessage }]);
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(0);

  // 1. Efeito Glass Card (Mouse Move Tracking)
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

  // 2. Motor Avançado Galaxy Background (Three.js)
  useEffect(() => {
    const currentMount = mountRef.current;
    if (!currentMount) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.domElement.style.position = "fixed";
    renderer.domElement.style.top = "0";
    renderer.domElement.style.left = "0";
    renderer.domElement.style.width = "100%";
    renderer.domElement.style.height = "100%";
    renderer.domElement.style.pointerEvents = "none";
    renderer.domElement.style.zIndex = "0";
    currentMount.appendChild(renderer.domElement);

    const geometry = new THREE.BufferGeometry();
    const vertexCount = 1400;
    const pos = new Float32Array(vertexCount * 3);
    for (let i = 0; i < vertexCount * 3; i++) {
      pos[i] = (Math.random() - 0.5) * 12;
    }
    geometry.setAttribute("position", new THREE.BufferAttribute(pos, 3));

    const material = new THREE.PointsMaterial({
      size: 0.012,
      color: 0xffffff,
      transparent: true,
      opacity: 0.8,
    });
    
    const points = new THREE.Points(geometry, material);
    scene.add(points);
    camera.position.z = 5;

    let anim;
    const loop = () => {
      anim = requestAnimationFrame(loop);
      points.rotation.y += 0.0008;
      points.rotation.x += 0.0003; // Adicionado rotação no eixo X para profundidade orbital
      renderer.render(scene, camera);
    };
    loop();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(anim);
      if (currentMount.contains(renderer.domElement)) {
        currentMount.removeChild(renderer.domElement);
      }
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);

  const handleUserResponse = (optionText, nextStep) => {
    setMessages((prev) => [...prev, { sender: "user", text: optionText }]);
    setLoading(true);
    setTimeout(() => {
      const nextStepData = menuSteps.find((s) => s.step === nextStep);
      if (nextStepData) {
        setMessages((prev) => [...prev, { sender: "bot", text: nextStepData.botMessage }]);
        setStep(nextStep);
      }
      setLoading(false);
    }, 800);
  };

  const currentStepData = menuSteps.find((s) => s.step === step);

  return (
    <div className="chatbot-page-wrapper">
      <style>{glassGalaxyCss}</style>
      
      {/* 3D GALAXY BACKGROUND */}
      <div ref={mountRef} className="three-canvas-container" />
      
      {/* GRID INFINITE BACKGROUND */}
      <div className="grid-bg" />

      {/* CENTRALIZED GLASS CHATBOT CONTAINER */}
      <div 
        ref={cardRef} 
        className="glass-card chatbot-main"
      >
        {/* CINEMATIC LAYERS */}
        <div className="edge-chroma" />
        <div className="noise" />

        <div className="chatbot-left">
          <div className="chatbot-messages">
            {messages.map((msg, index) => (
              <div key={index} className={`message ${msg.sender}`}>{msg.text}</div>
            ))}
            {loading && <div className="typing">Digitando...</div>}
          </div>
        </div>

        {!currentStepData?.isFinal && (
          <div className="chatbot-right">
            {currentStepData?.userOptions.map((option, index) => (
              <div key={index} className="explore-card visible" onClick={() => handleUserResponse(option.text, option.nextStep)}>
                {option.icon && <div className="icon">{option.icon}</div>}
                <div className="text"><span className="title">{option.text}</span></div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// Estilos visuais dinâmicos injetados para o efeito Motion Galaxy
const glassGalaxyCss = `
  @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@500;700;800&display=swap');

  .chatbot-page-wrapper {
    min-height: 100vh;
    width: 100%;
    box-sizing: border-box;
    overflow-x: hidden;
    position: relative;
    display: grid;
    place-items: center;
    padding: 24px;
    background: radial-gradient(circle at center, rgba(255,255,255,.05) 0%, rgba(255,255,255,0) 40%), linear-gradient(180deg, #020202 0%, #050505 50%, #000000 100%);
    font-family: 'Plus Jakarta Sans', Inter, sans-serif;
  }

  .grid-bg {
    position: absolute;
    inset: 0;
    background-image: linear-gradient(rgba(255,255,255,.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.025) 1px, transparent 1px);
    background-size: 70px 70px;
    animation: vxCosmosEngineEngine 12s linear infinite;
    pointer-events: none;
    z-index: 1;
  }

  .three-canvas-container {
    position: fixed;
    inset: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
    pointer-events: none;
    z-index: 0;
  }

  @keyframes vxCosmosEngineEngine {
    0% { transform: translateY(0px); }
    100% { transform: translateY(70px); }
  }

  /* REFINAMENTO DO CONTAINER CHATBOT PARA DARK GLASS */
  .chatbot-main.glass-card {
    --mx: 50%;
    --my: 50%;
    position: relative;
    box-sizing: border-box;
    overflow: hidden;
    isolation: isolate;
    border-radius: 28px;
    backdrop-filter: blur(18px) saturate(180%) contrast(115%);
    -webkit-backdrop-filter: blur(18px) saturate(180%) contrast(115%);
    
    background: rgba(15, 15, 15, 0.65) !important;
    border: 1px solid rgba(255, 255, 255, 0.15) !important;
    box-shadow: 0 30px 80px rgba(0,0,0, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.1);
    
    animation: card-wobble-chat 12s ease-in-out infinite;
    transition: transform .4s ease, box-shadow .4s ease;
    z-index: 2;
  }

  .chatbot-main.glass-card:hover {
    transform: translateY(-2px);
    box-shadow: 0 40px 100px rgba(0,0,0, 0.7), inset 0 1px 0 rgba(255, 255, 255, 0.2);
  }

  .chatbot-main.glass-card::before {
    content: "";
    position: absolute;
    inset: 0;
    border-radius: inherit;
    pointer-events: none;
    background: radial-gradient(circle at var(--mx) var(--my), rgba(255,255,255,.12) 0%, rgba(255,255,255,.04) 35%, rgba(255,255,255,0) 70%);
    mix-blend-mode: screen;
    z-index: 1;
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
    z-index: 2;
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
    opacity: .12;
    z-index: 2;
  }

  @keyframes card-wobble-chat {
    0% { transform: rotate(0deg) scale(1); }
    25% { transform: rotate(0.3deg) scale(1.002); }
    50% { transform: rotate(-0.2deg) scale(1.001); }
    75% { transform: rotate(0.1deg) scale(1.003); }
    100% { transform: rotate(0deg) scale(1); }
  }
`;