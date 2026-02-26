import { useState, useEffect } from "react";
import { FaFlag, FaGlobe } from "react-icons/fa";
import "./ChatBot.scss";

// Novo fluxo simples de cardápio
const menuSteps = [
  {
    step: 0,
    botMessage:
      "🌿 Bem-vindo ao nosso cardápio exclusivo.\n\nEscolha uma das opções abaixo para acessar:",
    userOptions: [
      {
        text: "NACIONAL",
        icon: <FaFlag color="#00ff84" size={20} />,
        nextStep: 1,
      },
      {
        text: "IMPORTADO",
        icon: <FaGlobe color="#00ff84" size={20} />,
        nextStep: 2,
      },
    ],
  },
  {
    step: 1,
    botMessage:
      '🇧🇷 Você escolheu **NACIONAL**.\n\nAcesse o cardápio completo através do link abaixo:\n\n👉 <a href="https://SEULINKNACIONAL.com" target="_blank" rel="noopener noreferrer">CLIQUE AQUI PARA ACESSAR</a>',
    isFinal: true,
  },
  {
    step: 2,
    botMessage:
      '🌎 Você escolheu **IMPORTADO**.\n\nAcesse o cardápio completo através do link abaixo:\n\n👉 <a href="https://SEULINKIMPORTADO.com" target="_blank" rel="noopener noreferrer">CLIQUE AQUI PARA ACESSAR</a>',
    isFinal: true,
  },
];

export default function ChatWsc() {
  const [messages, setMessages] = useState([
    { sender: "bot", text: menuSteps[0].botMessage },
  ]);
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(0);
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    const generatedParticles = Array.from({ length: 40 }).map(() => ({
      id: Math.random(),
      size: Math.random() * 4 + 1,
      top: Math.random() * 100,
      left: Math.random() * 100,
      duration: Math.random() * 20 + 10,
    }));
    setParticles(generatedParticles);
  }, []);

  const handleUserResponse = (optionText, nextStep) => {
    setMessages((prev) => [...prev, { sender: "user", text: optionText }]);
    setLoading(true);

    setTimeout(() => {
      const nextStepData = menuSteps.find((s) => s.step === nextStep);

      if (nextStepData) {
        setMessages((prev) => [
          ...prev,
          { sender: "bot", text: nextStepData.botMessage },
        ]);
        setStep(nextStep);
      }

      setLoading(false);
    }, 800);
  };

  const currentStepData = menuSteps.find((s) => s.step === step);

  const renderContent = () => {
    if (!currentStepData || currentStepData.isFinal) return null;

    return (
      <div className="chatbot-right">
        {currentStepData.userOptions.map((option, index) => (
          <div
            key={index}
            className="explore-card visible"
            onClick={() =>
              handleUserResponse(option.text, option.nextStep)
            }
          >
            {option.icon && <div className="icon">{option.icon}</div>}
            <div className="text">
              <span className="title">{option.text}</span>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="chatbot-page">
      {/* Partículas */}
      {particles.map((p) => (
        <div
          key={p.id}
          className="dust-particle"
          style={{
            width: p.size,
            height: p.size,
            top: `${p.top}%`,
            left: `${p.left}%`,
            animationDuration: `${p.duration}s`,
          }}
        />
      ))}

      <div className="chatbot-main">
        {/* Área de mensagens */}
        <div className="chatbot-left">
          <div className="chatbot-messages">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`message ${msg.sender}`}
                dangerouslySetInnerHTML={{ __html: msg.text }}
              />
            ))}
            {loading && <div className="typing">Digitando...</div>}
          </div>
        </div>

        {/* Botões */}
        {renderContent()}
      </div>
    </div>
  );
}