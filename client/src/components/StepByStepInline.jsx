// src/components/StepByStepInline.jsx
import React from 'react';
import { motion } from 'framer-motion';

const steps = [
  {
    title: 'Assista Ao Tutorial de 3 minutos',
    description: 'Aprenda rapidamente os principais pontos antes de seguir.',
    status: 'completed', // completed | current | upcoming
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
];

const styles = {
  stepContainer: {
    display: 'flex',
    flexDirection: 'column',
    background: 'rgba(255, 255, 255, 0.8)',
    borderRadius: '20px',
    padding: '20px',
    maxWidth: '400px',
    margin: 'auto',
  },
  stepItem: {
    display: 'flex',
    alignItems: 'flex-start',
    position: 'relative',
    paddingLeft: '50px',
    marginBottom: '30px',
  },
  stepIcon: {
    position: 'absolute',
    left: '0',
    top: '0',
    width: '30px',
    height: '30px',
    borderRadius: '50%',
    color: '#fff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 'bold',
    fontSize: '16px',
  },
  stepIconCompleted: {
    backgroundColor: '#00b894',
  },
  stepIconCurrent: {
    backgroundColor: '#0984e3',
  },
  stepIconUpcoming: {
    backgroundColor: '#dfe6e9',
    color: '#2d3436',
  },
  stepText: {
    h3: {
      margin: '0',
      fontSize: '16px',
      fontWeight: '600',
      color: '#2d3436',
    },
    p: {
      margin: '5px 0 0',
      fontSize: '14px',
      color: '#636e72',
    },
  },
  stepLine: {
    position: 'absolute',
    left: '14px',
    top: '35px',
    width: '2px',
    height: 'calc(100% - 35px)',
    backgroundColor: '#b2bec3',
  },
};

const getStatusStyle = (status) => {
  switch (status) {
    case 'completed':
      return styles.stepIconCompleted;
    case 'current':
      return styles.stepIconCurrent;
    case 'upcoming':
      return styles.stepIconUpcoming;
    default:
      return {};
  }
};

export default function StepByStepInline() {
  return (
    <div style={styles.stepContainer}>
      {steps.map((step, index) => (
        <motion.div
          key={index}
          style={styles.stepItem}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.2 }}
        >
          <div
            style={{ ...styles.stepIcon, ...getStatusStyle(step.status) }}
          >
            {step.status === 'completed' ? '✔' : index + 1}
          </div>
          <div style={styles.stepText}>
            <h3 style={styles.stepText.h3}>{step.title}</h3>
            <p style={styles.stepText.p}>{step.description}</p>
          </div>
          {index < steps.length - 1 && <div style={styles.stepLine}></div>}
        </motion.div>
      ))}
    </div>
  );
}