// client/src/components/HowItWorksSection.jsx
import React, { useEffect, useRef, useState, useCallback } from "react";
import { motion, useReducedMotion } from "framer-motion";

/**
 * HowItWorksSection — PRO MOTION / 3D / INTERACTIVE
 * - Mantém conteúdo original
 * - Adiciona 3D (Three.js) + floating elements
 * - Interação com mouse (parallax + tilt)
 * - Sem dependência obrigatória de Router
 */

// ---------- 3D LOGO ----------
const ThreeDLogo = () => {
  const mountRef = useRef(null);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const rendererRef = useRef(null);
  const meshRef = useRef(null);

  const init = useCallback(() => {
    if (!mountRef.current || !window.THREE) return;

    const scene = new window.THREE.Scene();
    sceneRef.current = scene;

    const camera = new window.THREE.PerspectiveCamera(60, mountRef.current.clientWidth / mountRef.current.clientHeight, 0.1, 1000);
    camera.position.z = 4;
    cameraRef.current = camera;

    const renderer = new window.THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    mountRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    const light = new window.THREE.PointLight(0xffffff, 1.5);
    light.position.set(5, 5, 5);
    scene.add(light);

    const geometry = new window.THREE.BoxGeometry(2, 2, 0.2);
    const material = new window.THREE.MeshStandardMaterial({
      color: 0x111111,
      metalness: 0.6,
      roughness: 0.2,
    });

    const mesh = new window.THREE.Mesh(geometry, material);
    scene.add(mesh);
    meshRef.current = mesh;

    const animate = () => {
      requestAnimationFrame(animate);
      if (meshRef.current) {
        meshRef.current.rotation.y += 0.01;
        meshRef.current.rotation.x += 0.005;
      }
      renderer.render(scene, camera);
    };
    animate();
  }, []);

  useEffect(() => {
    init();
    return () => {
      if (rendererRef.current && mountRef.current) {
        mountRef.current.removeChild(rendererRef.current.domElement);
      }
    };
  }, [init]);

  return <div ref={mountRef} style={{ width: "100%", height: "300px" }} />;
};

// ---------- MAIN COMPONENT ----------
export default function HowItWorksSection({ onNavigate }) {
  const prefersReducedMotion = useReducedMotion();
  const containerRef = useRef(null);

  const handleNavigate = () => {
    if (onNavigate) onNavigate("/chat");
    else window.location.href = "/chat";
  };

  // mouse parallax
  const handleMouseMove = (e) => {
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    containerRef.current.style.transform = `rotateY(${x * 6}deg) rotateX(${y * -6}deg)`;
  };

  return (
    <section style={styles.section}>
      <div style={styles.backgroundGlow} />

      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        style={styles.container}
      >

        {/* 3D ELEMENT */}
        {!prefersReducedMotion && <ThreeDLogo />}

        <motion.span style={styles.badge}>
          PROCESSO 100% LEGALIZADO
        </motion.span>

        <motion.h2 style={styles.title}>
          Como funciona?
        </motion.h2>

        {/* ORIGINAL CONTENT */}
        <div style={styles.contentGrid}>

          <motion.div style={styles.mainCard} whileHover={{ y: -6 }}>
            <p style={styles.paragraphBold}>
              Basta fazer nosso teste de IA. Caso o resultado do teste seja superior a 50%, vamos te guiar no passo a passo para
              obter sua autorização e acesso aos melhores Médicos Prescritores e Fornecedores de produtos com THC, CBD (ICE, Hash, Rosin, FullSpectrum, Diamonds),
              Flores e Extrações de forma 100% legal, leve, rápida e descomplicada!
            </p>
          </motion.div>

          <div style={styles.infoGrid}>
            {["01", "02", "✓"].map((step, i) => (
              <motion.div
                key={i}
                style={i === 2 ? styles.fullWidthCard : styles.glassCard}
                whileHover={{ y: -8, scale: 1.02 }}
              >
                <div style={styles.iconTag}>{step}</div>
                <p style={styles.smallText}>
                  {i === 0 && "Acesse guia completo com médicos e fornecedores aprovados."}
                  {i === 1 && "Receita em até 2h e entrega em até 24h."}
                  {i === 2 && "Anexe receita e notas para garantir transporte legal."}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <motion.div style={styles.ctaWrapper}>
          <button style={styles.ctaButton} onClick={handleNavigate}>
            INICIAR TESTE IA →
          </button>
          <span style={styles.ctaNote}>Resultado imediato via IA</span>
        </motion.div>
      </div>
    </section>
  );
}

// ---------- STYLES ----------
const styles = {
  section: {
    background: "#f5f7fb",
    padding: "120px 20px",
    perspective: "1200px",
  },
  container: {
    maxWidth: "1000px",
    margin: "0 auto",
    transition: "transform 0.2s ease",
  },
  backgroundGlow: {
    position: "absolute",
    width: "500px",
    height: "500px",
    background: "radial-gradient(circle, rgba(0,120,255,0.2), transparent)",
    filter: "blur(100px)",
  },
  badge: {
    display: "inline-block",
    background: "#000",
    color: "#fff",
    padding: "6px 14px",
    borderRadius: "999px",
    fontSize: "12px",
    marginBottom: "20px",
  },
  title: {
    fontSize: "40px",
    color: "#000",
    marginBottom: "30px",
  },
  contentGrid: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },
  mainCard: {
    background: "#fff",
    padding: "30px",
    borderRadius: "20px",
  },
  paragraphBold: {
    color: "#000",
  },
  infoGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "20px",
  },
  glassCard: {
    background: "rgba(255,255,255,0.9)",
    padding: "20px",
    borderRadius: "20px",
  },
  fullWidthCard: {
    gridColumn: "1 / -1",
    background: "#000",
    color: "#fff",
    padding: "20px",
    borderRadius: "20px",
  },
  iconTag: {
    background: "#000",
    color: "#fff",
    width: "30px",
    height: "30px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "8px",
  },
  smallText: {
    marginTop: "10px",
    color: "inherit",
  },
  ctaWrapper: {
    marginTop: "40px",
    textAlign: "center",
  },
  ctaButton: {
    padding: "16px 40px",
    borderRadius: "999px",
    background: "#000",
    color: "#fff",
    border: "none",
  },
  ctaNote: {
    marginTop: "10px",
    display: "block",
  },
};
