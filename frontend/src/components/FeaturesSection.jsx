import React from 'react';

const cards = [
  {
    badge: 'Fast builds. Clean code.',
    title: 'WordPress development',
    description: 'Custom themes, plugins, and lightning-speed performance.',
    visual:
      'https://cdn.prod.website-files.com/696138587892fe484868dcdd/696138597892fe484868dda3_object-1.svg',
  },
  {
    badge: 'Clarity from day one.',
    title: 'Zero confusion',
    description: 'Full visibility into design, structure, and workflow.',
    visual:
      'https://cdn.prod.website-files.com/696138587892fe484868dcdd/696138597892fe484868dda6_object-2.svg',
  },
  {
    badge: 'Connect everything. Effortlessly.',
    title: 'Seamless integrations',
    description: 'Payments, APIs, dashboards — everything synced in minutes.',
    visual:
      'https://cdn.prod.website-files.com/696138587892fe484868dcdd/696138597892fe484868ddc7_object-3.svg',
  },
];

const FeaturesSection = () => {
  return (
    <section id="features" className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 sm:gap-8 lg:gap-10 mb-10 sm:mb-14 px-2">
          <div>
            <span className="inline-block px-3 sm:px-4 py-1.5 rounded border border-green-500/30 bg-green-500/5 text-green-500 text-xs font-medium tracking-wider uppercase mb-3 sm:mb-4">
              Features
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-white max-w-xl">
              Built to support every need
            </h2>
          </div>
          <p className="text-base sm:text-lg md:text-xl text-gray-400 max-w-xl lg:text-right">
            From landing pages to full platforms, every part of your site works smoothly.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {cards.map((card, idx) => (
            <div
              key={idx}
              className="relative overflow-hidden rounded-2xl border border-green-500/25 bg-gradient-to-b from-green-500/10 to-transparent p-9 min-h-[420px] flex flex-col justify-between"
            >
              <div className="absolute inset-6 opacity-70 pointer-events-none flex items-start justify-center pt-2">
                <img src={card.visual} alt="" className="w-full h-1/2 object-contain mx-auto" />
              </div>
              <div className="relative z-10 mt-auto space-y-3">
                <p className="text-green-400 text-sm font-semibold">{card.badge}</p>
                <h3 className="text-2xl font-bold text-white">{card.title}</h3>
                <p className="text-gray-300 leading-relaxed text-base">{card.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
