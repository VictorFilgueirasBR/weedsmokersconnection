import React from 'react';

export default function VideoWelcome() {
  return (
    <div className="flex flex-col items-center justify-center bg-white pt-16 md:pt-24">
      <div className="w-full max-w-[470px] aspect-[9/16] overflow-hidden rounded-xl shadow-lg">
        <video className="w-full h-full object-cover" autoPlay muted loop playsInline>
          <source src="/reels/welcome-home-wsc.mp4" type="video/mp4" />
          Seu navegador não suporta a tag de vídeo.
        </video>
      </div>
    </div>
  );
}
