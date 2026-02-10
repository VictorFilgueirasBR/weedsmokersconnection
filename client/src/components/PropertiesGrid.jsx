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
    price: 'WSC-E120',
    description: 'Fornecedor Importado (EUA) de Extrações tipo ICE legalizado pela ANVISA. CannCalm Delta-8 Bubble Hash – 3150 mg / 10g.',
    cta: 'Saiba mais',
    link: 'https://ws-connectioncommerce.com/produto/wsc-e120/'
  },
    {
        id: 2,
        image: '/images/rosin-flower.png',
        title: 'Rosin Hash (THC)',
        location: '10g',
        price: 'WSC-E118',
        description: 'Fornecedor Importado (EUA) de Extrações tipo ICE com THC legalizado pela ANVISA.(Frete incluso).',
        cta: 'Saiba mais',
        link: 'https://ws-connectioncommerce.com/produto/wsc-e118/'
      },
    {
    id: 3,
    image: '/images/hash-ice-import.png',
    title: 'Bubble Hash (D-8)',
    location: '5g',
    price: 'WSC-E680',
    description: 'Fornecedor Importado (EUA) de Extrações tipo ICE com THC legalizado pela ANVISA. CannCalm Delta-8 Bubble Hash – 3150 mg / 10g.',
    cta: 'Saiba mais',
    link: 'https://ws-connectioncommerce.com/produto/wsc-e680/'
  },
    {
    id: 4,
    image: '/images/hash-legalizado-anvisa.jpg',
    title: 'Hash ICE (THC)',
    location: '5g',
    price: 'WSC-E750',
    description: 'Fornecedor Nacional de Hash e Extrações tipo ICE legalizado pela ANVISA. (O valor pode variar de acordo com as Epécies).',
    cta: 'Saiba mais',
    link: 'https://wa.me/556195276936'
  },
  {
    id: 5,
    image: '/images/beautiful-buds.jpg',
    title: 'Flores HK (THC)',
    location: '10g',
    price: 'WSC-E222',
    description: 'Fornecedor Nacional de Flores em Natura com THC legalizado pela ANVISA. (O valor pode variar de acordo com as Epécies).',
    cta: 'Saiba mais',
    link: 'https://wa.me/556195276936'
  },
  {
    id: 6,
    image: '/images/club-flores.jpeg',
    title: 'Flores Z-Kittlez Pie (THC)',
    location: '5g',
    price: 'WSC-E125',
    description: 'Fornecedor Nacional de Flores em Natura com THC legalizado pela ANVISA. (O valor pode variar de acordo com as Epécies).',
    cta: 'Saiba mais',
    link: 'https://wa.me/556195276936'
  },
  {
    id: 7,
    image: '/images/hash-legalizado-anvisa-capa.jpg',
    title: 'Hash ICE - 24K (THC)',
    location: '5g',
    price: 'WSC-F880',
    description: 'Fornecedor Nacional de Extrações tipo ICE com THC legalizado pela ANVISA. (O valor pode variar de acordo com as Epécies).',
    cta: 'Saiba mais',
    link: 'https://wa.me/556195276936'
  },
  {
    id: 8,
    image: '/images/wsc-vape-thc.webp',
    title: 'Refil THC puro',
    location: '1ml',
    price: 'WSC-W521',
    description: 'Fornecedor Importado (EU) de Extrações com THC legalizado pela ANVISA. (O valor pode variar de acordo com as Epécies).',
    cta: 'Saiba mais',
    link: 'https://wa.me/556195276936'
  },
  {
    id: 9,
    image: '/images/buds-pp-alianca.png',
    title: 'Buds PP (THC)',
    location: '5g',
    price: 'WSC-P275',
    description: 'Fornecedor Nacional (BR) de Flores com THC com buds pequenos.(Entrega qualidade porém buds pequenos).',
    cta: 'Saiba mais',
    link: 'https://wa.me/556195276936'
  },
  {
    id: 10,
    image: '/images/cherry-pie-nacional.png',
    title: 'Cherry Pie Purple (THC)',
    location: '10g',
    price: 'Esgotada',
    description: 'Fornecedor Nacional (BR) de Flores com THC alto nível de concentração.(Esse fornecedor tem mais de 5 Espécies diferentes).',
    cta: 'Saiba mais',
    link: 'https://ws-connectioncommerce.com/produto/wsc-f700/'
  },
    {
        id: 11,
        image: '/images/wsc-flower-24k.png',
        title: '24K | Gold (THC)',
        location: '10g',
        price: 'WSC-C750',
        description: 'Fornecedor Nacional (BR) de Flores com THC alto nível de concentração.(Esse fornecedor tem mais de 5 Espécies diferentes).',
        cta: 'Saiba mais',
        link: 'https://ws-connectioncommerce.com/produto/wsc-f700/'
      },
    {
        id: 12,
        image: '/images/wsc-flower-kk.png',
        title: 'Cherry Pie Homie (THC)',
        location: '10g',
        price: 'WSC-C750',
        description: 'Fornecedor Nacional (BR) de Flores com THC alto nível de concentração.(Esse fornecedor tem mais de 5 Espécies diferentes).',
        cta: 'Saiba mais',
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