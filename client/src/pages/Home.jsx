import React from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import GlassCard from "../components/GlassCard"; // 👈 importa o GlassCard
import HeroSlides from "../components/HeroSlides";
import VideoWelcome from "../components/VideoWelcome";
import HeroHashLegal from "../components/HeroHashLegal";
import HowItWorksSection from "../components/HowItWorksSection";
import WeedPassSection from "../components/WeedPassSection";
import VideoPlayer from "../components/VideoPlayer";
import CannabisSlides from "../components/CannabisSlides";
import IceSection from "../components/IceSection";
import FlowerWsc from "../components/FlowersWcs";



export default function Home() {
  return (
    <div className="home" id="home">
      {/* Header fixo no topo */}
      <Header />
      <HeroSlides />

      <VideoWelcome />

      <HeroHashLegal />

      <HowItWorksSection />

      {/* Cartão GlassCard único */}
      <GlassCard />

      <IceSection />

      <WeedPassSection />

      <FlowerWsc />      

      <CannabisSlides />

      <VideoPlayer />

    </div>
  );
}

