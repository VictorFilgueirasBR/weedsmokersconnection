import React, { useState, useEffect } from 'react';
import { FaGift } from 'react-icons/fa'; // Importa o ícone de presente
import { useNavigate } from 'react-router-dom';
import './HeroSlides.scss';

const slides = [
  { image: '/images/hemp222.jpeg' },
  { image: '/images/hemp233.jpeg' },
  { image: '/images/HEMP-FOOTER.jpeg' },
  { image: '/images/cannabis_Grow_rooms.jpg' },
  { image: '/images/f19.jpg' },
  { image: '/images/wsc-logo-glass.png' },
  { image: '/images/hemp61.webp' },
  { image: '/images/hemp59.webp' },
  { image: '/images/CBD-medicinal.jpeg' },
  { image: '/images/hemp51.webp' },
  { image: '/images/hemp-red-head.jpeg' },
  { image: '/images/surf-1.jpeg' },
  { image: '/images/hemp77.webp' },
  { image: '/images/hemp89.jpg' },
  { image: '/images/hemp88.jpg' },
  { image: '/images/canabidiol-hero-medicinal.jpg' },
  { image: '/images/hemp83.jpg' },
  { image: '/images/hemp82.png' },
];

const HeroSlides = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const navigate = useNavigate();

  // Pré-carregar todas as imagens
  useEffect(() => {
    slides.forEach(slide => {
      const img = new Image();
      img.src = slide.image;
    });
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handlePrev = () => {
    setActiveSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const handleMouseMove = (e) => {
    const button = e.currentTarget;
    const rect = button.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    button.style.setProperty('--x', `${x}px`);
    button.style.setProperty('--y', `${y}px`);
  };

  return (
    <section className="hero-slides">
      {/* Wrapper para as imagens de fundo que deslizam */}
      <div
        className="slides-background-wrapper"
        style={{ transform: `translateX(-${activeSlide * 100}%)` }}
      >
        {slides.map((slide, index) => (
          <div className="background-slide" key={index}>
            <img src={slide.image} alt={`Slide de fundo ${index + 1}`} />
          </div>
        ))}
      </div>

      {/* hero-title fora do overlay */}
      <h1 className="hero-title" translate="no" lang="en">Weed Smokers Connection</h1>

      {/* Botão CADASTRE-SE fora do overlay */}
      <button
        className="hero-main-cta-button submit-gradient-btn"
        onMouseMove={handleMouseMove}
        onClick={() => navigate('/signup')}
      >
        CONTRATAR →
      </button>

      {/* Conteúdo fixo sobre o slider, com estilo glassmorphism */}
      <div className="hero-content-overlay">
        <p className="hero-subtitle">
          Escolha um Plano de Contratação, siga o passo a passo para ter autorização e escolha seus Fornecedores das Melhores Espécies e Extrações Ricas em THC e CBD, Nacionais e Importadas de forma LEGALIZADA pela ANVISA aqui no BRASIL.
        </p>
      </div>
    </section>
  );
};

export default HeroSlides;