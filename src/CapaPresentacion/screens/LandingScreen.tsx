import {
  ScrollView
} from "react-native";

import CTASection from "@/CapaPresentacion/components/CTASection";
import FeaturesSection from "@/CapaPresentacion/components/FeaturesSection";
import Footer from "@/CapaPresentacion/components/Footer";
import Header from "@/CapaPresentacion/components/Header";
import HeroSection from "@/CapaPresentacion/components/HeroSection";

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