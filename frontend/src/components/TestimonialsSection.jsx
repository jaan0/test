import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const TestimonialsSection = () => {
  const testimonials = [
    {
      name: 'Lina Rodriguez',
      role: 'CTO',
      company: 'Novastack',
      logo: 'https://cdn.prod.website-files.com/696138587892fe484868dcdd/696138597892fe484868dda0_client-logo-4.svg',
      image: 'https://cdn.prod.website-files.com/696138587892fe484868dcdd/696138597892fe484868dddf_profile-image-7%20Small.avif',
      text: 'Protex flagged a critical misconfig in our staging server within minutes. That alone saved us from a potential breach.',
    },
    {
      name: 'Markus Lenz',
      role: 'Head of Security',
      company: 'Ledgerly',
      logo: 'https://cdn.prod.website-files.com/696138587892fe484868dcdd/696138597892fe484868ddd8_client-logo-5.svg',
      image: 'https://cdn.prod.website-files.com/696138587892fe484868dcdd/696138597892fe484868dde0_profile-man-glasses%201%20Small.avif',
      text: 'We switched from a bloated enterprise solution to Protex, and got better visibility with half the complexity.',
    },
    {
      name: 'Jason Mehta',
      role: 'DevOps Lead',
      company: 'Flowbyte',
      logo: 'https://cdn.prod.website-files.com/696138587892fe484868dcdd/696138597892fe484868dd9e_client-logo-2.svg',
      image: 'https://cdn.prod.website-files.com/696138587892fe484868dcdd/696138597892fe484868dddc_profile-image-3%20Small.avif',
      text: 'The setup was almost too easy. Our team had real-time protection running before the coffee machine even booted.',
    },
    {
      name: 'Claire Dubois',
      role: 'Compliance Manager',
      company: 'CipherCloud',
      logo: 'https://cdn.prod.website-files.com/696138587892fe484868dcdd/696138597892fe484868dd9f_client-logo-3.svg',
      image: 'https://cdn.prod.website-files.com/696138587892fe484868dcdd/696138597892fe484868dddd_profile-image-9%20Small.avif',
      text: 'We switched from a bloated enterprise solution to Protex, and got better visibility with half the complexity.',
    },
    {
      name: 'Thomas Karl',
      role: 'Founder',
      company: 'Zunapulse',
      logo: 'https://cdn.prod.website-files.com/696138587892fe484868dcdd/696138597892fe484868dd9d_client-logo-1.svg',
      image: 'https://cdn.prod.website-files.com/696138587892fe484868dcdd/696138597892fe484868ddde_profile-image-4%20Small.avif',
      text: "I'm not a security expert, but with Protex I don't have to be. It just works — and keeps working.",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Auto-scroll every 5 seconds
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, testimonials.length]);

  const handlePrev = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const handleNext = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  // Calculate visible testimonials (show 3 at once)
  const getVisibleTestimonials = () => {
    const result = [];
    for (let i = 0; i < 3; i++) {
      const index = (currentIndex + i) % testimonials.length;
      result.push(testimonials[index]);
    }
    return result;
  };

  return (
    <section className="py-24 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="mb-12 sm:mb-16 text-center px-2">
          <span className="inline-block px-3 sm:px-4 py-1.5 rounded border border-green-500/30 bg-green-500/5 text-green-500 text-xs font-medium tracking-wider uppercase mb-4 sm:mb-6">
            Testimonials
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3 sm:mb-4">
            Trusted by teams <br className="hidden sm:block" />that move fast
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-400">
            Businesses trust our development services to keep site stable as they grow.
          </p>
        </div>

        {/* Testimonials Carousel */}
        <div className="relative">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {getVisibleTestimonials().map((testimonial, index) => (
              <div
                key={index}
                className="p-8 rounded-2xl border border-green-500/10 bg-gradient-to-b from-green-500/5 to-transparent transition-all duration-500"
              >
                {/* Profile */}
                <div className="flex items-center gap-4 mb-6">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-14 h-14 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="text-white font-semibold">{testimonial.name}</h4>
                    <p className="text-gray-400 text-sm">{testimonial.role}</p>
                  </div>
                </div>

                {/* Company Logo */}
                <div className="mb-6">
                  <img src={testimonial.logo} alt={testimonial.company} className="h-6 opacity-60" />
                </div>

                {/* Testimonial Text */}
                <p className="text-gray-300 leading-relaxed">{testimonial.text}</p>
              </div>
            ))}
          </div>

          {/* Navigation Buttons */}
          <div className="flex items-center justify-center gap-4 mt-12">
            <button
              onClick={handlePrev}
              className="w-12 h-12 rounded-full border border-green-500/30 bg-green-500/5 hover:bg-green-500/10 flex items-center justify-center transition-colors"
            >
              <ChevronLeft className="w-5 h-5 text-green-500" />
            </button>
            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setIsAutoPlaying(false);
                    setCurrentIndex(index);
                  }}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    index === currentIndex ? 'w-8 bg-green-500' : 'w-2 bg-green-500/30'
                  }`}
                />
              ))}
            </div>
            <button
              onClick={handleNext}
              className="w-12 h-12 rounded-full border border-green-500/30 bg-green-500/5 hover:bg-green-500/10 flex items-center justify-center transition-colors"
            >
              <ChevronRight className="w-5 h-5 text-green-500" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
