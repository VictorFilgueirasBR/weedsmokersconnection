import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const PAGES = [
  {
    title: "🌍 Contexto histórico Global",
    content: `China Antiga (aprox. 2.700 a.C.): registros do imperador Shen Nung descrevem a cannabis como remédio para dores, reumatismo e até malária.


Índia: o bhang, preparado com flores em natura, era usado em rituais espirituais e medicinais, associado à purificação do corpo e alívio de sofrimentos.


Oriente Médio: médicos árabes medievais prescreviam flores de cannabis para dores crônicas, inflamações e epilepsia.


Ocidente: no século XIX, a cannabis entrou nas farmacopeias da Europa e EUA, sendo usada como analgésico e sedativo natural.`,
  },
  {
    title: "🌱 Consumo em forma in natura",
    content: `As flores de cannabis em natura preservam canabinoides (como THC e CBD) e terpenos, potencializando o efeito entourage.


Formas de consumo:
- Vaporização: método seguro, sem combustão.
- Infusões ou óleos artesanais: prática cultural tradicional.
- Uso inalatório medicinal controlado: sob supervisão médica.`,
  },
  {
    title: "🌱 Benefícios terapêuticos & 🌍 Cultura",
    content: `O THC presente nas flores em natura pode auxiliar em:
- Dor crônica e neuropática
- Espasmos musculares (esclerose múltipla)
- Náuseas e vômitos (quimioterapia)
- Distúrbios do sono
- Estímulo do apetite (HIV, câncer)


A sinergia com outros canabinoides e terpenos amplia os benefícios.`,
  },
  {
title: "🌍 Cultura e terapia lado a lado",
content: `O uso medicinal das flores conecta práticas ancestrais de cura natural com respaldo científico atual.


É a retomada de um caminho histórico, cultural e medicinal que atravessa civilizações, unindo tradição e ciência moderna.`,
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