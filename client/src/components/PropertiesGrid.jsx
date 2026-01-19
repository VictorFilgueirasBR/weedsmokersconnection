// client/src/components/PropertiesGrid.jsx
import React from 'react';
import './PropertiesGrid.scss';

// Dados dos imóveis com as imagens fornecidas e informações fictícias
const propertiesData = [
    {
    id: 1,
    image: '/images/cannac.jpg',
    title: 'KETAMA ICE (THC)',
    location: '10g',
    price: 'R$ 1200,00',
    description: 'Fornecedor Nacional de Hash e Extrações tipo ICE legalizado pela ANVISA. CannCalm Delta-8 Bubble Hash – 3150 mg / 10g.',
    cta: 'WSC-E120',
    link: 'https://ws-connectioncommerce.com/produto/wsc-e120/'
  },
    {
        id: 2,
        image: '/images/rosin-flower.png',
        title: 'Rosin Hash (THC)',
        location: '5g',
        price: 'R$ 1180,00',
        description: 'Fornecedor Importado (EUA) de Extrações tipo ICE com THC legalizado pela ANVISA.(Frete incluso).',
        cta: 'WSC-E118',
        link: 'https://ws-connectioncommerce.com/produto/wsc-e118/'
      },
    {
    id: 3,
    image: '/images/hash-ice-import.png',
    title: 'Bubble Hash (D-8)',
    location: '5g',
    price: 'R$ 680,00',
    description: 'Fornecedor Importado (EUA) de Extrações tipo ICE com THC legalizado pela ANVISA. CannCalm Delta-8 Bubble Hash – 3150 mg / 10g.',
    cta: 'WSC-E680',
    link: 'https://ws-connectioncommerce.com/produto/wsc-e680/'
  },
    {
    id: 4,
    image: '/images/hash-legalizado-anvisa.jpg',
    title: 'Hash ICE (THC)',
    location: '5g',
    price: 'R$ 600,00',
    description: 'Fornecedor Nacional de Hash e Extrações tipo ICE legalizado pela ANVISA. (O valor pode variar de acordo com as Epécies).',
    cta: 'Ver mais',
    link: 'https://abecmed.com.br/'
  },
  {
    id: 5,
    image: '/images/beautiful-buds.jpg',
    title: 'Flores HK (THC)',
    location: '10g',
    price: 'R$ 600,00',
    description: 'Fornecedor Nacional de Flores em Natura com THC legalizado pela ANVISA. (O valor pode variar de acordo com as Epécies).',
    cta: 'Ver mais',
    link: 'https://abecmed.com.br/'
  },
  {
    id: 6,
    image: '/images/club-flores.jpeg',
    title: 'Flores Z-Kittlez Pie (THC)',
    location: '5g',
    price: 'R$ 275,00',
    description: 'Fornecedor Nacional de Flores em Natura com THC legalizado pela ANVISA. (O valor pode variar de acordo com as Epécies).',
    cta: 'Ver mais',
    link: 'https://abecmed.com.br/'
  },
  {
    id: 7,
    image: '/images/hash-legalizado-anvisa-capa.jpg',
    title: 'Hash ICE - 24K (THC)',
    location: '5g',
    price: 'R$ 600,00',
    description: 'Fornecedor Nacional de Extrações tipo ICE com THC legalizado pela ANVISA. (O valor pode variar de acordo com as Epécies).',
    cta: 'Ver mais',
    link: 'https://abecmed.com.br/'
  },
  {
    id: 8,
    image: '/images/wsc-vape-thc.webp',
    title: 'Refil THC puro',
    location: '1ml',
    price: 'R$ 500,00',
    description: 'Fornecedor Importado (EU) de Extrações com THC legalizado pela ANVISA. (O valor pode variar de acordo com as Epécies).',
    cta: 'Ver mais',
    link: 'https://wa.me/556195276936'
  },
  {
    id: 9,
    image: '/images/buds-pp-alianca.png',
    title: 'Buds PP (THC)',
    location: '5g',
    price: 'R$ 275,00',
    description: 'Fornecedor Nacional (BR) de Flores com THC com buds pequenos.(Entrega qualidade porém buds pequenos).',
    cta: 'Ver mais',
    link: 'https://www.aliancamedicinal.org/'
  },
  {
    id: 10,
    image: '/images/cherry-pie-nacional.png',
    title: 'Cherry Pie Purple (THC)',
    location: '10g',
    price: 'R$ 750,00',
    description: 'Fornecedor Nacional (BR) de Flores com THC alto nível de concentração.(Esse fornecedor tem mais de 5 Espécies diferentes).',
    cta: 'Ver mais',
    link: 'https://ws-connectioncommerce.com/produto/wsc-f700/'
  },
];

const PropertiesGrid = ({ title = 'Reviews Atualizados', id = 'properties-grid' }) => {
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
              <a href={property.link} target="_blank" rel="noopener noreferrer" className="property-cta submit-gradient-btn">{property.cta}</a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PropertiesGrid;