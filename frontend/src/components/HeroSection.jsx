import React from 'react';
import { Button } from './ui/button';
import { CheckCircle } from 'lucide-react';

const HeroSection = () => {
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      // Add offset for mobile devices, especially for contact section
      const isMobile = window.innerWidth < 768;
      // Calculate offset based on header height + some padding
      const headerHeight = 80; // Approximate header height
      const padding = isMobile ? 20 : 40;
      const offset = headerHeight + padding;
      
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = Math.max(0, elementPosition - offset);

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Grid Background */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `
              linear-gradient(to right, #22c55e 1px, transparent 1px),
              linear-gradient(to bottom, #22c55e 1px, transparent 1px)
            `,
            backgroundSize: '80px 80px',
            animation: 'gridMove 20s linear infinite',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0a0f0d]/50 to-[#0a0f0d]" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center pt-24 sm:pt-32 pb-16 sm:pb-20">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded border border-green-500/30 bg-green-500/5 mb-6 sm:mb-8 backdrop-blur-sm">
          <CheckCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-green-500" />
          <span className="text-xs sm:text-sm text-gray-300">Trusted by over 1,000 businesses worldwide</span>
        </div>

        {/* Main Heading */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 sm:mb-6 leading-tight px-2">
          <span className="text-white">Professional websites</span>
          <br />
          <span className="text-gray-400">for a digital-first world</span>
        </h1>

        {/* Subheading */}
        <p className="text-base sm:text-lg md:text-xl text-gray-400 mb-8 sm:mb-12 max-w-2xl mx-auto px-4">
          We design and build fast, scalable sites
          <br className="hidden sm:block" />
          <span className="sm:hidden"> </span>
          that help your business grow.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 px-4">
          <Button
            onClick={() => scrollToSection('contact')}
            className="bg-green-500 hover:bg-green-600 text-[#0a0f0d] font-medium px-6 sm:px-8 py-4 sm:py-6 text-sm sm:text-base rounded transition-colors w-full sm:w-auto"
          >
            Start a Project
          </Button>
          <Button
            onClick={() => scrollToSection('how-it-works')}
            variant="outline"
            className="border-green-500/30 text-green-500 hover:bg-green-500/10 px-6 sm:px-8 py-4 sm:py-6 text-sm sm:text-base rounded transition-colors w-full sm:w-auto"
          >
            View Portfolio
          </Button>
        </div>
      </div>

      <style>{`
        @keyframes gridMove {
          0% {
            transform: translate(0, 0);
          }
          100% {
            transform: translate(80px, 80px);
          }
        }
      `}</style>
    </section>
  );
};

export default HeroSection;
