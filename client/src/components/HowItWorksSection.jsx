// client/src/components/HowItWorksSection.jsx
import React from "react";
import { motion } from "framer-motion";

/**
 * HowItWorksSection - FUTURISTIC / HEALTH TECH / GLASS MORPHISM
 * - Namespaced classes: ws-howitworks__* (no style leakage)
 */
export default function HowItWorksSection({ onNavigate }) {
  const handleNavigate = () => {
    if (onNavigate) onNavigate("/chat");
    else window.location.href = "/chat";
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.12 } },
  };

  const itemVariants = {
    hidden: { y: 24, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.55, ease: "easeOut" } },
  };

  return (
    <section className="ws-howitworks" style={styles.section}>
      {/* ambient gradients */}
      <div className="ws-howitworks__ambientA" style={styles.ambientA} />
      <div className="ws-howitworks__ambientB" style={styles.ambientB} />

      <motion.div
        className="ws-howitworks__container"
        style={styles.container}
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
      >
        <motion.span className="ws-howitworks__badge" style={styles.badge} variants={itemVariants}>
          PROCESSO 100% LEGALIZADO
        </motion.span>

        <motion.h2 className="ws-howitworks__title" style={styles.title} variants={itemVariants}>
          Como funciona?
        </motion.h2>

        <div className="ws-howitworks__content" style={styles.contentGrid}>
          {/* Main glass card */}
          <motion.div
            className="ws-howitworks__mainCard"
            style={styles.mainCard}
            variants={itemVariants}
            whileHover={{ y: -2 }}
          >
            <p className="ws-howitworks__paragraph" style={styles.paragraphBold}>
              Faça nosso teste de IA. Se o resultado for superior a 50%, guiamos você no passo a passo para obter sua autorização e acessar médicos prescritores e fornecedores aprovados — tudo de forma legal, rápida e descomplicada.
            </p>
          </motion.div>

          {/* Info grid */}
          <div className="ws-howitworks__grid" style={styles.infoGrid}>
            <motion.div
              className="ws-howitworks__card"
              style={styles.glassCard}
              variants={itemVariants}
              whileHover={{ y: -4 }}
            >
              <div className="ws-howitworks__icon" style={styles.iconTag}>01</div>
              <p className="ws-howitworks__text" style={styles.smallText}>
                Acesse o guia completo para receita e autorização, além de contatos verificados de médicos e fornecedores.
              </p>
            </motion.div>

            <motion.div
              className="ws-howitworks__card"
              style={styles.glassCard}
              variants={itemVariants}
              whileHover={{ y: -4 }}
            >
              <div className="ws-howitworks__icon" style={styles.iconTag}>02</div>
              <p className="ws-howitworks__text" style={styles.smallText}>
                Obtenha seu laudo + receitas no mesmo dia e faça o  seus pedidos Nacionais e Importados autorizados.
              </p>
            </motion.div>

            <motion.div
              className="ws-howitworks__card ws-howitworks__card--full"
              style={styles.fullWidthCard}
              variants={itemVariants}
              whileHover={{ y: -4 }}
            >
              <div className="ws-howitworks__icon" style={styles.iconTag}>✓</div>
              <p className="ws-howitworks__text" style={styles.smallText}>
                Anexe receita e notas fiscais para garantir transporte e aquisição com segurança jurídica.
              </p>
            </motion.div>
          </div>
        </div>

        {/* CTA */}
        <motion.div className="ws-howitworks__cta" style={styles.ctaWrapper} variants={itemVariants}>
          <motion.button
            className="ws-howitworks__button"
            style={styles.ctaButton}
            onClick={handleNavigate}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            INICIAR TESTE IA
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" style={{ marginLeft: 12 }}>
              <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </motion.button>
          <span className="ws-howitworks__note" style={styles.ctaNote}>
            Resultado imediato via Inteligência Artificial
          </span>
        </motion.div>
      </motion.div>
    </section>
  );
}

const glass = {
  background: "rgba(255,255,255,0.55)",
  backdropFilter: "blur(16px)",
  WebkitBackdropFilter: "blur(16px)",
  border: "1px solid rgba(255,255,255,0.6)",
  boxShadow: "0 10px 40px rgba(0,0,0,0.08)",
};

const styles = {
  section: {
    position: "relative",
    background: "#f6f9fb",
    padding: "120px 24px",
    fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
    overflow: "hidden",
  },
  ambientA: {
    position: "absolute",
    width: 420,
    height: 420,
    background: "radial-gradient(circle, rgba(0,200,255,0.25), transparent 60%)",
    top: -120,
    left: -120,
    filter: "blur(40px)",
  },
  ambientB: {
    position: "absolute",
    width: 420,
    height: 420,
    background: "radial-gradient(circle, rgba(0,120,255,0.2), transparent 60%)",
    bottom: -140,
    right: -140,
    filter: "blur(50px)",
  },
  container: {
    position: "relative",
    maxWidth: "1100px",
    margin: "0 auto",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    zIndex: 2,
  },
  badge: {
    ...glass,
    color: "#0b0f14",
    padding: "10px 18px",
    borderRadius: "999px",
    fontSize: "0.75rem",
    fontWeight: "700",
    letterSpacing: "0.12em",
    marginBottom: "24px",
  },
  title: {
    fontSize: "clamp(2.6rem, 5vw, 3.6rem)",
    fontWeight: "900",
    background: "linear-gradient(90deg, #0b0f14, #0b5cff)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    textAlign: "center",
    margin: "0 0 44px 0",
    letterSpacing: "-0.04em",
  },
  contentGrid: {
    display: "flex",
    flexDirection: "column",
    gap: "26px",
    width: "100%",
  },
  mainCard: {
    ...glass,
    padding: "42px",
    borderRadius: "26px",
    textAlign: "center",
  },
  paragraphBold: {
    fontSize: "1.22rem",
    color: "#0b0f14",
    lineHeight: 1.6,
    fontWeight: "500",
    margin: 0,
  },
  infoGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: "22px",
    width: "100%",
  },
  glassCard: {
    ...glass,
    padding: "30px",
    borderRadius: "22px",
    display: "flex",
    flexDirection: "column",
    gap: "14px",
  },
  fullWidthCard: {
    gridColumn: "1 / -1",
    background: "linear-gradient(135deg, rgba(0,0,0,0.85), rgba(0,40,80,0.9))",
    color: "#fff",
    padding: "34px",
    borderRadius: "22px",
    display: "flex",
    flexDirection: "column",
    gap: "14px",
    boxShadow: "0 15px 50px rgba(0,0,0,0.25)",
  },
  iconTag: {
    width: "34px",
    height: "34px",
    borderRadius: "10px",
    background: "linear-gradient(135deg, #0b5cff, #00c6ff)",
    color: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "800",
    fontSize: "0.9rem",
  },
  smallText: {
    fontSize: "0.98rem",
    lineHeight: 1.6,
    color: "inherit",
    textAlign: "left",
    margin: 0,
  },
  ctaWrapper: {
    marginTop: "70px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "16px",
  },
  ctaButton: {
    background: "linear-gradient(135deg, #0b5cff, #00c6ff)",
    color: "#fff",
    border: "none",
    padding: "20px 52px",
    borderRadius: "999px",
    fontSize: "1.05rem",
    fontWeight: "700",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    boxShadow: "0 12px 40px rgba(0,120,255,0.35)",
  },
  ctaNote: {
    fontSize: "0.82rem",
    color: "#5f6b7a",
    fontWeight: "500",
  },
};
