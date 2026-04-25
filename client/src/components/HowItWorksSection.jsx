// client/src/components/HowItWorksSection.jsx
import React, { useEffect, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";

export default function HowItWorksSection({ onNavigate }) {
  const prefersReducedMotion = useReducedMotion();
  const wrapRef = useRef(null);

  const handleNavigate = () => {
    if (onNavigate) onNavigate("/chat");
    else window.location.href = "/chat";
  };

  // subtle neural spotlight following cursor (Apple/Web3 vibe)
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const move = (e) => {
      const r = el.getBoundingClientRect();
      const x = e.clientX - r.left;
      const y = e.clientY - r.top;
      el.style.setProperty("--mx", `${x}px`);
      el.style.setProperty("--my", `${y}px`);
    };
    el.addEventListener("mousemove", move);
    return () => el.removeEventListener("mousemove", move);
  }, []);

  return (
    <section ref={wrapRef} className="wsc-wrap">
      {/* layered backgrounds */}
      <div className="wsc-bg-gradient" />
      <div className="wsc-bg-grid" />
      <div className="wsc-bg-noise" />

      <div className="wsc-container">

        {/* BADGE */}
        <motion.div
          className="wsc-badge"
          initial={{ y: -60, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
        >
          <span className="dot" />
          PROCESSO 100% LEGALIZADO
        </motion.div>

        {/* TITLE */}
        <motion.h1
          className="wsc-title"
          initial={{ x: -80, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true }}
        >
          COMO <br />
          <span>FUNCIONA</span>
        </motion.h1>

        {/* DESCRIPTION */}
        <motion.p
          className="wsc-desc"
          initial={{ y: 60, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          animate={!prefersReducedMotion ? { y: [0, -32, 0, 32, 0] } : {}}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        >
          Basta fazer nosso teste de IA. Caso o resultado seja superior a 50%, vamos te guiar no passo a passo para obter sua autorização e acesso aos melhores médicos prescritores e fornecedores.
        </motion.p>

        {/* STEPS */}
        <div className="wsc-steps">
          <Step n="01" t="Acesso completo" />
          <Step n="02" t="Execução rápida" />
          <Step n="✓" t="Compliance total" />
        </div>

        {/* CTA */}
        <button className="wsc-cta" onClick={handleNavigate}>
          INICIAR TESTE IA
        </button>

      </div>

      <style>{`

      /* ====== WRAP ====== */
      .wsc-wrap {
        position: relative;
        width: 100%;
        padding: 56px 20px;
        display: flex;
        justify-content: center;
        overflow: hidden;
        background: #04070c;
        --mx: 50%;
        --my: 50%;
      }

      /* ====== GRADIENT BASE ====== */
      .wsc-bg-gradient {
        position: absolute;
        inset: 0;
        background:
          radial-gradient(circle at 20% 20%, rgba(0,180,255,0.15), transparent 40%),
          radial-gradient(circle at 80% 60%, rgba(0,120,255,0.12), transparent 50%),
          linear-gradient(180deg, #050b14, #02050a);
        z-index: 0;
      }

      /* ====== GRID (Web3 feel) ====== */
      .wsc-bg-grid {
        position: absolute;
        inset: 0;
        background-image:
          linear-gradient(rgba(0,200,255,0.06) 1px, transparent 1px),
          linear-gradient(90deg, rgba(0,200,255,0.06) 1px, transparent 1px);
        background-size: 40px 40px;
        opacity: 0.15;
        animation: gridFloat 20s linear infinite;
        z-index: 1;
      }

      @keyframes gridFloat {
        0% { transform: translateY(0); }
        100% { transform: translateY(-40px); }
      }

      /* ====== NOISE LAYER ====== */
      .wsc-bg-noise {
        position: absolute;
        inset: 0;
        background-image: radial-gradient(rgba(255,255,255,0.03) 1px, transparent 1px);
        background-size: 3px 3px;
        opacity: 0.25;
        z-index: 2;
      }

      /* ====== CONTAINER ====== */
      .wsc-container {
        position: relative;
        z-index: 3;
        max-width: 720px;
        width: 100%;
        display: flex;
        flex-direction: column;
        gap: 28px;
      }

      /* ====== BADGE ====== */
      .wsc-badge {
        display: inline-flex;
        align-items: center;
        gap: 10px;
        background: rgba(0, 200, 255, 0.08);
        border: 1px solid rgba(0, 200, 255, 0.25);
        color: #bfefff;
        padding: 6px 16px;
        border-radius: 999px;
        font-size: 10px;
        font-weight: 800;
        letter-spacing: 0.25em;
        backdrop-filter: blur(8px);
      }

      .wsc-badge .dot {
        width: 6px;
        height: 6px;
        background: #00cfff;
        border-radius: 50%;
        box-shadow: 0 0 10px #00cfff;
      }

      /* ====== TITLE ====== */
      .wsc-title {
        font-size: clamp(44px, 6vw, 72px);
        font-weight: 900;
        line-height: 0.82;
        color: #eaf6ff;
        letter-spacing: -0.05em;
      }

      .wsc-title span {
        background: linear-gradient(90deg, #00cfff, #4da6ff);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
      }

      /* ====== DESC ====== */
      .wsc-desc {
        font-size: 18px;
        line-height: 1.6;
        color: #cfeeff;
        max-width: 540px;
      }

      /* ====== STEPS ====== */
      .wsc-steps {
        display: flex;
        flex-direction: column;
        gap: 14px;
      }

      .wsc-step {
        display: flex;
        align-items: center;
        gap: 14px;
        background: rgba(255,255,255,0.03);
        backdrop-filter: blur(12px);
        border: 1px solid rgba(255,255,255,0.08);
        border-radius: 16px;
        padding: 16px 18px;
        box-shadow:
          inset 0 1px 0 rgba(255,255,255,0.05),
          0 10px 30px rgba(0,0,0,0.35);
        transition: all .3s ease;
      }

      .wsc-step:hover {
        transform: translateY(-6px) scale(1.01);
        box-shadow: 0 20px 50px rgba(0,0,0,0.5);
      }

      .wsc-step-number {
        font-weight: 900;
        color: #00cfff;
      }

      .wsc-step-title {
        font-weight: 600;
        color: #eaf6ff;
      }

      /* ====== CTA ====== */
      .wsc-cta {
        width: 100%;
        margin-top: 10px;
        padding: 16px;
        border-radius: 14px;
        border: none;
        background: linear-gradient(90deg, #4da6ff, #00cfff);
        color: #fff;
        font-weight: 700;
        letter-spacing: 0.03em;
        box-shadow: 0 10px 30px rgba(77,166,255,0.35);
        cursor: pointer;
        position: relative;
        overflow: hidden;
      }

      .wsc-cta::before {
        content: '';
        position: absolute;
        left: var(--mx);
        top: var(--my);
        transform: translate(-50%, -50%);
        width: 0;
        height: 0;
        border-radius: 50%;
        background: radial-gradient(circle, rgba(255,255,255,0.25), transparent 70%);
        transition: width .3s ease, height .3s ease, opacity .3s ease;
        opacity: 0;
      }

      .wsc-cta:hover::before {
        width: 240px;
        height: 240px;
        opacity: 1;
      }

      .wsc-cta:hover {
        transform: translateY(-2px);
      }

      `}</style>
    </section>
  );
}

function Step({ n, t }) {
  return (
    <motion.div
      className="wsc-step"
      initial={{ y: 60, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true }}
    >
      <span className="wsc-step-number">{n}</span>
      <p className="wsc-step-title">{t}</p>
    </motion.div>
  );
}
