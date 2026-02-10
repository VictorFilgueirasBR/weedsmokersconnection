// src/pages/WSCClub.jsx
import React, { useState, useEffect } from "react";

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

// 🔐 TOKEN DE ACESSO (VOCÊ CONTROLA ISSO)
const SECRET_ACCESS_TOKEN = "wsc-club-ice";

export default function WSCClub() {
  const [isContactsOpen, setIsContactsOpen] = useState(false);
  const [hasAccess, setHasAccess] = useState(false);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("access");

    if (token === SECRET_ACCESS_TOKEN) {
      setHasAccess(true);
    }

    setChecked(true);
  }, []);

  // Evita piscar conteúdo
  if (!checked) return null;

  // 🔒 BLOQUEIO TOTAL
  if (!hasAccess) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#0a0a0a",
          color: "#fff",
          textAlign: "center",
          padding: "2rem",
        }}
      >
        <div>
          <h1 style={{ fontSize: "2.2rem", marginBottom: "1rem" }}>
            🔒 Área exclusiva
          </h1>
          <p style={{ opacity: 0.75 }}>
            Este conteúdo é acessível apenas por link autorizado.
          </p>
        </div>
      </div>
    );
  }

  // ✅ CONTEÚDO LIBERADO
  return (
    <div className="wsc-club-page">
      <FirstClub />

      <WelcomeClubVideo />

      <StepByStepInline />

      <MemberTreatmentFlow />

      <GlassTry />
      <GlassCardNacional />
      <GlassCardImport />

      <Instruction />

      <PropertiesGrid />

      <ListNacional />

      <IceSection />

      <FlowerWsc />

      <VideoPlayer />

      <CannabisSlides />

      <HeroHashLegal />

      {isContactsOpen && (
        <ContactsModal onClose={() => setIsContactsOpen(false)} />
      )}
    </div>
  );
}
