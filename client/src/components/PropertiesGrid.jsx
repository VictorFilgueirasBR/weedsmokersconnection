// client/src/components/PropertiesGrid.jsx
import React from 'react';
import './PropertiesGrid.scss';

// Dados dos imóveis com as imagens fornecidas e informações atualizadas
const propertiesData = [
  
  {
    id: 1,
    image: '/images/hash-legalizado-anvisa.jpg',
    title: 'Hash ICE | THC',
    location: '5g',
    price: 'WSC-E750',
    description: 'Fornecedor Nacional de Hash e Extrações tipo ICE legalizado pela ANVISA. (O valor pode variar de acordo com as Espécies).',
    cta: 'PEDIR',
    link: 'https://abecmed.com.br/'
  },
  {
    id: 2,
    image: '/images/beautiful-buds.jpg',
    title: 'Flores HK | THC',
    location: '10g',
    price: 'WSC-E222',
    description: 'Fornecedor Nacional de Flores em Natura com THC legalizado pela ANVISA. (O valor pode variar de acordo com as Espécies).',
    cta: 'PEDIR',
    link: 'https://ws-connectioncommerce.com/produto/wsc-flwrncnl1/'
  },
  {
    id: 3,
    image: '/images/club-flores.jpeg',
    title: 'Flores Z-Kittlez Pie THC',
    location: '5g',
    price: 'WSC-E125',
    description: 'Fornecedor Nacional de Flores em Natura com THC legalizado pela ANVISA. (O valor pode variar de acordo com as Espécies).',
    cta: 'PEDIR',
    link: 'https://ws-connectioncommerce.com/produto/wsc-flwrncnl1/'
  },
  {
    id: 4,
    image: '/images/hash-legalizado-anvisa-capa.jpg',
    title: 'Hash ICE 24K | THC',
    location: '5g',
    price: 'WSC-F880',
    description: 'Fornecedor Nacional de Extrações tipo ICE com THC legalizado pela ANVISA. (O valor pode variar de acordo com as Espécies).',
    cta: 'PEDIR',
    link: 'https://abecmed.com.br/'
  },
  {
    id: 5,
    image: '/images/buds-pp-alianca.png',
    title: 'Buds PP | THC',
    location: '5g',
    price: 'WSC-P275',
    description: 'Fornecedor Nacional (BR) de Flores com THC com buds pequenos.(Entrega qualidade porém buds pequenos).',
    cta: 'PEDIR',
    link: 'https://ws-connectioncommerce.com/produto/wsc-flwrncnl1/'
  },
  {
    id: 6,
    image: '/images/cherry-pie-nacional.png',
    title: 'Cherry Pie Purple | THC',
    location: '10g',
    price: 'WSC-f265',
    description: 'Fornecedor Nacional (BR) de Flores com THC alto nível de concentração.(Esse fornecedor tem mais de 5 Espécies diferentes).',
    cta: 'SOLD OUT',
    link: 'https://wa.me/5561995276936'
  },
  {
    id: 7,
    image: '/images/wsc-flower-24k.png',
    title: '24K Gold | THC',
    location: '10g',
    price: 'WSC-C750',
    description: 'Fornecedor Nacional (BR) de Flores com THC alto nível de concentração.(Esse fornecedor tem mais de 5 Espécies diferentes).',
    cta: 'PEDIR',
    link: 'https://ws-connectioncommerce.com/produto/wsc-flwrncnl1/'
  },
  {
    id: 8,
    image: '/images/wsc-flower-kk.png',
    title: 'Cherry Pie Homie | THC',
    location: '10g',
    price: 'WSC-C750',
    description: 'Fornecedor Nacional (BR) de Flores com THC alto nível de concentração.(Esse fornecedor tem mais de 5 Espécies diferentes).',
    cta: 'PEDIR',
    link: 'https://ws-connectioncommerce.com/produto/wsc-flwrncnl1/'
  }
];

const PropertiesGrid = ({ title = 'WSC Nacional', id = 'properties-grid' }) => {
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