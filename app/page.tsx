import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import TrustSection from "./components/TrustSection";
import ServicesBento from "./components/ServicesBento";
import ProductsSection from "./components/ProductsSection";
import PricingSection from "./components/PricingSection";
import ProcessSection from "./components/ProcessSection";
import TechDeepDiveSection from "./components/TechDeepDiveSection";
import StatsAndTestimonial from "./components/StatsAndTestimonial";
import CtaSection from "./components/CtaSection";
import Footer from "./components/Footer";
import SmoothScroll from "./components/SmoothScroll";
import SpotlightTracker from "./components/SpotlightTracker";
import LoadingScreen from "./components/LoadingScreen";

export default function Home() {
  return (
    <>
      {/* 3D Model Loading Screen */}
      <LoadingScreen />

      {/* Lenis Smooth Scroll & cursor spotlight */}
      <SmoothScroll />
      <SpotlightTracker />

      {/* Floating Navigation */}
      <Navbar />

      {/* Main Sections */}
      <main id="main-content">
        <HeroSection />
        <TrustSection />
        <ServicesBento />
        <ProductsSection />
        <PricingSection />
        <ProcessSection />
        <TechDeepDiveSection />
        <StatsAndTestimonial />
        <CtaSection />
      </main>

      {/* Footer */}
      <Footer />
    </>
  );
}
