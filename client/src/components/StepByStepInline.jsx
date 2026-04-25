// src/components/StepByStepUltraHealthPro.jsx
import React from 'react';
import { motion } from 'framer-motion';

const steps = [
  {
    title: 'Entre para o CLUB',
    description:
      'Converse com nossa equipe e entenda os principais pontos com respaldo médico, jurídico e regulatório.',
    status: 'completed',
  },
  {
    title: 'Consulta Especializada',
    description:
      'Consulta com médicos especialistas (CRM) altamente qualificados em terapia canabinoide.',
    status: 'completed',
  },
  {
    title: 'Tratamento Personalizado',
    description:
      'THC, THCa, Rosin, Diamonds, Hash, Flores, Óleos, Gummies e opções com CBD.',
    status: 'current',
  },
  {
    title: 'Entrega Segura',
    description:
      'Sempre com rastreamento + seguro inclusos. Pacientes em todos os estados do Brasil. (Todos os DDDs)',
    status: 'upcoming',
  },
];

export default function StepByStepUltraHealthPro() {
  return (
    <div className="ultra-container">
      <div className="ambient-glow" />
      <div className="cyber-grid" />
      <div className="scanner" />

      <div className="card">

        {/* HEADER */}
        <div className="header">
          <span className="badge">WS CONNECTION®</span>
          <h2 className="title">Fluxo de Atendimento Inteligente</h2>
          <p className="subtitle">
            Ambiente seguro com validação médica e acompanhamento profissional
          </p>
        </div>

        {steps.map((step, index) => {
          const isLast = index === steps.length - 1;

          return (
            <motion.div
              key={index}
              className={`step ${step.status}`}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.12 }}
              whileHover={{ scale: 1.02 }}
            >
              <div className="icon">
                <div className="icon-core">

                  {/* 🔥 NOVO ICON (SUBSTITUI ✔) */}
                  <div className="core-wrapper">
                    <div className="core" />
                    {step.status === 'current' && <div className="pulse" />}
                  </div>

                </div>
              </div>

              {!isLast && <div className="line" />}

              <div className="content">
                <h3 className="step-title">{step.title}</h3>
                <p className="step-text">{step.description}</p>
              </div>
            </motion.div>
          );
        })}

        {/* CTA */}
        <a 
          href="https://weedsmokersconnection.com/signup" 
          className="cta-link"
        >
          <motion.button
            className="cta"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.96 }}
          >
            Ver Planos
          </motion.button>
        </a>

        <div className="trust">
          Método Seguro • Médicos certificados • Entrega rápida
        </div>

      </div>

      <style>{`
        .ultra-container {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: radial-gradient(circle at center, #0a1a2f, #050d18);
          font-family: 'Satoshi', sans-serif;
          position: relative;
          overflow: hidden;
        }

        .ultra-container .ambient-glow {
          position: absolute;
          width: 600px;
          height: 600px;
          background: radial-gradient(circle, rgba(77,166,255,0.12), transparent);
          filter: blur(140px);
        }

        .ultra-container .cyber-grid {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(77,166,255,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(77,166,255,0.04) 1px, transparent 1px);
          background-size: 60px 60px;
        }

        .ultra-container .scanner {
          position: absolute;
          width: 100%;
          height: 1px;
          background: linear-gradient(90deg, transparent, #4da6ff, transparent);
          animation: scan 8s linear infinite;
          opacity: 0.2;
        }

        @keyframes scan {
          0% { top: 0 }
          100% { top: 100% }
        }

        .ultra-container .card {
          width: 100%;
          max-width: 560px;
          padding: 40px;
          border-radius: 28px;
          backdrop-filter: blur(40px);
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.08);
          box-shadow:
            0 30px 100px rgba(0,0,0,0.65),
            inset 0 0 40px rgba(77,166,255,0.05);
        }

        .ultra-container .header {
          margin-bottom: 32px;
        }

        .ultra-container .badge {
          font-size: 11px;
          color: #4da6ff;
          letter-spacing: 0.14em;
        }

        .ultra-container .title {
          margin: 8px 0;
          font-size: 22px;
          color: #eaf4ff;
          font-weight: 600;
        }

        .ultra-container .subtitle {
          font-size: 13px;
          color: rgba(234,244,255,0.6);
        }

        .ultra-container .step {
          position: relative;
          display: flex;
          gap: 16px;
          margin-bottom: 28px;
        }

        .ultra-container .icon-core {
          width: 32px;
          height: 32px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        /* 🔥 NOVOS ELEMENTOS (ADICIONADOS) */
        .core-wrapper {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .core {
          width: 14px;
          height: 14px;
          border-radius: 50%;
          background: linear-gradient(135deg, #00cfff, #0066ff);
          box-shadow: 0 0 12px rgba(0,200,255,0.8);
        }

        .pulse {
          position: absolute;
          inset: -6px;
          border-radius: 50%;
          border: 1px solid rgba(0,200,255,0.5);
          animation: pulse 1.8s infinite;
        }

        @keyframes pulse {
          0% { transform: scale(1); opacity: 0.7; }
          100% { transform: scale(2.2); opacity: 0; }
        }

        .ultra-container .line {
          position: absolute;
          left: 15px;
          top: 36px;
          width: 2px;
          height: calc(100% - 36px);
          background: linear-gradient(to bottom, rgba(77,166,255,0.5), transparent);
        }

        .ultra-container .step-title {
          margin: 0;
          font-size: 15px;
          color: #eaf4ff;
          font-weight: 500;
        }

        .ultra-container .step-text {
          margin-top: 6px;
          font-size: 13px;
          color: rgba(234,244,255,0.7);
          line-height: 1.6;
        }

        .ultra-container .upcoming {
          opacity: 0.35;
        }

        .ultra-container .cta-link {
          text-decoration: none;
        }

        .ultra-container .cta {
          width: 100%;
          margin-top: 28px;
          padding: 15px;
          border-radius: 14px;
          border: none;
          background: linear-gradient(90deg, #4da6ff, #00cfff);
          color: #fff;
          font-weight: 600;
          letter-spacing: 0.02em;
          box-shadow: 0 10px 30px rgba(77,166,255,0.35);
          cursor: pointer;
        }

        .ultra-container .trust {
          margin-top: 14px;
          font-size: 12px;
          text-align: center;
          color: rgba(234,244,255,0.5);
        }

      `}</style>
    </div>
  );
}