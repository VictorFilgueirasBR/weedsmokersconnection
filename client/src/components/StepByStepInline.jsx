// src/components/StepByStepSaaSPro.jsx
import React from 'react';
import { motion } from 'framer-motion';

const steps = [
  {
    title: 'Entre para o CLUB',
    description:
      'Converse com nossa equipe e entenda rapidamente os principais pontos antes de começar o seu tratamento da melhor forma, com consciência, respaldo médico, jurídico e regulatório garantido pela WS | Connection®.',
    status: 'completed',
  },
  {
    title: 'Como conseguir autorização e receita?',
    description:
      'Faça sua consulta com um de nossos Médicos Colaboradores. Atendimento exclusivo, personalizado e com alto nível técnico em terapias endocanabinoides.',
    status: 'completed',
  },
  {
    title: 'Escolha suas Flores e Extrações com THC',
    description:
      'Flores in natura, extrações (THC, THCa, Δ9, Δ8), Rosin, Wax, Diamonds, Hash, Gummies e opções com CBD, CBN e CBG.',
    status: 'current',
  },
  {
    title: 'Finalize seu pedido com segurança',
    description:
      'Receba rastreamento com seguro incluso e aguarde sua entrega em casa. Envio para todo o Brasil em até 36 horas.',
    status: 'upcoming',
  },
];

export default function StepByStepSaaSPro() {
  return (
    <div className="saas-container">
      <div className="noise" />
      <div className="card">
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
                {step.status === 'completed' ? '✔' : index + 1}
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
        .saas-container {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: radial-gradient(circle at 20% 20%, #0f2e4d, #081521);
          font-family: 'Satoshi', sans-serif;
          padding: 24px;
          position: relative;
          overflow: hidden;
        }

        .noise {
          position: absolute;
          inset: 0;
          background-image: url("https://grainy-gradients.vercel.app/noise.svg");
          opacity: 0.05;
          pointer-events: none;
        }

        .card {
          width: 100%;
          max-width: 520px;
          padding: 32px;
          border-radius: 22px;
          backdrop-filter: blur(20px);
          background: linear-gradient(
            135deg,
            rgba(255,255,255,0.06),
            rgba(255,255,255,0.02)
          );
          border: 1px solid rgba(255,255,255,0.08);
          box-shadow:
            0 20px 60px rgba(0,0,0,0.6),
            inset 0 1px 0 rgba(255,255,255,0.06);
        }

        .step {
          position: relative;
          display: flex;
          gap: 16px;
          padding-left: 10px;
          margin-bottom: 26px;
        }

        .step:last-child {
          margin-bottom: 0;
        }

        .icon {
          min-width: 28px;
          height: 28px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 13px;
          font-weight: 700;
          color: #fff;
          z-index: 2;
          position: relative;
          transition: all 0.3s ease;
        }

        .line {
          position: absolute;
          left: 13px;
          top: 34px;
          width: 2px;
          height: calc(100% - 34px);
          background: linear-gradient(to bottom, #4da6ff, transparent);
          opacity: 0.4;
        }

        .content h3 {
          margin: 0;
          font-size: clamp(14px, 1.6vw, 16px);
          font-weight: 700;
          color: #eaf4ff;
          letter-spacing: -0.01em;
        }

        .content p {
          margin-top: 6px;
          font-size: clamp(13px, 1.5vw, 14px);
          color: rgba(234,244,255,0.75);
          line-height: 1.65;
          text-align: justify;
          text-wrap: balance;
        }

        /* STATUS */

        .completed .icon {
          background: linear-gradient(135deg, #a0ecfa, #4da6ff);
          box-shadow: 0 0 18px rgba(160,236,250,0.7);
        }

        .current .icon {
          background: linear-gradient(135deg, #4da6ff, #1e4d7a);
          box-shadow: 0 0 25px rgba(77,166,255,1);
          animation: pulse 2s infinite;
        }

        .upcoming .icon {
          background: rgba(255,255,255,0.12);
          color: rgba(255,255,255,0.4);
        }

        .upcoming h3,
        .upcoming p {
          color: rgba(255,255,255,0.35);
        }

        /* HOVER MICROINTERACTION */

        .step:hover .icon {
          transform: scale(1.08);
        }

        .step:hover .line {
          opacity: 0.8;
        }

        /* ANIMATION */

        @keyframes pulse {
          0% { box-shadow: 0 0 12px rgba(77,166,255,0.5); }
          50% { box-shadow: 0 0 30px rgba(77,166,255,1); }
          100% { box-shadow: 0 0 12px rgba(77,166,255,0.5); }
        }

        /* MOBILE FINO */

        @media (max-width: 480px) {
          .card {
            padding: 24px;
          }

          .step {
            gap: 12px;
          }
        }
      `}</style>
    </div>
  );
}