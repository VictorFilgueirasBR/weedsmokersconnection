// src/pages/WSCClub.jsx
import React, { useState } from "react";

// Importa os componentes da página Home.jsx
import HeroHashLegal from "../components/HeroHashLegal";
import FirstClub from "../components/FirstClub";
import WelcomeClubVideo from "../components/WelcomeClubVideo";
import VideoPlayer from "../components/VideoPlayer";
import CannabisSlides from "../components/CannabisSlides";
import GlassCardNacional from "../components/GlassCardNacional";
import GlassCardImport from "../components/GlassCardImport";
import GlassTry from "../components/GlassTry";
import MemberTreatmentFlow from "../components/MemberTreatmentFlow";
import Instruction from "../components/Instruction";
import IceSection from "../components/IceSection";
import FlowerWsc from "../components/FlowersWcs";
import ContactsModal from "../components/ContactsModal";
import PropertiesGrid from "../components/PropertiesGrid";
import StepByStepInline from "../components/StepByStepInline";
import ListNacional from "../components/ListNacional";


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

      <WelcomeClubVideo />

      

      <StepByStepInline />

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

      <Instruction />

      <PropertiesGrid />

      <ListNacional />

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
