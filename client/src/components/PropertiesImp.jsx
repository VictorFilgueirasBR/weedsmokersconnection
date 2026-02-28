// client/src/components/PropertiesImp.jsx
import React from 'react';
import './PropertiesImp.scss';

const propertiesImpData = [
  { id: 1, image: '/images/wsc-import-1.png', title: 'Piatella', location: '1g / 3g', price: '78,09% CANAB.', description: 'Um concentrado sem solvente elaborado através de um meticuloso processo de cura a frio.', cta: 'Saiba mais', link: 'https://wa.me/5561995276936' },
  { id: 2, image: '/images/wsc-import-2.png', title: '00', location: '1g / 3g', price: '70,77% CANAB.', description: 'Concentrado da primeira e mais fina peneiração a seco.', cta: 'Saiba mais', link: 'https://wa.me/5561995276936' },
  { id: 3, image: '/images/wsc-import-3.png', title: 'Gold Seal', location: '1g / 3g', price: '70,11% CANAB.', description: 'Concentrado artesanal que celebra os métodos afegãos de resinas prensadas à mão.', cta: 'Saiba mais', link: 'https://wa.me/5561995276936' },
  { id: 4, image: '/images/wsc-import-4.png', title: 'THCA Sugar', location: '1g / 3g', price: '80,08% CANAB.', description: 'Concentrado premium de cera cristalizada com alto teor de THCA.', cta: 'Saiba mais', link: 'https://wa.me/5561995276936' },
  { id: 5, image: '/images/wsc-import-5.png', title: 'Ketama Gold', location: '1g / 3g', price: '70,64% CANAB.', description: 'Textura suave e cremosa com tons dourados, processo de altíssima qualidade.', cta: 'Saiba mais', link: 'https://wa.me/5561995276936' },
  { id: 6, image: '/images/wsc-import-6.png', title: 'La mousse', location: '1g / 3g', price: '53,09% CANAB.', description: 'Combina técnicas tradicionais de peneiramento seco, conhecido pela textura rica.', cta: 'Saiba mais', link: 'https://wa.me/5561995276936' },
  { id: 7, image: '/images/wsc-import-7.png', title: 'Temple Ball', location: '1g / 3g', price: '75,92% CANAB.', description: 'Resultado da lendária tradição nepalesa esfregada à mão.', cta: 'Saiba mais', link: 'https://wa.me/5561995276936' },
  { id: 8, image: '/images/wsc-import-8.png', title: 'Static Sift', location: '1g / 3g', price: '79,01% CANAB.', description: 'Resina refinada criada por meio de separação estática moderna.', cta: 'Saiba mais', link: 'https://wa.me/5561995276936' },
  { id: 9, image: '/images/wsc-import-9.png', title: 'THCA Budder', location: '1g / 3g', price: '94,1% CANAB.', description: 'Consistência cremosa e efeitos potentes, equilíbrio entre edificante e relaxante.', cta: 'Saiba mais', link: 'https://wa.me/5561995276936' },
  { id: 10, image: '/images/wsc-import-10.png', title: 'THCA Rosin', location: '1g / 3g', price: '61,28% CANAB.', description: 'Extrato obtido sem solventes através de calor e pressão. Resina translúcida.', cta: 'Saiba mais', link: 'https://wa.me/5561995276936' },
  { id: 11, image: '/images/wsc-import-11.png', title: 'Diamond Sauce Papaya THCa', location: '10g', price: 'CONSULTE', description: 'THCa Diamantes formados a partir de extração a frio. Genética Papaya (Indica).', cta: 'Saiba mais', link: 'https://wa.me/5561995276936' },
  { id: 12, image: '/images/wsc-import-11.png', title: 'Diamond Sauce OG Kush THCa', location: '10g', price: 'CONSULTE', description: 'THCa Cristais puros com mistura de terpenos. Genética OG Kush (Híbrida).', cta: 'Saiba mais', link: 'https://wa.me/5561995276936' },
  { id: 13, image: '/images/wsc-import-11.png', title: 'Diamond Sauce Diesel THCa', location: '10g', price: 'CONSULTE', description: 'O THC-A se transforma em THC quando aquecido. Genética Sour Diesel (Sativa).', cta: 'Saiba mais', link: 'https://wa.me/5561995276936' },
  { id: 14, image: '/images/wsc-import-12.png', title: 'Diamond CBD Zkittlez', location: '2g/10g', price: 'CONSULTE', description: 'Extração a frio. Genética Zkittlez (Sativa): Criatividade e foco.', cta: 'Saiba mais', link: 'https://wa.me/5561995276936' },
  { id: 15, image: '/images/wsc-import-12.png', title: 'Diamond CBD Berry White', location: '2g/10g', price: 'CONSULTE', description: 'Genética Berry White (Indica): Relaxamento e sono profundo.', cta: 'Saiba mais', link: 'https://wa.me/5561995276936' },
  { id: 16, image: '/images/wsc-import-12.png', title: 'Diamond CBD Kush Mints', location: '2g/10g', price: 'CONSULTE', description: 'Genética Kush Mints (Híbrida): Relaxamento e alívio.', cta: 'Saiba mais', link: 'https://wa.me/5561995276936' },
  { id: 17, image: '/images/wsc-import-13.png', title: 'Diamond D8 Gelato', location: '2g/10g', price: 'CONSULTE', description: 'Delta-8 oferece efeitos mais suaves que o Delta-9. Genética Gelato.', cta: 'Saiba mais', link: 'https://wa.me/5561995276936' },
  { id: 18, image: '/images/wsc-import-13.png', title: 'Diamond D8 Grape Ape', location: '2g/10g', price: 'CONSULTE', description: 'Genética Grape Ape (Indica): Relaxamento e sono. Terpenos naturais.', cta: 'Saiba mais', link: 'https://wa.me/5561995276936' },
  { id: 19, image: '/images/wsc-import-13.png', title: 'Diamond D8 Durban Poison', location: '2g/10g', price: 'CONSULTE', description: 'Genética Durban Poison (Sativa): Energia e foco.', cta: 'Saiba mais', link: 'https://wa.me/5561995276936' },
  { id: 20, image: '/images/wsc-import-14.png', title: 'Live Rosin Blue Dream', location: '10g', price: 'CONSULTE', description: 'Rosin Vivo feito com flores frescas congeladas (Fresh Frozen).', cta: 'Saiba mais', link: 'https://wa.me/5561995276936' },
  { id: 21, image: '/images/wsc-import-14.png', title: 'Live Rosin Watermelon', location: '10g', price: 'CONSULTE', description: 'Extração ICE do material fresco, prensado até consistência ideal.', cta: 'Saiba mais', link: 'https://wa.me/5561995276936' },
  { id: 22, image: '/images/wsc-import-14.png', title: 'Live Rosin Maui Wowie', location: '10g', price: 'CONSULTE', description: 'Genética Maui Wowie (Sativa): Euforia e ânimo premium.', cta: 'Saiba mais', link: 'https://wa.me/5561995276936' },
  { id: 23, image: '/images/wsc-import-15.png', title: 'Bubble Hash Blackberry', location: '10g', price: 'CONSULTE', description: 'Feito com água gelada para separar os tricomas. Relaxamento.', cta: 'Saiba mais', link: 'https://wa.me/5561995276936' },
  { id: 24, image: '/images/wsc-import-15.png', title: 'Bubble Hash Chocolope', location: '10g', price: 'CONSULTE', description: 'Alto teor de canabinoides. Genética Chocolope (Sativa): Euforia.', cta: 'Saiba mais', link: 'https://wa.me/5561995276936' },
  { id: 25, image: '/images/wsc-import-15.png', title: 'Bubble Hash Wedding Cake', location: '10g', price: 'CONSULTE', description: 'Genética Wedding Cake (Híbrida): Relaxamento e equilíbrio.', cta: 'Saiba mais', link: 'https://wa.me/5561995276936' },
  { id: 26, image: '/images/wsc-import-16.png', title: 'Vegan Gummies Sleep', location: '113g', price: '60mg/GUMMY', description: 'Gomas veganas sabor Mix de Frutas. CBN para auxílio no sono.', cta: 'Saiba mais', link: 'https://wa.me/5561995276936' },
  { id: 27, image: '/images/wsc-import-17.png', title: 'CBN Tincture Sleep', location: '30ml', price: '200mg/ml', description: 'Óleo de CBN de alta concentração com CBD. Diluição em MCT.', cta: 'Saiba mais', link: 'https://wa.me/5561995276936' }
];

const PropertiesImp = ({ title = 'WSC Importados', id = 'properties-imp' }) => {
  if (!propertiesImpData || propertiesImpData.length === 0) return null;

  return (
    <section className="properties-imp-section" id={id}>
      <div className="section-header">
        <h2 className="section-title">{title}</h2>
      </div>
      <div className="properties-imp-container">
        {propertiesImpData.map((item) => (
          <div className="property-card" key={item.id}>
            <div className="property-image-wrapper">
              <img src={item.image} alt={item.title} className="property-image" loading="lazy" />
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

export default PropertiesImp;