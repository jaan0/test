import React from 'react';
import { Layers, Globe, Smartphone, Box, Zap } from 'lucide-react';

const CapabilitiesSection = () => {
  const capabilities = [
    {
      title: 'Built to scale with you',
      subtitle: 'Custom solutions',
      description:
        'Whether you need a simple site or a full platform, we design and develop systems that grow with your business — from landing pages to custom dashboards.',
      visual: 'https://cdn.prod.website-files.com/696138587892fe484868dcdd/696138597892fe484868ddda_security-layers.svg',
    },
    {
      title: 'Multi-region awareness',
      subtitle: 'Unified visibility. Global reach.',
      description: 'Your site stays fast and consistent across devices, browsers, and regions.',
      visual: 'https://cdn.prod.website-files.com/696138587892fe484868dcdd/696138597892fe484868ddc3_multi-region.svg',
    },
  ];

  const smallCapabilities = [
    {
      icon: <Smartphone className="w-6 h-6" />,
      title: 'Design that adapts',
      description: 'Smooth layouts that scale for devices, users, and content changes.',
    },
    {
      icon: <Box className="w-6 h-6" />,
      title: 'Flexible components',
      description: 'Modify, expand, or customize features without rebuilding your site.',
    },
  ];

  return (
    <section id="capabilities" className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full border border-green-500/30 bg-green-500/5 text-green-500 text-xs font-medium tracking-wider uppercase mb-6">
            Advanced Capabilities
          </span>
          <h2 className="text-5xl font-bold text-white mb-4">
            Automate growth. <br />Customize anything.
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl">
            These tools keep your site flexible, scalable, and future-ready.
          </p>
        </div>

        {/* Main Capabilities */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {capabilities.map((capability, index) => (
            <div
              key={index}
              className="group p-10 rounded-2xl border border-green-500/10 bg-gradient-to-br from-green-500/5 to-transparent hover:border-green-500/30 transition-all duration-300"
            >
              <div className="mb-8 h-48 flex items-center justify-center">
                <img
                  src={capability.visual}
                  alt={capability.title}
                  className="w-full h-full object-contain opacity-80 group-hover:opacity-100 transition-opacity"
                />
              </div>
              <p className="text-green-500 text-sm font-medium mb-3">{capability.subtitle}</p>
              <h3 className="text-3xl font-bold text-white mb-4">{capability.title}</h3>
              <p className="text-gray-400 leading-relaxed">{capability.description}</p>
            </div>
          ))}
        </div>

        {/* Small Capabilities Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {smallCapabilities.map((capability, index) => (
            <div
              key={index}
              className="group p-8 rounded-2xl border border-green-500/10 bg-gradient-to-br from-green-500/5 to-transparent hover:border-green-500/30 transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center mb-6 group-hover:bg-green-500/20 transition-colors">
                <div className="text-green-500">{capability.icon}</div>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{capability.title}</h3>
              <p className="text-gray-400 leading-relaxed">{capability.description}</p>
            </div>
          ))}

          {/* Zero-hassle updates */}
          <div className="group p-8 rounded-2xl border border-green-500/10 bg-gradient-to-br from-green-500/5 to-transparent hover:border-green-500/30 transition-all duration-300">
            <div className="mb-6 h-24 flex items-center justify-center">
              <img
                src="https://cdn.prod.website-files.com/696138587892fe484868dcdd/696138597892fe484868dddb_zero-config.svg"
                alt="Zero-hassle updates"
                className="w-full h-full object-contain opacity-80 group-hover:opacity-100 transition-opacity"
              />
            </div>
            <p className="text-green-500 text-sm font-medium mb-3">Always up to date. Always secure.</p>
            <h3 className="text-xl font-bold text-white mb-3">Zero–hassle updates</h3>
            <p className="text-gray-400 leading-relaxed">
              We handle maintenance, fixes, and improvements — keeping everything smooth without your team doing a thing.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CapabilitiesSection;
