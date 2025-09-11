// src/components/ContactsModal.jsx
import React, { useEffect, useCallback } from "react";
import { HiUsers } from "react-icons/hi2";

/*
  This file inlines the styling to avoid depending on an external
  ContactsModal.scss file (the build error indicated that file was
  missing). The styles are injected into document.head on first mount.

  Usage:
    <ContactsModal onClose={() => setShow(false)} />

  The modal supports closing via:
   - clicking the close button
   - clicking the dark overlay (outside the modal)
   - pressing Escape
*/

const contactsData = {
  "Médicos": [
    { name: "Drs. Prescritor", link: "https://abecmed.com.br/?fbclid=PAT01DUAMvMpBleHRuA2FlbQIxMAABp3Nsla7Cr-Nm9W3qCd0iiTHb1TyuLtjx3ved4ZcTiDqfSIZ0wlzeR7DVTQ9g_aem_rbZtUFtYN_y2wZun7tsCGQ" },
    { name: "Dra. Prescritora", link: "https://api.whatsapp.com/send/?phone=5581998107689&text=Teleconsulta&type=phone_number&app_absent=0&fbclid=PAT01DUAMvMgRleHRuA2FlbQIxMAABpzf5iEX9TDU4nigrTr3JLS0C5qJCRIqHMUR5m_MDM2yrlBisjDBOiyYeLrKp_aem_1F1skIeQeHT09boWWszeeA" },
  ],
  "Fornecedores Nacionais": [
    { name: "Fornecedor SP", link: "http://instagram.com/Greenway.cbd" },
    { name: "Fornecedor RJ", link: "https://abecmed.com.br/?fbclid=PAT01DUAMvMpBleHRuA2FlbQIxMAABp3Nsla7Cr-Nm9W3qCd0iiTHb1TyuLtjx3ved4ZcTiDqfSIZ0wlzeR7DVTQ9g_aem_rbZtUFtYN_y2wZun7tsCGQ" },
  ],
  "Fornecedores Importados": [
    { name: "Importados", link: "https://institutozasso.com.br/" },
    { name: "Importados EU", link: "https://flowermed.com.br/" },
  ],
};

const styles = `
:root {
  --primary-color: rgba(154, 252, 255, 0.85);
  --primary-accent: rgba(0, 255, 200, 0.7);
  --modal-bg: rgba(255, 255, 255, 0.05);
  --modal-border: rgba(255, 255, 255, 0.1);
  --text-color: #ffffff;
  --shadow-color: rgba(0,0,0,0.45);
}

/* Overlay */
.contacts-overlay {
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  animation: contacts-fadeIn 0.28s ease-out;
}

/* Modal */
.contacts-modal {
  width: 92%;
  max-width: 680px;
  background: var(--modal-bg);
  border-radius: 22px;
  padding: 28px;
  color: var(--text-color);
  box-shadow: 0 30px 80px var(--shadow-color);
  border: 1px solid var(--modal-border);
  backdrop-filter: blur(10px) saturate(180%);
  -webkit-backdrop-filter: blur(10px) saturate(180%);
  position: relative;
  animation: contacts-scaleIn 0.32s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

/* Close button */
.contacts-modal .close-btn {
  position: absolute;
  right: 18px;
  top: 12px;
  background: transparent;
  border: none;
  color: var(--text-color);
  font-size: 1.5rem;
  cursor: pointer;
  opacity: 0.85;
  transition: transform .18s ease, opacity .18s ease;
}

.contacts-modal .close-btn:hover { transform: rotate(90deg); opacity: 1; }

/* Title */
.contacts-modal h3 {
  margin: 0 0 14px 0;
  text-align: center;
  font-size: 1.6rem;
  font-weight: 600;
}

.contacts-section {
  margin-bottom: 18px;
}

.contacts-section h4 {
  margin: 8px 0 10px 0;
  font-size: 1.05rem;
  color: var(--primary-color);
  font-weight: 700;
  letter-spacing: 0.02em;
}

.contacts-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.contact-card {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 12px 14px;
  border-radius: 14px;
  text-decoration: none;
  color: var(--text-color);
  background: rgba(255,255,255,0.03);
  border: 1px solid rgba(255,255,255,0.08);
  backdrop-filter: blur(6px);
  transition: transform .18s ease, background .18s ease, box-shadow .18s ease;
}

.contact-card:hover {
  transform: translateY(-4px);
  background: rgba(255,255,255,0.06);
  box-shadow: 0 10px 24px rgba(0,0,0,0.28);
}

.icon-wrapper {
  width: 46px;
  height: 46px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255,255,255,0.06);
  border: 1px solid rgba(255,255,255,0.06);
}

.contact-icon {
  font-size: 1.35rem;
  color: var(--primary-color);
}

.contact-name { font-size: 1rem; font-weight: 600; }

/* Animations */
@keyframes contacts-fadeIn { from { opacity: 0 } to { opacity: 1 } }
@keyframes contacts-scaleIn { from { transform: scale(.985); opacity: 0 } to { transform: scale(1); opacity: 1 } }

/* Responsive tweaks */
@media (min-width: 780px) {
  .contacts-modal { padding: 36px; }
  .contacts-list { gap: 12px; }
}
`;

function ensureStylesInjected() {
  if (typeof document === "undefined") return;
  if (document.getElementById("contacts-modal-styles")) return;
  const style = document.createElement("style");
  style.id = "contacts-modal-styles";
  style.type = "text/css";
  style.appendChild(document.createTextNode(styles));
  document.head.appendChild(style);
}

function ContactsModal({ onClose = () => {} }) {
  useEffect(() => {
    ensureStylesInjected();

    function onKey(e) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const handleOverlayClick = useCallback((e) => {
    // close only if user clicked the overlay itself (not the modal)
    if (e.target && e.target.classList && e.target.classList.contains("contacts-overlay")) {
      onClose();
    }
  }, [onClose]);

  return (
    <div className="contacts-overlay" onMouseDown={handleOverlayClick}>
      <div className="contacts-modal" role="dialog" aria-modal="true" aria-label="Lista de contatos">
        <button className="close-btn" aria-label="Fechar" onClick={onClose}>
          ✕
        </button>

        <h3>Lista de Contatos</h3>

        {Object.entries(contactsData).map(([section, contacts], idx) => (
          <div key={idx} className="contacts-section">
            <h4>{section}</h4>
            <div className="contacts-list">
              {contacts.map((contact, i) => (
                <a
                  key={i}
                  className="contact-card"
                  href={contact.link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div className="icon-wrapper">
                    <HiUsers className="contact-icon" />
                  </div>
                  <div className="contact-name">{contact.name}</div>
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ContactsModal;
