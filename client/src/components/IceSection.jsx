import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const sections = [
  { title: "O que é THC Ice?", content: `A extração de THC Ice medicinal, também conhecida como Ice Hash, Bubble Hash ou Full Melt, é um método de concentração de cannabis que utiliza água gelada para separar os tricomas (glândulas resiníferas) das flores da planta. Este processo é considerado "sem solventes", pois não envolve o uso de produtos químicos, apenas água e gelo (Weedmaps).` },
  { title: "Como é feita a extração?", content: `1. Congelamento da planta: As flores de cannabis são congeladas para tornar os tricomas mais quebradiços.
2. Mistura com gelo e água: As flores congeladas são misturadas com gelo e água em um recipiente.
3. Agitação: A mistura é agitada para desprender os tricomas das flores.
4. Filtragem: A mistura é passada por uma série de bolsas de filtragem com diferentes tamanhos de malha (micrômetros) para separar os tricomas de acordo com seu tamanho (Root Sciences).
5. Secagem: Os tricomas coletados são secos ao ar para obter o produto final.
O nome "Ice" refere-se ao uso de gelo no processo de extração, que ajuda a preservar a qualidade da resina e facilita a separação dos tricomas (SouCannabis).` },
  { title: "Tipos de THC Ice", content: `- Unpressed Hash: É a forma mais comum, solta e em pó, ideal para adicionar a outros produtos ou consumir diretamente.
- Pressed Hash (Temple Ball): Obtido ao pressionar o hash para formar uma bola compacta, tradicionalmente usada para armazenamento e consumo.
- Full Melt: Hash de alta pureza que derrete completamente quando aquecido, ideal para dabbing.` },
  { title: "Uso medicinal do THC Ice", content: `O THC Ice é valorizado por sua pureza e preservação dos compostos naturais da cannabis, como canabinoides e terpenos. Seu uso medicinal pode ser eficaz no tratamento de condições como dor crônica, náuseas, epilepsia e outras enfermidades, quando utilizado sob orientação médica. É importante destacar que, apesar de ser uma forma concentrada de cannabis, o THC Ice não deve ser confundido com substâncias sintéticas como o "crack", que possuem efeitos e riscos diferentes (SouCannabis).` },
  { title: "Considerações finais", content: `A extração de THC Ice é uma técnica que permite obter um concentrado de cannabis de alta qualidade e sem o uso de solventes químicos. Seu uso medicinal pode ser benéfico, desde que seja realizado de forma responsável e sob supervisão profissional. É fundamental distinguir entre diferentes formas de cannabis e seus efeitos para garantir um tratamento seguro e eficaz.` },
];

const IceInfoCard = () => {
  const [expandedIndex, setExpandedIndex] = useState(null);
  const toggleSection = (index) => setExpandedIndex(expandedIndex === index ? null : index);

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundImage: 'url(/images/hash-legalizado-anvisa.jpg)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      padding: '16px',
      fontFamily: 'Arial, sans-serif'
    }}>
      <div style={{
        width: '100%',
        maxWidth: '800px',
        borderRadius: '24px',
        background: 'rgba(255,255,255,0.12)',
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(255,255,255,0.3)',
        boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
        padding: '24px',
        color: '#fff'
      }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 'bold', textAlign: 'center', marginBottom: '24px', color: '#000' }}>Extração de THC Ice Medicinal</h1>
        {sections.map((section, index) => (
          <motion.div key={index} layout style={{ marginBottom: '16px' }}>
            <button
              onClick={() => toggleSection(index)}
              style={{
                width: '100%',
                textAlign: 'left',
                padding: '16px',
                background: 'rgba(255,255,255,0.3)',
                borderRadius: '12px',
                fontSize: '1.1rem',
                fontWeight: '600',
                color: '#fff',
                cursor: 'pointer',
                marginBottom: '8px',
                border: 'none',
                transition: 'background 0.3s'
              }}
              onMouseOver={e => e.currentTarget.style.background='rgba(255,255,255,0.5)'}
              onMouseOut={e => e.currentTarget.style.background='rgba(255,255,255,0.3)'}
            >
              {section.title}
            </button>
            <AnimatePresence>
              {expandedIndex === index && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  style={{
                    overflow: 'hidden',
                    marginTop: '8px',
                    padding: '16px',
                    background: 'rgba(255,255,255,0.2)',
                    borderRadius: '12px',
                    fontSize: '0.9rem',
                    lineHeight: '1.6',
                    color: '#fff'
                  }}
                >
                  {section.content}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default IceInfoCard;
