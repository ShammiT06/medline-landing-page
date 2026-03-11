import Navbar from "@/components/Navbar";
import HeroCarousel from "@/components/HeroCarousel";
import MissionVision from "@/components/MissionVision";
import Services from "@/components/Services";
import AboutSection from "@/components/AboutSection";
import TeamSection from "@/components/TeamSection";
import Footer from "@/components/Footer";
import VisitorPopup from "@/components/VisitorPopup";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroCarousel />
      <VisitorPopup />
      <MissionVision />
      <Services />
      <AboutSection />
      <TeamSection />
      <Footer />
    </div>
  );
};

export default Index;
