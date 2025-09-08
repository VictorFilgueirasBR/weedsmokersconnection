// src/components/ProfileFooter.jsx

import React from 'react';

export default function ProfileFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="profile-footer">
      <p>Desenvolvido por WSC</p>
      <p>&copy; {year} Todos os direitos reservados.</p>
    </footer>
  );
}