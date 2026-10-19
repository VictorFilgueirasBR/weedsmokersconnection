// client/src/components/PropertiesUtils.jsx
import React from 'react';
import './PropertiesUtils.scss';

// Dados focados em Serviços, Consultas e Fretes
const propertiesUtilsData = [
  {
    id: 1,
    image: '/images/ws-life.png',
    title: 'WSC Consulta | ANVISA',
    location: 'R$ 400,00',
    price: '• COMPLETE',
    description: (
  <>
    Renovação 6 meses para pacientes:
    <br />
    Consulta médica + emissão de documentação pela ANVISA
  </>
),
    cta: 'Contratar',
    link: 'https://wa.me/5561995276936'
  },
  {
    id: 2,
    image: '/images/ws-life.png',
    title: 'WSC | Frete Nacional',
    location: 'R$ 45,00',
    price: '• JET-BR',
   description: (
  <>
    Logística de transporte nacional.
    <br />
    Fornecedor - Centro de Distribuição - Seu endereço
  </>
),
    cta: 'Contratar',
    link: 'https://wa.me/5561995276936'
  },
  {
    id: 3,
    image: '/images/ws-life.png',
    title: 'WSC | Frete Import',
    location: 'R$ 175,00',
    price: '• JET-USA',
    description: (
    <>
      Logística de importação facilitada.
      <br />
      Califórnia - Miami - Brasil
    </>
  ),
    cta: 'Contratar',
    link: 'https://wa.me/5561995276936'
  },
  {
    id: 4,
    image: '/images/ws-life.png',
    title: 'WSC | Import 50k',
    location: 'R$ 50.000,00',
    price: '• 50k',
    description: (
  <>
    Logística de importação facilitada 700G.
    <br />
    Califórnia - Miami - Brasil
  </>
),
    cta: 'Contratar',
    link: 'https://wa.me/5561995276936'
  },
  {
    id: 5,
    image: '/images/ws-life.png',
    title: 'WSC | Import 10k',
    location: 'R$ 10.000,00',
    price: '• 10k',
    description: (
  <>
    Logística de importação facilitada 120G.
    <br />
    Califórnia - Miami - Brasil
  </>
),
    cta: 'Contratar',
    link: 'https://wa.me/5561995276936'
  },
  {
    id: 6,
    image: '/images/ws-life.png',
    title: 'WSC | HC de Cultivo',
    location: 'R$ 35.000,00',
    price: '• 35k',
    description: (
  <>
    Processo Completo
    <br />
    Jurídico - Médico - Agrônomo
  </>
),
    cta: 'Contratar',
    link: 'https://wa.me/5561995276936'
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
                className="property-image active" 
                loading="lazy" 
              />
              <span className="property-price">{item.price}</span>
            </div>
            
            <div className="property-info">
              <h3 className="property-title">{item.title}</h3>
              
              <div className="property-meta-row">
                <span className="property-location">{item.location}</span>
              </div>
              
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