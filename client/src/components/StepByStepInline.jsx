// src/components/StepByStepUltra.jsx
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
    title: 'Autorização e Receita',
    description:
      'Consulta com especialistas altamente qualificados em terapia canabinoide.',
    status: 'completed',
  },
  {
    title: 'Escolha suas Extrações',
    description:
      'THC, THCa, Rosin, Diamonds, Hash, Gummies e linha completa com CBD.',
    status: 'current',
  },
  {
    title: 'Entrega Segura',
    description:
      'Rastreamento + seguro incluso. Entrega em até 36h em todo Brasil.',
    status: 'upcoming',
  },
];

export default function StepByStepUltra() {
  return (
    <div className="ultra-container">
      <div className="cyber-grid" />
      <div className="particles" />
      <div className="scanner" />

      <div className="card">
        {steps.map((step, index) => {
          const isLast = index === steps.length - 1;

          return (
            <motion.div
              key={index}
              className={`step ${step.status}`}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.15 }}
              whileHover={{ scale: 1.03 }}
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

        /* GRID CYBERPUNK */
        .cyber-grid {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(77,166,255,0.08) 1px, transparent 1px),
            linear-gradient(90deg, rgba(77,166,255,0.08) 1px, transparent 1px);
          background-size: 40px 40px;
          opacity: 0.2;
        }

        /* PARTICLES */
        .particles::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image: radial-gradient(#4da6ff 1px, transparent 1px);
          background-size: 80px 80px;
          opacity: 0.08;
        }

        /* SCANNER */
        .scanner {
          position: absolute;
          width: 100%;
          height: 2px;
          background: linear-gradient(90deg, transparent, #4da6ff, transparent);
          top: 0;
          animation: scan 6s linear infinite;
          opacity: 0.4;
        }

        @keyframes scan {
          0% { top: 0; }
          100% { top: 100%; }
        }

        /* CARD */
        .card {
          width: 100%;
          max-width: 540px;
          padding: 32px;
          border-radius: 24px;
          backdrop-filter: blur(25px);
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          box-shadow:
            0 0 80px rgba(0,0,0,0.7),
            inset 0 0 40px rgba(77,166,255,0.08);
          position: relative;
        }

        /* STEP */
        .step {
          position: relative;
          display: flex;
          gap: 16px;
          margin-bottom: 28px;
        }

        .icon {
          position: relative;
        }

        .icon-core {
          width: 30px;
          height: 30px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: bold;
          background: linear-gradient(135deg, #4da6ff, #1e4d7a);
          color: white;
          box-shadow: 0 0 20px rgba(77,166,255,0.8);
          z-index: 2;
        }

        .pulse-ring {
          position: absolute;
          inset: -6px;
          border-radius: 12px;
          border: 1px solid rgba(77,166,255,0.5);
          animation: pulseRing 2s infinite;
        }

        @keyframes pulseRing {
          0% { transform: scale(1); opacity: 0.7; }
          100% { transform: scale(1.6); opacity: 0; }
        }

        /* LINE ENERGY */
        .line {
          position: absolute;
          left: 14px;
          top: 34px;
          width: 2px;
          height: calc(100% - 34px);
          background: linear-gradient(
            to bottom,
            #4da6ff,
            rgba(77,166,255,0.1)
          );
          animation: flow 2s linear infinite;
        }

        @keyframes flow {
          0% { background-position: 0 0; }
          100% { background-position: 0 40px; }
        }

        /* CONTENT */
        h3 {
          margin: 0;
          font-size: clamp(14px, 1.5vw, 16px);
          color: #eaf4ff;
        }

        p {
          margin-top: 6px;
          font-size: clamp(13px, 1.4vw, 14px);
          color: rgba(234,244,255,0.75);
          line-height: 1.6;
          text-align: justify;
        }

        /* STATES */
        .completed .icon-core {
          background: linear-gradient(135deg, #a0ecfa, #4da6ff);
        }

        .upcoming {
          opacity: 0.4;
        }

      `}</style>
    </div>
  );
}