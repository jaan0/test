import React from 'react';
import { ArrowUpRight } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-green-500/10 py-12 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Large Logo */}
        <div className="flex justify-center mb-12">
          <div className="relative">
            <div className="w-24 h-24 bg-green-500/10 rounded-2xl flex items-center justify-center">
              <ArrowUpRight className="w-12 h-12 text-green-500" />
            </div>
          </div>
        </div>

        {/* Footer Content */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-2">
            <div className="w-8 h-8 bg-green-500 rounded flex items-center justify-center">
              <ArrowUpRight className="w-5 h-5 text-[#0a0f0d]" />
            </div>
            <span className="text-xl font-semibold text-white tracking-wide">PROTEX</span>
          </div>
          <p className="text-gray-400 text-sm max-w-md mx-auto">
            Professional web development services for modern businesses. Fast, scalable, and built to grow.
          </p>
          <div className="pt-6 text-gray-500 text-sm">
            <p>&copy; {currentYear} PROTEX. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
