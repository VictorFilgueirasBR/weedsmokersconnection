import React from 'react';
import ChatWsc from '../components/ChatWsc';

export default function ChatWscPage() {
  return (
    <div className="chat-page-container">
      <style>{`
        .chat-page-container {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 100vh;
          width: 100%;
          background: radial-gradient(circle at top left, #0f0f0f, #000);
          color: #fff;
          font-family: 'Segoe UI', sans-serif;
          /* Adiciona um recuo para o conteúdo não ficar sob o Header fixo */
          padding-top: 80px; 
          box-sizing: border-box;
        }

        /* Garante que o Header tenha prioridade visual se houver conflito */
        .main-header {
          z-index: 99999 !important;
        }
      `}</style>
      <ChatWsc />
    </div>
  );
}