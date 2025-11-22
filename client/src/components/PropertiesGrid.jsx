// client/src/components/PropertiesGrid.jsx
import React from 'react';
import './PropertiesGrid.scss';

// Dados dos imóveis com as imagens fornecidas e informações fictícias
const propertiesData = [
  {
    id: 1,
    image: '/images/hash-legalizado-anvisa.jpg',
    title: 'Hash ICE (THC)',
    location: '5g',
    price: 'R$ 500,00',
    description: 'Fornecedor Nacional de Hash e Extrações tipo ICE legalizado pela ANVISA. (O valor pode variar de acordo com as Epécies).',
    cta: 'Ver mais',
    link: 'http://instagram.com/Greenway.cbd'
  },
  {
    id: 2,
    image: '/images/beautiful-buds.jpg',
    title: 'Flores HK (THC)',
    location: '10g',
    price: 'R$ 600,00',
    description: 'Fornecedor Nacional de Flores em Natura com THC legalizado pela ANVISA. (O valor pode variar de acordo com as Epécies).',
    cta: 'Ver mais',
    link: 'https://institutozasso.com.br/'
  },
  {
    id: 3,
    image: '/images/club-flores.jpeg',
    title: 'Flores Z-Kittlez Pie (THC)',
    location: '5g',
    price: 'R$ 275,00',
    description: 'Fornecedor Nacional de Flores em Natura com THC legalizado pela ANVISA. (O valor pode variar de acordo com as Epécies).',
    cta: 'Ver mais',
    link: 'https://abecmed.com.br'
  },
  {
    id: 4,
    image: '/images/hash-legalizado-anvisa-capa.jpg',
    title: 'Hash ICE - 24K (THC)',
    location: '5g',
    price: 'R$ 600,00',
    description: 'Fornecedor Nacional de Extrações tipo ICE com THC legalizado pela ANVISA. (O valor pode variar de acordo com as Epécies).',
    cta: 'Ver mais',
    link: 'http://instagram.com/Greenway.cbd'
  },
  {
    id: 5,
    image: '/images/wsc-vape-thc.webp',
    title: 'Refil THC puro',
    location: '1ml',
    price: 'R$ 320,00',
    description: 'Fornecedor Importado (EUA) de Extrações com THC legalizado pela ANVISA. (O valor pode variar de acordo com as Epécies).',
    cta: 'Ver mais',
    link: 'https://flowermed.com.br/'
  },
  {
    id: 6,
    image: '/images/hash-ice-import.png',
    title: 'ICE Bubble Hash (THC)',
    location: '5g',
    price: 'R$ 650,00',
    description: 'Fornecedor Importado (EUA) de Extrações tipo ICE com THC legalizado pela ANVISA.(O valor pode variar de acordo com as Epécies).',
    cta: 'Ver mais',
    link: 'https://flowermed.com.br/'
  },
  {
    id: 7,
    image: '/images/buds-pp-alianca.png',
    title: 'Buds PP (THC)',
    location: '10g',
    price: 'R$ 500,00',
    description: 'Fornecedor Nacional (BR) de Flores com THC com buds pequenos.(Entrega qualidade porém buds pequenos).',
    cta: 'Ver mais',
    link: 'https://www.aliancamedicinal.org/'
  },
  {
    id: 8,
    image: '/images/cherry-pie-nacional.png',
    title: 'Cherry Pie Purple (THC)',
    location: '10g',
    price: 'R$ 750,00',
    description: 'Fornecedor Nacional (BR) de Flores com THC alto nível de concentração.(Esse fornecedor tem mais de 5 Espécies diferentes).',
    cta: 'Ver mais',
    link: 'http://instagram.com/Greenway.cbd'
  },
  {
    id: 9,
    image: '/images/rosin-flower.png',
    title: 'Rosin Hash (THC)',
    location: '5g',
    price: 'R$ 750,00',
    description: 'Fornecedor Importado (EUA) de Extrações tipo ICE com THC legalizado pela ANVISA.(O valor pode variar de acordo com as Epécies).',
    cta: 'Ver mais',
    link: 'https://flowermed.com.br/'
  },
];

// Função utilitária para detectar GIF
const isGif = (src) => /\.gif$/i.test(src);

const PropertiesGrid = ({ title = 'Reviews Atualizados', id = 'properties-grid' }) => {
  return (
    <section className="properties-grid-section" id={id}>
      <h2 className="section-title">{title}</h2>
      <div className="properties-grid-container">
        {propertiesData.map(property => (
          <div className="property-card" key={property.id}>
            <div className="property-image-wrapper">

              {/* Renderização condicional para GIF: usa <video> */}
              {isGif(property.image) ? (
                <video 
                  src={property.image}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="property-image"
                />
              ) : (
                <img 
                  src={property.image} 
                  alt={property.title} 
                  className="property-image" 
                />
              )}

              <span className="property-price">{property.price}</span>
            </div>

            <div className="property-info">
              <h3 className="property-title">{property.title}</h3>
              <p className="property-location">{property.location}</p>
              <p className="property-description">{property.description}</p>
              <a 
                href={property.link} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="property-cta submit-gradient-btn"
              >
                {property.cta}
              </a>
            </div>

          </div>
        ))}
      </div>
    </section>
  );
};

export default PropertiesGrid;
