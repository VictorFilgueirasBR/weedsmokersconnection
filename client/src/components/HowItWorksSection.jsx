// client/src/components/HowItWorksSection.jsx
import React, { useEffect, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";

// ---------- 3D INTERACTIVE ----------
const ThreeDInteractive = () => {
  const mountRef = useRef(null);
  const meshRef = useRef(null);

  useEffect(() => {
    if (!mountRef.current || !window.THREE) return;

    const scene = new window.THREE.Scene();
    const camera = new window.THREE.PerspectiveCamera(60, mountRef.current.clientWidth / mountRef.current.clientHeight, 0.1, 1000);
    camera.position.z = 4;

    const renderer = new window.THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    mountRef.current.appendChild(renderer.domElement);

    const light = new window.THREE.PointLight(0xffffff, 1.5);
    light.position.set(5, 5, 5);
    scene.add(light);

    const geometry = new window.THREE.IcosahedronGeometry(1.4, 1);
    const material = new window.THREE.MeshPhysicalMaterial({
      color: 0x0b0f14,
      metalness: 0.7,
      roughness: 0.2,
      clearcoat: 1,
      clearcoatRoughness: 0.1
    });

    const mesh = new window.THREE.Mesh(geometry, material);
    scene.add(mesh);
    meshRef.current = mesh;

    const animate = () => {
      requestAnimationFrame(animate);
      mesh.rotation.y += 0.008;
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      mountRef.current?.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} style={{ width: "100%", height: "120px", position: "absolute", top: 0, opacity: 0.5 }} />;
};

// ---------- MAIN ----------
export default function HowItWorksSection({ onNavigate }) {
  const prefersReducedMotion = useReducedMotion();
  const containerRef = useRef(null);

  const handleNavigate = () => {
    if (onNavigate) onNavigate("/chat");
    else window.location.href = "/chat";
  };

  const handleMouseMove = (e) => {
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left);
    const y = (e.clientY - rect.top);
    containerRef.current.style.setProperty('--x', `${x}px`);
    containerRef.current.style.setProperty('--y', `${y}px`);
  };

  return (
    <section style={styles.section}>
      <div style={styles.spotlight} />

      <div ref={containerRef} onMouseMove={handleMouseMove} style={styles.container}>

        {!prefersReducedMotion && <ThreeDInteractive />}

        {/* BADGE */}
        <motion.span
          style={styles.badge}
          initial={{ y: -40, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          PROCESSO 100% LEGALIZADO
        </motion.span>

        {/* TITLE */}
        <motion.h2
          style={styles.title}
          initial={{ x: -60, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          Como funciona?
        </motion.h2>

        <div style={styles.contentGrid}>

          {/* PARAGRAPH */}
          <motion.div
            style={styles.mainCard}
            initial={{ y: 60, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            animate={!prefersReducedMotion ? { y: [0, -7, 0, 7, 0] } : {}}
          >
            <p style={styles.paragraphBold}>
              Basta fazer nosso teste de IA. Caso o resultado do teste seja superior a 50%, vamos te guiar no passo a passo para obter sua autorização e acesso aos melhores Médicos Prescritores e Fornecedores.
            </p>
          </motion.div>

          {/* CARDS */}
          <div style={styles.infoGrid}>
            {["01 — Acesso completo","02 — Execução rápida","✓ — Compliance total"].map((text, i) => (
              <motion.div
                key={i}
                style={styles.floatingCard}
                initial={{ y: 60, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                whileHover={{ y: -10, scale: 1.03 }}
              >
                {text}
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <motion.div style={styles.ctaWrapper}>
          <button
            className="submit-gradient-btn"
            onClick={handleNavigate}
            onMouseMove={handleMouseMove}
          >
            INICIAR TESTE IA
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
    padding: "24px 20px 48px",
    position: "relative",
    overflow: "hidden",
  },

  spotlight: {
    position: "absolute",
    inset: 0,
    background: "radial-gradient(circle at var(--x,50%) var(--y,50%), rgba(0,120,255,0.15), transparent 40%)",
    pointerEvents: "none",
  },

  container: {
    maxWidth: "1000px",
    margin: "0 auto",
    paddingTop: "8px",
  },

  badge: {
    background: "#000",
    color: "#fff",
    padding: "6px 14px",
    borderRadius: "999px",
  },

  title: {
    fontSize: "42px",
    color: "#000",
    margin: "16px 0",
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
    display: "flex",
    gap: "20px",
    flexWrap: "wrap",
  },

  floatingCard: {
    background: "rgba(255,255,255,0.9)",
    padding: "20px",
    borderRadius: "16px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
  },

  ctaWrapper: {
    marginTop: "40px",
    textAlign: "center",
  },

  ctaNote: {
    display: "block",
    marginTop: "10px",
  },
};
