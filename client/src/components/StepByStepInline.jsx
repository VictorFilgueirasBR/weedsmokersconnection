// src/components/StepByStepInlineRefactored.jsx
import React from 'react';
import { motion } from 'framer-motion';

const steps = [
  {
    title: 'Entre para o CLUB',
    description:
      'Converse com nossa equipe e entenda rapidamente os principais pontos antes de começar o seu tratamento da melhor forma, com consciência, RESPALDO MÉDICO, JURÍDICO E REGULATÓRIO garantido pela WS | Connection®.',
    status: 'completed',
  },
  {
    title: 'Como conseguir autorização e receita?',
    description:
      'Faça sua consulta com um de nossos Médicos Colaboradores: Todos(as) são ótimos(as), uma delas é a MELHOR médica endocanabinoide do Brasil, autorizada para atendê-lo(a) e fazer sua consulta de forma exclusiva e personalizada.',
    status: 'completed',
  },
  {
    title: 'Escolha suas Flores e Extrações com THC',
    description:
      'Flores em Natura, Extrações: THC, THCa, Δ9-THC ou Δ8-THC (Bubble-Hash, Fresh Frozen, Dry, Diamonds, Rosin, Wax, STATIC, Gummyes, Óleos diversos) e também opções com CBD, CBN, CBG.',
    status: 'current',
  },
  {
    title: 'Finalize seu pedido com segurança',
    description:
      'Receba seu código de RASTREAMENTO com SEGURO TRANSPORTE INCLUSO e aguarde a entrega da sua medicação em casa. Entrega para todo o BRASIL em até 36 horas.',
    status: 'upcoming',
  },
];

const styles = {
  backgroundContainer: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'linear-gradient(135deg, #0b1f33, #0f2e4d)',
    fontFamily: "'Satoshi', sans-serif",
    padding: '20px',
    marginTop: '60px',
  },

  stepContainer: {
    display: 'flex',
    flexDirection: 'column',
    backdropFilter: 'blur(16px)',
    background:
      'linear-gradient(135deg, rgba(77,166,255,0.08), rgba(30,77,122,0.05))',
    borderRadius: '18px',
    padding: '28px',
    maxWidth: '480px',
    width: '100%',
    border: '1px solid rgba(120,180,255,0.18)',
    boxShadow: '0 15px 50px rgba(0,0,0,0.45)',
  },

  stepItem: {
    display: 'flex',
    alignItems: 'flex-start',
    position: 'relative',
    marginBottom: '22px',
    paddingLeft: '38px',
  },

  stepItemLast: {
    marginBottom: '0',
  },

  stepIcon: {
    position: 'absolute',
    left: '0',
    top: '0',
    width: '26px',
    height: '26px',
    borderRadius: '10px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 'bold',
    fontSize: '14px',
    color: '#fff',
    background: 'linear-gradient(135deg, #4da6ff, #1e4d7a)',
    boxShadow: '0 0 12px rgba(77,166,255,0.6)',
  },

  stepLine: {
    position: 'absolute',
    left: '13px',
    top: '28px',
    width: '2px',
    height: 'calc(100% - 28px)',
    background:
      'linear-gradient(to bottom, #4da6ff, rgba(30,77,122,0.2))',
  },

  h3: {
    margin: '0',
    fontSize: '15px',
    fontWeight: '700',
    color: '#eaf4ff',
    letterSpacing: '-0.02em',
  },

  p: {
    margin: '6px 0 0',
    fontSize: '13px',
    color: 'rgba(234,244,255,0.7)',
    lineHeight: '1.6',
    textAlign: 'justify',
    textJustify: 'inter-word',
  },
};

const getStatusStyles = (status) => {
  const blueBaby = '#a0ecfa';
  const blueMid = '#4da6ff';
  const blueDeep = '#1e4d7a';
  const gray = '#7f8c8d';

  if (status === 'completed') {
    return {
      icon: {
        background: `linear-gradient(135deg, ${blueBaby}, ${blueMid})`,
        boxShadow: `0 0 14px rgba(160,236,250,0.7)`,
      },
      line: {
        background: `linear-gradient(to bottom, ${blueMid}, transparent)`,
      },
    };
  }

  if (status === 'current') {
    return {
      icon: {
        background: `linear-gradient(135deg, ${blueMid}, ${blueDeep})`,
        boxShadow: `0 0 18px rgba(77,166,255,0.9)`,
        animation: 'pulse 2s infinite',
      },
    };
  }

  if (status === 'upcoming') {
    return {
      icon: {
        background: 'rgba(255,255,255,0.15)',
        boxShadow: 'none',
      },
      content: {
        h3: { color: gray },
        p: { color: gray },
      },
      line: {
        background: 'rgba(255,255,255,0.1)',
      },
    };
  }

  return {};
};

export default function StepByStepInlineRefactored() {
  return (
    <div style={styles.backgroundContainer}>
      <style>
        {`
          @keyframes pulse {
            0% { box-shadow: 0 0 10px rgba(77,166,255,0.5); }
            50% { box-shadow: 0 0 22px rgba(77,166,255,1); }
            100% { box-shadow: 0 0 10px rgba(77,166,255,0.5); }
          }
        `}
      </style>

      <div style={styles.stepContainer}>
        {steps.map((step, index) => {
          const statusStyles = getStatusStyles(step.status);
          const isLastItem = index === steps.length - 1;

          return (
            <motion.div
              key={index}
              style={{
                ...styles.stepItem,
                ...(isLastItem && styles.stepItemLast),
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.12 }}
            >
              <div style={{ ...styles.stepIcon, ...statusStyles.icon }}>
                {step.status === 'completed' ? '✔' : index + 1}
              </div>

              {!isLastItem && (
                <div
                  style={{ ...styles.stepLine, ...statusStyles.line }}
                />
              )}

              <div>
                <h3 style={{ ...styles.h3, ...statusStyles.content?.h3 }}>
                  {step.title}
                </h3>
                <p style={{ ...styles.p, ...statusStyles.content?.p }}>
                  {step.description}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}