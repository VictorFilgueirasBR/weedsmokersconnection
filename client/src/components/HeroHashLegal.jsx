import React, { useState, useEffect } from 'react';
import { FaGift } from 'react-icons/fa'; // Importa o ícone de presente
import './HeroHashLegal.scss';

const slides = [
  { image: '/images/hash-legalizado-anvisa-capa.jpg' },
  { image: '/images/hash-legalizado-anvisa-capa-2.jpg' },
  { image: '/images/hash-legalizado-anvisa-capa-3.jpg' },
  { image: '/images/hash-legalizado-anvisa-capa-4.jpg' },
  { image: '/images/hash-legalizado-anvisa-capa-6.jpeg' },
  { image: '/images/hash-legalizado-anvisa-capa-7.jpeg' },
  { image: '/images/hash-legalizado-anvisa-capa-8.jpeg' },
  { image: '/images/hash-legalizado-anvisa-capa-12.jpg' },
  { image: '/images/hash-legalizado-anvisa1.jpg' },
  { image: '/images/hash-legalizado-anvisa22.jpg' },
  { image: '/images/hash-legalizado-anvisa25.jpg' },
  { image: '/images/hash-legalizado-anvisa26.jpg' },
];

const HeroSlides = () => {
  const [activeSlide, setActiveSlide] = useState(0);

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
    <section className="hero-hashs">
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

      {/* Conteúdo fixo sobre o slider */}
      <div className="hero-content-hash-overlay">
        <h1 className="hero-title-hash">HASH & THC & CBD</h1>
      </div>

      
    </section>
  );
};

export default HeroSlides;
