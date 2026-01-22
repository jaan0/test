import React, { useState, useEffect, useCallback } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Checkbox } from './ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { ChevronDown, Check } from 'lucide-react';
import { useToast } from '../hooks/use-toast';
import emailjs from '@emailjs/browser';

const ContactSection = () => {
  const { toast } = useToast();
  const [services, setServices] = useState([]);
  const [loadingServices, setLoadingServices] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: '',
    message: '',
    acceptTerms: false,
  });

  // Load services for dropdown
  useEffect(() => {
    async function loadServices() {
      try {
        const res = await fetch("/api/services", { cache: "no-store" });
        if (res.ok) {
          const data = await res.json();
          setServices(data || []);
        }
      } catch (err) {
        console.error("Failed to load services", err);
      } finally {
        setLoadingServices(false);
      }
    }
    loadServices();
  }, []);

  // Pre-populate service from URL parameter - wait for services to load first
  const updateServiceFromURL = useCallback(() => {
    if (loadingServices || services.length === 0) return;
    
    const urlParams = new URLSearchParams(window.location.search);
    const serviceParam = urlParams.get("service");
    if (serviceParam) {
      const decodedService = decodeURIComponent(serviceParam);
      // Find exact match in services list (case-insensitive match for better compatibility)
      const matchedService = services.find(s => 
        s.title && s.title.toLowerCase() === decodedService.toLowerCase()
      );
      if (matchedService && matchedService.title) {
        setFormData(prev => {
          // Only update if different to avoid unnecessary re-renders
          if (prev.service !== matchedService.title) {
            return { ...prev, service: matchedService.title };
          }
          return prev;
        });
      }
    } else {
      // Clear service if URL param is removed
      setFormData(prev => {
        if (prev.service && prev.service !== "") {
          return { ...prev, service: "" };
        }
        return prev;
      });
    }
  }, [services, loadingServices]);

  useEffect(() => {
    updateServiceFromURL();
  }, [updateServiceFromURL]);

  // Listen for URL changes (browser back/forward and manual navigation)
  useEffect(() => {
    const handlePopState = () => {
      updateServiceFromURL();
    };
    // Also check on focus in case URL changed
    const handleFocus = () => {
      updateServiceFromURL();
    };
    window.addEventListener('popstate', handlePopState);
    window.addEventListener('focus', handleFocus);
    return () => {
      window.removeEventListener('popstate', handlePopState);
      window.removeEventListener('focus', handleFocus);
    };
  }, [updateServiceFromURL]);

  // Helper to get display value for Select (can't use empty string)
  const getSelectValue = () => {
    return formData.service || "general";
  };

  // Helper to handle value change (convert "general" back to empty string)
  const handleServiceChange = (value) => {
    setFormData({ ...formData, service: value === "general" ? "" : value });
  };

  const [openFAQ, setOpenFAQ] = useState(null);

  const faqs = [
    {
      question: 'What technologies do you specialize in?',
      answer:
        'We build modern, scalable web applications using React, Next.js, and Node.js, backed by robust cloud providers like AWS and Google Cloud to ensure 99.9% uptime.',
    },
    {
      question: 'Do you handle migration from legacy systems?',
      answer:
        'Yes. We specialize in "lift and shift" operations—modernizing your old web services into secure, cloud-hosted environments without losing your data or SEO ranking.',
    },
    {
      question: 'How do you handle project security?',
      answer:
        "Security isn't an afterthought. Every line of code we write is audited for vulnerabilities, and every web service we deploy is hardened with SSL, DDoS protection, and automated backups by default.",
    },
  ];

  const features = [
    'Full-Stack Development',
    'Cloud-Native Architecture',
    'UI/UX Optimization',
    'API First Design',
    '24/7 Monitoring',
    'Performance Audited',
  ];

  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.acceptTerms) {
      toast({
        title: 'Error',
        description: 'Please accept the terms & conditions',
        variant: 'destructive',
      });
      return;
    }

    if (submitting) return;
    setSubmitting(true);

    const serviceId =
      process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || 'service_pxi4rey';
    const templateId =
      process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || 'template_tebyfak';
    const publicKey =
      process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || 'gkbm64MKEgVjRDpIz';

    try {
      // Store lead in our API (Mongo)
      const leadRes = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          service: formData.service,
          message: formData.message,
        }),
      });
      if (!leadRes.ok) {
        throw new Error("Lead save failed");
      }

      // Send via EmailJS (best of both)
      await emailjs.send(
        serviceId,
        templateId,
        {
          name: formData.name,
          email: formData.email,
          service: formData.service || "General Inquiry",
          message: formData.message,
        },
        { publicKey }
      );

      toast({
        title: "Success!",
        description: "Your message has been sent. We'll get back to you soon!",
      });
      // Clear form but keep service if it was pre-populated
      const urlParams = new URLSearchParams(window.location.search);
      const serviceParam = urlParams.get("service");
      setFormData({ 
        name: "", 
        email: "", 
        service: serviceParam ? decodeURIComponent(serviceParam) : "", 
        message: "", 
        acceptTerms: false 
      });
    } catch (err) {
      console.error("Contact submit failed", err);
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-16 sm:py-20 md:py-24 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="mb-12 sm:mb-16 px-2">
          <span className="inline-block px-3 sm:px-4 py-1.5 rounded border border-green-500/30 bg-green-500/5 text-green-500 text-xs font-medium tracking-wider uppercase mb-4 sm:mb-6">
            Contact
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3 leading-tight">Stay aheads of world</h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-400">Deploy in one click. No setup. No stress.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16">
          {/* Left Column - Chips + FAQs */}
          <div className="space-y-8 sm:space-y-10">
            <div className="flex flex-wrap gap-3">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-green-500 text-green-100 text-sm bg-transparent"
                >
                  <span className="w-5 h-5 rounded-full border border-green-500 flex items-center justify-center">
                    <Check className="w-3.5 h-3.5 text-green-400" strokeWidth={2.5} />
                  </span>
                  <span className="font-medium text-white">{feature}</span>
                </div>
              ))}
            </div>

            {/* FAQs */}
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className="border border-green-500/10 rounded-xl overflow-hidden bg-gradient-to-br from-green-500/5 to-transparent"
                >
                  <button
                    onClick={() => setOpenFAQ(openFAQ === index ? null : index)}
                    className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-green-500/5 transition-colors"
                  >
                    <span className="text-white font-semibold">{faq.question}</span>
                    <ChevronDown
                      className={`w-5 h-5 text-green-500 transition-transform duration-300 ${
                        openFAQ === index ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  <div
                    className={`overflow-hidden transition-all duration-300 ${
                      openFAQ === index ? 'max-h-96' : 'max-h-0'
                    }`}
                  >
                    <p className="px-6 pb-4 text-gray-400 leading-relaxed">{faq.answer}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column - Contact Form */}
          <div className="p-6 sm:p-8 rounded-2xl border border-green-500/10 bg-gradient-to-br from-green-500/5 to-transparent">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-white font-medium mb-2">Name</label>
                <Input
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  className="bg-[#0a0f0d] border-green-500/20 text-white focus:border-green-500"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label className="block text-white font-medium mb-2">Email</label>
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  className="bg-[#0a0f0d] border-green-500/20 text-white focus:border-green-500"
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <label className="block text-white font-medium mb-2">Service (Optional)</label>
                <Select
                  value={getSelectValue()}
                  onValueChange={handleServiceChange}
                >
                  <SelectTrigger className="bg-[#0a0f0d] border-green-500/20 text-white focus:border-green-500">
                    <SelectValue placeholder="Select a service or leave blank for general inquiry" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#0a0f0d] border-green-500/20">
                    <SelectItem value="general" className="text-gray-400 focus:text-white">
                      General Inquiry
                    </SelectItem>
                    {loadingServices ? (
                      <SelectItem value="loading" disabled>Loading services...</SelectItem>
                    ) : (
                      services.map((service, index) => {
                        const serviceTitle = service.title || `Service ${index + 1}`;
                        // Ensure we have a valid non-empty value
                        if (!serviceTitle || serviceTitle.trim() === "") {
                          return null;
                        }
                        return (
                          <SelectItem 
                            key={index} 
                            value={serviceTitle}
                            className="text-white focus:text-white focus:bg-green-500/20"
                          >
                            {serviceTitle}
                          </SelectItem>
                        );
                      })
                    )}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-white font-medium mb-2">Message</label>
                <Textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  required
                  className="bg-[#0a0f0d] border-green-500/20 text-white focus:border-green-500 min-h-[120px]"
                  placeholder="Type your message..."
                />
              </div>

              <div className="flex items-start gap-3">
                <Checkbox
                  checked={formData.acceptTerms}
                  onCheckedChange={(checked) => setFormData({ ...formData, acceptTerms: checked })}
                  className="mt-1"
                />
                <label className="text-sm text-gray-400">
                  I accept the <span className="text-green-500 cursor-pointer">Terms & conditions</span>.
                </label>
              </div>

              <Button
                type="submit"
                disabled={submitting}
                className="w-full bg-green-500 hover:bg-green-600 disabled:bg-green-500/60 disabled:cursor-not-allowed text-[#0a0f0d] font-medium py-6 rounded transition-colors flex items-center justify-center gap-2"
              >
                {submitting && (
                  <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-[#0a0f0d]/40 border-t-[#0a0f0d]" />
                )}
                <span>{submitting ? 'Submitting...' : 'Submit'}</span>
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
