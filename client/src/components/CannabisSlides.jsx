// client/src/components/CannabisSlides.jsx
import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

export default function CannabisSlides() {
  const slides = [
    {
      title: "Cannabis no Brasil",
      subtitle: "Condições de Saúde com Autorização Médica",
      content:
        "No Brasil, o uso medicinal da Cannabis é regulamentado pela Anvisa e pode ser prescrito por médicos em casos específicos. Entre as patologias que já têm acesso ao tratamento estão: insônia, ansiedade, dores crônicas, epilepsia, fibromialgia, esclerose múltipla, autismo, Alzheimer, Parkinson, TDH e TDAH, entre outras condições. O tratamento deve ser sempre acompanhado por um profissional habilitado, garantindo segurança e eficácia no uso.",
    },
    {
      title: "Cannabis Indica",
      subtitle: "Relaxamento e Cuidado Noturno",
      content:
        "A Cannabis Indica é tradicionalmente associada ao relaxamento profundo e à sensação de calma, sendo amplamente utilizada para promover noites de sono mais tranquilas e aliviar tensões físicas. Seus efeitos são mais corporais do que mentais, o que a torna uma escolha frequente para quem sofre de insônia, dores musculares ou ansiedade. É a variedade ideal para momentos de descanso e recuperação, favorecendo o bem-estar após dias intensos.",
    },
    {
      title: "Cannabis Sativa",
      subtitle: "Energia e Estímulo Criativo",
      content:
        "A Cannabis Sativa é reconhecida por seus efeitos estimulantes e revigorantes, que proporcionam uma sensação de energia e clareza mental. Por isso, é bastante utilizada durante o dia para favorecer a criatividade, foco e melhora do humor. Seus compostos promovem maior engajamento em atividades criativas, sociais ou profissionais, sendo uma opção para quem busca disposição sem perder a concentração.",
    },
    {
      title: "Híbridas e CBD",
      subtitle: "Equilíbrio e Potencial Terapêutico",
      content:
        "As variedades híbridas combinam características da Indica e da Sativa, oferecendo efeitos equilibrados que podem ser ajustados conforme a proporção entre as duas espécies — podendo trazer relaxamento sem sonolência ou energia sem ansiedade. Já as linhagens ricas em CBD (Cannabidiol) se destacam pelo uso medicinal e terapêutico, devido ao baixo ou nenhum teor de THC. São recomendadas para o tratamento de inflamações, ansiedade e condições de saúde mental, representando um dos maiores avanços no uso da Cannabis para o bem-estar.",
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);
  const [fade, setFade] = useState(true);
  const wrapRef = useRef(null);

  const handleNext = () => {
    setFade(false);
    setTimeout(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
      setFade(true);
    }, 300);
  };

  useEffect(() => {
    const interval = setInterval(() => handleNext(), 10000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const move = (e) => {
      const r = el.getBoundingClientRect();
      const x = e.clientX - r.left;
      const y = e.clientY - r.top;
      el.style.setProperty("--mx", `${x}px`);
      el.style.setProperty("--my", `${y}px`);
    };
    el.addEventListener("mousemove", move);
    return () => el.removeEventListener("mousemove", move);
  }, []);

  const slide = slides[currentSlide];

  return (
    <section ref={wrapRef} className="cs-wrap">
      <div className="cs-bg-gradient" />
      <div className="cs-bg-grid" />
      <div className="cs-bg-noise" />

      <div className="cs-container">

        <motion.div
          className="cs-card"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: fade ? 1 : 0, y: fade ? 0 : 20 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="cs-title">{slide.title}</h2>
          <h3 className="cs-subtitle">{slide.subtitle}</h3>
          <p className="cs-content">{slide.content}</p>

          {/* PROGRESS NAV */}
          <div className="cs-nav">
            <div className="cs-progress" onClick={handleNext}>
              <div
                className="cs-progress-bar"
                style={{ width: `${((currentSlide + 1) / slides.length) * 100}%` }}
              />
            </div>
          </div>

        </motion.div>

      </div>

      <style>{`

      .cs-wrap {
        position: relative;
        width: 100%;
        padding: 60px 20px;
        display: flex;
        justify-content: center;
        overflow: hidden;
        background: #04070c;
        --mx: 50%;
        --my: 50%;
      }

      .cs-bg-gradient {
        position: absolute;
        inset: 0;
        background:
          radial-gradient(circle at 20% 20%, rgba(0,255,180,0.15), transparent 40%),
          radial-gradient(circle at 80% 60%, rgba(0,150,255,0.12), transparent 50%),
          linear-gradient(180deg, #050b14, #02050a);
        z-index: 0;
      }

      .cs-bg-grid {
        position: absolute;
        inset: 0;
        background-image:
          linear-gradient(rgba(0,200,255,0.06) 1px, transparent 1px),
          linear-gradient(90deg, rgba(0,200,255,0.06) 1px, transparent 1px);
        background-size: 40px 40px;
        opacity: 0.15;
        animation: gridFloat 20s linear infinite;
        z-index: 1;
      }

      @keyframes gridFloat {
        0% { transform: translateY(0); }
        100% { transform: translateY(-40px); }
      }

      .cs-bg-noise {
        position: absolute;
        inset: 0;
        background-image: radial-gradient(rgba(255,255,255,0.03) 1px, transparent 1px);
        background-size: 3px 3px;
        opacity: 0.25;
        z-index: 2;
      }

      .cs-container {
        position: relative;
        z-index: 3;
        max-width: 720px;
        width: 100%;
      }

      .cs-card {
        background: rgba(255,255,255,0.05);
        backdrop-filter: blur(20px);
        border: 1px solid rgba(255,255,255,0.1);
        border-radius: 20px;
        padding: 30px;
        box-shadow:
          inset 0 1px 0 rgba(255,255,255,0.05),
          0 20px 50px rgba(0,0,0,0.4);
        position: relative;
      }

      .cs-card::before {
        content: '';
        position: absolute;
        left: var(--mx);
        top: var(--my);
        transform: translate(-50%, -50%);
        width: 0;
        height: 0;
        border-radius: 50%;
        background: radial-gradient(circle, rgba(255,255,255,0.15), transparent 70%);
        transition: width .3s, height .3s, opacity .3s;
        opacity: 0;
      }

      .cs-card:hover::before {
        width: 300px;
        height: 300px;
        opacity: 1;
      }

      .cs-title {
        font-size: 32px;
        font-weight: 900;
        color: #eaf6ff;
      }

      .cs-subtitle {
        font-size: 18px;
        color: #00cfff;
        margin-bottom: 20px;
      }

      .cs-content {
        color: #cfeeff;
        line-height: 1.7;
        margin-bottom: 30px;
        text-align: justify;
      }

      .cs-nav {
        margin-top: 20px;
      }

      .cs-progress {
        width: 100%;
        height: 8px;
        background: rgba(255,255,255,0.1);
        border-radius: 999px;
        overflow: hidden;
        cursor: pointer;
        position: relative;
      }

      .cs-progress::before {
        content: '';
        position: absolute;
        inset: 0;
        background: linear-gradient(90deg, #00cfff, #4da6ff);
        opacity: 0.2;
        filter: blur(10px);
      }

      .cs-progress-bar {
        height: 100%;
        background: linear-gradient(90deg, #00cfff, #4da6ff);
        border-radius: 999px;
        transition: width 0.4s ease;
        box-shadow: 0 0 15px rgba(0,200,255,0.6);
      }

      `}</style>
    </section>
  );
}