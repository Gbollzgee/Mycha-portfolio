import { useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { Home, User, Briefcase, Code, Users, MessageSquare, Menu, X } from 'lucide-react';

gsap.registerPlugin(ScrollToPlugin);

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'hero', label: 'Home', icon: Home },
    { id: 'about', label: 'About', icon: User },
    { id: 'work', label: 'Work', icon: Briefcase },
    { id: 'services', label: 'Services', icon: Code },
    { id: 'team', label: 'Team', icon: Users },
    { id: 'contact', label: 'Contact', icon: MessageSquare },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);

      // Determine active section
      const sections = navItems.map((item) => document.getElementById(item.id));
      const scrollPosition = window.scrollY + window.innerHeight / 3;

      sections.forEach((section, index) => {
        if (section) {
          const top = section.offsetTop;
          const bottom = top + section.offsetHeight;
          if (scrollPosition >= top && scrollPosition < bottom) {
            setActiveSection(navItems[index].id);
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      gsap.to(window, {
        duration: 1,
        scrollTo: { y: element, offsetY: 0 },
        ease: 'power3.inOut',
      });
    }
    setMobileMenuOpen(false);
  };

  return (
    <>
      {/* Desktop Navigation - Floating Dock */}
      <nav
        className={`fixed bottom-8 left-1/2 -translate-x-1/2 z-50 hidden md:block transition-all duration-500 ${
          isScrolled ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'
        }`}
      >
        <div className="glass-strong rounded-full px-4 py-3 flex items-center gap-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;

            return (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                data-cursor-hover
                className={`relative group p-3 rounded-full transition-all duration-300 ${
                  isActive
                    ? 'bg-[#00FFC2]/20 text-[#00FFC2]'
                    : 'text-white/60 hover:text-white hover:bg-white/10'
                }`}
              >
                <Icon className="w-5 h-5" />
                
                {/* Tooltip */}
                <span className="absolute -top-10 left-1/2 -translate-x-1/2 px-3 py-1 bg-[#0a0a0a] border border-[#00FFC2]/30 rounded text-xs font-body text-[#00FFC2] opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  {item.label}
                </span>

                {/* Active Indicator */}
                {isActive && (
                  <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-[#00FFC2] rounded-full" />
                )}
              </button>
            );
          })}
        </div>
      </nav>

      {/* Mobile Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 md:hidden">
        <div
          className={`transition-all duration-300 ${
            isScrolled ? 'bg-[#050505]/90 backdrop-blur-lg' : 'bg-transparent'
          }`}
        >
          <div className="flex items-center justify-between px-4 py-4">
            {/* Logo */}
            <span className="font-display text-xl font-bold text-white">
              M<span className="text-[#00FFC2]">YCHA</span>
            </span>

            {/* Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              data-cursor-hover
              className="p-2 text-white"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        <div
          className={`fixed inset-0 top-16 bg-[#050505]/98 backdrop-blur-xl transition-all duration-300 ${
            mobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
          }`}
        >
          <div className="flex flex-col items-center justify-center h-full gap-6">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`flex items-center gap-4 text-2xl font-display transition-all ${
                    isActive ? 'text-[#00FFC2]' : 'text-white/60'
                  }`}
                >
                  <Icon className="w-6 h-6" />
                  {item.label}
                </button>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Top Logo - Always visible on desktop */}
      <div
        className={`fixed top-8 left-8 z-50 hidden md:block transition-all duration-500 ${
          isScrolled ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <span className="font-display text-2xl font-bold text-white">
          M<span className="text-[#00FFC2]">YCHA</span>
        </span>
      </div>
    </>
  );
};

export default Navigation;
