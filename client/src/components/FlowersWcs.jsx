import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const PAGES = [
  {
    title: "🌍 THC LEGAL no BRASIL",
    content: `O passo a passo (é só assinar que está dentro da plataforma) junto com os contatos para ter acesso a vários catálogos atualizados semanalmente de:


    - Flores em Natura. (THC)
    - Hashs: ICE, Rosin, FullSpectrum, Diamonds. (THC ou CBD)
    - Gummies (THC)
    - Óleos (THC ou CBD)
    - As melhores espécies e extrações ricas em THC e CBD (ICE, Hash, Rosin, FullSpectrum, Diamonds)

    🌱 Para mais informações ou suporte, entre em contato conosco através dos canais da plataforma. Tudo está organizado de forma prática para que você aproveite de forma segura e consciente.`
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

    
- Ansiedade
- Dores crônicas e neuropática
- Espasmos musculares
- Náuseas e vômitos
- Insônia e Distúrbios do sono
- TDA, TDAH...


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
      marginTop: 60,
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
          color: "#fff",
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