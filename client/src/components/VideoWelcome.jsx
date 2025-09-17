// src/components/WelcomeVideo.jsx
import React, { useState } from "react";
import { Play } from "lucide-react"; // ícone de play

export default function WelcomeVideo() {
  const [play, setPlay] = useState(false);

  return (
    <div className="flex justify-center bg-white p-4">
      <div className="relative w-full max-w-[550px]" style={{ height: "350px" }}>
        {play ? (
          // iframe do YouTube só aparece após clique
          <iframe
            className="w-full h-full"
            src="https://www.youtube.com/embed/9uN2MOdTgV8?autoplay=1"
            title="Weed Smokers Connection - Boas Vindas"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        ) : (
          // capa com botão de play
          <div
            className="w-full h-full relative cursor-pointer"
            onClick={() => setPlay(true)}
          >
            <img
              src="/images/wsc-thumb-home.png"
              alt="Weed Smokers Connection - Capa"
              className="w-full h-full object-cover rounded-2xl shadow"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-black/60 p-4 rounded-full hover:scale-110 transition">
                <Play size={48} color="#fff" fill="#fff" />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
