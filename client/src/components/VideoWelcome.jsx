// src/components/WelcomeVideo.jsx
import React, { useState } from "react";
import { FaPlay } from "react-icons/fa"; // player icon

export default function WelcomeVideo() {
  const [play, setPlay] = useState(false);

  return (
    <div className="flex justify-center bg-white p-4">
      <div className="relative w-full max-w-[550px]" style={{ height: "350px" }}>
        {play ? (
          <iframe
            className="w-full h-full rounded-2xl"
            src="https://www.youtube.com/embed/9uN2MOdTgV8?autoplay=1"
            title="Weed Smokers Connection - Boas Vindas"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        ) : (
          <div
            className="w-full h-full relative cursor-pointer"
            onClick={() => setPlay(true)}
          >
            <img
              src="/images/wsc-thumb-home.png"
              alt="Weed Smokers Connection - Capa"
              className="w-full h-full object-cover rounded-2xl shadow"
            />
            {/* Ícone de play centralizado */}
            <div className="absolute inset-0 flex items-center justify-center">
              <FaPlay
                size={50}
                className="text-white drop-shadow-lg hover:scale-110 transition-transform"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
