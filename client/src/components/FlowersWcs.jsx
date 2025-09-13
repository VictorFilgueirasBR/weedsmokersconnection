import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const PAGES = [
  {
    title: "📜 Contexto histórico",
    content: `O uso medicinal das flores de cannabis não é novidade. Civilizações antigas já utilizavam a planta como ferramenta de cura...`,
  },
  {
    title: "🌱 Consumo em forma in natura",
    content: `As flores preservam canabinoides (THC, CBD) e terpenos. Métodos: vaporização, infusões, uso inalatório controlado...`,
  },
  {
    title: "💊 Benefícios terapêuticos & 🌍 Cultura",
    content: `Alívio de dor crônica, espasmos, náuseas. Conecta práticas ancestrais à ciência moderna...`,
  },
];

const floatVariants = {
  float: { y: [0, -12, 0], transition: { duration: 4, ease: "easeInOut", repeat: Infinity } },
};

export default function FlowersInfo() {
  const [page, setPage] = useState(0);

  const next = () => setPage((p) => (p + 1) % PAGES.length);
  const prev = () => setPage((p) => (p - 1 + PAGES.length) % PAGES.length);

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      backgroundImage: `url('/images/wscslid11.webp')`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      padding: 20,
      fontFamily: "Inter, Arial, sans-serif",
    }}>
      <motion.div
        variants={floatVariants}
        animate="float"
        style={{
          width: "100%",
          maxWidth: 800,
          borderRadius: 20,
          padding: 24,
          background: "rgba(255,255,255,0.08)",
          backdropFilter: "blur(12px)",
          border: "1px solid rgba(255,255,255,0.15)",
          boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
          color: "#000",
          position: "relative",
        }}
      >
        <AnimatePresence mode="wait">
          <motion.div key={page} initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -50 }} transition={{ duration: 0.5 }}>
            <h2 style={{ fontSize: "1.8rem", marginBottom: 12 }}>{PAGES[page].title}</h2>
            <p style={{ whiteSpace: "pre-line", fontSize: "1rem", lineHeight: 1.6 }}>{PAGES[page].content}</p>
          </motion.div>
        </AnimatePresence>

        {/* Paginação centralizada no rodapé */}
        <div style={{ display: "flex", justifyContent: "center", gap: 12, marginTop: 24 }}>
          <button onClick={prev} style={{ padding: '8px 16px', borderRadius: 8, border: 'none', background: 'rgba(255,255,255,0.15)', cursor: 'pointer' }}>← Anterior</button>
          <span style={{ alignSelf: 'center', fontWeight: 600 }}>{page + 1} / {PAGES.length}</span>
          <button onClick={next} style={{ padding: '8px 16px', borderRadius: 8, border: 'none', background: 'rgba(255,255,255,0.15)', cursor: 'pointer' }}>Próxima →</button>
        </div>
      </motion.div>
    </div>
  );
}