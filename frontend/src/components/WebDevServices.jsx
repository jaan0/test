import React from 'react';
import { Code, Palette, Zap, Globe, Layout, Database } from 'lucide-react';

const WebDevServices = () => {
  const services = [
    {
      icon: <Code className="w-8 h-8" />,
      title: 'Custom Web Development',
      description: 'Full-stack development with React, Next.js, Node.js, and modern frameworks tailored to your needs.',
    },
    {
      icon: <Palette className="w-8 h-8" />,
      title: 'UI/UX Design',
      description: 'Beautiful, intuitive interfaces that engage users and drive conversions across all devices.',
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: 'Performance Optimization',
      description: 'Lightning-fast load times, optimized code, and seamless user experiences that boost SEO.',
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: 'E-commerce Solutions',
      description: 'Shopify, WooCommerce, and custom e-commerce platforms that scale with your business.',
    },
    {
      icon: <Layout className="w-8 h-8" />,
      title: 'Responsive Design',
      description: 'Mobile-first designs that look stunning on every device, from phones to 4K displays.',
    },
    {
      icon: <Database className="w-8 h-8" />,
      title: 'API Integration',
      description: 'Seamless third-party integrations, payment gateways, CRM systems, and custom APIs.',
    },
  ];

  return (
    <section className="py-24 px-6 relative overflow-hidden">
      {/* Background accent */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-green-500/5 to-transparent" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full border border-green-500/30 bg-green-500/5 text-green-500 text-xs font-medium tracking-wider uppercase mb-6">
            Our Services
          </span>
          <h2 className="text-5xl font-bold text-white mb-4">Web Development Services</h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Comprehensive solutions to build, scale, and optimize your digital presence
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <div
              key={index}
              className="group p-8 rounded-2xl border border-green-500/10 bg-gradient-to-br from-green-500/5 to-transparent hover:border-green-500/30 hover:from-green-500/10 transition-all duration-300 cursor-pointer"
            >
              {/* Icon */}
              <div className="w-14 h-14 rounded-xl bg-green-500/10 flex items-center justify-center mb-6 group-hover:bg-green-500/20 group-hover:scale-110 transition-all duration-300">
                <div className="text-green-500">{service.icon}</div>
              </div>

              {/* Title */}
              <h3 className="text-xl font-bold text-white mb-3 group-hover:text-green-500 transition-colors">
                {service.title}
              </h3>

              {/* Description */}
              <p className="text-gray-400 leading-relaxed">{service.description}</p>
            </div>
          ))}
        </div>

        {/* Additional Info */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-8 px-8 py-6 rounded-2xl border border-green-500/20 bg-green-500/5">
            <div>
              <p className="text-3xl font-bold text-white mb-1">500+</p>
              <p className="text-sm text-gray-400">Projects Delivered</p>
            </div>
            <div className="h-12 w-px bg-green-500/20" />
            <div>
              <p className="text-3xl font-bold text-white mb-1">99%</p>
              <p className="text-sm text-gray-400">Client Satisfaction</p>
            </div>
            <div className="h-12 w-px bg-green-500/20" />
            <div>
              <p className="text-3xl font-bold text-white mb-1">24/7</p>
              <p className="text-sm text-gray-400">Support Available</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WebDevServices;
