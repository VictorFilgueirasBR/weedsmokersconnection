import { useState, useEffect, useRef } from "react";
import { FaPaperPlane, FaBed, FaLeaf, FaBrain, FaHeartbeat } from "react-icons/fa";
import "./ChatBot.scss";

// Estrutura do quiz aprimorada com fluxo conversacional
const quizSteps = [
  {
    step: 0,
    botMessage: "Olá! 👋 Vamos fazer um teste rápido para entender como os canabinoides podem te ajudar. Clique em um dos cartões para começar.",
    userOptions: [
      { text: "Insônia", icon: <FaBed color="#00ff84" size={20} />, title: "Insônia", desc: "Dificuldades em pegar no sono, acordar e não voltar a adormecer.", nextStep: 1 },
      { text: "Ansiedade", icon: <FaHeartbeat color="#00ff84" size={20} />, title: "Ansiedade", desc: "Sentir-se ansioso em algum momento do dia é um sintoma.", nextStep: 2 },
      { text: "TDAH", icon: <FaBrain color="#00ff84" size={20} />, title: "TDAH", desc: "Dificuldade de concentração ou hiperatividade. ", nextStep: 3 },
      { text: "Dores Crônicas", icon: <FaLeaf color="#00ff84" size={20} />, title: "Dores Crônicas", desc: "Qualquer dor persistente há mais de 3 meses. ", nextStep: 4 },
    ],
  },
  {
    step: 1,
    botMessage: `Segundo critérios médicos, insônia é a **dificuldade em iniciar ou manter o sono**, ou acordar muito cedo e não conseguir voltar a dormir. 😴

Você se identifica com essa descrição?`,
    userOptions: [
      { text: "Sim, isso descreve minha situação.", nextStep: 5 },
      { text: "Não, minha queixa não é exatamente essa.", nextStep: 5 },
    ],
  },
  {
    step: 2,
    botMessage: `A ansiedade normal é uma resposta natural a situações de pressão, como uma entrevista ou falar em público. 🤯

Você sente essa pressão com frequência, mesmo em atividades rotineiras?`,
    userOptions: [
      { text: "Sim, me sinto assim com frequência.", nextStep: 5 },
      { text: "Não, é mais sobre controle.", nextStep: 5 },
    ],
  },
  {
    step: 3,
    botMessage: `TDAH é um conjunto de sintomas como **dificuldade de manter o foco**, cometer erros por descuido, ou se distrair facilmente. 🧠

Você costuma se identificar com esses comportamentos no seu dia a dia?`,
    userOptions: [
      { text: "Sim, isso é um desafio para mim.", nextStep: 5 },
      { text: "Não, meu problema não é de foco.", nextStep: 5 },
    ],
  },
  {
    step: 4,
    botMessage: `Dores crônicas são dores que duram mais de 3 meses. Sintomas comuns incluem dor persistente, rigidez, cansaço ou a sensação de queimação, mesmo em casos como torcicolos. 🤕

Você tem convivido com dores persistentes que limitam suas atividades?`,
    userOptions: [
      { text: "Sim, sinto dores que não passam.", nextStep: 5 },
      { text: "Não, minhas dores são pontuais.", nextStep: 5 },
    ],
  },
  {
    step: 5,
    botMessage: `É importante que você saiba que todas essas condições são **passíveis de tratamento com produtos à base de cannabis**, como os com THC, CBD (ICE, Hash, Rosin, FullSpectrum, Diamonds, Flores de diferentes Espécies). 🌿

Já considerou essa alternativa para o seu caso?`,
    userOptions: [
      { text: "Já pensei, mas não sei por onde começar.", nextStep: 6 },
      { text: "É uma opção nova para mim.", nextStep: 6 },
    ],
  },
  {
    step: 6,
    botMessage: `Nossa plataforma oferece acesso a fornecedores de confiança e a médicos prescritores especializados, que tornam o processo da sua receita rápido e seguro. 👨‍⚕️

Nós podemos te ajudar a dar o próximo passo!`,
    userOptions: [
      { text: "Quero saber mais sobre as vantagens!", nextStep: 7 },
      { text: "Não tenho interesse agora.", nextStep: 7 },
    ],
  },
  {
    step: 7,
    // Este é o passo do CTA final
    botMessage: () => {
      const percentage = Math.floor(55 + Math.random() * 40);
      return `Com base em suas respostas, você obteve uma compatibilidade de **${percentage}%** com tratamentos à base de cannabis. Isso indica uma alta probabilidade de que você seja elegível para o tratamento.

Basta acessar a plataforma para ter acesso à consulta, aos fornecedores e, consequentemente, à sua receita. Junte-se a nós e descubra todos os benefícios! Clique e assine para ter acesso ao passo a passo.`;
    },
    isCTA: true,
  },
];

export default function ChatBot() {
  const [messages, setMessages] = useState([
    { sender: "bot", text: quizSteps[0].botMessage },
  ]);
  const [loading, setLoading] = useState(false);
  const [particles, setParticles] = useState([]);
  const [step, setStep] = useState(0);
  const cardsRef = useRef([]);

  useEffect(() => {
    const generatedParticles = Array.from({ length: 50 }).map(() => ({
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
      const nextStepData = quizSteps.find(s => s.step === nextStep);
      
      if (nextStepData && nextStepData.isCTA) {
        const finalMessage = nextStepData.botMessage();
        setMessages((prev) => [...prev, { sender: "bot", text: finalMessage }]);
        setStep(nextStep); // Atualiza para o passo final
      } else if (nextStepData) {
        setMessages((prev) => [...prev, { sender: "bot", text: nextStepData.botMessage }]);
        setStep(nextStep);
      }
      
      setLoading(false);
    }, 1000);
  };
  
  const currentStepData = quizSteps.find(s => s.step === step);
  
  const renderContent = () => {
    if (currentStepData && currentStepData.isCTA) {
      return (
        <a href="/signup" className="cta-button-chat" target="_self" rel="noopener noreferrer">
          Assine esse Lyfe Style Agora 🍃
        </a>
      );
    }
    
    return (
      <div className="chatbot-right">
        {currentStepData && currentStepData.userOptions.map((option, index) => (
          <div
            key={index}
            className={`explore-card visible`}
            onClick={() => handleUserResponse(option.text, option.nextStep)}
          >
            {option.icon && <div className="icon">{option.icon}</div>}
            <div className="text">
              <span className="title">{option.title || option.text}</span>
              <span className="desc">{option.desc}</span>
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

      {/* Área principal */}
      <div className="chatbot-main">
        {/* Coluna esquerda */}
        <div className="chatbot-left">
          <div className="chatbot-messages">
            {messages.map((msg, index) => (
              <div key={index} className={`message ${msg.sender}`} dangerouslySetInnerHTML={{ __html: msg.text }} />
            ))}
            {loading && <div className="typing">Digitando...</div>}
          </div>
        </div>

        {/* Coluna direita */}
        {renderContent()}
      </div>
    </div>
  );
}