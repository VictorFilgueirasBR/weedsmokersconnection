// src/components/ Contatos Nacionais

import React from 'react';
import './GlassCardNacional.scss';

const WallStyle = () => {
  return (
    <section className="nacional-style">
      <div className="image-wrapper">
        <img src="/images/background-heronslides.jpg" alt="Wall Background" />

        <div className="overlay-text">
          <h2>Catálogo Nacional</h2>
          <p>Fique por dentro das novidades toda semana.</p>
        </div>
      </div>
    </section>
  );
};

export default WallStyle;
