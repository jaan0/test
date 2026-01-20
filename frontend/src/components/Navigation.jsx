import React, { useState, useEffect } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { Button } from './ui/button';

const Navigation = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-[#0a0f0d]/95 backdrop-blur-lg border-b border-green-500/10' : ''
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-5">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.scrollTo(0, 0)}>
            <div className="w-8 h-8 bg-green-500 rounded flex items-center justify-center">
              <ArrowUpRight className="w-5 h-5 text-[#0a0f0d]" />
            </div>
            <span className="text-xl font-semibold text-white tracking-wide">PROTEX</span>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-8">
            <button
              onClick={() => scrollToSection('features')}
              className="text-gray-300 hover:text-green-500 transition-colors text-sm"
            >
              Features
            </button>
            <button
              onClick={() => scrollToSection('capabilities')}
              className="text-gray-300 hover:text-green-500 transition-colors text-sm"
            >
              Capabilities
            </button>
            <button
              onClick={() => scrollToSection('how-it-works')}
              className="text-gray-300 hover:text-green-500 transition-colors text-sm"
            >
              How it works
            </button>
            <button
              onClick={() => scrollToSection('pricing')}
              className="text-gray-300 hover:text-green-500 transition-colors text-sm"
            >
              Pricing
            </button>
          </div>

          {/* CTA Button */}
          <Button
            onClick={() => scrollToSection('contact')}
            className="bg-green-500 hover:bg-green-600 text-[#0a0f0d] font-medium px-6 py-2 rounded transition-colors"
          >
            Request demo
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
