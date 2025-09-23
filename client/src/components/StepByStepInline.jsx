// src/components/StepByStepInlineRefactored.jsx
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
    status: 'completed',
  },
  {
    title: 'Escolha sua medicação com THC e CBD',
    description:
      'Flores em Natura, Extrações tipo Hash, ICE, Diamonds, Crumble, Gummyes e opções com CBD.',
    status: 'current',
  },
  {
    title: 'Finalize seu pedido e aguarde',
    description: 'Aguarde a entrega da sua medicação em casa.',
    status: 'upcoming',
  },
];

const styles = {
  backgroundContainer: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'linear-gradient(135deg, #1d9d92, #005a5a)',
    backgroundSize: 'cover',
    fontFamily: "'Inter', sans-serif",
    padding: '20px',
    boxSizing: 'border-box',
  },
  stepContainer: {
    display: 'flex',
    flexDirection: 'column',
    background: 'rgba(255, 255, 255, 0.98)',
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
    marginBottom: '20px',
    paddingLeft: '35px',
  },
  stepItemLast: {
    marginBottom: '0',
  },
  stepIcon: {
    position: 'absolute',
    left: '0',
    top: '0',
    width: '24px',
    height: '24px',
    borderRadius: '8px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 'bold',
    fontSize: '14px',
    color: '#fff',
    backgroundColor: '#1d9d92', // Cor única para todos os ícones
    transition: 'background-color 0.3s, border-color 0.3s, box-shadow 0.3s',
  },
  stepLine: {
    position: 'absolute',
    left: '12px',
    top: '24px',
    width: '2px',
    height: 'calc(100% - 24px)',
    backgroundColor: '#1d9d92',
    transition: 'background-color 0.3s',
  },
  stepContent: {
    // Mantém o layout de fluxo
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
    lineHeight: '1.4',
    transition: 'color 0.3s',
  },
};

const getStatusStyles = (status) => {
  const currentGreen = '#1d9d92';
  const lightGray = '#d9d9d9';
  const darkText = '#34495e';
  const lightText = '#7f8c8d';

  // O ícone agora sempre tem a mesma cor de fundo e formato
  const iconBaseStyle = {
    backgroundColor: currentGreen,
    borderRadius: '8px',
    color: '#fff',
  };

  if (status === 'completed') {
    return {
      icon: { ...iconBaseStyle },
      content: {
        h3: { color: darkText },
        p: { color: lightText },
      },
      line: {
        backgroundColor: currentGreen,
      }
    };
  }
  
  if (status === 'current') {
    return {
      icon: {
        ...iconBaseStyle,
        boxShadow: `0 0 0 4px rgba(29, 157, 146, 0.4)`,
      },
      content: {
        h3: { color: darkText, fontWeight: '700' },
        p: { color: lightText },
      },
    };
  }

  if (status === 'upcoming') {
    return {
      icon: {
        ...iconBaseStyle,
        backgroundColor: lightGray,
      },
      content: {
        h3: { color: lightGray },
        p: { color: lightGray },
      },
      line: {
        backgroundColor: lightGray,
      }
    };
  }
  return {};
};

export default function StepByStepInlineRefactored() {
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
              <div
                style={{ ...styles.stepIcon, ...statusStyles.icon }}
              >
                {step.status === 'completed' && '✔'}
              </div>
              {!isLastItem && (
                <div
                  style={{ ...styles.stepLine, ...statusStyles.line }}
                ></div>
              )}
              <div style={styles.stepContent}>
                <h3 style={{ ...styles.h3, ...statusStyles.content?.h3 }}>{step.title}</h3>
                <p style={{ ...styles.p, ...statusStyles.content?.p }}>{step.description}</p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}