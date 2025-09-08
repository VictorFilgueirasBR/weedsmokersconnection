// src/components/ Contatos Nacionais

import React from 'react';
import './GlassCardImport.scss';

const WallStyle = () => {
  return (
    <section className="import-style">
      <div className="image-wrapper">
        <img src="/images/hash-legalizado-anvisa26.jpg" alt="Wall Background" />

        <div className="overlay-text">
          <h2>Catálogo Importados</h2>
          <p>Basta seguir o passo a passo e cadastrar suas informações no GOV.</p>
        </div>
      </div>
    </section>
  );
};

export default WallStyle;
