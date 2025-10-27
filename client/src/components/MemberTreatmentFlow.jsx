// client/src/components/MemberTreatmentFlow.jsx
import React from "react";
import { motion } from "framer-motion";
import { User, Package } from "lucide-react";

/**
 * MemberTreatmentFlow
 * - Guia de passo a passo para assinantes
 * - Premium UI com destaque claro para as duas opções
 */
export default function MemberTreatmentFlow() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.25 },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <div style={styles.section}>
      <hr style={styles.divider} />

      <motion.div
        style={styles.textWrapper}
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <motion.h2 style={styles.title} variants={itemVariants}>
          Bem-vindo(a) à sua jornada de tratamento!
        </motion.h2>

        <motion.p style={styles.subtitle} variants={itemVariants}>
          Agora que você é membro, vamos te guiar no passo a passo para obter
          sua autorização e acesso aos melhores produtos com THC, CBD, Flores
          e Extrações de forma 100% legal e segura, aprovados pela ANVISA.
          Você tem <strong>duas opções</strong> para iniciar seu tratamento:
        </motion.p>

        {/* Grid de Opções */}
        <motion.div style={styles.optionsGrid} variants={itemVariants}>
          {/* Opção 1 */}
          <div style={styles.optionCard}>
            <User size={36} style={styles.icon} />
            <h3 style={styles.optionTitle}>Opção 1: Com Médico</h3>
            <p style={styles.optionText}>
              Agende a sua consulta com a <strong>Médica de confiança do CLUB, DRA. NATÁLIA </strong>  logo abaixo. Ela
              indicará os fornecedores dos produtos que receita, garantindo
              qualidade e acesso seguro às medicações aprovadas pela ANVISA. <strong>RECOMENDAMOS QUE NA SUA PRIMEIRA CONSULTA SEJA FEITA COM ESSA OPÇÃO. </strong>
            </p>
          </div>

          {/* Opção 2 */}
          <div style={styles.optionCard}>
            <Package size={36} style={styles.icon} />
            <h3 style={styles.optionTitle}>Opção 2: Com Fornecedor</h3>
            <p style={styles.optionText}>
              Apartir do seu segundo pedido damos a liberdade para que escolha um <strong>fornecedor direto</strong> na plataforma e tenha
              acesso a um catálogo premium de gummyes, espécies, óleos e extrações de THC e CBD (ICE, Hash, Rosin, FullSpectrum, Diamonds). O
              fornecedor conectará você a um médico prescritor dos seus medicamentos para continuar
              o processo com segurança.
            </p>
          </div>
        </motion.div>

        <motion.p style={styles.subtitle} variants={itemVariants}>
          Nosso objetivo é garantir que você tenha acesso a <strong>tratamentos
          personalizados, com máxima qualidade</strong>, utilizando THC, CBD (ICE, Hash, Rosin, FullSpectrum, Diamonds) e Flores Indicas, Sativas e Híbridas — tudo de forma
          legal, simples, tranquila, descomplicada, SAUDÁVEL e com QUALIDADE.
        </motion.p>
      </motion.div>

      <hr style={styles.divider} />
    </div>
  );
}

const styles = {
  section: {
    background: "#fff",
    color: "#000",
    padding: "5rem 1.5rem",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  divider: {
    border: "none",
    height: "1.5px",
    width: "90%",
    background: "linear-gradient(90deg, transparent, #ccc, transparent)",
    margin: "1.5rem 0",
  },
  textWrapper: {
    maxWidth: 860,
    margin: "0 auto",
    textAlign: "center",
  },
  title: {
    fontSize: "1.7rem",
    fontWeight: 800,
    marginBottom: "1.5rem",
    lineHeight: 1.3,
    background: "linear-gradient(90deg, #111, #555)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    fontFamily:
      "ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial",
  },
  subtitle: {
    fontSize: "1.15rem",
    opacity: 0.9,
    marginBottom: "2.5rem",
    lineHeight: 1.7,
    textAlign: "justify",
    fontFamily:
      "ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial",
  },
  optionsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: "2rem",
    marginBottom: "2.5rem",
  },
  optionCard: {
    background: "linear-gradient(145deg, #fafafa, #f0f0f0)",
    borderRadius: "16px",
    padding: "2rem",
    textAlign: "center",
    boxShadow: "0 4px 12px rgba(0,0,0,0.18), outset 0 0 0 2px #9c9c9c2f",
    transition: "transform 0.2s ease, box-shadow 0.2s ease",
  },
  optionTitle: {
    fontSize: "1.3rem",
    fontWeight: 700,
    marginTop: "1rem",
    marginBottom: "0.75rem",
  },
  optionText: {
    fontSize: "1rem",
    lineHeight: 1.6,
    opacity: 0.85,
    textAlign: "justify",
  },
  icon: {
    color: "#000",
    marginBottom: "0.5rem",
  },
};
