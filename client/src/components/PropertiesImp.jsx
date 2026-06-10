// client/src/components/PropertiesImp.jsx
import React, { useState, useEffect, useRef } from 'react';
import './PropertiesImp.scss';

const propertiesImpData = [
  {
    id: 100,
    images: ['/images/glitter-bombbud.jpg'],
    title: 'Glitter Bomb | THCa',
    location: '14g',
    deliveryTime: '15-35 dias úteis',
    price: 'WSC-1950,00',
    description: 'Flor medicinal importada de alta qualidade. 70% Indica - 30% Sativa.',
    cta: 'IMPORT',
    badge: 'Mais Vendido',
    link: 'https://ws-connectioncommerce.com/produto/wsc-flwrimp1/'
  },
  {
    id: 101,
    images: ['/images/Forbidden-Fruit.webp'],
    title: 'Forbidden Fruit | D8',
    location: '14g',
    deliveryTime: '15-35 dias úteis',
    price: 'WSC-1750,00',
    description: 'Flor medicinal importada de alta qualidade. 70% Indica - 30% Sativa.',
    cta: 'IMPORT',
    link: 'https://ws-connectioncommerce.com/produto/wsc-flwrimp2/'
  },
  {
    id: 102,
    images: ['/images/astrocand-thca.jpeg'],
    title: 'Astro Candy | THCa',
    location: '14g',
    deliveryTime: '15-35 dias úteis',
    price: 'WSC-1950,00',
    description: 'Flor medicinal importada de alta qualidade. 70% Indica - 30% Sativa.',
    cta: 'IMPORT',
    link: 'https://ws-connectioncommerce.com/produto/wsc-flwrimp1/'
  },
  {
    id: 103,
    images: ['/images/gellato-flwrimp.webp'],
    title: 'Gellato | D8',
    location: '14g',
    deliveryTime: '15-35 dias úteis',
    price: 'WSC-1750,00',
    description: 'Flor medicinal importada de alta qualidade. 55% Indica - 45% Sativa.',
    cta: 'IMPORT',
    link: 'https://ws-connectioncommerce.com/produto/wsc-flwrimp2/'
  },
  {
    id: 104,
    images: ['/images/d9-tincture-w.png'],
    title: 'Óleo Green Gene Delta-9 THC Full-spectrum 3000mg',
    location: '30ml',
    deliveryTime: '15-35 dias úteis',
    price: 'WSC-694,90',
    description: 'Óleo de THC 3000 mg é um produto full-spectrum de alta qualidade.',
    cta: 'IMPORT',
    link: 'https://ws-connectioncommerce.com/produto/wsc-gened93000/'
},
{
    id: 105,
    images: ['/images/cbd-oil-6000-w.webp'],
    title: 'Óleo Green Gene de CBD Full-Spectrum 6000mg 0.3% THC',
    location: '30ml',
    deliveryTime: '15-35 dias úteis',
    price: 'WSC-694,90',
    description: 'O óleo de 6000 mg corresponde a uma alta concentração de canabidiol full spectrum.',
    cta: 'IMPORT',
    link: 'https://ws-connectioncommerce.com/produto/wsc-genecbd6000/'
},
{
    id: 106,
    images: ['/images/cbd-oil-6000-w.webp'],
    title: 'Óleo Green Gene de CBD Full-Spectrum 3000mg 0.3% THC',
    location: '30ml',
    deliveryTime: '15-35 dias úteis',
    price: 'WSC-605,00',
    description: 'O óleo de CBD Full Spectrum reúne múltiplos canabinoides para o efeito comitiva.',
    cta: 'IMPORT',
    link: 'https://ws-connectioncommerce.com/produto/wsc-genecbd3000/'
},
{
    id: 107,
    images: ['/images/thcv-tincture-5000-w.png'],
    title: 'Óleo Green Gene de emagrecimento natural com THCV + CBD',
    location: '30ml',
    deliveryTime: '15-35 dias úteis',
    price: 'WSC-659,90',
    description: 'Óleo focado em emagrecimento natural e controle de apetite com a combinação de THCV e CBD.',
    cta: 'IMPORT',
    link: 'https://ws-connectioncommerce.com/produto/wsc-genethcv/'
},
{
    id: 108,
    images: ['/images/alpha-cbd-cbg-3000-w.png'],
    title: 'ÓLEO BROAD-SPECTRUM ALPHA-CAT 10Ml - 10% - 3000mg - CBG + CBD',
    location: '30ml',
    deliveryTime: '15-35 dias úteis',
    price: 'WSC-789,90',
    description: 'O Óleo de CBD + CBG 3000 mg (10%) da Alpha-Cat foi desenvolvido para oferecer um suporte natural ao corpo e à mente. Sua fórmula combina canabidiol (CBD) e canabigerol (CBG).',
    cta: 'IMPORT',
    link: 'https://ws-connectioncommerce.com/produto/wsc-alphacbg3000/'
},
{
    id: 109,
    images: ['/images/alpha-cbd-3000-w.png'],
    title: 'ÓLEO BROAD-SPECTRUM ALPHA-CAT 30Ml - 10% - 3000mg CBD',
    location: '30ml',
    deliveryTime: '15-35 dias úteis',
    price: 'WSC-689,90',
    description: 'A Alpha-cat oferece a melhor qualidade de CBD, disponível em um concentrado de óleo de 10%. Nossos óleos de CBD de amplo espectro de 3000 mg são feitos de cânhamo europeu e têm garantia de serem livres de pesticidas.',
    cta: 'IMPORT',
    link: 'https://ws-connectioncommerce.com/produto/wsc-alphacbd3000/'
},
{
    id: 110,
    images: ['/images/alpha-cbd-3000-w.png'],
    title: 'ÓLEO BROAD-SPECTRUM ALPHA-CAT 30Ml - 20% 6000mg CBD',
    location: '30ml',
    deliveryTime: '15-35 dias úteis',
    price: 'WSC-849,90',
    description: 'Óleo de CBD de 6000 mg de qualidade de laboratório, misturado com azeite de oliva extravirgem orgânico da Provença. Disponível em frasco de 30 ml com concentração de óleo de 20%.',
    cta: 'IMPORT',
    link: 'https://ws-connectioncommerce.com/produto/wsc-alphacbd6000/'
},
{
    id: 124,
    images: ['/images/vibes6000.png'],
    title: 'GreenBudzCBD Deep Vibe Oil Full Spectrum 3000mg 100mg/ml + Terps - 30ml',
    location: '30ml',
    deliveryTime: '15-35 dias úteis',
    price: 'WSC-550,00',
    description: 'Óleo full spectrum rico em Canabidiol com até 0,2% de THC e outros canabinoides minoritários com adição de terpenos do perfil "indica" com predominância de Mirceno e Linalool.',
    cta: 'IMPORT',
    link: 'https://ws-connectioncommerce.com/produto/wsc-vibes6000/'
},
{
    id: 125,
    images: ['/images/vibes1500.png'],
    title: 'GreenBudzCBD Super Vibe Oil Full Spectrum 3000mg 100mg/ml + Terps - 30ml',
    location: '30ml',
    deliveryTime: '15-35 dias úteis',
    price: 'WSC-550,00',
    description: 'Óleo full spectrum rico em Canabidiol com até 0,2% de THC e outros canabinoides minoritários com adição de terpenos do perfil "sativa" com predominância de Limoneno e Pineno.',
    cta: 'IMPORT',
    link: 'https://ws-connectioncommerce.com/produto/wsc-vibes1500/'
},
{
    id: 126,
    images: ['/images/calmvibes.png'],
    title: 'GreenBudzCBD Calm Vibe Oil Full Spectrum 6000mg 200mg/ml - 30ml',
    location: '30ml',
    deliveryTime: '15-35 dias úteis',
    price: 'WSC-640,00',
    description: 'Óleo full spectrum rico em Canabidiol com até 0,2% de THC e outros canabinoides minoritários. Adicionado saborizador natural de menta.',
    cta: 'IMPORT',
    link: 'https://ws-connectioncommerce.com/produto/wsc-vibescalm/'
},
{
    id: 127,
    images: ['/images/slimvibes.png'],
    title: 'GreenBudzCBD Slim Vibe Oil Full Spectrum 1500mg THCv 1500 CBD 100mg/ml - 30ml',
    location: '30ml',
    deliveryTime: '15-35 dias úteis',
    price: 'WSC-840,00',
    description: 'Óleo full spectrum rico em Canabidiol e Tetraidrocanabivarina (THC-V) com até 0,2% de THC d9 e outros canabinoides minoritários. Adicionado saborizador natural de menta.',
    cta: 'IMPORT',
    link: 'https://ws-connectioncommerce.com/produto/wsc-slimvibes/'
},
{
    id: 136,
    images: ['/images/hmpoilq-w.jpeg', '/images/hmpoilq1-w.jpeg', '/images/hmpoilq-dscr.jpeg' ],
    title: 'Hemp Oil Pancann Badder Full-Spectrum 7250mg',
    location: '10g',
    deliveryTime: '15-35 dias úteis',
    price: 'WSC-1200,00',
    description: 'Alcance o equilíbrio máximo com o nosso Hemp Oil Full-Spectrum. (BADDER) Esta fórmula premium utiliza todo o potencial da planta para garantir um bem-estar profundo e eficaz. Rico em compostos naturais e desenvolvido com cânhamo de alta qualidade, nosso óleo de alta potência oferece o suporte ideal para o corpo e a mente com total pureza e segurança. Purity Standards: Contains less than 0.3% Delta 9 THC, organic non-GMO hemp oil, triple lab tested for purity, no artificial additives used, highest pharmaceutical grade CBD.',
    cta: 'IMPORT',
    link: 'https://ws-connectioncommerce.com/produto/wsc-hmpoil10/'
},
{
    id: 137,
    images: ['/images/hmpoilq-w.jpeg', '/images/hmpoilq1-w.jpeg', '/images/hmpoilq-dscr.jpeg' ],
    title: 'Hemp Oil Pancann Badder Full-Spectrum 14500mg',
    location: '20g',
    deliveryTime: '15-35 dias úteis',
    price: 'WSC-2300,00',
    description: 'Alcance o equilíbrio máximo com o nosso Hemp Oil Full-Spectrum. (BADDER) Esta fórmula premium utiliza todo o potencial da planta para garantir um bem-estar profundo e eficaz. Rico em compostos naturais e desenvolvido com cânhamo de alta qualidade, nosso óleo de alta potência oferece o suporte ideal para o corpo e a mente com total pureza e segurança. Purity Standards: Contains less than 0.3% Delta 9 THC, organic non-GMO hemp oil, triple lab tested for purity, no artificial additives used, highest pharmaceutical grade CBD.',
    cta: 'IMPORT',
    link: 'https://ws-connectioncommerce.com/produto/wsc-hmpoil20/'
},
{
    id: 138,
    images: ['/images/hmpoilq-w.jpeg', '/images/hmpoilq1-w.jpeg', '/images/hmpoilq-dscr.jpeg' ],
    title: 'Hemp Oil Pancann Badder Full-Spectrum 36250mg',
    location: '50g',
    deliveryTime: '15-35 dias úteis',
    price: 'WSC-4750,00',
    description: 'Alcance o equilíbrio máximo com o nosso Hemp Oil Full-Spectrum. (BADDER) Esta fórmula premium utiliza todo o potencial da planta para garantir um bem-estar profundo e eficaz. Rico em compostos naturais e desenvolvido com cânhamo de alta qualidade, nosso óleo de alta potência oferece o suporte ideal para o corpo e a mente com total pureza e segurança. Purity Standards: Contains less than 0.3% Delta 9 THC, organic non-GMO hemp oil, triple lab tested for purity, no artificial additives used, highest pharmaceutical grade CBD.',
    cta: 'IMPORT',
    link: 'https://ws-connectioncommerce.com/produto/wsc-hmpoil50/'
},
{
    id: 139,
    images: ['/images/hmpoilq-w.jpeg', '/images/hmpoilq1-w.jpeg', '/images/hmpoilq-dscr.jpeg' ],
    title: 'Hemp Oil Pancann Badder Full-Spectrum',
    location: '100g',
    deliveryTime: '15-35 dias úteis',
    price: 'WSC-9000,00',
    description: 'Extração Premium Full-Spectrum de Cannabis em condições de pré-venda exclusiva. Produto de qualidade premium, extração avançada, 100% natural e sem aditivos. Padrão Lineage com acesso limitado.',
    cta: 'IMPORT',
    link: 'https://ws-connectioncommerce.com/produto/wsc-hmpoil100/'
},
{
    id: 140,
    images: ['/images/freshq-w.jpeg', '/images/freshq1-w.jpeg', 'images/caps-freshq-w.jpeg'],
    title: 'Hemp Capsule Pancann Fresh-Frozen Purified 120 05 Caps',
    location: '5g',
    deliveryTime: '15-35 dias úteis',
    price: 'WSC-900,00',
    description: 'Desbloqueie o bem-estar com as Cápsulas de THCa PANCANN. Com 120mg (Fresh frozen), esta é a nossa fórmula mais potente, processada meticulosamente para garantir equilíbrio e saúde em cada dose. Extração premium de alta pureza e tecnologia avançada com acesso restrito.',
    cta: 'IMPORT',
    link: 'https://ws-connectioncommerce.com/produto/wsc-capsfrsh5/'
},
{
    id: 141,
    images: ['/images/freshq-w.jpeg', '/images/freshq1-w.jpeg', 'images/caps-freshq-w.jpeg'],
    title: 'Hemp Capsule Pancann Fresh-Frozen Purified 120 10 Caps',
    location: '10g',
    deliveryTime: '15-35 dias úteis',
    price: 'WSC-1.500,00',
    description: 'Desbloqueie o bem-estar com as Cápsulas de THCa PANCANN. Com 120mg (Fresh frozen), esta é a nossa fórmula mais potente, processada meticulosamente para garantir equilíbrio e saúde em cada dose. Extração premium de alta pureza e tecnologia avançada com acesso restrito.',
    cta: 'IMPORT',
    link: 'https://ws-connectioncommerce.com/produto/wsc-capsfrsh10/'
},
{
    id: 142,
    images: ['/images/freshq-w.jpeg', '/images/freshq1-w.jpeg', 'images/caps-freshq-w.jpeg'],
    title: 'Hemp Capsule Pancann Fresh-Frozen Purified 120 20 Caps',
    location: '20g',
    deliveryTime: '15-35 dias úteis',
    price: 'WSC-2.900,00',
    description: 'Desbloqueie o bem-estar com as Cápsulas de THCa PANCANN. Com 120mg (Fresh frozen), esta é a nossa fórmula mais potente, processada meticulosamente para garantir equilíbrio e saúde em cada dose. Extração premium de alta pureza e tecnologia avançada com acesso restrito.',
    cta: 'IMPORT',
    link: 'https://ws-connectioncommerce.com/produto/wsc-capsfrsh20/'
},
  {
    id: 1,
    images: ['/images/cannac.jpg'],
    title: 'KETAMA GOLD INTEGRAL | D9',
    location: '6g',
    deliveryTime: '15-35 dias úteis',
    price: 'WSC-921,90',
    description: 'Marrocan Ketama Gold Seal Hashish - White Runtz, mundialmente reconhecido por sua textura macia e flexíve. Extração de flores premium com THCa - TOP QUALITY',
    cta: 'IMPORT',
    link: 'https://ws-connectioncommerce.com/produto/wsc-ktmsifit/'
  },
  {
    id: 2,
    images: ['/images/rosin-flower.png'],
    title: 'Hemp Oil Gold THCa',
    location: '5g',
    deliveryTime: '15-35 dias úteis',
    price: 'WSC-989,00',
    description: 'HEMP OIL Budder THC 0.3%/THCa. Extração Premium com textura budder e coloração dourada intensa - OG KUSH. SENSAÇÃO PROFUNDA DE RELAXAMENTO CORPORAL',
    cta: 'IMPORT',
    link: 'https://ws-connectioncommerce.com/produto/wsc-hoil-flwrmd22/'
  },
  {
    id: 202,
    images: ['/images/rosin-flower.png'],
    title: 'Hemp Oil Gold CBD',
    location: '5g',
    deliveryTime: '15-35 dias úteis',
    price: 'WSC-789,00',
    description: 'HEMP OIL Budder CBD. Extração Premium com textura budder e coloração dourada intensa - OG KUSH. SENSAÇÃO DE BEM ESTAR.',
    cta: 'IMPORT',
    link: 'https://ws-connectioncommerce.com/produto/wsc-hoil-flwrmd/'
  },
  {
    id: 3,
    images: ['/images/wsc-vape-thc.webp'],
    title: 'Hemp Oil Seryng THCa',
    location: '1ml',
    deliveryTime: '15-35 dias úteis',
    price: 'WSC-529,00',
    description: 'Hemp Oil THC/THCa. Extração líquida de alta pureza perfil terpenico fiel à OG KUSH.',
    cta: 'IMPORT',
    link: 'https://ws-connectioncommerce.com/produto/wsc-529/'
  },
  {
    id: 303,
    images: ['/images/wsc-vape-thc.webp'],
    title: 'Hemp Oil Seryng CBD',
    location: '1ml',
    deliveryTime: '15-35 dias úteis',
    price: 'WSC-469,00',
    description: 'Hemp Oil CBD. Extração líquida de alta pureza perfil terpenico fiel à OG KUSH.',
    cta: 'IMPORT',
    link: 'https://ws-connectioncommerce.com/produto/wsc-469/'
  },
  {
    id: 111,
    images: ['/images/cartridge-concentrate-w.png'],
    title: 'CARTRIDGE CONCENTRATED OIL',
    location: '2ml',
    deliveryTime: '15-35 dias úteis',
    price: 'WSC-649,90',
    description: 'CONCENTRATED OIL PEN 2g. Ingredientes: THCa Live Resin, Terpene-rich, Potent, Smooth. Dosagem: THCa 79.6%',
    cta: 'IMPORT',
    badge: 'Últimas Unidades',
    link: 'https://ws-connectioncommerce.com/produto/wsc-catridgehmp/'
},
{
    id: 112,
    images: ['/images/creamlikebudda-w.png'],
    title: 'Cream Like Buddah 120u Integral',
    location: '6g',
    deliveryTime: '15-35 dias úteis',
    price: 'WSC-921,00',
    description: 'Ingredientes: Extraction from Premium THCA Flowers - OBS: SEM SOLVENTES Dosagem: Δ-9 - 0.26%THCa - 62.4%CBD - <0.01%CBG - 4.61%CBN - <0.01%Total Cannabinoids = 67.42%',
    cta: 'IMPORT',
    link: 'https://ws-connectioncommerce.com/produto/wsc-creamlkbdd/'
},
{
    id: 113,
    images: ['/images/cbd-isolate-w.png'],
    title: 'Isolate Powder CBD 99%',
    location: '3g',
    deliveryTime: '15-35 dias úteis',
    price: 'WSC-621,00',
    description: ' Ingredientes: Cristais com 99,55% de CBD Isolado Dosagem: Δ-9 - <0,01%THCa - <0,01%CBD - 99,55%CBG - <0,01%CBN - <0,01%Canabinoides totais = 99,55%Δ-9 - <0,01%THCa - <0,01%CBD - 99,55%CBG - <0,01%CBN - <0,01%Canabinoides totais = 99,55%',
    cta: 'IMPORT',
    link: 'https://ws-connectioncommerce.com/produto/wsc-cbdislt/'
},
{
    id: 114,
    images: ['/images/thca-live-rosin-papaya-w.png'],
    title: 'THCa LIVE ROSIN OIL - PAPAYA',
    location: '6g',
    deliveryTime: '15-35 dias úteis',
    price: 'WSC-1240,00',
    description: 'Ingredientes: Flores frescas congeladas de THCA Premium com canabinoides CBD e CBG - obs: SEM SOLVENTES Dosagem: Δ-9 - 0,20%THCa - 59,38%CDB - 0,35%CBG - 0,57%CBN - <0,01%Canabinoides totais = 61,28%Δ-9 - 0,20%THCa - 59,38%CDB - 0,35%CBG - 0,57%CBN - <0,01%Canabinoides totais = 61,28%',
    cta: 'IMPORT',
    link: 'https://ws-connectioncommerce.com/produto/wsc-papayarsn/'
},
{
    id: 116,
    images: ['/images/superboof-rosin-w.png'],
    title: 'THCa LIVE ROSIN OIL - SUPER BOOF',
    location: '6g',
    deliveryTime: '15-35 dias úteis',
    price: 'WSC-1240,00',
    description: 'Pronto para mergulhar no mundo delicioso do Mix Cake Rosin THCA? Se você está a fim de uma delícia que aguce seu paladar e eleve seu estado mental, este é o produto ideal! O Rosin com THCA está em alta no mundo da',
    cta: 'IMPORT',
    link: 'https://ws-connectioncommerce.com/produto/wsc-superboof/'
},
{
    id: 117,
    images: ['/images/alienog-w.png'],
    title: 'THCA Sauce Oil - Alien OG',
    location: '3g',
    deliveryTime: '15-35 dias úteis',
    price: 'WSC-639,90',
    description: 'THCA Sauce N Diamonds-Alien OG representa o ápice da arte sem solventes e do refinamento moderno da extração. Este concentrado é uma fusão perfeita de pureza cristalina e riqueza em terpenos, oferecendo uma experiência visualmente deslumbrante e',
    cta: 'IMPORT',
    link: 'https://ws-connectioncommerce.com/produto/wsc-alienog/'
},
{
    id: 118,
    images: ['/images/nightcap-w.png'],
    title: 'Crystallino 5:1 THCa/CBD - Cherry Pie',
    location: '3g',
    deliveryTime: '15-35 dias úteis',
    price: 'WSC-681,00',
    description: 'Apresentamos o Crystallino - Cherry Pie, produto feito de CBD Isolado, THCa Isolado e traços de CBG, na concentração 5:1. Ingredientes: CBD Isolate, THCa Isolate, natural terpenes.',
    cta: 'IMPORT',
    link: 'https://ws-connectioncommerce.com/produto/wsc-crystalthcacbd/'
},
{
    id: 119,
    images: ['/images/jackhere-w.png'],
    title: 'THCA Budder Oil - Jack Herer',
    location: '6g',
    deliveryTime: '15-35 dias úteis',
    price: 'WSC-921,00',
    description: 'Apresentamos o nosso Budder-Jack Herer premium com THCA e CBD, o concentrado de cannabis definitivo para quem busca uma experiência potente e equilibrada. Top Quality Budder. Ingredientes: Isolado de THCa derivado',
    cta: 'IMPORT',
    link: 'https://ws-connectioncommerce.com/produto/wsc-jackhere/'
},
{
    id: 120,
    images: ['/images/nightcap-blue-w.png'],
    title: 'Night Cap Crystallino THCa-CBN - Blueberry',
    location: '3g',
    deliveryTime: '15-35 dias úteis',
    price: 'WSC-681,00',
    description: 'Apresentamos o Night Cap Crystallino - Blueberry THCA-CBN, a solução definitiva para uma noite de sono tranquila e revigorante. Este produto contém alto teor de CBN e THC-a, por isso deve ser usado apenas no período da noite, antes de dormir, pois causa',
    cta: 'IMPORT',
    link: 'https://ws-connectioncommerce.com/produto/wsc-nightblue/'
},
  {
    id: 4,
    images: ['/images/hash-ice-import.png'],
    title: 'Bubble Hash | D8',
    location: '5g',
    deliveryTime: '15-35 dias úteis',
    price: 'WSC-SOLDOUT',
    description: 'Extrações tipo ICE com THC/THCa legalizado pela ANVISA. Bubble ice Delta-8 Bubble Hash – 3150 mg / 10g.',
    cta: 'SOLD OUT',
    link: 'https://wa.me/5561995276936'
  },
  { id: 5, images: ['/images/wsc-import-1.png'], title: 'Piatella | D9', location: '3g', deliveryTime: '15-50 dias úteis', price: 'WSC-879,00', description: 'Um concentrado sem solvente elaborado através de um meticuloso processo de cura a frio. (78,09% CANAB.)', cta: 'IMPORT', link: 'https://ws-connectioncommerce.com/produto/wsc-879/' },
  { id: 6, images: ['/images/wsc-import-2.png'], title: '00 SIFT | D9', location: '3g', deliveryTime: '15-50 dias úteis', price: 'WSC-749,00', description: 'Concentrado da primeira e mais fina peneiração a seco. (70,77% CANAB.)', cta: 'IMPORT', link: 'https://ws-connectioncommerce.com/produto/00/' },
  { id: 7, images: ['/images/wsc-import-3.png'], title: 'Gold Seal | D9', location: '3g', deliveryTime: '15-50 dias úteis', price: 'WSC-759,00', description: 'Concentrado artesanal que celebra os métodos afegãos de resinas prensadas à mão. (70,11% CANAB.)', cta: 'IMPORT', link: 'https://ws-connectioncommerce.com/produto/wsc-759/' },
  { id: 8, images: ['/images/wsc-import-4.png'], title: 'THCA Sugar | D9', location: '3g', deliveryTime: '15-50 dias úteis', price: 'WSC-849,00', description: 'Concentrado premium de cera cristalizada com alto teor de THCA. (80,08% CANAB.)', cta: 'IMPORT', link: 'https://ws-connectioncommerce.com/produto/wsc-849/' },
  { id: 9, images: ['/images/wsc-import-5.png'], title: 'Ketama Gold | D9', location: '3g', deliveryTime: '15-50 dias úteis', price: 'WSC-719,00', description: 'Textura suave e cremosa com tons dourados, processo de altíssima qualidade. (70,64% CANAB.)', cta: 'IMPORT', link: 'https://ws-connectioncommerce.com/produto/wsc-719/' },
  { id: 10, images: ['/images/wsc-import-6.png'], title: 'La mousse | D9', location: '3g', deliveryTime: '15-50 dias úteis', price: 'WSC-749,00', description: 'Combina técnicas tradicionais de peneiramento seco, conhecido pela textura rica. (53,09% CANAB.)', cta: 'IMPORT', link: 'https://ws-connectioncommerce.com/produto/wsc-749/' },
  { id: 11, images: ['/images/wsc-import-7.png'], title: 'Temple Ball | D9', location: '3g', deliveryTime: '15-50 dias úteis', price: 'WSC-729,00', description: 'Resultado da lendária tradição nepalesa esfregada à mão. (75,92% CANAB.)', cta: 'IMPORT', link: 'https://ws-connectioncommerce.com/produto/wsc-729/' },
  { id: 12, images: ['/images/wsc-import-8.png'], title: 'Static Sift | D9', location: '3g', deliveryTime: '15-50 dias úteis', price: 'WSC-829,00', description: 'Resina refinada criada por meio de separação estática moderna. (79,01% CANAB.)', cta: 'IMPORT', link: 'https://ws-connectioncommerce.com/produto/wsc-829/' },
  { id: 13, images: ['/images/wsc-import-9.png'], title: 'THCA Budder | D9', location: '3g', deliveryTime: '15-50 dias úteis', price: 'WSC-849,00', description: 'Consistência cremosa e efeitos potentes, equilíbrio entre edificante e relaxante. (94,1% CANAB.)', cta: 'IMPORT', link: 'https://ws-connectioncommerce.com/produto/wsc-849/' },
  { id: 14, images: ['/images/wsc-import-10.png'], title: 'THCA Rosin | D9', location: '3g', deliveryTime: '15-50 dias úteis', price: 'WSC-869,00', description: 'Extrato obtido sem solventes através de calor e pressão. (61,28 CANAB.) Resina translúcida.', cta: 'IMPORT', link: 'https://ws-connectioncommerce.com/produto/wsc-869/' },
  { id: 15, images: ['/images/wsc-import-11.png'], title: 'Diamond Sauce Papaya THCa', location: '10g', deliveryTime: '15-50 dias úteis', price: 'WSC-1489,00', description: 'THCa Diamantes formados a partir de extração a frio. Genética Papaya (Indica).', cta: 'IMPORT', link: 'https://ws-connectioncommerce.com/produto/wsc-1489/' },
  { id: 16, images: ['/images/wsc-import-11.png'], title: 'Diamond Sauce OG Kush THCa', location: '10g', deliveryTime: '15-50 dias úteis', price: 'WSC-1489,00', description: 'THCa Cristais puros com mistura de terpenos. Genética OG Kush (Híbrida).', cta: 'IMPORT', link: 'https://ws-connectioncommerce.com/produto/wsc-1489/' },
  { id: 17, images: ['/images/wsc-import-11.png'], title: 'Diamond Sauce Diesel THCa', location: '10g', deliveryTime: '15-50 dias úteis', price: 'WSC-1489,00', description: 'O THC-A se transforma em THC quando aquecido. Genética Sour Diesel (Sativa).', cta: 'IMPORT', link: 'https://ws-connectioncommerce.com/produto/wsc-1489/' },
  { id: 18, images: ['/images/wsc-import-12.png'], title: 'Diamond CBD Zkittlez', location: '10g', deliveryTime: '15-50 dias úteis', price: 'WSC-1199,00', description: 'Extração a frio. Genética Zkittlez (Sativa): Criatividade e foco.', cta: 'IMPORT', link: 'https://ws-connectioncommerce.com/produto/wsc-1199/' },
  { id: 19, images: ['/images/wsc-import-12.png'], title: 'Diamond CBD Berry White', location: '10g', deliveryTime: '15-50 dias úteis', price: 'WSC-1199,00', description: 'Genética Berry White (Indica): Relaxamento e sono profundo.', cta: 'IMPORT', link: 'https://ws-connectioncommerce.com/produto/wsc-1199/' },
  { id: 20, images: ['/images/wsc-import-12.png'], title: 'Diamond CBD Kush Mints', location: '10g', deliveryTime: '15-50 dias úteis', price: 'WSC-1199,00', description: 'Genética Kush Mints (Híbrida): Relaxamento e alívio.', cta: 'IMPORT', link: 'https://ws-connectioncommerce.com/produto/wsc-1199/' },
  { id: 21, images: ['/images/wsc-import-13.png'], title: 'Diamond D8 Gelato', location: '10g', deliveryTime: '15-50 dias úteis', price: 'WSC-1259,00', description: 'Delta-8 oferece efeitos mais suaves que o Delta-9. Genética Gelato.', cta: 'IMPORT', link: 'https://ws-connectioncommerce.com/produto/wsc-1259/' },
  { id: 22, images: ['/images/wsc-import-13.png'], title: 'Diamond D8 Grape Ape', location: '10g', deliveryTime: '15-50 dias úteis', price: 'WSC-1259,00', description: 'Genética Grape Ape (Indica): Relaxamento e sono. Terpenos naturais.', cta: 'IMPORT', link: 'https://ws-connectioncommerce.com/produto/wsc-1259/' },
  { id: 23, images: ['/images/wsc-import-13.png'], title: 'Diamond D8 Durban Poison', location: '10g', deliveryTime: '15-50 dias úteis', price: 'WSC-1259,00', description: 'Genética Durban Poison (Sativa): Energia e foco.', cta: 'IMPORT', link: 'https://ws-connectioncommerce.com/produto/wsc-1259/' },
  { id: 24, images: ['/images/wsc-import-14.png'], title: 'Live Rosin Blue Dream THCa', location: '10g', deliveryTime: '15-50 dias úteis', price: 'WSC-1459,00', description: 'Rosin Vivo feito com flores frescas congeladas (Fresh Frozen).', cta: 'IMPORT', link: 'https://ws-connectioncommerce.com/produto/wsc-1459/' },
  { id: 25, images: ['/images/wsc-import-14.png'], title: 'Live Rosin Watermelon THCa', location: '10g', deliveryTime: '15-50 dias úteis', price: 'WSC-1459,00', description: 'Extração ICE do material fresco, prensado até consistência ideal.', cta: 'IMPORT', link: 'https://ws-connectioncommerce.com/produto/wsc-1459/' },
  { id: 26, images: ['/images/wsc-import-14.png'], title: 'Live Rosin Maui Wowie THCa', location: '10g', deliveryTime: '15-50 dias úteis', price: 'WSC-1459,00', description: 'Genética Maui Wowie (Sativa): Euforia e ânimo premium.', cta: 'IMPORT', link: 'https://ws-connectioncommerce.com/produto/wsc-1459/' },
  { id: 27, images: ['/images/wsc-import-15.png'], title: 'Bubble Hash Blackberry CBD', location: '10g', deliveryTime: '15-50 dias úteis', price: 'WSC-1249,00', description: 'Feito com água gelada para separar os tricomas. Relaxamento. (CBD)', cta: 'IMPORT', link: 'https://ws-connectioncommerce.com/produto/wsc-1249/' },
  { id: 28, images: ['/images/wsc-import-15.png'], title: 'Bubble Hash Chocolope CBD', location: '10g', deliveryTime: '15-50 dias úteis', price: 'WSC-1249,00', description: 'Alto teor de canabinoides. Genética Chocolope (Sativa): Euforia. (CBD)', cta: 'IMPORT', link: 'https://ws-connectioncommerce.com/produto/wsc-1249/' },
  { id: 29, images: ['/images/wsc-import-15.png'], title: 'Bubble Hash Wedding Cake CBD', location: '10g', deliveryTime: '15-50 dias úteis', price: 'WSC-1249,00', description: 'Genética Wedding Cake (Híbrida): Relaxamento e equilíbrio. (CBD)', cta: 'IMPORT', link: 'https://ws-connectioncommerce.com/produto/wsc-1249/' },
  { id: 30, images: ['/images/wsc-import-16.png'], title: 'Vegan Gummies Sleep CBD', location: '113g', deliveryTime: '15-50 dias úteis', price: 'WSC-529,00', description: 'Gomas veganas sabor Mix de Frutas (60mg/GUMMY). CBN para auxílio no sono. (20 unid)', cta: 'IMPORT', link: 'https://ws-connectioncommerce.com/produto/wsc-529/' },
  { id: 31, images: ['/images/wsc-import-17.png'], title: 'CBN Tincture Sleep CBD', location: '30ml', deliveryTime: '15-50 dias úteis', price: 'WSC-629,00', description: 'Óleo de CBN de alta concentração com CBD (200mg/ml). Diluição em MCT.', cta: 'IMPORT', link: 'https://ws-connectioncommerce.com/produto/wsc-629/' },
  {
    id: 143,
    images: ['/images/gumm-pn-w-blue.jpeg'],
    title: 'CBD Gummies Midnight Blue Dream 30mg',
    location: '30g',
    deliveryTime: '15-35 dias úteis',
    price: 'WSC-489,90',
    description: 'Durma melhor com Midnight Blue Dream 30mg 10mg THC, 10mg CBD e 10mg CBN. Desbloqueie um sono profundo e restaurador com nossas gomas premium. Inspiradas no perfil relaxante da Blue Dream, cada unidade contém 30mg de CBD de amplo espectro para transformar sua rotina noturna de forma natural.',
    cta: 'IMPORT',
    link: 'https://ws-connectioncommerce.com/produto/wsc-gummblue/'
},
{
    id: 144,
    images: ['/images/gumm-pn-w-green.jpeg'],
    title: 'Gummies Chill Bites 20mg com 30und',
    location: '30und',
    deliveryTime: '15-35 dias úteis',
    price: 'WSC-489,90',
    description: 'Relaxe e adoce o seu dia com as Chill Bites da PANCANN. Nossas gomas de frutas contêm 20mg Delta-8 THC de alta qualidade, offering uma forma prática e deliciosa de encontrar o seu centro em meio à rotina.',
    cta: 'IMPORT',
    link: 'https://ws-connectioncommerce.com/produto/wsc-gummgreen/'
},
  {
    id: 128,
    images: ['/images/drops1.png'],
    title: 'GreenBudzCBD Gummies Chill Vibe THC 10mg 1:1 CBD 10mg – gomas',
    location: '30 gomas',
    deliveryTime: '15-35 dias úteis',
    price: 'WSC-435,00',
    description: 'Extrato de cannabis rico em Tetrahidrocanabinol e Canabidiol na proporção 1:1 diluído em 30 gomas sem açúcar e veganas feitas a partir de pectina com sabor de melancia.',
    cta: 'IMPORT',
    link: 'https://ws-connectioncommerce.com/produto/wsc-drops1/'
},
{
    id: 129,
    images: ['/images/drops2.png'],
    title: 'Drops By GreenBudzCBD Gummies 5mg THC per ct + STRAIN – 20ct',
    location: '20 gomas',
    deliveryTime: '15-35 dias úteis',
    price: 'WSC-369,00',
    description: 'Extrato de cannabis tipo "Live Rosin" sem solvente rico em Tetrahidrocanabinol diluído em 20 gomas sem aditivos químicos e veganas feitas a partir de pectina com sabor natural e rico em terpenos. Sabores/Strains: Beethoven Sativa (Laranja), Formula One Sativa (Limão), Evergreen Híbrida (Lima), 100 Sheep Indica (Cereja), River Float Indica (Melancia).',
    cta: 'IMPORT',
    link: 'https://ws-connectioncommerce.com/produto/wsc-drops2/'
},
{
    id: 130,
    images: ['/images/drops3.png'],
    title: 'Drops By GreenBudzCBD Gummies 1mg THC 2.5mg CBN 10mg CBD per ct Lullaby – 20ct',
    location: '20 gomas',
    deliveryTime: '15-35 dias úteis',
    price: 'WSC-369,00',
    description: 'Extrato de cannabis tipo "Live Rosin" sem solvente rico em Tetrahidrocanabinol, Canabinol e Canabidiol diluído em 20 gomas sem aditivos químicos e veganas feitas a partir de pectina com sabor natural de Blueberry. Indicação: Relaxamento, Insônia, Bruxismo, Tensão Muscular, Espasmos, Inflamações, Dor Crônica.',
    cta: 'IMPORT',
    link: 'https://ws-connectioncommerce.com/produto/wsc-drops3/'
},
{
    id: 131,
    images: ['/images/drops4.png'],
    title: 'Drops By GreenBudzCBD Gummies 2.5mg THC 2.5mg CBG 2.5mg CBD 2.5mg CBC per ct LOOKING GLASS – 20ct',
    location: '20 gomas',
    deliveryTime: '15-35 dias úteis',
    price: 'WSC-369,00',
    description: 'Extrato de cannabis tipo "Live Rosin" sem solvente rico em Tetrahidrocanabinol, Canabigerol, Canabinocromeno e Canabidiol diluído em 20 gomas sem aditivos químicos e veganas feitas a partir de pectina com sabor natural de Cranberry.',
    cta: 'IMPORT',
    link: 'https://ws-connectioncommerce.com/produto/wsc-drops4/'
},
{
    id: 132,
    images: ['/images/drops5.png'],
    title: 'Drops By GreenBudzCBD Gummies 5mg THC 2.5mg CBD per ct Híbrida BICYCLE DAY – 20ct',
    location: '20 gomas',
    deliveryTime: '15-35 dias úteis',
    price: 'WSC-369,00',
    description: 'Extrato de cannabis tipo "Live Rosin" sem solvente rico em Tetrahidrocanabinol e Canabidiol diluído em 20 gomas sem aditivos químicos e veganas feitas a partir de pectina com sabor natural de Raspberry.',
    cta: 'IMPORT',
    link: 'https://ws-connectioncommerce.com/produto/wsc-drops5/'
},
{
    id: 133,
    images: ['/images/drops6.png'],
    title: 'Drops By GreenBudzCBD Gummies 5mg THCΔ9 2.5mg CBG per ct Rodeo Queen – 20ct',
    location: '20 gomas',
    deliveryTime: '15-35 dias úteis',
    price: 'WSC-369,00',
    description: 'Extrato de cannabis tipo "Live Rosin" sem solvente rico em Tetrahidrocanabinol e Canabigerol diluído em 20 gomas sem aditivos químicos e veganas feitas a partir de pectina com sabor natural de Strawberry. Indicações: Insônia, Falta de Energia, Depressão, TDHA.',
    cta: 'IMPORT',
    link: 'https://ws-connectioncommerce.com/produto/wsc-drops6/'
},
{
    id: 134,
    images: ['/images/drops7.png'],
    title: 'Drops By GreenBudzCBD Gummies 5mg THC 5mg CBN 5mg CBD per ct Nightshade – 20ct',
    location: '20 gomas',
    deliveryTime: '15-35 dias úteis',
    price: 'WSC-369,00',
    description: 'Extrato de cannabis tipo "Live Rosin" sem solvente rico em Tetrahidrocanabinol, Canabinol e Canabidiol diluído em 20 gomas sem aditivos químicos e veganas feitas a partir de pectina com sabor natural de Groselha.',
    cta: 'IMPORT',
    link: 'https://ws-connectioncommerce.com/produto/wsc-drops7/'
},
{
    id: 135,
    images: ['/images/drops8.png'],
    title: 'Drops By GreenBudzCBD Gummies 5mg THC 10mg CBD per ct Cricket – 20ct',
    location: '20 gomas',
    deliveryTime: '15-35 dias úteis',
    price: 'WSC-369,00',
    description: 'Extrato de cannabis tipo "Live Rosin" sem solvente rico em Tetrahidrocanabinol e Canabidiol diluído em 20 gomas sem aditivos químicos e veganas feitas a partir de pectina com sabor natural de Blackberry.',
    cta: 'IMPORT',
    link: 'https://ws-connectioncommerce.com/produto/wsc-drops8/'
},
{
    id: 121,
    images: ['/images/d9-gumm-w.png'],
    title: 'Cherry D9 Gummies - 140mg',
    location: '10Unidades',
    deliveryTime: '15-35 dias úteis',
    price: 'WSC-222,00',
    description: 'Ingredientes: Cada goma contém uma dose medida de 14mg de Delta-9, facilitando o monitoramento do seu consumo - Contém 10 unidades. Dosagem: Δ-9 - 0,29%THCa - 0,007%CDB - 0,006%CBG - 0,007%CBN - 0,065%Canabinoides totais - 20,1 mgSe você está procurando uma guloseima saborosa e com um efeito poderoso, deixe-me apresentar as deliciosas Gomas Cherry D9 Gummies - 140 mg! Essas gomas não são apenas balas comuns; elas são infundidas com Delta-9 de alta qualidade para',
    cta: 'IMPORT',
    link: 'https://ws-connectioncommerce.com/produto/wsc-gummd9/'
},
{
    id: 122,
    images: ['/images/d9-tropical-w.png'],
    title: 'Green Gene Vegan Gummies Delta-9 THC',
    location: '25capsulas',
    deliveryTime: '15-35 dias úteis',
    price: 'WSC-445,00',
    description: 'Nossas gomas de Delta-9 de 30 mg oferecem uma dose precisa e consistente para quem busca uma experiência mais intensa de relaxamento e bem-estar. Formuladas com extrato de cânhamo de espectro completo de alta qualidade, essas gomas combinam',
    cta: 'IMPORT',
    link: 'https://ws-connectioncommerce.com/produto/wsc-vegand9gumm/'
},
{
    id: 123,
    images: ['/images/d9-gumm-vanilla-w.png'],
    title: 'Cherry Vanilla D9 Gummies - 250mg',
    location: '5Unidades',
    deliveryTime: '15-35 dias úteis',
    price: 'WSC-279,90',
    description: 'Se você é fã de comestíveis e gosta de explorar novos sabores no mundo da cannabis, apresentamos uma delícia: As Gomas Cherry Vanilla D9 - 250mg. Essas deliciosas gomas têm um efeito incrível com sua mistura equilibrada de',
    cta: 'IMPORT',
    link: 'https://ws-connectioncommerce.com/produto/wsc-vnllgummd9/'
},
];

const PropertyCard = ({ item }) => {
  const [currentImgIndex, setCurrentImgIndex] = useState(0);
  const touchStart = useRef(0);
  const touchEnd = useRef(0);
  const hasMultipleImages = item.images && item.images.length > 1;

  // Slide automático inteligente a cada 5 segundos
  useEffect(() => {
    if (!hasMultipleImages) return;
    const autoSlider = setInterval(() => {
      setCurrentImgIndex((prev) => (prev + 1) % item.images.length);
    }, 5000);
    return () => clearInterval(autoSlider);
  }, [hasMultipleImages, item.images.length]);

  const handleNext = () => {
    if (hasMultipleImages) {
      setCurrentImgIndex((prev) => (prev + 1) % item.images.length);
    }
  };

  const handlePrev = () => {
    if (hasMultipleImages) {
      setCurrentImgIndex((prev) => (prev - 1 + item.images.length) % item.images.length);
    }
  };

  // Lógica invisível e responsiva para Touch (Swipe)
  const handleTouchStart = (e) => {
    touchStart.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEnd.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStart.current || !touchEnd.current) return;
    const swipeDistance = touchStart.current - touchEnd.current;
    
    if (swipeDistance > 40) handleNext();  // Arrasto p/ esquerda -> Próxima
    if (swipeDistance < -40) handlePrev(); // Arrasto p/ direita -> Anterior

    touchStart.current = 0;
    touchEnd.current = 0;
  };

  return (
    <div className="property-card">
      <div 
        className="property-image-wrapper"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {item.badge && <div className="property-badge">{item.badge}</div>}
        
        {item.images.map((imgUrl, idx) => (
          <img
            key={idx}
            src={imgUrl}
            alt={`${item.title} - ${idx + 1}`}
            className={`property-image ${idx === currentImgIndex ? 'active' : ''}`}
            loading="lazy"
          />
        ))}
        
        <span className="property-price">{item.price}</span>
      </div>

      <div className="property-info">
        <h3 className="property-title">{item.title}</h3>
        
        <div className="property-meta-row">
          <span className="property-location">{item.location}</span>
          <span className="meta-divider">•</span>
          <span className="property-delivery">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="3" width="15" height="13"></rect><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon><circle cx="5.5" cy="18.5" r="2.5"></circle><circle cx="18.5" cy="18.5" r="2.5"></circle></svg>
            {item.deliveryTime}
          </span>
        </div>
        
        <p className="property-description">{item.description}</p>
        
        <a 
          href={item.link} 
          target="_blank" 
          rel="noopener noreferrer" 
          className={`property-cta ${item.cta === 'SOLD OUT' ? 'sold-out' : ''}`}
        >
          {item.cta}
        </a>
      </div>
    </div>
  );
};

const PropertiesImp = ({ title = 'WS | Imports', id = 'properties-imp' }) => {
  if (!propertiesImpData || propertiesImpData.length === 0) return null;

  return (
    <section className="properties-imp-section" id={id}>
      <div className="section-header">
        <h2 className="section-title">{title}</h2>
      </div>
      <div className="properties-imp-container">
        {propertiesImpData.map((item) => (
          <PropertyCard key={item.id} item={item} />
        ))}
      </div>
    </section>
  );
};

export default PropertiesImp;