import {
    ScrollView
} from "react-native";

import CTASection from "src/app/CapaPresentacion/components/CTASection";
import Footer from "src/app/CapaPresentacion/components/Footer";
import FeaturesSection from "/src/app/CapaPresentacion/components/FeaturesSection";
import Header from "/src/app/CapaPresentacion/components/Header";
import HeroSection from "/src/app/CapaPresentacion/components/HeroSection";

export default function LandingScreen() 
{
  return (
    <ScrollView className="flex-1 bg-[#F5F1E8]">
      <Header />
      <HeroSection />
      <FeaturesSection />
      <CTASection />
      <Footer />
    </ScrollView>
  );
}