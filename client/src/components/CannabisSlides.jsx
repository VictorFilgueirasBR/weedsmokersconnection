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
      color: ["#00f0ff", "#00bfff"],
    },
    {
      title: "Cannabis Indica",
      subtitle: "Relaxamento e Cuidado Noturno",
      content:
        "A Cannabis Indica é tradicionalmente associada ao relaxamento profundo e à sensação de calma, sendo amplamente utilizada para promover noites de sono mais tranquilas e aliviar tensões físicas. Seus efeitos são mais corporais do que mentais, o que a torna uma escolha frequente para quem sofre de insônia, dores musculares ou ansiedade. É a variedade ideal para momentos de descanso e recuperação, favorecendo o bem-estar após dias intensos.",
      color: ["#7df9ff", "#00cfff"],
    },
    {
      title: "Cannabis Sativa",
      subtitle: "Energia e Estímulo Criativo",
      content:
        "A Cannabis Sativa é reconhecida por seus efeitos estimulantes e revigorantes, que proporcionam uma sensação de energia e clareza mental. Por isso, é bastante utilizada durante o dia para favorecer a criatividade, foco e melhora do humor. Seus compostos promovem maior engajamento em atividades criativas, sociais ou profissionais, sendo uma opção para quem busca disposição sem perder a concentração.",
      color: ["#00ffc3", "#00f0ff"],
    },
    {
      title: "Híbridas e CBD",
      subtitle: "Equilíbrio e Potencial Terapêutico",
      content:
        "As variedades híbridas combinam características da Indica e da Sativa, oferecendo efeitos equilibrados que podem ser ajustados conforme a proporção entre as duas espécies — podendo trazer relaxamento sem sonolência ou energia sem ansiedade. Já as linhagens ricas em CBD (Cannabidiol) se destacam pelo uso medicinal e terapêutico, devido ao baixo ou nenhum teor de THC. São recomendadas para o tratamento de inflamações, ansiedade e condições de saúde mental, representando um dos maiores avanços no uso da Cannabis para o bem-estar.",
      color: ["#00bfff", "#00ffc3"],
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);
  const [progress, setProgress] = useState(0);
  const wrapRef = useRef(null);

  const slide = slides[currentSlide];

  useEffect(() => {
    setProgress(0);
    const duration = 10000;
    const start = Date.now();

    const timer = setInterval(() => {
      const elapsed = Date.now() - start;
      const pct = Math.min((elapsed / duration) * 100, 100);
      setProgress(pct);
      if (pct >= 100) {
        setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [currentSlide]);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;

    const move = (e) => {
      const r = el.getBoundingClientRect();
      const x = e.clientX - r.left;
      const y = e.clientY - r.top;

      const rx = ((y / r.height) - 0.5) * 4;
      const ry = ((x / r.width) - 0.5) * -4;

      el.style.setProperty("--mx", `${x}px`);
      el.style.setProperty("--my", `${y}px`);
      el.style.setProperty("--rx", `${rx}deg`);
      el.style.setProperty("--ry", `${ry}deg`);
    };

    el.addEventListener("mousemove", move);
    return () => el.removeEventListener("mousemove", move);
  }, []);

  const handleNext = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  return (
    <section ref={wrapRef} className="cs-wrap">

      <div className="cs-bg-core" />
      <div className="cs-bg-grid" />
      <div className="cs-bg-noise" />

      <div className="cs-container">

        <motion.div
          key={currentSlide}
          className="cs-card"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >

          <div className="cs-halo" />

          {/* HEADER */}
          <motion.div
            className="cs-header"
            initial={{ opacity: 0, y: -30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="cs-title">{slide.title}</h2>
            <h3 className="cs-subtitle">{slide.subtitle}</h3>
          </motion.div>

          {/* CONTENT BLOCK */}
          <motion.div
            className="cs-block"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <p className="cs-content">{slide.content}</p>
          </motion.div>

          {/* NAV BLOCK */}
          <motion.div
            className="cs-block"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="cs-progress" onClick={handleNext}>
              <div
                className="cs-progress-bar"
                style={{
                  width: `${progress}%`,
                  background: `linear-gradient(90deg, ${slide.color[0]}, ${slide.color[1]})`
                }}
              />
            </div>
          </motion.div>

        </motion.div>

      </div>

      <style>{`

      .cs-wrap {
        position: relative;
        width: 100%;
        padding: 60px 20px;
        display: flex;
        justify-content: center;
        background: #02050a;
        overflow: hidden;
        --rx: 0deg;
        --ry: 0deg;
      }

      .cs-bg-core {
        position: absolute;
        inset: 0;
        background:
          radial-gradient(circle at center, rgba(0,255,200,0.08), transparent 60%),
          radial-gradient(circle at 30% 20%, rgba(0,150,255,0.1), transparent 40%);
      }

      .cs-bg-grid {
        position: absolute;
        inset: 0;
        background-image:
          linear-gradient(rgba(0,255,255,0.04) 1px, transparent 1px),
          linear-gradient(90deg, rgba(0,255,255,0.04) 1px, transparent 1px);
        background-size: 50px 50px;
        opacity: 0.15;
      }

      .cs-bg-noise {
        position: absolute;
        inset: 0;
        background-image: radial-gradient(rgba(255,255,255,0.02) 1px, transparent 1px);
        background-size: 3px 3px;
      }

      .cs-container {
        position: relative;
        z-index: 2;
        max-width: 720px;
        width: 100%;
        perspective: 1000px;
      }

      .cs-card {
        transform: rotateX(var(--rx)) rotateY(var(--ry));
        background: rgba(10,20,30,0.6);
        backdrop-filter: blur(30px);
        border: 1px solid rgba(0,255,255,0.1);
        border-radius: 26px;
        padding: 28px;
        box-shadow: 0 40px 100px rgba(0,0,0,0.7);
        position: relative;
        display: flex;
        flex-direction: column;
        gap: 20px;
      }

      .cs-halo {
        position: absolute;
        inset: 0;
        border-radius: inherit;
        background: radial-gradient(circle at center, rgba(0,255,255,0.08), transparent 70%);
        pointer-events: none;
      }

      .cs-header {
        padding: 16px;
        border-radius: 16px;
        background: rgba(255,255,255,0.03);
        border: 1px solid rgba(255,255,255,0.06);
        backdrop-filter: blur(10px);
      }

      .cs-block {
        padding: 16px;
        border-radius: 16px;
        background: rgba(255,255,255,0.02);
        border: 1px solid rgba(255,255,255,0.05);
        backdrop-filter: blur(10px);
      }

      .cs-title {
        font-size: 32px;
        font-weight: 900;
        color: #eaffff;
        text-align: center;
      }

      .cs-subtitle {
        font-size: 16px;
        text-align: center;
        color: #7df9ff;
      }

      .cs-content {
        color: #d8faff;
        line-height: 1.7;
        text-align: justify;
      }

      .cs-progress {
        height: 10px;
        background: rgba(255,255,255,0.05);
        border-radius: 999px;
        overflow: hidden;
        cursor: pointer;
      }

      .cs-progress-bar {
        height: 100%;
        border-radius: 999px;
        box-shadow: 0 0 30px rgba(0,255,255,0.7);
        transition: width 0.1s linear;
      }

      `}</style>
    </section>
  );
}
