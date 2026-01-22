import React, { useEffect, useState } from 'react';
import {
  Code,
  Palette,
  Zap,
  Globe,
  Layout,
  Database,
  CheckCircle2,
} from 'lucide-react';

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
};

const defaultServices = [
    {
      icon: <Code className="w-8 h-8" />,
    title: 'Shopify Landing Page',
    subtitle: 'Perfect starter for a quick launch.',
    price: 240,
    originalPrice: 300,
    badge: 'Starter',
    features: [
      'Single-page site with up to 3 sections',
      'Contact form with spam protection',
      'Theme setup + responsive layout',
      'Social icons & free stock imagery',
      'Ready in days, optimized for conversions',
    ],
    ctaLabel: 'Get Started',
    ctaHref: '#contact',
    },
    {
      icon: <Palette className="w-8 h-8" />,
    title: 'Informative Website',
    subtitle: 'Ideal for small orgs needing a concise site.',
    price: 308,
    originalPrice: 381,
    badge: 'Popular',
    features: [
      'Up to 4 pages (Home, About, Contact, Services)',
      'Professionally written copy for key pages',
      'Blog/news setup (up to 5 posts)',
      'Donation/contact form integration',
      'Fully responsive across devices',
    ],
    ctaLabel: 'Get Started',
    ctaHref: '#contact',
    },
    {
      icon: <Zap className="w-8 h-8" />,
    title: 'Product Display Website',
    subtitle: 'Showcase up to 10 products/services.',
    price: 478,
    originalPrice: 506,
    badge: 'Pro',
    features: [
      'Designed home + product/service highlights',
      'Email contact form for inquiries',
      'Social links to your profiles',
      '1 month of free post-launch support',
      'Theme selection included',
    ],
    ctaLabel: 'Get Started',
    ctaHref: '#contact',
    },
    {
      icon: <Globe className="w-8 h-8" />,
    title: 'Shopify e-Commerce Store',
    subtitle: 'Ready to sell with payments and cart.',
    price: 478,
    originalPrice: 632,
    badge: 'Best Value',
    features: [
      'Shopify setup + theme integration',
      '1 landing + 2 inner pages',
      'Up to 20 products (with variants)',
      'Cart + checkout with one payment gateway',
      'Review stars, countdowns, popups, digital downloads',
    ],
    ctaLabel: 'Get Started',
    ctaHref: '#contact',
    },
    {
      icon: <Layout className="w-8 h-8" />,
    title: 'Brand & UI Refresh',
    subtitle: 'Modernize visuals without rebuilding.',
    price: 620,
    originalPrice: 720,
    badge: 'Design',
    features: [
      'Updated palettes, typography, and components',
      'Accessibility and UX best practices baked in',
      'Performance tuning & Core Web Vitals checks',
      'Responsive QA on key breakpoints',
      'Handoff-ready documentation',
    ],
    ctaLabel: 'Book a Call',
    ctaHref: '#contact',
    },
    {
      icon: <Database className="w-8 h-8" />,
    title: 'API & Automation',
    subtitle: 'Integrations to keep ops flowing.',
    price: 540,
    originalPrice: 620,
    badge: 'Tech',
    features: [
      'Payment, CRM, and marketing integrations',
      'Webhook and workflow automations',
      'Secure auth and rate-limited APIs',
      'Observability and health checks included',
      'Option for ongoing SLA support',
    ],
    ctaLabel: 'Talk to Us',
    ctaHref: '#contact',
  },
];

const WebDevServices = ({ services: servicesProp }) => {
  const [services, setServices] = useState(servicesProp || defaultServices);
  const [loading, setLoading] = useState(!servicesProp);

  useEffect(() => {
    // If services are passed in (e.g. from admin live preview), don't fetch
    if (servicesProp) return;

    let ignore = false;
    async function load() {
      try {
        const res = await fetch("/api/services", { cache: "no-store" });
        if (!res.ok) throw new Error("Failed to load services");
        const data = await res.json();
        if (!ignore && Array.isArray(data) && data.length) {
          setServices(
            data.map((s) => {
              // Map icon string (from DB) or iconKey to React component
              const iconMap = {
                code: <Code className="w-8 h-8" />,
                file: <Code className="w-8 h-8" />,
                palette: <Palette className="w-8 h-8" />,
                zap: <Zap className="w-8 h-8" />,
                globe: <Globe className="w-8 h-8" />,
                layout: <Layout className="w-8 h-8" />,
                database: <Database className="w-8 h-8" />,
                // Also support iconKey for backward compatibility
                Code: <Code className="w-8 h-8" />,
                Palette: <Palette className="w-8 h-8" />,
                Zap: <Zap className="w-8 h-8" />,
                Globe: <Globe className="w-8 h-8" />,
                Layout: <Layout className="w-8 h-8" />,
                Database: <Database className="w-8 h-8" />,
              };
              // Use icon field (string) or iconKey, fallback to "code"
              const iconStr = (s.icon || s.iconKey || "code").toLowerCase();
              const iconKey = iconMap[iconStr] ? iconStr : "code";
              return {
                ...s,
                icon: iconMap[iconKey] || iconMap.code,
              };
            })
          );
        }
      } catch (e) {
        console.error(e);
      } finally {
        if (!ignore) setLoading(false);
      }
    }
    load();
    return () => {
      ignore = true;
    };
  }, [servicesProp]);

  return (
    <section id="services"
      className="py-24 px-6 bg-transparent relative overflow-hidden"
      style={{
        backgroundImage:
          "linear-gradient(to right, rgba(15,118,110,0.35) 1px, transparent 1px), linear-gradient(to bottom, rgba(15,118,110,0.35) 1px, transparent 1px)",
        backgroundSize: "64px 64px",
        backgroundPosition: "center",
      }}
    >
      <div className="max-w-6xl mx-auto relative px-4 sm:px-6 md:px-2 py-6">
        <div className="relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16 px-2">
          <span className="inline-block px-3 sm:px-4 py-1.5 rounded border border-green-500/30 bg-green-500/5 text-green-500 text-xs font-medium tracking-wider uppercase mb-4 sm:mb-6">
            Packages
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3 sm:mb-4">Web Development Services</h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-400 max-w-3xl mx-auto px-2">
            Conversion-ready packages you can launch fast—keep the same premium design language, just pick the service that fits.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {services.map((service, index) => {
            // Handle price: could be number, string like "25,000 PKR", or null
            let price = null;
            let priceDisplay = null;
            if (typeof service.price === 'number') {
              price = service.price;
              priceDisplay = `USD $${price.toFixed(0)}`;
            } else if (typeof service.price === 'string' && service.price.trim()) {
              // Display string price as-is (e.g., "25,000 PKR")
              priceDisplay = service.price;
            }
            
            const features =
              service.features ||
              (service.description ? [service.description] : ["Custom deliverables tailored to your needs."]);
            return (
            <div
              key={index}
                className="group relative h-full rounded-3xl border border-emerald-400/30 bg-gradient-to-br from-emerald-500/15 via-slate-950/70 to-slate-950/90 shadow-xl hover:-translate-y-1 hover:border-emerald-400/60 transition duration-300 overflow-hidden"
              >
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-emerald-400/60 to-transparent opacity-80" />
                <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-emerald-500/8 via-transparent to-transparent" />
                <div className="relative p-6 sm:p-8 flex flex-col gap-4 sm:gap-6 h-full">
                  <div className="flex items-start justify-between gap-3">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-green-500/10 flex items-center justify-center text-green-400">
                      {service.icon}
                    </div>
                    {service.badge && (
                      <span className="px-2 sm:px-3 py-1 rounded text-xs font-semibold bg-green-500/10 text-green-300 border border-green-500/20">
                        {service.badge}
                      </span>
                    )}
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-xl sm:text-2xl font-bold text-white">{service.title}</h3>
                    {service.subtitle && <p className="text-xs sm:text-sm text-gray-400">{service.subtitle}</p>}
              </div>

                  <div className="space-y-1">
                    {service.originalPrice && (
                      <div className="text-xs sm:text-sm text-gray-500 line-through">{service.originalPrice}</div>
                    )}
                    <div className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                      {priceDisplay || "Let's Talk"}
                    </div>
                  </div>

                  <div className="space-y-3">
                    {features.map((feat, idx) => (
                      <div key={idx} className="flex items-start gap-3 text-sm text-gray-200">
                        <CheckCircle2 className="w-4 h-4 mt-1 text-green-400 flex-shrink-0" />
                        <span className="leading-relaxed">{feat}</span>
            </div>
          ))}
                  </div>

                  <div className="mt-auto flex flex-col gap-3">
                    <button
                      onClick={() => {
                        const href = service.ctaHref || "#contact";
                        const sectionId = href.startsWith("#") ? href.substring(1) : href;
                        // Add service title to URL for contact form pre-population
                        const serviceTitle = encodeURIComponent(service.title || "");
                        const url = new URL(window.location.href);
                        url.searchParams.set("service", serviceTitle);
                        window.history.pushState({}, "", url.toString());
                        // Small delay to ensure URL is updated before scrolling
                        setTimeout(() => {
                          scrollToSection(sectionId);
                        }, 50);
                      }}
                      className="inline-flex items-center justify-center w-full rounded-xl bg-green-500 text-slate-950 font-semibold py-3 hover:bg-green-400 transition"
                    >
                      {service.ctaLabel || "Get Started"}
                    </button>
                    <button
                      type="button"
                      className="w-full rounded-xl border border-green-500/30 text-green-300 py-3 text-sm font-semibold hover:border-green-400 hover:text-green-200 transition"
                    >
                      Explore More
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Additional Info */}
        <div className="mt-12 sm:mt-16 text-center">
          <div className="flex flex-row items-center justify-center gap-3 sm:gap-4 md:gap-6 lg:gap-8 px-4 sm:px-6 lg:px-8 py-4 sm:py-6 rounded-2xl border border-green-500/20 bg-green-500/5 max-w-4xl mx-auto">
            <div className="flex-1 min-w-0">
              <p className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-1">500+</p>
              <p className="text-xs sm:text-sm text-gray-400">Projects Delivered</p>
            </div>
            <div className="h-10 sm:h-12 w-px bg-green-500/20" />
            <div className="flex-1 min-w-0">
              <p className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-1">99%</p>
              <p className="text-xs sm:text-sm text-gray-400">Client Satisfaction</p>
            </div>
            <div className="h-10 sm:h-12 w-px bg-green-500/20" />
            <div className="flex-1 min-w-0">
              <p className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-1">24/7</p>
              <p className="text-xs sm:text-sm text-gray-400">Support Available</p>
            </div>
          </div>
        </div>
        </div>
      </div>
    </section>
  );
};

export default WebDevServices;
