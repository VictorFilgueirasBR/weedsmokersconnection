import React, { useState } from "react";
import { motion } from "framer-motion";

export default function WelcomeVideo() {
  const [play, setPlay] = useState(false);

  // Animação de entrada (slide da esquerda para o centro)
  const containerVariants = {
    hidden: { opacity: 0, x: -100 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  // Thumbnail com ícone de play
  const thumb = (
    <motion.div
      className="absolute inset-0 flex items-center justify-center cursor-pointer overflow-hidden rounded-2xl"
      onClick={() => setPlay(true)}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <img
        src="/images/wsc-thumb-home.png"
        alt="Capa do vídeo - Weed Smokers Connection"
        className="w-full h-full object-cover rounded-2xl shadow-lg"
      />
      {/* Camada escura com ícone de play */}
      <div className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-2xl backdrop-blur-sm">
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

  // Player do YouTube
  const videoPlayer = (
    <motion.iframe
      key="video"
      className="absolute inset-0 w-full h-full rounded-2xl shadow-lg"
      src="https://www.youtube.com/embed/9uN2MOdTgV8?autoplay=1&controls=1&modestbranding=1&rel=0"
      title="Weed Smokers Connection - Boas Vindas"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6 }}
    ></motion.iframe>
  );

  return (
    <motion.div
      className="flex justify-center bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 py-16 px-4"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="relative w-full max-w-[650px] aspect-[16/9]">
        {play ? videoPlayer : thumb}
      </div>
    </motion.div>
  );
}
