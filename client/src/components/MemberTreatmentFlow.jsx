// client/src/components/MemberTreatmentFlow.jsx

import React from "react";
import { motion } from "framer-motion";
import { User, Package } from "lucide-react";

export default function MemberTreatmentFlow() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: {
      y: 20,
      opacity: 0,
    },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const leftCardVariants = {
    hidden: {
      opacity: 0,
      x: -80,
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  const rightCardVariants = {
    hidden: {
      opacity: 0,
      x: 80,
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  return (
    <section style={styles.section}>
      <hr style={styles.divider} />

      <motion.div
        style={styles.textWrapper}
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{
          once: true,
          amount: 0.15,
        }}
      >
        <motion.h2 variants={itemVariants} style={styles.title}>
          Bem-vindo(a) à sua jornada de tratamento!
        </motion.h2>

        <motion.p variants={itemVariants} style={styles.subtitle}>
          Agora que você é membro, vamos te guiar no passo a passo para obter
          sua autorização e acesso aos melhores tratamentos com THC, THCa, THCV,
          CBD, CBG, D-9, D-8, Flores, Óleos e Extrações de forma 100% legal e
          segura, aprovados pela ANVISA. Você tem{" "}
          <strong>duas opções</strong> para iniciar seu tratamento:
        </motion.p>

        <div style={styles.optionsGrid}>
          <motion.div
            variants={leftCardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{
              once: true,
              amount: 0.25,
            }}
            whileHover={{
              y: -6,
            }}
            style={styles.optionCard}
          >
            <User size={30} strokeWidth={1.8} style={styles.icon} />

            <h3 style={styles.optionTitle}>
              Opção 1: Com Médico
            </h3>

            <p style={styles.optionText}>
              Agende a sua consulta com um dos{" "}
              <strong>Médicos colaboradores WS</strong>.
              Eles prescrevem todo nosso catálogo de aquisição,
              garantindo qualidade e acesso seguro às medicações
              com COAS e autorizadas pela ANVISA.
              <strong>
                {" "}
                Sempre recomendamos que faça sua aquisição conosco
                para garantir a segurança do seu tratamento.
              </strong>
            </p>
          </motion.div>

          <motion.div
            variants={rightCardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{
              once: true,
              amount: 0.25,
            }}
            whileHover={{
              y: -6,
            }}
            style={styles.optionCard}
          >
            <Package size={30} strokeWidth={1.8} style={styles.icon} />

            <h3 style={styles.optionTitle}>
              Opção 2: Com Fornecedor
            </h3>

            <p style={styles.optionText}>
              A partir do seu segundo pedido damos a liberdade para
              que escolha um{" "}
              <strong>FORNECEDOR LEGALIZADO</strong> na plataforma e
              tenha acesso a um catálogo premium de{" "}
              <strong>
                Gummies, Flores, Óleos e Extrações ricas em THC,
                THCa, THCV, CBD, CBG, D-9 e D-8
              </strong>{" "}
              (Fresh Frozen, Hemp Oil, Bubble Hash, Rosin, Wax,
              Full Spectrum e Diamonds).
              Para fornecimento de terceiros, você deverá solicitar
              atualizações das prescrições para a empresa responsável
              pela aquisição.
            </p>
          </motion.div>
        </div>

        <motion.p variants={itemVariants} style={styles.subtitle}>
          Nosso objetivo é garantir que você tenha acesso a{" "}
          <strong>
            tratamentos personalizados, com máxima qualidade
          </strong>
          , utilizando THC, THCa, CBD, Flores Indicas, Sativas e
          Híbridas de forma legal, simples, tranquila e segura.
        </motion.p>
      </motion.div>

      <hr style={styles.divider} />
    </section>
  );
}

const styles = {
  section: {
    background: "#FFFFFF",
    color: "#0F172A",
    padding: "4rem 1.5rem",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    fontFamily: "Satoshi, sans-serif",
  },

  divider: {
    border: "none",
    width: "100%",
    maxWidth: "1200px",
    height: "1px",
    background: "rgba(15,23,42,0.08)",
    margin: "2rem 0",
  },

  textWrapper: {
    width: "100%",
    maxWidth: "1000px",
    margin: "0 auto",
  },

  title: {
    fontSize: "clamp(2rem, 4vw, 3rem)",
    fontWeight: 700,
    letterSpacing: "-0.04em",
    lineHeight: 1.1,
    color: "#0F172A",
    marginBottom: "2rem",
    textAlign: "center",
    fontFamily: "Satoshi, sans-serif",
  },

  subtitle: {
    fontSize: "1.05rem",
    lineHeight: 1.9,
    color: "#475569",
    marginBottom: "3rem",
    textAlign: "justify",
    fontFamily: "Satoshi, sans-serif",
  },

  optionsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit,minmax(320px,1fr))",
    gap: "1.5rem",
    marginBottom: "3rem",
  },

  optionCard: {
    background: "#FFFFFF",
    border: "1px solid rgba(15,23,42,0.08)",
    borderRadius: "24px",
    padding: "2rem",
    boxShadow:
      "0 1px 2px rgba(15,23,42,0.03), 0 12px 32px rgba(15,23,42,0.05)",
    transition: "all .35s ease",
    fontFamily: "Satoshi, sans-serif",
  },

  icon: {
    color: "#0F172A",
    marginBottom: "1rem",
  },

  optionTitle: {
    fontSize: "1.15rem",
    fontWeight: 700,
    color: "#0F172A",
    marginBottom: "1rem",
    lineHeight: 1.3,
    fontFamily: "Satoshi, sans-serif",
  },

  optionText: {
    fontSize: "0.97rem",
    lineHeight: 1.85,
    color: "#64748B",
    textAlign: "justify",
    fontFamily: "Satoshi, sans-serif",
  },
};