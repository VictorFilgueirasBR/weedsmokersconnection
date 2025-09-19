// src/pages/WSCClub.jsx
import React, { useState } from "react";

// Importa os componentes da página Home.jsx
import HeroHashLegal from "../components/HeroHashLegal";
import FirstClub from "../components/FirstClub";
import HowItWorksSection from "../components/HowItWorksSection";
import VideoPlayer from "../components/VideoPlayer";
import VideoWelcome from "../components/VideoWelcome";
import CannabisSlides from "../components/CannabisSlides";
import GlassCardNacional from "../components/GlassCardNacional";
import GlassCardImport from "../components/GlassCardImport";
import GlassTry from "../components/GlassTry";
import MemberTreatmentFlow from "../components/MemberTreatmentFlow";
import IceSection from "../components/IceSection";
import FlowerWsc from "../components/FlowersWcs";
import ContactsModal from "../components/ContactsModal";
import PropertiesGrid from "../components/PropertiesGrid";

export default function WSCClub() {
  const [isContactsOpen, setIsContactsOpen] = useState(false);

  const handleOpenContacts = () => {
    setIsContactsOpen(true);
  };

  const handleCloseContacts = () => {
    setIsContactsOpen(false);
  };

  return (
    <div className="wsc-club-page">
      {/* O Header e Footer não estão aqui, pois são gerenciados pelo MainLayout */}

      <FirstClub />

      <VideoWelcome />

      <MemberTreatmentFlow />

      {/* Ao clicar nesses cards → abre o modal */}
      <div onClick={handleOpenContacts}>
        <GlassTry />
      </div>

      <div onClick={handleOpenContacts}>
        <GlassCardNacional />
      </div>

      <div onClick={handleOpenContacts}>
        <GlassCardImport />
      </div>

      <PropertiesGrid />

      <IceSection />

      <FlowerWsc />

      <VideoPlayer />

      <CannabisSlides />

      <HeroHashLegal />

      {/* Modal de contatos */}
      {isContactsOpen && <ContactsModal onClose={handleCloseContacts} />}
    </div>
  );
}
