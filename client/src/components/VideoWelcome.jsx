import React, { useState } from "react";

export default function WelcomeVideo() {
  // Estado para controlar se o vídeo deve ser exibido ou a capa
  const [play, setPlay] = useState(false);

  // O ícone de play como um SVG otimizado e estilizado
  const PlayIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="w-10 h-10 md:w-12 md:h-12 text-white"
    >
      <path
        fillRule="evenodd"
        d="M4.5 5.653c0-1.087.999-1.516 1.745-.981l11.54 6.348a1.125 1.125 0 010 1.962l-11.54 6.347a1.5 1.5 0 01-1.745-.981V5.653z"
        clipRule="evenodd"
      />
    </svg>
  );

  // O componente da capa do vídeo, mostrado antes de dar play
  const thumbnailComponent = (
    <div
      className="absolute inset-0 flex items-center justify-center cursor-pointer rounded-2xl overflow-hidden"
      onClick={() => setPlay(true)}
    >
      <img
        src="/images/wsc-thumb-home.png"
        alt="Capa do vídeo - Weed Smokers Connection"
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 hover:scale-105"
      />
      {/* Botão de play com gradiente e sombra para destaque */}
      <div className="relative z-10 p-4 bg-gradient-to-br from-green-500/80 to-lime-600/80 rounded-full transition-transform duration-300 transform hover:scale-110 shadow-xl">
        <PlayIcon />
      </div>
    </div>
  );

  // O componente do player de vídeo, mostrado depois de dar play
  const videoPlayerComponent = (
    <div className="absolute inset-0 w-full h-full rounded-2xl shadow-lg">
      <iframe
        className="w-full h-full rounded-2xl"
        src="https://www.youtube.com/embed/9uN2MOdTgV8?autoplay=1&controls=1&modestbranding=1"
        title="Weed Smokers Connection - Boas Vindas"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
  );

  return (
    <div className="flex justify-center bg-white py-16 px-4">
      <div className="relative w-full max-w-[550px] aspect-[16/9] rounded-2xl shadow-2xl">
        {/* Renderiza a capa se play for falso, caso contrário, renderiza o vídeo */}
        {play ? videoPlayerComponent : thumbnailComponent}
      </div>
    </div>
  );
}
