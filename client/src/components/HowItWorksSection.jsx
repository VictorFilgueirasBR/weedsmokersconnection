// client/src/components/HowItWorksSection.jsx
import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

/**
 * HowItWorksSection
 * - Seção com título, subtítulo e botão de ação (CTA)
 * - Layout limpo, minimalista e responsivo
 * - Fundo branco, texto preto, CTA sólido em preto
 */
export default function HowItWorksSection() {
  const navigate = useNavigate();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.25,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 40, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <div style={styles.section}>
      {/* Divisor superior */}
      <hr style={styles.divider} />

      {/* Título e Subtítulo */}
      <motion.div
        style={styles.textWrapper}
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <motion.h2 style={styles.title} variants={itemVariants}>
          Como funciona?
        </motion.h2>

        <motion.p style={styles.subtitle} variants={itemVariants}>
          Basta fazer nosso teste de IA. Caso o resultado do teste seja superior a 50%, vamos te guiar no passo a passo para
          obter sua autorização e acesso aos melhores Médicos Prescritores e Fornecedores de produtos com THC, CBD (ICE, Hash, Rosin, FullSpectrum, Diamonds),
          Flores e Extrações de forma 100% legal, leve, rápida e descomplicada! Para isso, é só assinar o Weed Smoker Pass para conquistar mais saúde, liberdade, conexão e um estilo de vida mais leve e consciente.
        </motion.p>

        <motion.p style={styles.subtitle} variants={itemVariants}>
          Dentro da área de membros, você terá acesso ao passo a passo para conseguir sua receita e autorização, além dos documentos necessários e lá dentro você tem acesso ao contato dos melhores Médicos Prescritores e melhores Fornecedores, com Gummyes, Oléos, as melhores Espécies e Extrações ricas em THC , CBD (ICE, Hash, Rosin, FullSpectrum, Diamonds) e canabinóides, Nacionais e Importados autorizados pela ANVISA.
        </motion.p>

        <motion.p style={styles.subtitle} variants={itemVariants}>
          Sim você consegue sua autorização e receita em menos de 2 horas com nosso passo a passo é só entrar em contato com os Médicos prescritores e Fornecedores dentro da plataforma (nós não comercializamos), e pode receber seu pedido de Gummyes, Oléos, das Melhores Espécies e Extrações com THC e CBD (ICE, Hash, Rosin, FullSpectrum, Diamonds, Flores) em até 24 horas. Um tratamento feito do seu jeito, pensado especialmente para sua saúde canábica.
        </motion.p>

        <motion.p style={styles.subtitle} variants={itemVariants}>
          No seu perfil da plataforma, é só anexar sua receita médica e as notas fiscais das compras feitas de forma legal no seu Weed Smoker Pass. Simples assim! A partir daí, você ganha mais LIBERDADE para adquirir e transportar seus produtos com THC, CBD (ICE, Hash, Rosin, FullSpectrum, Diamonds) e outros canabinóides, tudo de forma prática e descomplicada com seu Weed Smoker Pass.
        </motion.p>

        {/* CTA Button */}
        <motion.button
          style={styles.ctaButton}
          variants={itemVariants}
          onClick={() => navigate("/chat")}
        >
          Teste IA
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            style={{ marginLeft: 10 }}
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M5 12h14M12 5l7 7-7 7"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </motion.button>
      </motion.div>

      {/* Divisor inferior */}
      <hr style={styles.divider} />
    </div>
  );
}

const styles = {
  section: {
    background: "#fff",
    color: "#000",
    padding: "4rem 1.5rem",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
  divider: {
    border: "none",
    height: "1.5px",
    width: "90%",
    background: "linear-gradient(90deg, transparent, #ccc, transparent)",
    margin: "1.5rem 0",
  },
  textWrapper: {
    maxWidth: 720,
    margin: "0 auto",
  },
  title: {
    fontSize: "2.2rem",
    fontWeight: 800,
    margin: 0,
    marginBottom: "1rem",
    lineHeight: 1.2,
    fontFamily:
      "ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial",
  },
  subtitle: {
    fontSize: "1.1rem",
    opacity: 0.9,
    marginBottom: "2rem",
    lineHeight: 1.6,
    textAlign: "justify",
    fontFamily:
      "ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial",
  },
  ctaButton: {
    background: "#000",
    color: "#fff",
    border: "none",
    borderRadius: 12,
    padding: "12px 24px",
    fontSize: "1rem",
    fontWeight: 600,
    cursor: "pointer",
    display: "inline-flex",
    alignItems: "center",
    transition: "all 0.2s ease",
  },
};