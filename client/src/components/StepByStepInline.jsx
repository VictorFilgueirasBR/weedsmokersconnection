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
    background: 'linear-gradient(135deg, #2ecc71, #2c3e50)', // Ajuste de gradiente para combinar mais com a referência
    backgroundSize: 'cover',
    fontFamily: "'Inter', sans-serif",
    padding: '20px',
    boxSizing: 'border-box',
  },
  stepContainer: {
    display: 'flex',
    flexDirection: 'column',
    background: 'rgba(255, 255, 255, 0.98)', // Menos transparente para o fundo do card
    borderRadius: '15px',
    padding: '30px 40px', // Mais padding horizontal
    maxWidth: '450px',
    width: '100%',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
  },
  stepItem: {
    display: 'grid', // Usaremos CSS Grid para o layout
    gridTemplateColumns: 'auto 1fr', // Uma coluna para o ícone, outra para o conteúdo
    alignItems: 'start', // Alinha o grid ao topo
    marginBottom: '20px', // Espaçamento entre os itens
    position: 'relative',
  },
  stepItemLast: {
    marginBottom: '0',
  },
  stepIconWrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginRight: '20px', // Espaçamento entre o ícone e o texto
    position: 'relative',
    zIndex: 1, // Para o ícone ficar acima da linha
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
    color: '#fff',
    transition: 'background-color 0.3s, border-color 0.3s, box-shadow 0.3s',
  },
  stepLine: {
    position: 'absolute',
    left: '50%',
    transform: 'translateX(-50%)',
    width: '2px',
    backgroundColor: '#e0e0e0', // Cor da linha clara
    top: '24px', // Começa abaixo do ícone
    bottom: '-10px', // Estende um pouco para baixo
    zIndex: 0, // Atrás do ícone
  },
  stepContent: {
    // Alinhado com o grid
    paddingTop: '0px', // Ajuste para alinhar o texto com o ícone
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
  // Estilos específicos para a linha de baixo do título (como na referência)
  titleUnderline: {
    width: '40px', // Largura da linha
    height: '2px',
    backgroundColor: '#aeead3', // Cor verde clara
    margin: '8px 0 10px 0', // Espaçamento
    borderRadius: '1px',
  }
};

const getStatusStyles = (status) => {
  const primaryGreen = '#2ecc71';
  const lightGray = '#c0c0c0';
  const darkText = '#34495e';
  const lightText = '#7f8c8d';

  if (status === 'completed') {
    return {
      icon: {
        backgroundColor: primaryGreen,
        borderColor: primaryGreen,
        // Remover o checkmark direto do ícone e usar um span interno se necessário,
        // ou confiar que o char '✔' vai funcionar bem aqui
      },
      content: {
        h3: { color: darkText },
        p: { color: lightText },
      },
      line: {
        backgroundColor: primaryGreen,
      }
    };
  }

  if (status === 'current') {
    return {
      icon: {
        backgroundColor: primaryGreen, // Preenchido como o 'completed' na referência
        boxShadow: `0 0 0 3px rgba(46, 204, 113, 0.4)`, // Brilho verde
      },
      content: {
        h3: { color: darkText, fontWeight: '700' }, // Título em negrito
        p: { color: lightText },
      },
    };
  }

  if (status === 'upcoming' || status === 'disabled') {
    return {
      icon: {
        backgroundColor: lightGray, // Cor cinza do ícone
        borderColor: lightGray,
      },
      content: {
        h3: { color: lightGray },
        p: { color: lightGray },
      },
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
              <div style={styles.stepIconWrapper}>
                <div
                  style={{ ...styles.stepIcon, ...statusStyles.icon }}
                >
                  {step.status === 'completed' && '✔'}
                  {/* Para 'current', a imagem de referência não mostra um número ou check, apenas um círculo verde preenchido */}
                </div>
                {!isLastItem && (
                  <div
                    style={{ ...styles.stepLine, ...(statusStyles.line && statusStyles.line), height: '100%', top: '24px' }} // Ajusta a altura da linha
                  ></div>
                )}
              </div>
              <div style={styles.stepContent}>
                <h3 style={{ ...styles.h3, ...statusStyles.content?.h3 }}>{step.title}</h3>
                {/* Adiciona a linha de baixo do título se não for disabled */}
                {step.status !== 'disabled' && <div style={styles.titleUnderline}></div>}
                <p style={{ ...styles.p, ...statusStyles.content?.p }}>{step.description}</p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}