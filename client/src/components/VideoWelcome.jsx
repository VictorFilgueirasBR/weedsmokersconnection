import React, { useState } from "react";

export default function WelcomeVideo() {
  const [play, setPlay] = useState(false);

  // A imagem de capa é mostrada até o usuário clicar em "play"
  const thumb = (
    <div
      className="absolute inset-0 flex items-center justify-center cursor-pointer overflow-hidden"
      onClick={() => setPlay(true)}
    >
      <img
        src="/images/wsc-thumb-home.png"
        alt="Capa do vídeo - Weed Smokers Connection"
        className="w-full h-full object-cover rounded-2xl shadow-lg transition-transform duration-500 hover:scale-105"
      />
      {/* Efeito de vidro com desfoque para destacar o ícone de play */}
      <div className="absolute inset-0 flex items-center justify-center backdrop-blur-sm bg-black/30 rounded-2xl">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-16 w-16 text-white drop-shadow-xl transition-transform duration-300 hover:scale-110"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
            clipRule="evenodd"
          />
        </svg>
      </div>
    </div>
  );

  // O iframe do YouTube é renderizado após o clique
  const videoPlayer = (
    <iframe
      className="absolute inset-0 w-full h-full rounded-2xl shadow-lg"
      src="https://www.youtube.com/embed/9uN2MOdTgV8?autoplay=1&mute=1&loop=1&playlist=9uN2MOdTgV8&controls=0&modestbranding=1"
      title="Weed Smokers Connection - Boas Vindas"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
    ></iframe>
  );

  return (
    <div className="flex justify-center bg-white py-16 px-4">
      <div className="relative w-full max-w-[550px] aspect-[16/9]">
        {play ? videoPlayer : thumb}
      </div>
    </div>
  );
}
