// src/components/StepByStepInline.jsx
import React from 'react';
import { motion } from 'framer-motion';

const steps = [
  {
    title: 'Assista Ao Tutorial de 3 minutos',
    description: 'Aprenda rapidamente os principais pontos antes de seguir.',
    status: 'completed',
  },
  {
    title: 'Qual receita você precisa (Médico recomendado)?',
    description: 'Defina o tipo de receita que se aplica ao seu caso.',
    status: 'current',
  },
  {
    title: 'Escolha sua medicação com THC e CBD',
    description:
      'Flores em Natura, Extrações tipo Hash, ICE, Diamonds, Crumble, Gummyes e opções com CBD.',
    status: 'upcoming',
  },
  {
    title: 'Finalize seu pedido e aguarde',
    description: 'Aguarde a entrega da sua medicação em casa.',
    status: 'disabled',
  },
];

const styles = {
  backgroundContainer: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'linear-gradient(135deg, #1abc9c, #2c3e50)',
    backgroundSize: 'cover',
    fontFamily: "'Inter', sans-serif",
    padding: '20px',
    boxSizing: 'border-box',
  },
  stepContainer: {
    display: 'flex',
    flexDirection: 'column',
    background: 'rgba(255, 255, 255, 0.95)',
    borderRadius: '15px',
    padding: '30px',
    maxWidth: '450px',
    width: '100%',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
  },
  stepItem: {
    display: 'flex',
    alignItems: 'flex-start',
    position: 'relative',
    marginBottom: '25px',
  },
  stepItemLast: {
    marginBottom: '0',
  },
  stepMarkerWrapper: {
    marginRight: '15px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  stepIcon: {
    width: '24px',
    height: '24px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 'bold',
    fontSize: '14px',
    border: '2px solid',
    color: '#fff',
    transition: 'background-color 0.3s, border-color 0.3s, box-shadow 0.3s',
  },
  stepLine: {
    flexGrow: '1',
    width: '2px',
    backgroundColor: '#c0c0c0',
  },
  stepContent: {
    flex: '1',
  },
  h3: {
    margin: '0',
    fontSize: '16px',
    fontWeight: '600',
    color: '#34495e',
    transition: 'color 0.3s',
  },
  p: {
    margin: '5px 0 0',
    fontSize: '14px',
    color: '#7f8c8d',
    transition: 'color 0.3s',
  },
};

const getStatusStyles = (status) => {
  const completedColor = '#2ecc71';
  const currentUpcColor = '#c0c0c0';

  if (status === 'completed') {
    return {
      icon: {
        backgroundColor: completedColor,
        borderColor: completedColor,
      },
      line: {
        backgroundColor: completedColor,
      },
    };
  }
  
  if (status === 'current') {
    return {
      icon: {
        backgroundColor: completedColor,
        borderColor: completedColor,
        boxShadow: `0 0 0 4px rgba(${parseInt(completedColor.slice(1,3), 16)}, ${parseInt(completedColor.slice(3,5), 16)}, ${parseInt(completedColor.slice(5,7), 16)}, 0.3)`,
      },
    };
  }

  if (status === 'upcoming' || status === 'disabled') {
    return {
      icon: {
        backgroundColor: currentUpcColor,
        borderColor: currentUpcColor,
        color: '#fff',
      },
      content: {
        h3: { color: currentUpcColor },
        p: { color: currentUpcColor },
      },
    };
  }
  return {};
};

export default function StepByStepInline() {
  return (
    <div style={styles.backgroundContainer}>
      <div style={styles.stepContainer}>
        {steps.map((step, index) => {
          const statusStyles = getStatusStyles(step.status);
          const isLastItem = index === steps.length - 1;

          return (
            <motion.div
              key={index}
              style={{ ...styles.stepItem, ...(isLastItem && styles.stepItemLast) }}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div style={styles.stepMarkerWrapper}>
                <div
                  style={{ ...styles.stepIcon, ...statusStyles.icon }}
                >
                  {step.status === 'completed' && '✔'}
                </div>
                {!isLastItem && (
                  <div
                    style={{ ...styles.stepLine, ...(statusStyles.line && statusStyles.line) }}
                  ></div>
                )}
              </div>
              <div style={styles.stepContent}>
                <h3 style={{ ...styles.h3, ...(statusStyles.content && statusStyles.content.h3) }}>{step.title}</h3>
                <p style={{ ...styles.p, ...(statusStyles.content && statusStyles.content.p) }}>{step.description}</p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}