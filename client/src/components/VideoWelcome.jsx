// src/components/WelcomeVideo.jsx
import React, { useState } from "react";
import { Play } from "lucide-react";

export default function WelcomeVideo() {
  const [play, setPlay] = useState(false);

  return (
    <div className="flex justify-center bg-white p-4">
      <div className="relative w-full max-w-[550px] aspect-video rounded-2xl overflow-hidden shadow-lg">
        {play ? (
          <iframe
            className="w-full h-full"
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
              className="w-full h-full object-cover"
            />
            {/* overlay para destacar botão */}
            <div className="absolute inset-0 bg-black/40"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-green-600/90 p-5 rounded-full shadow-xl hover:scale-110 transition-transform">
                <Play size={42} color="#fff" fill="#fff" />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
