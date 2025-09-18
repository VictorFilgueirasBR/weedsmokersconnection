// client/src/components/PropertiesGrid.jsx
import React from 'react';
import './PropertiesGrid.scss';

// Dados dos imóveis com as imagens fornecidas e informações fictícias
const propertiesData = [
  { 
    id: 1, 
    image: '/images/hash-legalizado-anvisa.jpg', 
    title: 'Hash ICE', 
    location: '10g apartir de', 
    price: 'R$ 450,00', 
    description: 'Fornecedor Nacional de Hash e EXtrações tipo ICE legalizado pela ANVISA', 
    cta: 'Contato' 
  },
  { 
    id: 2, 
    image: '/images/beautiful-buds.jpg', 
    title: 'Apartamento Luxuoso', 
    location: 'Centro, Metrópole', 
    price: 'R$ 1.500.000', 
    description: 'Cobertura com vista panorâmica e área de lazer completa.', 
    cta: 'Ver Detalhes' 
  },
  { 
    id: 3, 
    image: '/images/enhanced_3.png', 
    title: 'Casa de Campo Serene', 
    location: 'Zona Rural, Interior', 
    price: 'R$ 3.200.000', 
    description: 'Ampla propriedade com jardim exuberante e piscina privativa.', 
    cta: 'Ver Detalhes' 
  },
  { 
    id: 4, 
    image: '/images/enhanced_4.png', 
    title: 'Loft Urbano Minimalista', 
    location: 'Área Central, Bairro Moderno', 
    price: 'R$ 950.000', 
    description: 'Espaço compacto e inteligente, ideal para a vida moderna.', 
    cta: 'Ver Detalhes' 
  },
  { 
    id: 5, 
    image: '/images/enhanced_5.png', 
    title: 'Vila Costeira Charmosa', 
    location: 'Praia do Sol, Litoral', 
    price: 'R$ 4.500.000', 
    description: 'Propriedade à beira-mar com acesso exclusivo e arquitetura rústica chic.', 
    cta: 'Ver Detalhes' 
  },
  { 
    id: 6, 
    image: '/images/enhanced_6.png', 
    title: 'Penthouse Exclusiva', 
    location: 'Área Nobre, Grande Cidade', 
    price: 'R$ 6.800.000', 
    description: 'Design de interiores premiado, vistas espetaculares e total privacidade.', 
    cta: 'Ver Detalhes' 
  },
  
];

const PropertiesGrid = ({ title = 'Performance Digital Premium Otimizada por IA', id = 'properties-grid' }) => {
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
