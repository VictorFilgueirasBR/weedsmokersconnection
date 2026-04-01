// client/src/components/PropertiesUtils.jsx
import React from 'react';
import './PropertiesUtils.scss';

// Dados focados em Serviços, Consultas e Fretes
const propertiesUtilsData = [
  {
    id: 1,
    image: '/images/pac-wsc-complete.png',
    title: 'WSC Consulta | ANVISA',
    location: 'R$ 400,00',
    price: 'WSC-COMPLETE',
    description: 'Serviço de suporte e agenciamento para consulta médica + emissão de documentação pela ANVISA para importação legal.',
    cta: 'Contratar',
    link: 'https://ws-connectioncommerce.com/produto/702/'
  },
  {
    id: 2,
    image: '/images/jet-fly-br.png',
    title: 'WSC | Frete Nacional',
    location: 'R$ 45,00',
    price: 'WSC-JET-BR',
    description: 'Logística de transporte para produtos nacionais. Trecho: Fornecedor - Centro de Distribuição - Seu endereço.',
    cta: 'Contratar',
    link: 'https://ws-connectioncommerce.com/produto/wsc-jet-br/'
  },
  {
    id: 3,
    image: '/images/jet-fly-import.png',
    title: 'WSC | Frete Import',
    location: 'R$ 175,00',
    price: 'WSC-JET-USA',
    description: 'Logística de importação internacional facilitada. Trecho: Califórnia - Miami - Brasil - Seu endereço.',
    cta: 'Contratar',
    link: 'https://ws-connectioncommerce.com/produto/wsc-frete-import/'
  },
  {
    id: 4,
    image: '/images/wsc-bomb.png',
    title: 'WSC | Import 5k',
    location: 'R$ 5.000,00',
    price: 'WSC-5k',
    description: 'Logística de importação internacional facilitada. Trecho: Califórnia - Miami - Brasil - Seu endereço.',
    cta: 'Contratar',
    link: 'https://ws-connectioncommerce.com/produto/wsc-support-b2c/'
  },
  {
    id: 5,
    image: '/images/wsc-bomb.png',
    title: 'WSC | Import 10k',
    location: 'R$ 10.000,00',
    price: 'WSC-10k',
    description: 'Logística de importação internacional facilitada. Trecho: Califórnia - Miami - Brasil - Seu endereço.',
    cta: 'Contratar',
    link: 'https://ws-connectioncommerce.com/produto/wsc-support-b2c/'
  },
  ,
  {
    id: 6,
    image: '/images/wsc-bomb.png',
    title: 'WSC | Import 20k',
    location: 'R$ 20.000,00',
    price: 'WSC-20k',
    description: 'Logística de importação internacional facilitada. Trecho: Califórnia - Miami - Brasil - Seu endereço.',
    cta: 'Contratar',
    link: 'https://ws-connectioncommerce.com/produto/wsc-support-20k/'
  }
];

const PropertiesUtils = ({ title = 'WS | Services', id = 'properties-utils' }) => {
  if (!propertiesUtilsData || propertiesUtilsData.length === 0) return null;

  return (
    <section className="properties-utils-section" id={id}>
      <div className="section-header">
        <h2 className="section-title">{title}</h2>
      </div>
      <div className="properties-utils-container">
        {propertiesUtilsData.map((item) => (
          <div className="property-card" key={item.id}>
            <div className="property-image-wrapper">
              <img 
                src={item.image} 
                alt={item.title} 
                className="property-image" 
                loading="lazy" 
              />
              <span className="property-price">{item.price}</span>
            </div>
            <div className="property-info">
              <h3 className="property-title">{item.title}</h3>
              <p className="property-location">{item.location}</p>
              <p className="property-description">{item.description}</p>
              <a 
                href={item.link} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="property-cta"
              >
                {item.cta}
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PropertiesUtils;