// src/pages/WSCClubNew.jsx
import React, { useState } from "react";

import HeroHashLegal from "../components/HeroHashLegal";
import FirstClub from "../components/FirstClub";
import GlassCardNacional from "../components/GlassCardNacional";
import GlassCardImport from "../components/GlassCardImport";
import MemberTreatmentFlow from "../components/MemberTreatmentFlow";
import Instruction from "../components/Instruction";
import IceSection from "../components/IceSection";
import ContactsModal from "../components/ContactsModal";
import PropertiesGrid from "../components/PropertiesGrid";
import PropertiesUtils from "../components/PropertiesUtils";
import PropertiesImp from "../components/PropertiesImp";

export default function WSCClubNew() {
  const [isContactsOpen, setIsContactsOpen] = useState(false);

  return (
    <div className="wsc-club-page">
      <FirstClub />

      <MemberTreatmentFlow />

      <HeroHashLegal />

      <GlassCardNacional />
      <GlassCardImport />

      <Instruction />

      <PropertiesGrid id="properties-grid" />

      <PropertiesImp id="properties-imp" />

      <PropertiesUtils id="properties-utils" />

      <IceSection />

      {isContactsOpen && (
        <ContactsModal onClose={() => setIsContactsOpen(false)} />
      )}
    </div>
  );
}
