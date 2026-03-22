import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import BackToTop from '../components/BackToTop';
import useScrollReveal from '../hooks/useScrollReveal';
import HeroSection from '../components/HeroSection';
import LogosBar from '../components/LogosBar';
import ServicesSection from '../components/ServicesSection';
import WhySection from '../components/WhySection';
import StatsSection from '../components/StatsSection';
import PortfolioSection from '../components/PortfolioSection';
import TestimonialsSection from '../components/TestimonialsSection';
import TechStackSection from '../components/TechStackSection';
import HomeCtaSection from '../components/HomeCtaSection';

export default function Home() {
  useScrollReveal();

  return (
    <>
      <Navbar />

      <HeroSection />
      
      <LogosBar />
      
      <ServicesSection />
      
      <WhySection />
      
      <StatsSection />
      
      <PortfolioSection />
      
      <TestimonialsSection />
      
      <TechStackSection />
      
      <HomeCtaSection />

      <Footer variant="home" />
      <BackToTop />
    </>
  );
}
