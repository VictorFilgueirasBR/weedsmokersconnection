import { useState, useEffect } from "react";
import { FaFlag, FaGlobe } from "react-icons/fa";
import "./ChatBot.scss";

// ======== MENU FLOW ========
const menuSteps = [
  {
    step: 0,
    botMessage:
      "🌿 Bem-vindo ao nosso conteúdo exclusivo para pacientes medicinais receitados.\n\nEscolha uma das opções abaixo para acessar:",
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
    botMessage: (
      <a
        href="https://weedsmokersconnection.com/club?access=wsc-club-ice#properties-grid"
        target="_blank"
        rel="noopener noreferrer"
        className="property-cta"
      >
        Conteúdo Exclusívo
      </a>
    ),
    isFinal: true,
  },
  {
    step: 2,
    botMessage: (
      <a
        href="https://weedsmokersconnection.com/club?access=wsc-club-ice#properties-imp"
        target="_blank"
        rel="noopener noreferrer"
        className="property-cta"
      >
        Conteúdo Exclusívo
      </a>
    ),
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
        <div className="chatbot-left">
          <div className="chatbot-messages">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`message ${msg.sender}`}
              >
                {msg.text}
              </div>
            ))}
            {loading && <div className="typing">Digitando...</div>}
          </div>
        </div>

        {renderContent()}
      </div>
    </div>
  );
}