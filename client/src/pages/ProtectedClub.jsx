// src/pages/WSCClub.jsx
import React from 'react';

// Importa os componentes da página Home.jsx


import HeroHashLegal from "../components/HeroHashLegal";
import FirstClub from "../components/FirstClub";
import HowItWorksSection from "../components/HowItWorksSection";
import VideoPlayer from "../components/VideoPlayer";
import CannabisSlides from "../components/CannabisSlides";
import GlassCardNacional from "../components/GlassCardNacional";
import GlassCardImport from "../components/GlassCardImport";
import GlassTry from "../components/GlassTry";
import MemberTreatmentFlow from '../components/MemberTreatmentFlow';





export default function WSCClub() {
  return (
    <div className="wsc-club-page">
      {/* O Header e Footer não estão aqui, pois são gerenciados pelo MainLayout */}

      <FirstClub />

      <MemberTreatmentFlow />
      
      <GlassTry />

      <GlassCardNacional />
      
      <GlassCardImport />

      <HowItWorksSection />
      
      <VideoPlayer />

      <CannabisSlides />

      <HeroHashLegal />

      

      

    </div>
  );
}