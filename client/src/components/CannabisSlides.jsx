// client/src/components/CannabisSlides.jsx
import React, { useState, useEffect } from "react";

/**
 * CannabisSlides
 * - Slides minimalistas com autoplay (10s) e transição de fade
 * - UI/UX consistente com HowItWorksSection
 * - Navegação manual também disponível
 * - Divisores superior e inferior (verde escuro quase transparente)
 */
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

  const handlePrev = () => {
    setFade(false);
    setTimeout(() => {
      setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
      setFade(true);
    }, 300);
  };

  const handleNext = () => {
    setFade(false);
    setTimeout(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
      setFade(true);
    }, 300);
  };

  // autoplay a cada 10s
  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  const slide = slides[currentSlide];

  return (
    <div style={styles.section}>
      {/* Divisor Superior */}
      <div style={styles.divider} />

      <div style={{ ...styles.textWrapper, opacity: fade ? 1 : 0 }}>
        <h2 style={styles.title}>{slide.title}</h2>
        <h3 style={styles.subtitle}>{slide.subtitle}</h3>
        <p style={styles.content}>{slide.content}</p>

        <div style={styles.navigation}>
          <button style={styles.navButton} onClick={handlePrev}>
            ← Anterior
          </button>
          <span style={styles.counter}>
            {currentSlide + 1} / {slides.length}
          </span>
          <button style={styles.navButton} onClick={handleNext}>
            Próximo →
          </button>
        </div>
      </div>

      
    </div>
  );
}

const styles = {
  section: {
    background: "#fff",
    color: "#000",
    padding: "4rem 1.5rem",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    minHeight: "40vh",
    overflow: "hidden",
  },
  textWrapper: {
    maxWidth: 720,
    margin: "0 auto",
    transition: "opacity 0.6s ease-in-out",
  },
  divider: {
    width: "90%",
    height: "1px",
    backgroundColor: "rgba(3, 24, 3, 0.48)", // verde escuro quase transparente
    margin: "1.5rem auto",
  },
  title: {
    fontSize: "2rem",
    fontWeight: 800,
    margin: 0,
    marginBottom: "0.5rem",
    lineHeight: 1.2,
    fontFamily:
      "ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial",
  },
  subtitle: {
    fontSize: "1.3rem",
    fontWeight: 600,
    marginBottom: "1.5rem",
    opacity: 0.85,
    fontFamily:
      "ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial",
  },
  content: {
    fontSize: "1.1rem",
    opacity: 0.9,
    marginBottom: "2rem",
    lineHeight: 1.6,
    textAlign: "justify",
    fontFamily:
      "ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial",
  },
  navigation: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "1rem",
  },
  navButton: {
    background: "#000",
    color: "#fff",
    border: "none",
    borderRadius: 12,
    padding: "10px 20px",
    fontSize: "1rem",
    fontWeight: 600,
    cursor: "pointer",
    transition: "all 0.2s ease",
  },
  counter: {
    fontSize: "1rem",
    fontWeight: 500,
    opacity: 0.7,
  },
};
