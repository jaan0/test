import React from 'react';
import { Button } from './ui/button';
import { CheckCircle } from 'lucide-react';

const HeroSection = () => {
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
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
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center pt-32 pb-20">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-green-500/30 bg-green-500/5 mb-8 backdrop-blur-sm">
          <CheckCircle className="w-4 h-4 text-green-500" />
          <span className="text-sm text-gray-300">Trusted by over 1,000 businesses worldwide</span>
        </div>

        {/* Main Heading */}
        <h1 className="text-6xl md:text-7xl font-bold mb-6 leading-tight">
          <span className="text-white">Professional websites</span>
          <br />
          <span className="text-gray-400">for a digital-first world</span>
        </h1>

        {/* Subheading */}
        <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto">
          We design and build fast, scalable sites
          <br />
          that help your business grow.
        </p>

        {/* CTA Buttons */}
        <div className="flex items-center justify-center gap-4">
          <Button
            onClick={() => scrollToSection('contact')}
            className="bg-green-500 hover:bg-green-600 text-[#0a0f0d] font-medium px-8 py-6 text-base rounded transition-colors"
          >
            Start a Project
          </Button>
          <Button
            onClick={() => scrollToSection('how-it-works')}
            variant="outline"
            className="border-green-500/30 text-green-500 hover:bg-green-500/10 px-8 py-6 text-base rounded transition-colors"
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
