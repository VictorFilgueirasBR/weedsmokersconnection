import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function WelcomeClubVideo() {
  // 'play' agora controla qual imagem está sendo exibida: 
  // false = Thumbnail (wsc-thumb-home.png), true = Conteúdo Estático (passo-a-passo-club.png)
  const [play, setPlay] = useState(false);

  // Variantes de animação do popup
  const popupVariants = {
    hidden: {
      opacity: 0,
      y: 10,
      scale: 0.9,
      filter: "blur(5px)",
    },
    visible: {
      opacity: 1,
      y: [0, -6, 0],
      scale: 1,
      filter: "blur(0px)",
      transition: {
        duration: 0.6,
        ease: "easeOut",
        y: {
          repeat: Infinity,
          repeatType: "reverse",
          duration: 3,
          ease: "easeInOut",
        },
      },
    },
    exit: {
      opacity: 0,
      y: 10,
      scale: 0.9,
      filter: "blur(5px)",
      transition: {
        duration: 0.4,
        ease: "easeIn",
      },
    },
  };

  // CSS custom para glassmorphism + shine effect
  const glassCss = `
    .popup-glass {
      position: relative;
      border-radius: 18px;
      padding: 1rem 1.6rem;
      isolation: isolate;
      backdrop-filter: blur(6px) contrast(1.05) saturate(140%);
      -webkit-backdrop-filter: blur(6px) contrast(1.05) saturate(140%);
      background: rgba(245, 245, 245, 0.25);
      border: 2px solid rgba(255, 255, 255, 0.2);
      box-shadow: inset 0 0 0 1px rgba(255,255,255,0.1), 0 12px 32px rgba(0,0,0,0.25);
      color: #f9f9f9;
      font-weight: 800;
      font-size: 1.1rem;
      text-align: center;
      white-space: nowrap;
      max-width: 300px;
      overflow: hidden;
      display: flex;
      align-items: center;
      gap: 0.6rem;
    }

    .popup-glass::after {
      content: "";
      position: absolute;
      bottom: -8px; left: 30px;
      border-width: 8px 10px 0 10px;
      border-style: solid;
      border-color: rgba(245,245,245,0.25) transparent transparent transparent;
      filter: blur(0.2px);
    }

    /* Shine effect no texto */
    .shine-text {
      background: linear-gradient(
        90deg,
        #f9f9f9 0%,
        #ccc 20%,
        #f9f9f9 40%,
        #f9f9f9 100%
      );
      background-size: 200% auto;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      animation: shine 3s linear infinite;
      font-weight: 800;
      text-shadow: 0 2px 6px rgba(0,0,0,0.35);
    }

    @keyframes shine {
      to {
        background-position: 200% center;
      }
    }
  `;

  // Popup "Como funciona?" - Movido para dentro do <style> para garantir a inclusão
  const PopupStyle = () => <style>{glassCss}</style>;

  // Conteúdo estático substituto (a nova imagem que você quer mostrar)
  const StaticContent = (
    <motion.div
      key="static-image"
      className="absolute inset-0 w-full h-full rounded-[18px] shadow-lg"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.6 }}
      // Adiciona a funcionalidade de clicar para fechar e voltar para o Thumbnail
      onClick={() => setPlay(false)}
    >
      <img
        src="/images/passo-a-passo-club.png"
        alt="Imagem do Passo a Passo do Club"
        className="w-full h-full object-cover rounded-[18px]"
      />
       {/* Ícone de "Fechar" flutuante no canto superior direito */}
      <motion.div 
        className="absolute top-4 right-4 bg-black/40 p-2 rounded-full cursor-pointer hover:bg-black/60 transition"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </motion.div>
    </motion.div>
  );
  
  // Popup "Como funciona?"
  const popupElement = (
    <motion.div
      className="absolute top-6 left-1/2 -translate-x-1/2"
      variants={popupVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <div className="popup-glass">
        <motion.svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 text-white flex-shrink-0"
          viewBox="0 0 24 24"
          fill="currentColor"
          animate={{ y: [0, -4, 0] }}
          transition={{ repeat: Infinity, repeatType: "reverse", duration: 3 }}
        >
          <path d="M8 5v14l11-7z" />
        </motion.svg>
        <span className="shine-text">Como funciona?</span>
      </div>
    </motion.div>
  );

  // Thumbnail (imagem + ícone de play + popup)
  const thumb = (
    <motion.div
      key="thumbnail"
      className="absolute inset-0 flex items-center justify-center cursor-pointer overflow-hidden rounded-[18px]"
      onClick={() => setPlay(true)} // Troca para a imagem estática
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <img
        src="/images/wsc-thumb-home.png"
        alt="Capa do vídeo - Weed Smokers Connection"
        className="w-full h-full object-cover rounded-[18px] shadow-lg"
        onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/650x366/000000/FFFFFF?text=Imagem+Capa"; }}
      />

      {/* Popup dentro da imagem */}
      <AnimatePresence>{popupElement}</AnimatePresence>

      {/* Camada escura com ícone de play */}
      <div className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-[18px] backdrop-blur-sm">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="flex items-center justify-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-20 w-20 text-white drop-shadow-xl"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M8 5v14l11-7z" />
          </svg>
        </motion.div>
      </div>
    </motion.div>
  );

  return (
    <motion.div
      className="flex justify-center bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 py-16 px-4"
      initial="hidden"
      animate="visible"
    >
      {/* Inclui o estilo CSS para o glassmorphism */}
      <PopupStyle /> 
      
      <div className="relative w-full max-w-[650px] aspect-[16/9] overflow-hidden rounded-[18px]">
        <AnimatePresence mode="wait">
          {play ? StaticContent : thumb}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
