import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Checkbox } from './ui/checkbox';
import { ChevronDown } from 'lucide-react';
import { useToast } from '../hooks/use-toast';

const ContactSection = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    acceptTerms: false,
  });

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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.acceptTerms) {
      toast({
        title: 'Error',
        description: 'Please accept the terms & conditions',
        variant: 'destructive',
      });
      return;
    }
    toast({
      title: 'Success!',
      description: 'Your message has been sent. We\'ll get back to you soon!',
    });
    setFormData({ name: '', email: '', message: '', acceptTerms: false });
  };

  return (
    <section id="contact" className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full border border-green-500/30 bg-green-500/5 text-green-500 text-xs font-medium tracking-wider uppercase mb-6">
            Contact
          </span>
          <h2 className="text-5xl font-bold text-white mb-4">Stay ahead of world</h2>
          <p className="text-xl text-gray-400">Deploy in one click. No setup. No stress.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Left Column - Features */}
          <div>
            <div className="grid grid-cols-2 gap-4 mb-12">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="p-4 rounded-xl border border-green-500/10 bg-green-500/5 text-center hover:border-green-500/30 transition-colors"
                >
                  <p className="text-white font-medium">{feature}</p>
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
          <div className="p-8 rounded-2xl border border-green-500/10 bg-gradient-to-br from-green-500/5 to-transparent">
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
                <label className="block text-white font-medium mb-2">Message</label>
                <Textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  required
                  className="bg-[#0a0f0d] border-green-500/20 text-white focus:border-green-500 min-h-[120px]"
                  placeholder="Tell us about your project..."
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
                className="w-full bg-green-500 hover:bg-green-600 text-[#0a0f0d] font-medium py-6 rounded transition-colors"
              >
                Send Message
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
