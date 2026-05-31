// client/src/components/PropertiesGrid.jsx
import React from 'react';
import './PropertiesGrid.scss';

// Dados dos imóveis com as imagens fornecidas e informações atualizadas
const propertiesData = [
  
  {
    id: 1,
    image: '/images/hash-legalizado-anvisa.jpg',
    title: 'Hash Fullspectrum 90u ',
    location: '5g',
    price: 'WSC-SOLD OUT',
    description: 'Fullspectrum Hash tipo ICE THC HANDMADE. (Malha de 90 micras).',
    cta: 'SOLD OUT',
    link: 'https://wa.me/5561995276936'
  },
  {
    id: 2,
    image: '/images/beautiful-buds.jpg',
    title: 'Flores HK | THC',
    location: '10g',
    price: 'WSC-SOLDOUT',
    description: 'Inflorescência - Cultivo Outdoor 60% Indica - 40% Indica (24% THC).',
    cta: 'SOLD OUT',
    link: 'https://wa.me/5561995276936'
  },
  {
    id: 3,
    image: '/images/club-flores.jpeg',
    title: 'Flores Z-Kittlez Pie THC',
    location: '10g',
    price: 'WSC-SOLDOUT',
    description: 'Inflorescência - Cultivo Outdoor 60% Indica - 40% Indica (23% THC).',
    cta: 'SOLD OUT',
    link: 'https://wa.me/5561995276936'
  },
  {
    id: 4,
    image: '/images/hash-legalizado-anvisa-capa.jpg',
    title: 'Hash Full spectrum 45u ',
    location: '5g',
    price: 'WSC-SOLDOUT',
    description: 'Fullspectrum Hash tipo ICE THC HANDMADE. (Malha de 25 micras).',
    cta: 'SOLD OUT',
    link: 'https://wa.me/5561995276936'
  },
  {
    id: 5,
    image: '/images/buds-pp-alianca.png',
    title: 'Buds PP | THC',
    location: '10g',
    price: 'WSC-SOLDOUT',
    description: 'Fornecedor Nacional de Flores com THC com buds pequenos. (Entrega qualidade porém buds pequenos).',
    cta: 'SOLD OUT',
    link: 'https://wa.me/5561995276936'
  },
  {
    id: 6,
    image: '/images/cherry-pie-nacional.png',
    title: 'Cherry Pie Purple | THC',
    location: '10g',
    price: 'WSC-SOLDOUT',
    description: 'Inflorescência - Cultivo Indoor 63% Sativa - 37% Indica (24% THC).',
    cta: 'SOLD OUT',
    link: 'https://wa.me/5561995276936'
  },
  {
    id: 7,
    image: '/images/wsc-flower-24k.png',
    title: '24K Gold | THC',
    location: '10g',
    price: 'WSC-SOLDOUT',
    description: 'Inflorescência - Cultivo Outdoor 60% Sativa - 40% Indica (24% THC).',
    cta: 'SOLD OUT',
    link: 'https://wa.me/5561995276936'
  },
  {
    id: 8,
    image: '/images/wsc-flower-kk.png',
    title: 'Cherry Pie Homie | THC',
    location: '10g',
    price: 'WSC-SOLDOUT',
    description: 'Inflorescência - Cultivo Outdoor 34% Sativa - 66% Indica (24% THC).',
    cta: 'SOLD OUT',
    link: 'https://wa.me/5561995276936'
  },
  {
    id: 9,
    image: '/images/wsc-nacional-12.png',
    title: 'Hash FullSpectrum 45u ',
    location: '5g',
    price: 'WSC-989,90',
    description: 'Fullspectrum Hash tipo ICE THC HANDMADE. (Malha de 45 micras).',
    cta: 'PEDIR',
    link: 'https://wa.me/5561995276936'
  },
  /*/{
    id: 10,
    image: '/images/bahiabds.jpeg',
    title: 'BAHIA STRAIN | THC',
    location: '10g',
    price: 'WSC-760,00',
    description: 'Inflorescência - Cultivo Outdoor 60% Sativa - 40% Indica (24% THC).',
    cta: 'PEDIR',
    link: 'https://wa.me/5561995276936'
  },
  {
    id: 11,
    image: '/images/bahiabds.jpeg',
    title: 'MARACUJÁ STRAIN | THC',
    location: '10g',
    price: 'WSC-760,00',
    description: 'Inflorescência - Cultivo Outdoor 60% Sativa - 40% Indica (24% THC).',
    cta: 'PEDIR',
    link: 'https://wa.me/5561995276936'
  },*/
];

const PropertiesGrid = ({ title = 'WS | Nacional', id = 'properties-grid' }) => {
  if (!propertiesData || propertiesData.length === 0) return null;

  return (
    <section className="properties-grid-section" id={id}>
      <h2 className="section-title">{title}</h2>
      <div className="properties-grid-container">
        {propertiesData.map(property => (
          <div className="property-card" key={property.id}>
            <div className="property-image-wrapper">
              <img 
                src={property.image} 
                alt={property.title} 
                className="property-image" 
                loading="lazy"
              />
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