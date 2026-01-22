import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Button } from './ui/button';

const HowItWorksSection = () => {
  const steps = [
    {
      title: 'Plan & Prepare',
      description: 'We review goals, structure your site, and map the essentials.',
      visual: 'https://cdn.prod.website-files.com/696138587892fe484868dcdd/696138597892fe484868ddad_step-1-image.svg',
    },
    {
      title: 'Design & Develop',
      description: 'We build fast, test often, and refine until everything feels right.',
      visual: 'https://cdn.prod.website-files.com/696138587892fe484868dcdd/696138597892fe484868ddbb_step-2-image.svg',
    },
    {
      title: 'Launch & Support',
      description: 'We deploy, optimize, and keep your site running smoothly.',
      visual: 'https://cdn.prod.website-files.com/696138587892fe484868dcdd/696138597892fe484868dde1_step-3-image.svg',
    },
  ];

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
    <section id="how-it-works" className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="mb-12 sm:mb-16 px-2">
          <span className="inline-block px-3 sm:px-4 py-1.5 rounded border border-green-500/30 bg-green-500/5 text-green-500 text-xs font-medium tracking-wider uppercase mb-4 sm:mb-6">
            How it works
          </span>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3 sm:mb-4">How we build your site</h2>
              <p className="text-base sm:text-lg md:text-xl text-gray-400">Simple steps. Clear results.</p>
            </div>
            <Button
              onClick={() => scrollToSection('contact')}
              className="hidden md:flex bg-green-500 hover:bg-green-600 text-[#0a0f0d] font-medium px-6 py-3 rounded transition-colors items-center gap-2"
            >
              Request demo
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div
              key={index}
              className="group relative p-8 rounded-2xl border border-green-500/10 bg-gradient-to-b from-green-500/5 to-transparent hover:border-green-500/30 transition-all duration-300"
            >
              {/* Step Number */}
              <div className="absolute top-6 right-6 w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center">
                <span className="text-green-500 font-bold">{index + 1}</span>
              </div>

              {/* Visual */}
              <div className="mb-8 h-48 flex items-center justify-center">
                <img
                  src={step.visual}
                  alt={step.title}
                  className="w-full h-full object-contain opacity-80 group-hover:opacity-100 transition-opacity"
                />
              </div>

              {/* Content */}
              <h3 className="text-2xl font-bold text-white mb-3">{step.title}</h3>
              <p className="text-gray-400 leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
