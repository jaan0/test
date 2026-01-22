import React, { useState, useEffect } from 'react';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import { Button } from './ui/button';

const Navigation = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
    setMobileMenuOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-[#0a0f0d]/95 backdrop-blur-lg border-b border-green-500/10' : ''
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-5">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.scrollTo(0, 0)}>
            <div className="w-8 h-8 bg-green-500 rounded flex items-center justify-center">
              <ArrowUpRight className="w-5 h-5 text-[#0a0f0d]" />
            </div>
            <span className="text-lg sm:text-xl font-semibold text-white tracking-wide">JSMQ</span>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-6 lg:gap-8">
            <button
              onClick={() => scrollToSection('features')}
              className="text-gray-300 hover:text-green-500 transition-colors text-sm"
            >
              Features
            </button>
            <button
              onClick={() => scrollToSection('services')}
              className="text-gray-300 hover:text-green-500 transition-colors text-sm"
            >
              Services
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

          {/* Desktop CTA Button */}
          <div className="hidden md:block">
            <Button
              onClick={() => scrollToSection('contact')}
              className="bg-green-500 hover:bg-green-600 text-[#0a0f0d] font-medium px-4 lg:px-6 py-2 rounded transition-colors text-sm"
            >
              Request demo
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-white p-2"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-green-500/10 pt-4">
            <div className="flex flex-col gap-4">
              <button
                onClick={() => scrollToSection('features')}
                className="text-left text-gray-300 hover:text-green-500 transition-colors text-sm py-2"
              >
                Features
              </button>
              <button
                onClick={() => scrollToSection('services')}
                className="text-left text-gray-300 hover:text-green-500 transition-colors text-sm py-2"
              >
                Services
              </button>
              <button
                onClick={() => scrollToSection('how-it-works')}
                className="text-left text-gray-300 hover:text-green-500 transition-colors text-sm py-2"
              >
                How it works
              </button>
              <button
                onClick={() => scrollToSection('pricing')}
                className="text-left text-gray-300 hover:text-green-500 transition-colors text-sm py-2"
              >
                Pricing
              </button>
              <Button
                onClick={() => scrollToSection('contact')}
                className="bg-green-500 hover:bg-green-600 text-[#0a0f0d] font-medium px-4 py-2 rounded transition-colors text-sm w-full mt-2"
              >
                Request demo
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
