import React from 'react';

export default function VideoWelcome() {
  const css = `
    .video-player-container {
      width: 100%;
      height: 100%;
      margin-top: 60px;
      position: relative;
      overflow: hidden;
      background: #FFF;
    }

    .responsive-video {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    @media (orientation: portrait) {

    .video-player-container {
      width: 100%;
      height: 250px;
      position: relative;
      overflow: hidden;
    }
      .responsive-video {
        width: 100%;
        height: 100%;
        transform: rotate(0deg);
      }
    }
  `;

  return (
    <div className="video-player-container">
      <style>{css}</style>
      <video className="responsive-video" autoPlay muted loop playsInline>
        <source src="/reels/welcome-home-wsc.mp4" type="video/mp4" />
        Seu navegador não suporta a tag de vídeo.
      </video>
    </div>
  );
}