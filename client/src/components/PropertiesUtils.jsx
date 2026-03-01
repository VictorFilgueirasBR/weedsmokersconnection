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
    cta: 'Saiba mais',
    link: 'https://ws-connectioncommerce.com/produto/702/'
  },
  {
    id: 2,
    image: '/images/jet-fly-br.png',
    title: 'WSC | Frete Nacional',
    location: 'R$ 45,00',
    price: 'WSC-JET-BR',
    description: 'Logística de transporte para produtos nacionais. Trecho: Fornecedor - Centro de Distribuição - Seu endereço.',
    cta: 'Saiba mais',
    link: 'https://ws-connectioncommerce.com/produto/wsc-jet-br/'
  },
  {
    id: 3,
    image: '/images/jet-fly-import.png',
    title: 'WSC | Frete Import',
    location: 'R$ 170,00',
    price: 'WSC-JET-USA',
    description: 'Logística de importação internacional facilitada. Trecho: Califórnia - Miami - Brasil - Seu endereço.',
    cta: 'Saiba mais',
    link: 'https://ws-connectioncommerce.com/produto/wsc-frete-import/'
  }
];

const PropertiesUtils = ({ title = 'Serviços & Logística', id = 'properties-utils' }) => {
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