import React, { useState } from 'react';

export default function VideoWelcome() {
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlayClick = () => {
    setIsPlaying(true);
  };
    
  return (
    <div className="flex flex-col items-center justify-center bg-white py-16 md:py-24">
      <div className="w-full max-w-[470px] aspect-[9/16] overflow-hidden rounded-xl shadow-lg relative bg-white flex items-center justify-center">
        {!isPlaying ? (
          <div className="relative w-full h-full cursor-pointer" onClick={handlePlayClick}>
            <img 
              src="/images/wsc-thumb-home.png" 
              alt="Capa do vídeo - Weed Smokers Connection" 
              className="w-full h-full object-cover rounded-xl"
            />
            <div className="absolute inset-0 bg-black bg-opacity-30 rounded-xl flex items-center justify-center">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-16 w-16 text-white transition-transform duration-300 transform hover:scale-110" 
                viewBox="0 0 20 20" 
                fill="currentColor"
              >
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
        ) : (
          <iframe
            className="w-full h-full"
            src="https://www.youtube.com/embed/dtJ0UqE8cc4?autoplay=1&mute=1&loop=1&playlist=dtJ0UqE8cc4&controls=0&modestbranding=1"
            title="Weed Smokers Connection Brasil"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        )}
      </div>
    </div>
  );
}
