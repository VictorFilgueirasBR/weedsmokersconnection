import React from 'react';
import ChatWsc from '../components/ChatWsc';

export default function ChatWsc() {
  return (
    <div className="chat-wsc-container">
      <style>{`
        .chat-page-container {
          /* Para ocupar a tela toda e centralizar o chatbot */
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 100vh;
          width: 100%;
          background: radial-gradient(circle at top left, #0f0f0f, #000);
          color: #fff;
          font-family: 'Segoe UI', sans-serif;
        }
      `}</style>
      <ChatWsc />
    </div>
  );
}