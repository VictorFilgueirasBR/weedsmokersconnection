// client/src/components/PropertiesGrid.jsx
import React from 'react';
import './PropertiesGrid.scss';

// Dados dos imóveis com as imagens fornecidas e informações atualizadas
const propertiesData = [
  {
    id: 152,
    images: ['/images/oilncnl.jpg'],
    title: 'Hemp Oil CBD Full Spectrum 3000mg',
    location: '30ml',
    deliveryTime: '15-35 dias úteis',
    price: 'WSC-620,00', // R$ 500,00 + 120,00
    description: 'Sem os efeitos psicoativos do THC. Promove alívio para ansiedade, dor, inflamação e melhora do sono. Óleo Medicinal de CBD Full Spectrum, 3000mg em frasco de 30ml.',
    cta: 'IMPORT',
    link: 'https://ws-connectioncommerce.com/produto/wsc-oilncnl1/'
},
{
    id: 153,
    images: ['/images/oilncnl.jpg'],
    title: 'Hemp Oil CBD Full Spectrum 6000mg',
    location: '30ml',
    deliveryTime: '15-35 dias úteis',
    price: 'WSC-920,00', // R$ 800,00 + 120,00
    description: 'Sem os efeitos psicoativos do THC. Promove alívio para ansiedade, dor, inflamação e melhora do sono. Óleo Medicinal de CBD Full Spectrum, 6000mg em frasco de 30ml.',
    cta: 'IMPORT',
    link: 'https://ws-connectioncommerce.com/produto/wsc-oilncnl2/'
},
{
    id: 154,
    images: ['/images/oilncnl.jpg'],
    title: 'Hemp Oil THC Full Spectrum 600mg',
    location: '30ml',
    deliveryTime: '15-35 dias úteis',
    price: 'WSC-420,00', // R$ 300,00 + 120,00
    description: 'Indicado para aqueles interessados em uma abordagem canabinóide mais completa. Óleo Medicinal de THC Full Spectrum, 600mg em frasco de 30ml.',
    cta: 'IMPORT',
    link: 'https://ws-connectioncommerce.com/produto/wsc-oilncnl3/'
},
{
    id: 155,
    images: ['/images/oilncnl.jpg'],
    title: 'Hemp Oil THC Full Spectrum 1200mg',
    location: '30ml',
    deliveryTime: '15-35 dias úteis',
    price: 'WSC-520,00', // R$ 400,00 + 120,00
    description: 'Indicado para aqueles interessados em uma abordagem canabinóide mais completa. Óleo Medicinal de THC Full Spectrum, 1200mg em frasco de 30ml.',
    cta: 'IMPORT',
    link: 'https://ws-connectioncommerce.com/produto/wsc-oilncnl4/'
},
{
    id: 156,
    images: ['/images/oilncnl.jpg'],
    title: 'Hemp Oil Medicinal Equilibrado CBD + THC 1800mg',
    location: '30ml',
    deliveryTime: '15-35 dias úteis',
    price: 'WSC-520,00', // R$ 400,00 + 120,00
    description: 'Ideal para tratamentos complexos onde a sinergia entre CBD e THC é desejada. Formulação contendo 30mg/ml de CBD e 30mg/ml de THC, totalizando 1800mg em frasco de 30ml.',
    cta: 'IMPORT',
    link: 'https://ws-connectioncommerce.com/produto/wsc-oilncnl5/'
},
{
    id: 157,
    images: ['/images/oilncnl.jpg'],
    title: 'Hemp Oil Medicinal Equilibrado CBD + THC 3600mg',
    location: '30ml',
    deliveryTime: '15-35 dias úteis',
    price: 'WSC-620,00', // R$ 500,00 + 120,00
    description: 'Ideal para tratamentos complexos onde a sinergia entre CBD e THC é desejada. Formulação de alta concentração contendo 80mg/ml de CBD e 40mg/ml de THC, totalizando 3600mg em frasco de 30ml.',
    cta: 'IMPORT',
    link: 'https://ws-connectioncommerce.com/produto/wsc-oilncnl6/'
},
  {
    id: 1,
    image: '/images/hash-legalizado-anvisa.jpg',
    title: 'Hash Fullspectrum 90u ',
    location: '5g',
    price: 'WSC-SOLDOUT',
    description: 'Fullspectrum Hash tipo ICE THC HANDMADE. (Malha de 90 micras).',
    cta: 'INDISPONÍVEL',
    link: 'https://wa.me/5561995276936'
  },
  {
    id: 2,
    image: '/images/beautiful-buds.jpg',
    title: 'Flores HK | THC',
    location: '10g',
    price: 'WSC-SOLDOUT',
    description: 'Inflorescência - Cultivo Outdoor 60% Indica - 40% Indica (24% THC).',
    cta: 'INDISPONÍVEL',
    link: 'https://wa.me/5561995276936'
  },
  {
    id: 3,
    image: '/images/club-flores.jpeg',
    title: 'Flores Z-Kittlez Pie THC',
    location: '10g',
    price: 'WSC-SOLDOUT',
    description: 'Inflorescência - Cultivo Outdoor 60% Indica - 40% Indica (23% THC).',
    cta: 'INDISPONÍVEL',
    link: 'https://wa.me/5561995276936'
  },
  {
    id: 4,
    image: '/images/hash-legalizado-anvisa-capa.jpg',
    title: 'Hash Full spectrum 45u ',
    location: '5g',
    price: 'WSC-SOLDOUT',
    description: 'Fullspectrum Hash tipo ICE THC HANDMADE. (Malha de 25 micras).',
    cta: 'INDISPONÍVEL',
    link: 'https://wa.me/5561995276936'
  },
  {
    id: 5,
    image: '/images/buds-pp-alianca.png',
    title: 'Buds PP | THC',
    location: '10g',
    price: 'WSC-SOLDOUT',
    description: 'Fornecedor Nacional de Flores com THC com buds pequenos. (Entrega qualidade porém buds pequenos).',
    cta: 'INDISPONÍVEL',
    link: 'https://wa.me/5561995276936'
  },
  {
    id: 6,
    image: '/images/cherry-pie-nacional.png',
    title: 'Cherry Pie Purple | THC',
    location: '10g',
    price: 'WSC-SOLDOUT',
    description: 'Inflorescência - Cultivo Indoor 63% Sativa - 37% Indica (24% THC).',
    cta: 'INDISPONÍVEL',
    link: 'https://wa.me/5561995276936'
  },
  {
    id: 7,
    image: '/images/wsc-flower-24k.png',
    title: '24K Gold | THC',
    location: '10g',
    price: 'WSC-SOLDOUT',
    description: 'Inflorescência - Cultivo Outdoor 60% Sativa - 40% Indica (24% THC).',
    cta: 'INDISPONÍVEL',
    link: 'https://wa.me/5561995276936'
  },
  {
    id: 8,
    image: '/images/wsc-flower-kk.png',
    title: 'Cherry Pie Homie | THC',
    location: '10g',
    price: 'WSC-SOLDOUT',
    description: 'Inflorescência - Cultivo Outdoor 34% Sativa - 66% Indica (24% THC).',
    cta: 'INDISPONÍVEL',
    link: 'https://wa.me/5561995276936'
  },
  {
    id: 9,
    image: '/images/wsc-nacional-12.png',
    title: 'Hash FullSpectrum 45u ',
    location: '5g',
    price: 'WSC-989,90',
    description: 'Fullspectrum ICEOLATOR THC HANDMADE. (Malha de 45 micras).',
    cta: 'PEDIR',
    link: 'https://ws-connectioncommerce.com/produto/wsc-ncnl45u/'
  }
];

const PropertiesGrid = ({ title = 'WS | Nacional', id = 'properties-grid' }) => {
  if (!propertiesData || propertiesData.length === 0) return null;

  return (
    <section className="properties-grid-section" id={id}>
      <div className="section-header">
        <h2 className="section-title">{title}</h2>
      </div>
      <div className="properties-grid-container">
        {propertiesData.map(property => {
          const isUnavailable = property.cta === 'INDISPONÍVEL' || property.cta === 'SOLD OUT';
          
          return (
            <div className="property-card" key={property.id}>
              <div className="property-image-wrapper">
                <img 
                  src={property.image} 
                  alt={property.title} 
                  className="property-image active" 
                  loading="lazy"
                />
                <span className="property-price">{property.price}</span>
              </div>
              
              <div className="property-info">
                <h3 className="property-title">{property.title}</h3>
                
                <div className="property-meta-row">
                  <span className="property-location">{property.location}</span>
                </div>
                
                <p className="property-description">{property.description}</p>
                
                <a 
                  href={property.link} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className={`property-cta ${isUnavailable ? 'sold-out' : ''}`}
                >
                  {property.cta}
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default PropertiesGrid;