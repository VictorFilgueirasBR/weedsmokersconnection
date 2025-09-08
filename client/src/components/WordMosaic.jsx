import React from "react";
import { motion } from "framer-motion";

const wordVariant = (i = 0) => ({
  hidden: { y: 80, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.7, ease: "easeOut", delay: i * 0.06 },
  },
});

export default function WordCloudBanner({ 
  background = "/images/wscslid.3.jpg", 
  backgroundInsideWords = "/images/wscslid.3.jpg" 
}) {
  const words = [
    { text: "LIBERDADE", className: "word-liberdade" },
    { text: "CONSCIÊNCIA", className: "word-consciencia" },
    { text: "MEDICINA", className: "word-medicina" },
    { text: "HASH", className: "word-hash" },
    { text: "THC", className: "word-thc" },
    { text: "TERAPIA", className: "word-terapia" },
    { text: "SAÚDE", className: "word-saude" },
    { text: "ROSIN", className: "word-rosin" },
    { text: "ICE", className: "word-ice" },
    { text: "GUMMIES", className: "word-gummies" },
    { text: "CBD", className: "word-cbd" },
    { text: "EQUILÍBRIO", className: "word-equilibrio" },
    { text: "ESPÉCIES", className: "word-especies" },
    { text: "COMUNIDADE TERAPÊUTICA", className: "word-comunidade-terapeutica" },
    { text: "TRATAMENTOS", className: "word-tratamentos" },
    { text: "LEGALIZADOS", className: "word-legalizados" },
    { text: "EXTRAÇÕES", className: "word-extracoes" },
    { text: "BEM-ESTAR", className: "word-bem-estar" },
  ];

  const css = `
    .word-cloud-container {
      width: 100%;
      min-height: 300px;
      height: 300px;
      position: relative;
      font-family: 'Bebas Neue', sans-serif;
      overflow: hidden;
      display: grid;
      background-image: url("${background}");
      background-size: cover;
      background-position: center;
      grid-template-columns: 6fr 1.5fr 1.2fr 1fr 1fr 2fr 2fr 2fr;
      grid-template-rows: 3fr 1.2fr 2fr 2fr 2fr 2fr;
      grid-template-areas:
        "liberdade consciencia consciencia medicina medicina medicina hash hash"
        "liberdade thc thc terapia terapia saude saude cbd"
        "liberdade thc thc terapia terapia tratamentos rosin cbd"
        "equilibrio equilibrio especies comu-terapeutica gummies ice cbd"
        "legalizados legalizados legalizados extracoes extracoes bem-estar bem-estar bem-estar"
        "saude saude equilibrio equilibrio . . . .";
      z-index: 1;
    }
    
    .word-cloud-container::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: rgba(0, 0, 0, 0.4);
      z-index: -1;
    }

    .word-item {
      display: flex;
      justify-content: center;
      align-items: center;
      text-align: center;
      font-weight: 900;
      white-space: nowrap;
      text-transform: uppercase;
      
      background-image: url("${backgroundInsideWords}");
      background-size: cover;
      background-position: center;
      -webkit-background-clip: text;
      background-clip: text;
      color: transparent;
      -webkit-text-fill-color: transparent;
      
      font-size: clamp(0.8rem, 5vw, 2.5rem);
      line-height: 0.9;
      overflow: hidden; 
      text-overflow: clip;
      padding: 0 2px;
      z-index: 2; /* Para garantir que as palavras fiquem acima do overlay */
    }

    /* Estilos de fonte e posicionamento por palavra */
    .word-liberdade { grid-area: liberdade; writing-mode: vertical-lr; font-size: clamp(1.5rem, 7vw, 3.5rem); }
    .word-consciencia { grid-area: consciencia; font-size: clamp(1.8rem, 8vw, 4rem); margin-top: -5rem; }
    .word-medicina { grid-area: medicina; font-size: clamp(2.8rem, 10vw, 6rem); margin-top: 5rem;}
    .word-hash { grid-area: hash; writing-mode: vertical-lr; font-size: clamp(1rem, 5vw, 2.5rem); }
    .word-thc { grid-area: thc; writing-mode: vertical-lr; font-size: clamp(2.5rem, 10vw, 5rem); }
    .word-terapia { grid-area: terapia; font-size: clamp(3rem, 10vw, 5rem); margin-top: -6rem;}
    .word-saude { grid-area: saude; font-size: clamp(3.2rem, 10vw, 3.5rem); }
    .word-rosin { grid-area: rosin; font-size: clamp(3rem, 4vw, 2rem); }
    .word-ice { grid-area: ice; font-size: clamp(5rem, 4vw, 2rem); }
    .word-gummies { grid-area: gummies; font-size: clamp(1.5rem, 4vw, 2rem); }
    .word-cbd { grid-area: cbd; writing-mode: vertical-lr; font-size: clamp(2rem, 10vw, 5rem); }
    .word-equilibrio { grid-area: equilibrio; font-size: clamp(1.5rem, 7vw, 3.5rem); margin-top: -4rem; }
    .word-especies { grid-area: especies; font-size: clamp(3rem, 5vw, 2.5rem); }
    .word-comunidade-terapeutica { grid-area: comu-terapeutica; font-size: clamp(0.7rem, 3.5vw, 1.8rem); }
    .word-tratamentos { grid-area: tratamentos; writing-mode: vertical-lr; font-size: clamp(2.5rem, 3.5vw, 1.8rem); }
    .word-legalizados { grid-area: legalizados; font-size: clampclamp(2.5rem, 7vw, 3.5rem); margin-top: -7rem;}
    .word-extracoes { grid-area: extracoes; font-size: clamp(2.5rem, 7vw, 3.5rem); }
    .word-bem-estar { grid-area: bem-estar; font-size: clamp(2.5rem, 7vw, 3.5rem); margin-bottom: 4rem; }
  `;

  return (
    <section className="w-full">
      <style>{css}</style>
      <div className="word-cloud-container">
        {words.map((w, i) => (
          <motion.div
            key={`${w.text}-${i}`}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={wordVariant(i)}
            className={`word-item ${w.className}`}
          >
            {w.text}
          </motion.div>
        ))}
      </div>
    </section>
  );
}