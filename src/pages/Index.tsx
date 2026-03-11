import { useState } from "react";
import Navbar from "@/components/Navbar";
import HeroCarousel from "@/components/HeroCarousel";
import MissionVision from "@/components/MissionVision";
import Services from "@/components/Services";
import AboutSection from "@/components/AboutSection";
import TeamSection from "@/components/TeamSection";
import Footer from "@/components/Footer";
import WelcomePopup from "@/components/WelcomePopup";

const Index = () => {
  const [userType, setUserType] = useState<"student" | "distributor" | "">("");

  return (
    <div className="min-h-screen bg-background">
      <WelcomePopup onUserTypeSelect={setUserType} />
      <Navbar />
      <HeroCarousel userType={userType} />
      <MissionVision />
      <Services />
      <AboutSection />
      <TeamSection />
      <Footer />
    </div>
  );
};

export default Index;
