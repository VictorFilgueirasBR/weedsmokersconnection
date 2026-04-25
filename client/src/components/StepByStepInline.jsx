// src/components/UltraFlowExperience.jsx
import React from "react";
import { motion } from "framer-motion";

const steps = [
  {
    title: "Entrada Inteligente",
    description: "Análise inicial com validação médica e jurídica.",
    status: "done",
  },
  {
    title: "Consulta Especializada",
    description: "Médico CRM define sua estratégia personalizada.",
    status: "done",
  },
  {
    title: "Plano Terapêutico",
    description: "Protocolos com THC, CBD e derivados de alta performance.",
    status: "active",
  },
  {
    title: "Entrega Expressa",
    description: "Envio rastreado com seguro incluso em até 36h.",
    status: "next",
  },
];

export default function UltraFlowExperience() {
  return (
    <div className="flow-root">

      <div className="energy-bg" />
      <div className="noise" />

      <div className="flow-card">

        {/* HEADER */}
        <div className="flow-header">
          <span className="badge">WS CONNECTION®</span>
          <h1>Fluxo de Atendimento Inteligente</h1>
          <p>Ambiente seguro com validação médica e acompanhamento profissional</p>
        </div>

        {/* FLOW */}
        <div className="flow-line">

          {steps.map((step, i) => {
            const isActive = step.status === "active";

            return (
              <motion.div
                key={i}
                className={`flow-step ${step.status}`}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.15 }}
                whileHover={{ scale: 1.03 }}
              >

                {/* CORE */}
                <div className="core-wrapper">
                  <div className="core" />

                  {isActive && <div className="pulse" />}
                </div>

                {/* CONNECTOR */}
                {i !== steps.length - 1 && (
                  <div className="connector">
                    <motion.div
                      className="connector-fill"
                      initial={{ height: 0 }}
                      animate={{
                        height: step.status !== "next" ? "100%" : "0%",
                      }}
                      transition={{ duration: 0.9, delay: i * 0.2 }}
                    />
                  </div>
                )}

                {/* CONTENT */}
                <div className="flow-content">
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </div>

              </motion.div>
            );
          })}

        </div>

        {/* CTA */}
        <motion.div 
          className="cta-zone"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <p className="cta-pre">
            Você está a 1 passo de iniciar seu tratamento
          </p>

          <motion.a
            href="https://weedsmokersconnection.com/signup"
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.96 }}
            className="cta-btn"
          >
            Ativar meu acesso →
          </motion.a>

          <span className="trust">
            Método Seguro • Médicos Certificados • Entrega Expressa
          </span>
        </motion.div>

      </div>

      <style>{`
        .flow-root {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: radial-gradient(circle at center, #050b14, #010205);
          font-family: 'Satoshi', sans-serif;
          position: relative;
          overflow: hidden;
        }

        /* FUNDO */
        .flow-root .energy-bg {
          position: absolute;
          width: 800px;
          height: 800px;
          background: radial-gradient(circle, rgba(0,180,255,0.12), transparent);
          filter: blur(180px);
        }

        .flow-root .noise {
          position: absolute;
          inset: 0;
          opacity: 0.05;
          background-image: url('https://grainy-gradients.vercel.app/noise.svg');
        }

        /* CARD */
        .flow-root .flow-card {
          width: 100%;
          max-width: 720px;
          padding: 50px;
          border-radius: 32px;
          backdrop-filter: blur(50px);
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.08);
          box-shadow: 0 40px 120px rgba(0,0,0,0.8);
        }

        /* HEADER */
        .flow-header {
          text-align: center;
          margin-bottom: 50px;
        }

        .flow-header h1 {
          color: #eaf6ff;
          font-size: 30px;
          margin: 10px 0;
        }

        .flow-header p {
          color: rgba(234,246,255,0.6);
        }

        .badge {
          font-size: 11px;
          letter-spacing: 0.15em;
          color: #00cfff;
        }

        /* FLOW */
        .flow-step {
          display: flex;
          gap: 20px;
          position: relative;
          margin-bottom: 50px;
        }

        .core-wrapper {
          position: relative;
        }

        .core {
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background: linear-gradient(135deg, #00cfff, #0066ff);
          box-shadow: 0 0 20px rgba(0,200,255,0.8);
        }

        .pulse {
          position: absolute;
          inset: -10px;
          border-radius: 50%;
          border: 1px solid rgba(0,200,255,0.5);
          animation: pulse 1.8s infinite;
        }

        @keyframes pulse {
          0% { transform: scale(1); opacity: 0.7; }
          100% { transform: scale(2.5); opacity: 0; }
        }

        .connector {
          position: absolute;
          left: 8px;
          top: 20px;
          width: 2px;
          height: 100%;
          background: rgba(255,255,255,0.06);
        }

        .connector-fill {
          width: 100%;
          background: linear-gradient(to bottom, #00cfff, transparent);
        }

        .flow-content h3 {
          margin: 0;
          color: #eaf6ff;
          font-size: 17px;
        }

        .flow-content p {
          margin-top: 6px;
          color: rgba(234,246,255,0.65);
          font-size: 14px;
        }

        .next {
          opacity: 0.3;
        }

        /* CTA */
        .cta-zone {
          text-align: center;
        }

        .cta-pre {
          color: #00e0ff;
          margin-bottom: 12px;
        }

        .cta-btn {
          display: inline-block;
          padding: 18px 34px;
          border-radius: 16px;
          background: linear-gradient(90deg, #00cfff, #0066ff);
          color: white;
          font-weight: 600;
          text-decoration: none;
          box-shadow: 0 20px 60px rgba(0,200,255,0.4);
        }

        .trust {
          display: block;
          margin-top: 12px;
          font-size: 12px;
          color: rgba(255,255,255,0.5);
        }

      `}</style>
    </div>
  );
}