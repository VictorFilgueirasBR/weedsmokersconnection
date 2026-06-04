import { useState, useEffect, useRef } from "react";
import { FaFlag, FaGlobe } from "react-icons/fa";
import * as THREE from "three";
import "./ChatBot.scss";

const menuSteps = [
  {
    step: 0,
    botMessage:
      "🌿 Bem-vindo ao nosso conteúdo exclusivo para pacientes medicinais receitados.\n\nEscolha uma das opções abaixo para acessar",
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
        className="property-wsc"
      >
        Conteúdo Exclusivo
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
        className="property-wsc"
      >
        Conteúdo Exclusivo
      </a>
    ),
    isFinal: true,
  },
];

export default function ChatWsc() {
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: menuSteps[0].botMessage,
    },
  ]);

  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(0);

  const sceneRef = useRef(null);
  const chatbotRef = useRef(null);

  useEffect(() => {
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
    });

    renderer.setSize(
      window.innerWidth,
      window.innerHeight
    );

    renderer.setPixelRatio(
      Math.min(window.devicePixelRatio, 2)
    );

    renderer.domElement.style.position = "fixed";
    renderer.domElement.style.inset = "0";
    renderer.domElement.style.pointerEvents = "none";
    renderer.domElement.style.zIndex = "0";

    sceneRef.current.appendChild(renderer.domElement);

    const geometry = new THREE.BufferGeometry();

    const count = 1400;

    const positions = new Float32Array(
      count * 3
    );

    for (let i = 0; i < count * 3; i++) {
      positions[i] =
        (Math.random() - 0.5) * 12;
    }

    geometry.setAttribute(
      "position",
      new THREE.BufferAttribute(positions, 3)
    );

    const material =
      new THREE.PointsMaterial({
        size: 0.012,
        color: "#ffffff",
        transparent: true,
        opacity: 0.8,
      });

    const stars = new THREE.Points(
      geometry,
      material
    );

    scene.add(stars);

    camera.position.z = 5;

    let animationFrame;

    const animate = () => {
      animationFrame =
        requestAnimationFrame(animate);

      stars.rotation.y += 0.0008;
      stars.rotation.x += 0.0003;

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      camera.aspect =
        window.innerWidth /
        window.innerHeight;

      camera.updateProjectionMatrix();

      renderer.setSize(
        window.innerWidth,
        window.innerHeight
      );
    };

    const handleMouseMove = (e) => {
      if (!chatbotRef.current) return;

      const deltaX =
        (window.innerWidth / 2 -
          e.clientX) /
        45;

      const deltaY =
        (window.innerHeight / 2 -
          e.clientY) /
        45;

      chatbotRef.current.style.transform = `
        rotateY(${deltaX}deg)
        rotateX(${-deltaY}deg)
      `;
    };

    window.addEventListener(
      "resize",
      handleResize
    );

    document.addEventListener(
      "mousemove",
      handleMouseMove
    );

    return () => {
      cancelAnimationFrame(
        animationFrame
      );

      window.removeEventListener(
        "resize",
        handleResize
      );

      document.removeEventListener(
        "mousemove",
        handleMouseMove
      );

      renderer.dispose();
    };
  }, []);

  const handleUserResponse = (
    optionText,
    nextStep
  ) => {
    setMessages((prev) => [
      ...prev,
      {
        sender: "user",
        text: optionText,
      },
    ]);

    setLoading(true);

    setTimeout(() => {
      const nextStepData =
        menuSteps.find(
          (s) => s.step === nextStep
        );

      if (nextStepData) {
        setMessages((prev) => [
          ...prev,
          {
            sender: "bot",
            text: nextStepData.botMessage,
          },
        ]);

        setStep(nextStep);
      }

      setLoading(false);
    }, 800);
  };

  const currentStepData =
    menuSteps.find(
      (s) => s.step === step
    );

  const renderContent = () => {
    if (
      !currentStepData ||
      currentStepData.isFinal
    )
      return null;

    return (
      <div className="chatbot-right">
        {currentStepData.userOptions.map(
          (option, index) => (
            <div
              key={index}
              className="explore-card visible"
              onClick={() =>
                handleUserResponse(
                  option.text,
                  option.nextStep
                )
              }
            >
              {option.icon && (
                <div className="icon">
                  {option.icon}
                </div>
              )}

              <div className="text">
                <span className="title">
                  {option.text}
                </span>
              </div>
            </div>
          )
        )}
      </div>
    );
  };

  return (
    <>
      <div
        ref={sceneRef}
        className="three-background"
      />

      <div
        className="chatbot-page"
        ref={chatbotRef}
      >
        <div className="grid-overlay" />

        <div className="ambient-glow" />

        <div className="chatbot-main">
          <div className="chatbot-left">
            <div className="chatbot-messages">
              {messages.map(
                (msg, index) => (
                  <div
                    key={index}
                    className={`message ${msg.sender}`}
                  >
                    {msg.text}
                  </div>
                )
              )}

              {loading && (
                <div className="typing">
                  Digitando...
                </div>
              )}
            </div>
          </div>

          {renderContent()}
        </div>
      </div>
    </>
  );
}