import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import BackToTop from '../components/BackToTop';
import useScrollReveal from '../hooks/useScrollReveal';
import HeroSection from '../components/HeroSection';
import ServicesSection from '../components/ServicesSection';
import WhySection from '../components/WhySection';
import StatsSection from '../components/StatsSection';
import PortfolioSection from '../components/PortfolioSection';
import TechStackSection from '../components/TechStackSection';
import HomeCtaSection from '../components/HomeCtaSection';

export default function Home() {
  useScrollReveal();

  return (
    <>
      <Navbar />

      <HeroSection />

      <ServicesSection />

      <WhySection />

      <StatsSection />

      <PortfolioSection />

      <TechStackSection />

      <HomeCtaSection />

      <Footer variant="home" />
      <BackToTop />
    </>
  );
}
