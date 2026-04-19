import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Send, 
  Github, 
  Facebook, 
  Instagram, 
  Twitter,
  MessageCircle,
  CheckCircle
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const form = formRef.current;
    const info = infoRef.current;
    if (!section || !form || !info) return;

    const triggers: ScrollTrigger[] = [];

    // Form entrance animation
    const formTrigger = ScrollTrigger.create({
      trigger: section,
      start: 'top 70%',
      onEnter: () => {
        gsap.fromTo(
          form,
          { opacity: 0, x: -50 },
          { opacity: 1, x: 0, duration: 0.8, ease: 'power2.out' }
        );
        gsap.fromTo(
          info.children,
          { opacity: 0, x: 50 },
          { opacity: 1, x: 0, duration: 0.8, stagger: 0.1, ease: 'power2.out', delay: 0.2 }
        );
      },
      once: true,
    });
    triggers.push(formTrigger);

    return () => {
      triggers.forEach((t) => t.kill());
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    
    try {
      // Using Formspree for form submission
      const response = await fetch('https://formspree.io/f/xqeyplzl', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
        }),
      });

      if (response.ok) {
        setSubmitted(true);
        setFormData({ name: '', email: '', message: '' });
        
        // Reset submitted state after 5 seconds
        setTimeout(() => setSubmitted(false), 5000);
      } else {
        setError('Failed to send message. Please try again.');
      }
    } catch (err) {
      setError('Network error. Please check your connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // Contact info with proper link handling
  const contactInfo = [
    {
      icon: Phone,
      label: 'WhatsApp',
      value: '+234 906 411 0521',
      link: 'https://wa.me/2349064110521',
      isClickable: true,
      isExternal: true,
    },
    {
      icon: Mail,
      label: 'Email',
      value: 'contact@mycha.tech',
      link: 'mailto:contact@mycha.tech',
      isClickable: true,
      isExternal: false,
    },
    {
      icon: MapPin,
      label: 'Location',
      value: 'Nigeria',
      link: null,
      isClickable: false,
      isExternal: false,
    },
  ];

  const socialLinks = [
    { icon: Github, label: 'GitHub', link: 'https://github.com/Gbollzgee' },
    { icon: Facebook, label: 'Facebook', link: 'https://www.facebook.com/mycha.lee.5621' },
    { icon: Instagram, label: 'Instagram', link: 'https://www.instagram.com/mycha.001' },
    { icon: Twitter, label: 'Twitter', link: 'https://twitter.com/Mychaleo' },
    { icon: MessageCircle, label: 'TikTok', link: 'https://www.tiktok.com/@king_mitchy_blog' },
  ];

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative min-h-screen py-24 section-padding animate-section"
    >
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-[#0a0a0a] to-[#050505]" />
        <div className="absolute inset-0 grid-lines opacity-10" />
        
        {/* Terminal Grid Effect */}
        <div 
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0, 255, 194, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0, 255, 194, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '20px 20px',
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="font-accent text-xs tracking-[0.5em] text-[#00FFC2] mb-4 block">
            [ OPEN A CHANNEL ]
          </span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
            LET&apos;S <span className="text-[#00FFC2]">CONNECT</span>
          </h2>
          <p className="font-body text-lg text-[#A0A0A0] max-w-2xl mx-auto">
            Ready to bring your digital vision to life? Let&apos;s discuss your next project.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form - Terminal Style */}
          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="glass-strong rounded-xl p-8 border border-[#00FFC2]/20"
          >
            {/* Terminal Header */}
            <div className="flex items-center gap-2 mb-6 pb-4 border-b border-white/10">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <div className="w-3 h-3 rounded-full bg-green-500" />
              <span className="ml-4 font-mono text-sm text-[#A0A0A0]">
                mycha@portfolio:~$ contact_form
              </span>
            </div>

            {/* Form Fields */}
            <div className="space-y-6">
              {/* Name Field */}
              <div className="relative">
                <label className="flex items-center gap-2 font-mono text-sm text-[#00FFC2] mb-2">
                  <span className="text-[#8B5CF6]">&gt;</span> user_name:
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('name')}
                  onBlur={() => setFocusedField(null)}
                  required
                  className="w-full bg-transparent border-b border-white/20 focus:border-[#00FFC2] py-2 font-mono text-white outline-none transition-colors"
                  placeholder="Enter your name..."
                />
                {focusedField === 'name' && (
                  <span className="absolute right-0 top-8 w-2 h-4 bg-[#00FFC2] animate-pulse" />
                )}
              </div>

              {/* Email Field */}
              <div className="relative">
                <label className="flex items-center gap-2 font-mono text-sm text-[#00FFC2] mb-2">
                  <span className="text-[#8B5CF6]">&gt;</span> user_email:
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('email')}
                  onBlur={() => setFocusedField(null)}
                  required
                  className="w-full bg-transparent border-b border-white/20 focus:border-[#00FFC2] py-2 font-mono text-white outline-none transition-colors"
                  placeholder="Enter your email..."
                />
                {focusedField === 'email' && (
                  <span className="absolute right-0 top-8 w-2 h-4 bg-[#00FFC2] animate-pulse" />
                )}
              </div>

              {/* Message Field */}
              <div className="relative">
                <label className="flex items-center gap-2 font-mono text-sm text-[#00FFC2] mb-2">
                  <span className="text-[#8B5CF6]">&gt;</span> message:
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('message')}
                  onBlur={() => setFocusedField(null)}
                  required
                  rows={4}
                  className="w-full bg-transparent border-b border-white/20 focus:border-[#00FFC2] py-2 font-mono text-white outline-none transition-colors resize-none"
                  placeholder="Type your message..."
                />
                {focusedField === 'message' && (
                  <span className="absolute right-0 bottom-2 w-2 h-4 bg-[#00FFC2] animate-pulse" />
                )}
              </div>

              {/* Error Message */}
              {error && (
                <div className="p-3 bg-red-500/10 border border-red-500/50 rounded-lg">
                  <p className="font-mono text-sm text-red-400">{error}</p>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                data-cursor-hover
                className="w-full py-4 bg-[#00FFC2]/10 border border-[#00FFC2]/50 rounded-lg font-mono text-[#00FFC2] hover:bg-[#00FFC2]/20 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <span className="animate-spin">&lt;/&gt;</span>
                    Transmitting...
                  </>
                ) : submitted ? (
                  <>
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    Message Sent Successfully!
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    SEND_TRANSMISSION()
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Contact Info */}
          <div ref={infoRef} className="space-y-8">
            {/* Contact Cards */}
            <div className="space-y-4">
              {contactInfo.map((info, index) => {
                const Icon = info.icon;
                const CardContent = (
                  <>
                    <div className="w-12 h-12 bg-[#00FFC2]/10 rounded-lg flex items-center justify-center group-hover:bg-[#00FFC2]/20 transition-colors">
                      <Icon className="w-6 h-6 text-[#00FFC2]" />
                    </div>
                    <div>
                      <div className="font-body text-sm text-[#A0A0A0]">{info.label}</div>
                      <div className="font-display text-white group-hover:text-[#00FFC2] transition-colors">
                        {info.value}
                      </div>
                    </div>
                  </>
                );

                // Render as div if not clickable, as link if clickable
                if (!info.isClickable) {
                  return (
                    <div
                      key={index}
                      className="flex items-center gap-4 p-4 bg-white/5 border border-white/10 rounded-xl cursor-default"
                    >
                      {CardContent}
                    </div>
                  );
                }

                return (
                  <a
                    key={index}
                    href={info.link || '#'}
                    target={info.isExternal ? '_blank' : undefined}
                    rel={info.isExternal ? 'noopener noreferrer' : undefined}
                    data-cursor-hover
                    className="flex items-center gap-4 p-4 bg-white/5 border border-white/10 rounded-xl hover:border-[#00FFC2]/50 hover:bg-[#00FFC2]/5 transition-all group"
                  >
                    {CardContent}
                  </a>
                );
              })}
            </div>

            {/* Social Links */}
            <div className="p-6 bg-white/5 border border-white/10 rounded-xl">
              <h3 className="font-display text-sm tracking-wider text-white mb-4">
                CONNECT ON SOCIALS
              </h3>
              <div className="flex flex-wrap gap-3">
                {socialLinks.map((social, index) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={index}
                      href={social.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      data-cursor-hover
                      className="w-12 h-12 bg-white/5 border border-white/10 rounded-lg flex items-center justify-center hover:bg-[#00FFC2]/20 hover:border-[#00FFC2]/50 transition-all group"
                      title={social.label}
                    >
                      <Icon className="w-5 h-5 text-white group-hover:text-[#00FFC2] transition-colors" />
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Quick Response Badge */}
            <div className="p-6 bg-gradient-to-r from-[#00FFC2]/10 to-[#8B5CF6]/10 border border-[#00FFC2]/30 rounded-xl">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-[#00FFC2] rounded-lg flex items-center justify-center">
                  <span className="font-display text-xl text-[#050505]">24h</span>
                </div>
                <div>
                  <div className="font-display text-white">Quick Response</div>
                  <div className="font-body text-sm text-[#A0A0A0]">
                    I typically respond within 24 hours
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
