import React from 'react';
import Navigation from '../components/Navigation';
import HeroSection from '../components/HeroSection';
import LogoMarquee from '../components/LogoMarquee';
import StatementSection from '../components/StatementSection';
import FeaturesSection from '../components/FeaturesSection';
import CapabilitiesSection from '../components/CapabilitiesSection';
import HowItWorksSection from '../components/HowItWorksSection';
import TestimonialsSection from '../components/TestimonialsSection';
import WebDevServices from '../components/WebDevServices';
import CTASection from '../components/CTASection';
import ContactSection from '../components/ContactSection';
import Footer from '../components/Footer';

const Home = () => {
  return (
    <div className="min-h-screen bg-[#0a0f0d]">
      <Navigation />
      <HeroSection />
      <LogoMarquee />
      <StatementSection />
      <FeaturesSection />
      <CapabilitiesSection />
      <HowItWorksSection />
      <TestimonialsSection />
      <WebDevServices />
      <CTASection />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default Home;
