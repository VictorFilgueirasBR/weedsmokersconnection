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
      'Consulta com Médicos especialistas (CRM) altamente qualificados em terapia canabinoide.',
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
      'Rastreamento + seguro incluso. Envios em até 36h para todo Brasil.',
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
          <h2>Fluxo de Atendimento Inteligente</h2>
          <p>Ambiente seguro com validação médica e acompanhamento profissional</p>
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
              whileHover={{ scale: 1.015 }}
            >
              <div className="icon">
                <div className="icon-core">
                  {step.status === 'completed' ? '✔' : index + 1}
                </div>
                {step.status === 'current' && <div className="pulse-ring" />}
              </div>

              {!isLast && <div className="line" />}

              <div className="content">
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </div>
            </motion.div>
          );
        })}

        {/* CTA CLEAN PREMIUM */}
        <a 
          href="https://weedsmokersconnection.com/signup" 
          style={{ textDecoration: 'none' }}
        >
          <motion.button
            className="cta"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
          >
            Escolha seu Plano
          </motion.button>
        </a>

        <div className="trust">
           Seguro  •  Médicos certificados •  Entrega rápida
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

        /* GLOW AMBIENTE */
        .ambient-glow {
          position: absolute;
          width: 500px;
          height: 500px;
          background: radial-gradient(circle, rgba(77,166,255,0.15), transparent);
          filter: blur(120px);
        }

        /* GRID */
        .cyber-grid {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(77,166,255,0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(77,166,255,0.05) 1px, transparent 1px);
          background-size: 60px 60px;
        }

        /* SCANNER */
        .scanner {
          position: absolute;
          width: 100%;
          height: 1px;
          background: linear-gradient(90deg, transparent, #4da6ff, transparent);
          animation: scan 8s linear infinite;
          opacity: 0.25;
        }

        @keyframes scan {
          0% { top: 0 }
          100% { top: 100% }
        }

        /* CARD */
        .card {
          width: 100%;
          max-width: 560px;
          padding: 36px;
          border-radius: 24px;
          backdrop-filter: blur(30px);
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          box-shadow:
            0 20px 80px rgba(0,0,0,0.6),
            inset 0 0 30px rgba(77,166,255,0.06);
        }

        /* HEADER */
        .header {
          margin-bottom: 28px;
        }

        .badge {
          font-size: 11px;
          color: #4da6ff;
          letter-spacing: 0.12em;
        }

        h2 {
          margin: 6px 0;
          font-size: 20px;
          color: #eaf4ff;
        }

        .header p {
          font-size: 13px;
          color: rgba(234,244,255,0.6);
        }

        /* STEP */
        .step {
          position: relative;
          display: flex;
          gap: 16px;
          margin-bottom: 26px;
        }

        .icon-core {
          width: 30px;
          height: 30px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 600;
          background: linear-gradient(135deg, #4da6ff, #1e4d7a);
          color: white;
          box-shadow: 0 0 16px rgba(77,166,255,0.6);
        }

        .pulse-ring {
          position: absolute;
          inset: -6px;
          border-radius: 12px;
          border: 1px solid rgba(77,166,255,0.4);
          animation: pulse 2s infinite;
        }

        @keyframes pulse {
          0% { opacity: 0.6; transform: scale(1); }
          100% { opacity: 0; transform: scale(1.5); }
        }

        .line {
          position: absolute;
          left: 14px;
          top: 34px;
          width: 2px;
          height: calc(100% - 34px);
          background: linear-gradient(to bottom, rgba(77,166,255,0.6), transparent);
        }

        h3 {
          margin: 0;
          font-size: 15px;
          color: #eaf4ff;
        }

        p {
          margin-top: 5px;
          font-size: 13px;
          color: rgba(234,244,255,0.7);
          line-height: 1.6;
          text-align: justify;
        }

        .completed .icon-core {
          background: linear-gradient(135deg, #a0ecfa, #4da6ff);
        }

        .upcoming {
          opacity: 0.35;
        }

        /* CTA */
        .cta {
          width: 100%;
          margin-top: 24px;
          padding: 14px;
          border-radius: 12px;
          border: none;
          background: linear-gradient(90deg, #4da6ff, #00cfff);
          color: #fff;
          font-weight: 600;
          box-shadow: 0 8px 25px rgba(77,166,255,0.3);
          cursor: pointer;
        }

        .trust {
          margin-top: 12px;
          font-size: 12px;
          text-align: center;
          color: rgba(234,244,255,0.5);
        }

      `}</style>
    </div>
  );
}