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
    price: 'R$ 350,00', 
    description: 'Fornecedor Nacional de Hash e EXtrações tipo ICE legalizado pela ANVISA.', 
    cta: 'Contato' 
  },
  { 
    id: 2, 
    image: '/images/beautiful-buds.jpg', 
    title: 'Flores HK (THC)', 
    location: '5g', 
    price: 'R$ 195,00', 
    description: 'Fornecedor Nacional de Flores em Natura com THC legalizado pela ANVISA.', 
    cta: 'Ver Detalhes' 
  },
  { 
    id: 3, 
    image: '/images/club-flores.jpeg', 
    title: 'Flores Z-Kittlez Pie (THC)', 
    location: '5g', 
    price: 'R$ 220,00', 
    description: 'Fornecedor Nacional de Flores em Natura com THC legalizado pela ANVISA.', 
    cta: 'Contato' 
  },
  { 
    id: 4, 
    image: '/images/hash-legalizado-anvisa-capa.jpg', 
    title: 'Hash ICE - 24K (THC)', 
    location: '10g', 
    price: 'R$ 600,00', 
    description: 'Fornecedor Importado (EU) de Extrações tipo ICE com THC legalizado pela ANVISA.', 
    cta: 'Contato' 
  },
  { 
    id: 5, 
    image: '/images/wsc-vape-thc.webp', 
    title: 'Refil THC puro', 
    location: 'Unidade.', 
    price: 'R$ 220,00', 
    description: 'Fornecedor Importado (EU) de Extrações com THC legalizado pela ANVISA.', 
    cta: 'Contato' 
  },
  { 
    id: 6, 
    image: '/images/hash-ice-import.png', 
    title: 'ICE Bubble Hash (THC)', 
    location: '10g', 
    price: 'R$ 650,00', 
    description: 'Fornecedor Importado (EU) de Extrações tipo ICE com THC legalizado pela ANVISA.', 
    cta: 'Contato' 
  },
  
];

const PropertiesGrid = ({ title = 'Fornecedores Legalmente Autorizados pela ANVISA', id = 'properties-grid' }) => {
  return (
    <section className="properties-grid-section" id={id}>
      <h2 className="section-title">{title}</h2>
      <div className="properties-grid-container">
        {propertiesData.map(property => (
          <div className="property-card" key={property.id}>
            <div className="property-image-wrapper">
              <img src={property.image} alt={property.title} className="property-image" />
              <span className="property-price">{property.price}</span>
            </div>
            <div className="property-info">
              <h3 className="property-title">{property.title}</h3>
              <p className="property-location">{property.location}</p>
              <p className="property-description">{property.description}</p>
              <button className="property-cta submit-gradient-btn">{property.cta}</button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PropertiesGrid;
