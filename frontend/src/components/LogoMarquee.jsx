import React from 'react';

const LogoMarquee = () => {
  const logos = [
    { name: 'Zunapulse', url: 'https://cdn.prod.website-files.com/696138587892fe484868dcdd/696138597892fe484868dd9d_client-logo-1.svg' },
    { name: 'Flowbyte', url: 'https://cdn.prod.website-files.com/696138587892fe484868dcdd/696138597892fe484868dd9e_client-logo-2.svg' },
    { name: 'CipherCloud', url: 'https://cdn.prod.website-files.com/696138587892fe484868dcdd/696138597892fe484868dd9f_client-logo-3.svg' },
    { name: 'Novastack', url: 'https://cdn.prod.website-files.com/696138587892fe484868dcdd/696138597892fe484868dda0_client-logo-4.svg' },
  ];

  // Duplicate logos for seamless scrolling
  const allLogos = [...logos, ...logos, ...logos, ...logos];

  return (
    <section className="py-16 border-y border-green-500/10 overflow-hidden">
      <div className="mb-8">
        <p className="text-center text-sm text-gray-400 tracking-wider uppercase">
          Securing the World's Fastest-Growing Companies
        </p>
      </div>

      <div className="relative">
        <div className="flex animate-scroll">
          {allLogos.map((logo, index) => (
            <div
              key={index}
              className="flex-shrink-0 mx-12 flex items-center justify-center"
              style={{ width: '150px' }}
            >
              <img
                src={logo.url}
                alt={logo.name}
                className="h-8 w-auto opacity-40 hover:opacity-100 transition-opacity duration-300 filter grayscale hover:grayscale-0"
              />
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .animate-scroll {
          animation: scroll 30s linear infinite;
        }

        .animate-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
};

export default LogoMarquee;
