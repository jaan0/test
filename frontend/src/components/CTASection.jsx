import React from 'react';
import { Button } from './ui/button';
import { ArrowUpRight } from 'lucide-react';

const CTASection = () => {
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
    <section id="pricing" className="py-16 sm:py-20 md:py-24 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="relative rounded-2xl sm:rounded-3xl border border-green-500/20 bg-gradient-to-br from-green-500/10 to-transparent overflow-hidden">
          {/* Background Pattern */}
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: `
                linear-gradient(to right, #22c55e 1px, transparent 1px),
                linear-gradient(to bottom, #22c55e 1px, transparent 1px)
              `,
              backgroundSize: '40px 40px',
            }}
          />

          <div className="relative z-10 p-8 sm:p-12 md:p-16 text-center">
            <span className="inline-block px-3 sm:px-4 py-1.5 rounded border border-green-500/30 bg-green-500/5 text-green-500 text-xs font-medium tracking-wider uppercase mb-4 sm:mb-6">
              Solutions
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 sm:mb-6">Let's build something great</h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-400 mb-6 sm:mb-8 md:mb-10 max-w-2xl mx-auto px-2">
              Tell us what you need. We'll reply with a tailored plan.
            </p>
            <Button
              onClick={() => scrollToSection('contact')}
              className="bg-green-500 hover:bg-green-600 text-[#0a0f0d] font-medium px-6 sm:px-8 py-4 sm:py-6 text-sm sm:text-base rounded transition-colors inline-flex items-center gap-2"
            >
              Get a quote
              <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
