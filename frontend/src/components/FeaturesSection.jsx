import React from 'react';
import { Radar, Eye, Link2 } from 'lucide-react';

const FeaturesSection = () => {
  const features = [
    {
      icon: <Radar className="w-8 h-8" />,
      badge: 'Fast builds. Clean code.',
      title: 'WordPress development',
      description: 'Custom themes, plugins, and lightning-speed performance.',
      visual: 'https://cdn.prod.website-files.com/696138587892fe484868dcdd/696138597892fe484868dda3_object-1.svg',
    },
    {
      icon: <Eye className="w-8 h-8" />,
      badge: 'Clarity from day one.',
      title: '] Zero confusion',
      description: 'Full visibility into design, structure, and workflow.',
      visual: 'https://cdn.prod.website-files.com/696138587892fe484868dcdd/696138597892fe484868dda6_object-2.svg',
    },
    {
      icon: <Link2 className="w-8 h-8" />,
      badge: 'Connect everything. Effortlessly.',
      title: 'Seamless integrations',
      description: 'Payments, APIs, dashboards — everything synced in minutes.',
      visual: 'https://cdn.prod.website-files.com/696138587892fe484868dcdd/696138597892fe484868ddc7_object-3.svg',
    },
  ];

  return (
    <section id="features" className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full border border-green-500/30 bg-green-500/5 text-green-500 text-xs font-medium tracking-wider uppercase mb-6">
            Features
          </span>
          <h2 className="text-5xl font-bold text-white mb-4">Built to support every need</h2>
          <p className="text-xl text-gray-400 max-w-2xl">
            From landing pages to full platforms, every part of your site works smoothly.
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative p-8 rounded-2xl border border-green-500/10 bg-gradient-to-b from-green-500/5 to-transparent hover:border-green-500/30 transition-all duration-300 cursor-pointer"
            >
              {/* Visual Icon */}
              <div className="mb-12 h-48 flex items-center justify-center">
                <img
                  src={feature.visual}
                  alt={feature.title}
                  className="w-full h-full object-contain opacity-80 group-hover:opacity-100 transition-opacity"
                />
              </div>

              {/* Badge */}
              <p className="text-green-500 text-sm font-medium mb-3">{feature.badge}</p>

              {/* Title */}
              <h3 className="text-2xl font-bold text-white mb-3">{feature.title}</h3>

              {/* Description */}
              <p className="text-gray-400 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
