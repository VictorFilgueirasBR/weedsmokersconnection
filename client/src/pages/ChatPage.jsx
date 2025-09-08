import React from 'react';
import ChatBot from '../components/ChatBot';

export default function ChatPage() {
  return (
    <div className="chat-page-container">
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
      <ChatBot />
    </div>
  );
}