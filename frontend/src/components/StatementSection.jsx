import React from 'react';
import TextScrollReveal from './TextScrollReveal';

const StatementSection = () => {
  return (
    <section className="py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <TextScrollReveal
          as="h2"
          text="Websites shouldn’t feel complicated. With clean builds and modern systems, your brand stays sharp — always."
          className="text-5xl md:text-6xl font-bold leading-tight text-gray-500"
          baseOpacity={1}
          durationMs={220}
          pxPerWord={44}
          inactiveClassName="text-gray-500"
          activeClassName="text-white"
        />
      </div>
    </section>
  );
};

export default StatementSection;
