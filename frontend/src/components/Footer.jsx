import React from 'react';
import { ArrowUpRight } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#050a05] text-gray-400 py-16 px-6 font-sans">
      <div className="max-w-7xl mx-auto">
        {/* Large Glowing Logo Header */}
        <div className="flex flex-col items-center mb-20">
          <div className="flex items-center gap-4 text-green-500 opacity-80">
            <ArrowUpRight className="w-16 h-16 md:w-24 md:h-24 stroke-[1.5px]" />
            <h1 className="text-6xl md:text-8xl font-light tracking-[0.2em] uppercase">
              JSMQ
            </h1>
          </div>
          <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-green-500/50 to-transparent mt-8 shadow-[0_0_15px_rgba(34,197,94,0.5)]" />
        </div>

        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          {/* Brand Column */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-green-500 rounded flex items-center justify-center">
                <ArrowUpRight className="w-5 h-5 text-black" />
              </div>
              <span className="text-xl font-bold text-white tracking-widest uppercase">JSMQ</span>
            </div>
            <p className="text-sm leading-relaxed max-w-xs text-#aaa-400">
              Smart, scalable protection, built for teams that move fast.
            </p>
            <div className="space-y-4 pt-4">
              <div>
                <p className="text-xs uppercase tracking-widest mb-1">Email</p>
                <a href="mailto:hello@protex.com" className="text-green-500 hover:text-green-400 transition-colors">
                  hello@jsmq.com
                </a>
              </div>
              <div>
                <p className="text-xs uppercase tracking-widest mb-1">Phone</p>
                <p className="text-white">+32 01 23 45 67</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-grey font-medium mb-6">Navigation</h4>
            <ul className="space-y-4 text-sm text-white">
              <li><a href="#" className="hover:text-green-500 transition-colors">Features</a></li>
              <li><a href="#" className="hover:text-green-500 transition-colors">Capabilities</a></li>
              <li><a href="#" className="hover:text-green-500 transition-colors">How it works</a></li>
              <li><a href="#" className="hover:text-green-500 transition-colors">Pricing</a></li>
            </ul>
          </div>

          {/* Follow Us */}
          <div>
            <h4 className="text-grey font-medium mb-6">Follow us</h4>
            <ul className="space-y-4 text-sm text-white">
              <li><a href="#" className="hover:text-green-500 transition-colors">Twitter</a></li>
              <li><a href="#" className="hover:text-green-500 transition-colors">Instagram</a></li>
              <li><a href="#" className="hover:text-green-500 transition-colors">Github</a></li>
              <li><a href="#" className="hover:text-green-500 transition-colors">Linkedin</a></li>
            </ul>
          </div>

          {/* Address */}
          <div>
            <h4 className="text-grey font-medium mb-6">Address</h4>
            <p className="text-sm leading-relaxed text-white">
              Protex Security Ltd. 123<br />
              Cyberpark Avenue 1000<br />
              Brussels, Belgium
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-8 flex justify-center">
          <p className="text-xs text-gray-500">
            © Copyright JSMQ {currentYear}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;