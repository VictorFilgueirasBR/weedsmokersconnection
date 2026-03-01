// client/src/components/PropertiesImp.jsx
import React from 'react';
import './PropertiesImp.scss';

const propertiesImpData = [

  {
    id: 1,
    image: '/images/cannac.jpg',
    title: 'KETAMA ICE - D8',
    location: '10g',
    price: 'WSC-E120',
    description: 'Fornecedor Importado (EUA) de Extrações tipo ICE legalizado pela ANVISA. CannCalm Delta-8 Bubble Hash – 3150 mg / 10g.',
    cta: 'SOLD OUT',
    link: 'https://wa.me/5561995276936'
  },
  {
    id: 2,
    image: '/images/rosin-flower.png',
    title: 'Hemp Oil - Gold Budder - THCa',
    location: '10g',
    price: 'WSC-E118',
    description: 'Fornecedor Importado (EUA) de Extrações tipo HEMP OIL com THC/THCa legalizado pela ANVISA. Extração Premium com textura budder e coloração dourada intensa - OG KUSH. SENSAÇÃO PROFUNDA DE RELAXAMENTO CORPORAL',
    cta: 'IMPORT',
    link: 'https://ws-connectioncommerce.com/produto/wsc-hoil-flwrmd22/'
  },
  {
    id: 2,
    image: '/images/rosin-flower.png',
    title: 'Hemp Oil - Gold Budder - CBD',
    location: '10g',
    price: 'WSC-E118',
    description: 'Fornecedor Importado (EUA) de Extrações tipo HEMP OIL com CBD legalizado pela ANVISA. Extração Premium com textura budder e coloração dourada intensa - OG KUSH. SENSAÇÃO DE BEM ESTAR.',
    cta: 'IMPORT',
    link: 'https://ws-connectioncommerce.com/produto/wsc-hoil-flwrmd/'
  },
  {
    id: 3,
    image: '/images/wsc-vape-thc.webp',
    title: 'HEMP OIL Seryng - THCa',
    location: '1ml',
    price: 'WSC-W521',
    description: 'Fornecedor Importado (EUA) de Extrações Hemp Oil com THC/THCa legalizado pela ANVISA. Extração líquida de alta pureza perfil terpenico fiel à OG KUSH.',
    cta: 'IMPORT',
    link: 'https://ws-connectioncommerce.com/produto/wsc-hemp-oil-thca/'
  },
  {
    id: 3,
    image: '/images/wsc-vape-thc.webp',
    title: 'HEMP OIL Seryng - CBD',
    location: '1ml',
    price: 'WSC-WCBD',
    description: 'Fornecedor Importado (EUA) de Extrações Hemp Oil com CBD legalizado pela ANVISA. Extração líquida de alta pureza perfil terpenico fiel à OG KUSH.',
    cta: 'IMPORT',
    link: 'https://ws-connectioncommerce.com/produto/wsc-hemp-oil-serynge/'
  },
  {
    id: 4,
    image: '/images/hash-ice-import.png',
    title: 'Bubble Hash - D8',
    location: '5g',
    price: 'WSC-E680',
    description: 'Fornecedor Importado (EUA) de Extrações tipo ICE com THC legalizado pela ANVISA. CannCalm Delta-8 Bubble Hash – 3150 mg / 10g.',
    cta: 'SOLD OUT',
    link: 'https://wa.me/5561995276936'
  },
  { id: 5, image: '/images/wsc-import-1.png', title: 'Piatella - D9', location: '3g', price: 'WSC-127', description: 'Um concentrado sem solvente elaborado através de um meticuloso processo de cura a frio. (78,09% CANAB.)', cta: 'IMPORT', link: 'https://ws-connectioncommerce.com/produto/wsc-piatella-thca/' },
  { id: 6, image: '/images/wsc-import-2.png', title: '00 - D9', location: '3g', price: 'WSC-2718', description: 'Concentrado da primeira e mais fina peneiração a seco. (70,77% CANAB.)', cta: 'IMPORT', link: 'https://ws-connectioncommerce.com/produto/00-thca/' },
  { id: 7, image: '/images/wsc-import-3.png', title: 'Gold Seal - D9', location: '3g', price: 'WSC-217', description: 'Concentrado artesanal que celebra os métodos afegãos de resinas prensadas à mão. (70,11% CANAB.)', cta: 'IMPORT', link: 'https://ws-connectioncommerce.com/produto/gold-seal-thca/' },
  { id: 8, image: '/images/wsc-import-4.png', title: 'THCA Sugar - D9', location: '3g', price: 'WSC-232H', description: 'Concentrado premium de cera cristalizada com alto teor de THCA. (80,08% CANAB.)', cta: 'IMPORT', link: 'https://ws-connectioncommerce.com/produto/wsc-thca-sugar/' },
  { id: 9, image: '/images/wsc-import-5.png', title: 'Ketama Gold - D9', location: '3g', price: 'WSC-1KWO', description: 'Textura suave e cremosa com tons dourados, processo de altíssima qualidade. (70,64% CANAB.)', cta: 'IMPORT', link: 'https://ws-connectioncommerce.com/produto/wsc-ketama-gold-thca/' },
  { id: 10, image: '/images/wsc-import-6.png', title: 'La mousse - D9', location: '3g', price: 'WSC-MNDN', description: 'Combina técnicas tradicionais de peneiramento seco, conhecido pela textura rica. (53,09% CANAB.)', cta: 'IMPORT', link: 'https://ws-connectioncommerce.com/produto/wsc-la-mousse-thca/' },
  { id: 11, image: '/images/wsc-import-7.png', title: 'Temple Ball - D9', location: '3g', price: 'WSC-NE22', description: 'Resultado da lendária tradição nepalesa esfregada à mão. (75,92% CANAB.)', cta: 'IMPORT', link: 'https://ws-connectioncommerce.com/produto/wsc-temple-ball-thca/' },
  { id: 12, image: '/images/wsc-import-8.png', title: 'Static Sift - D9', location: '3g', price: 'WSC-1736', description: 'Resina refinada criada por meio de separação estática moderna. (79,01% CANAB.)', cta: 'IMPORT', link: 'https://ws-connectioncommerce.com/produto/wsc-static-sift-thca/' },
  { id: 13, image: '/images/wsc-import-9.png', title: 'THCA Budder - D9', location: '3g', price: 'WSC-1838', description: 'Consistência cremosa e efeitos potentes, equilíbrio entre edificante e relaxante. (94,1% CANAB.)', cta: 'IMPORT', link: 'https://ws-connectioncommerce.com/produto/wsc-budder-thca/' },
  { id: 14, image: '/images/wsc-import-10.png', title: 'THCA Rosin - D9', location: '3g', price: 'WSC-2397', description: 'Extrato obtido sem solventes através de calor e pressão. (61,28 CANAB.) Resina translúcida.', cta: 'IMPORT', link: 'https://ws-connectioncommerce.com/produto/wsc-thca-rosin/' },
  { id: 15, image: '/images/wsc-import-11.png', title: 'Diamond Sauce Papaya - THCa', location: '10g', price: 'WSC-JE3O', description: 'THCa Diamantes formados a partir de extração a frio. Genética Papaya (Indica).', cta: 'IMPORT', link: 'https://ws-connectioncommerce.com/produto/wsc-diamond-sauce-thca/' },
  { id: 16, image: '/images/wsc-import-11.png', title: 'Diamond Sauce OG Kush - THCa', location: '10g', price: 'WSC-8238', description: 'THCa Cristais puros com mistura de terpenos. Genética OG Kush (Híbrida).', cta: 'IMPORT', link: 'https://ws-connectioncommerce.com/produto/wsc-diamond-sauce-thca/' },
  { id: 17, image: '/images/wsc-import-11.png', title: 'Diamond Sauce Diesel - THCa', location: '10g', price: 'WSC-2837', description: 'O THC-A se transforma em THC quando aquecido. Genética Sour Diesel (Sativa).', cta: 'IMPORT', link: 'https://ws-connectioncommerce.com/produto/wsc-diamond-sauce-thca/' },
  { id: 18, image: '/images/wsc-import-12.png', title: 'Diamond CBD Zkittlez', location: '10g', price: 'WSC-1762', description: 'Extração a frio. Genética Zkittlez (Sativa): Criatividade e foco.', cta: 'IMPORT', link: 'https://ws-connectioncommerce.com/produto/wsc-diamond-sauce-cbd/' },
  { id: 19, image: '/images/wsc-import-12.png', title: 'Diamond CBD Berry White', location: '10g', price: 'WSC-23I', description: 'Genética Berry White (Indica): Relaxamento e sono profundo.', cta: 'IMPORT', link: 'https://ws-connectioncommerce.com/produto/wsc-diamond-sauce-cbd/' },
  { id: 20, image: '/images/wsc-import-12.png', title: 'Diamond CBD Kush Mints', location: '10g', price: 'WSC-1772', description: 'Genética Kush Mints (Híbrida): Relaxamento e alívio.', cta: 'IMPORT', link: 'https://ws-connectioncommerce.com/produto/wsc-diamond-sauce-cbd/' },
  { id: 21, image: '/images/wsc-import-13.png', title: 'Diamond D8 Gelato', location: '10g', price: 'WSC-2E12', description: 'Delta-8 oferece efeitos mais suaves que o Delta-9. Genética Gelato.', cta: 'IMPORT', link: 'https://ws-connectioncommerce.com/produto/wsc-diamond-sauce-delta-8/' },
  { id: 22, image: '/images/wsc-import-13.png', title: 'Diamond D8 Grape Ape', location: '10g', price: 'WSC-1274', description: 'Genética Grape Ape (Indica): Relaxamento e sono. Terpenos naturais.', cta: 'IMPORT', link: 'https://ws-connectioncommerce.com/produto/wsc-diamond-sauce-delta-8/' },
  { id: 23, image: '/images/wsc-import-13.png', title: 'Diamond D8 Durban Poison', location: '10g', price: 'WSC-1838', description: 'Genética Durban Poison (Sativa): Energia e foco.', cta: 'IMPORT', link: 'https://ws-connectioncommerce.com/produto/wsc-diamond-sauce-delta-8/' },
  { id: 24, image: '/images/wsc-import-14.png', title: 'Live Rosin Blue Dream - THCa', location: '10g', price: 'WSC-1928', description: 'Rosin Vivo feito com flores frescas congeladas (Fresh Frozen).', cta: 'IMPORT', link: 'https://ws-connectioncommerce.com/produto/wsc-live-rosin-thca/' },
  { id: 25, image: '/images/wsc-import-14.png', title: 'Live Rosin Watermelon - THCa', location: '10g', price: 'WSC-1837', description: 'Extração ICE do material fresco, prensado até consistência ideal.', cta: 'IMPORT', link: 'https://ws-connectioncommerce.com/produto/wsc-live-rosin-thca/' },
  { id: 26, image: '/images/wsc-import-14.png', title: 'Live Rosin Maui Wowie - THCa', location: '10g', price: 'WSC-8127', description: 'Genética Maui Wowie (Sativa): Euforia e ânimo premium.', cta: 'IMPORT', link: 'https://ws-connectioncommerce.com/produto/wsc-live-rosin-thca/' },
  { id: 27, image: '/images/wsc-import-15.png', title: 'Bubble Hash Blackberry - CBD', location: '10g', price: 'WSC-1813', description: 'Feito com água gelada para separar os tricomas. Relaxamento. (CBD)', cta: 'IMPORT', link: 'https://ws-connectioncommerce.com/produto/wsc-live-rosin-thca/' },
  { id: 28, image: '/images/wsc-import-15.png', title: 'Bubble Hash Chocolope - CBD', location: '10g', price: 'WSC-1972', description: 'Alto teor de canabinoides. Genética Chocolope (Sativa): Euforia. (CBD)', cta: 'IMPORT', link: 'https://ws-connectioncommerce.com/produto/wsc-live-rosin-thca/' },
  { id: 29, image: '/images/wsc-import-15.png', title: 'Bubble Hash Wedding Cake - CBD', location: '10g', price: 'WSC-1832', description: 'Genética Wedding Cake (Híbrida): Relaxamento e equilíbrio. (CBD)', cta: 'IMPORT', link: 'https://ws-connectioncommerce.com/produto/wsc-live-rosin-thca/' },
  { id: 30, image: '/images/wsc-import-16.png', title: 'Vegan Gummies Sleep - CBD', location: '113g', price: 'WSC-1289', description: 'Gomas veganas sabor Mix de Frutas (60mg/GUMMY). CBN para auxílio no sono.', cta: 'IMPORT', link: 'https://ws-connectioncommerce.com/produto/wsc-sleep-gummies-cbn/' },
  { id: 31, image: '/images/wsc-import-17.png', title: 'CBN Tincture Sleep - CBD', location: '30ml', price: 'WSC-1828', description: 'Óleo de CBN de alta concentração com CBD (200mg/ml). Diluição em MCT.', cta: 'IMPORT', link: 'https://ws-connectioncommerce.com/wp-admin/post.php?post=792&action=edit' }
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