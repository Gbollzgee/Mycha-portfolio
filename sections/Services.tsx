import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Globe, 
  Code2, 
  Cpu, 
  Gamepad2,
  Smartphone,
  Database,
  Figma,
  Terminal
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface Service {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  features: string[];
}

const services: Service[] = [
  {
    icon: Globe,
    title: 'WEB DESIGN',
    description: 'Creating stunning, responsive websites that captivate users and drive conversions.',
    features: ['UI/UX Design', 'Responsive Layouts', 'Prototyping', 'Brand Identity'],
  },
  {
    icon: Code2,
    title: 'WEB DEVELOPMENT',
    description: 'Building robust, scalable web applications with cutting-edge technologies.',
    features: ['React/Next.js', 'Node.js Backend', 'API Integration', 'Performance Optimization'],
  },
  {
    icon: Cpu,
    title: 'SOFTWARE ENGINEERING',
    description: 'Engineering custom software solutions tailored to your business needs.',
    features: ['Custom Solutions', 'System Architecture', 'Cloud Services', 'DevOps'],
  },
  {
    icon: Gamepad2,
    title: 'GAME DEVELOPMENT',
    description: 'Developing immersive gaming experiences with modern web technologies.',
    features: ['WebGL/Three.js', 'Unity Integration', 'Multiplayer', 'Blockchain Gaming'],
  },
];

const techStack = [
  { icon: Code2, name: 'React', color: '#61DAFB' },
  { icon: Terminal, name: 'TypeScript', color: '#3178C6' },
  { icon: Database, name: 'Node.js', color: '#339933' },
  { icon: Smartphone, name: 'React Native', color: '#61DAFB' },
  { icon: Figma, name: 'Figma', color: '#F24E1E' },
  { icon: Cpu, name: 'Python', color: '#3776AB' },
  { icon: Globe, name: 'Three.js', color: '#000000' },
  { icon: Database, name: 'MongoDB', color: '#47A248' },
];

const Services = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const techRef = useRef<HTMLDivElement>(null);
  const [hoveredService, setHoveredService] = useState<string | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const cards = cardsRef.current;
    const tech = techRef.current;
    if (!section || !cards) return;

    const triggers: ScrollTrigger[] = [];

    // Cards entrance animation
    const cardTrigger = ScrollTrigger.create({
      trigger: section,
      start: 'top 70%',
      onEnter: () => {
        gsap.fromTo(
          cards.children,
          { opacity: 0, y: 40, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.6,
            stagger: 0.15,
            ease: 'back.out(1.2)',
          }
        );
      },
      once: true,
    });
    triggers.push(cardTrigger);

    // Tech stack animation
    if (tech) {
      const techTrigger = ScrollTrigger.create({
        trigger: tech,
        start: 'top 80%',
        onEnter: () => {
          gsap.fromTo(
            tech.children,
            { opacity: 0, scale: 0 },
            {
              opacity: 1,
              scale: 1,
              duration: 0.4,
              stagger: 0.08,
              ease: 'back.out(2)',
            }
          );
        },
        once: true,
      });
      triggers.push(techTrigger);
    }

    return () => {
      triggers.forEach((t) => t.kill());
    };
  }, []);

  return (
    <section
      id="services"
      ref={sectionRef}
      className="relative min-h-screen py-24 section-padding animate-section"
    >
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-[#050505] to-[#0a0a0a]" />
        <div className="absolute inset-0 grid-lines opacity-10" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="font-accent text-xs tracking-[0.5em] text-[#00FFC2] mb-4 block">
            [ CORE MODULES ]
          </span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
            SERVICES & <span className="text-[#00FFC2]">SKILLS</span>
          </h2>
          <p className="font-body text-lg text-[#A0A0A0] max-w-2xl mx-auto">
            Comprehensive digital solutions powered by cutting-edge technology 
            and creative innovation.
          </p>
        </div>

        {/* Services Grid */}
        <div
          ref={cardsRef}
          className="grid md:grid-cols-2 gap-6 mb-20"
        >
          {services.map((service, index) => {
            const Icon = service.icon;
            const isHovered = hoveredService === service.title;

            return (
              <div
                key={index}
                className="group relative"
                onMouseEnter={() => setHoveredService(service.title)}
                onMouseLeave={() => setHoveredService(null)}
              >
                <div
                  className={`relative p-8 rounded-xl border transition-all duration-500 overflow-hidden ${
                    isHovered
                      ? 'border-[#00FFC2]/50 bg-[#00FFC2]/5'
                      : 'border-white/10 bg-white/5'
                  }`}
                  style={{
                    backdropFilter: 'blur(20px)',
                    transform: isHovered ? 'perspective(1000px) rotateX(2deg) rotateY(-2deg)' : 'none',
                  }}
                >
                  {/* Animated Border */}
                  <div
                    className={`absolute inset-0 rounded-xl transition-opacity duration-300 ${
                      isHovered ? 'opacity-100' : 'opacity-0'
                    }`}
                    style={{
                      background: 'linear-gradient(90deg, #00FFC2, #8B5CF6, #00FFC2)',
                      backgroundSize: '200% 100%',
                      animation: isHovered ? 'gradient-shift 3s linear infinite' : 'none',
                      padding: '1px',
                      WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                      WebkitMaskComposite: 'xor',
                      maskComposite: 'exclude',
                    }}
                  />

                  {/* Icon */}
                  <div
                    className={`w-14 h-14 rounded-lg flex items-center justify-center mb-6 transition-all duration-300 ${
                      isHovered ? 'bg-[#00FFC2]' : 'bg-white/10'
                    }`}
                  >
                    <div className={`w-7 h-7 transition-colors duration-300 ${
                      isHovered ? 'text-[#050505]' : 'text-[#00FFC2]'
                    }`}>
                      <Icon />
                    </div>
                  </div>

                  {/* Content */}
                  <h3 className="font-display text-xl font-bold text-white mb-3 group-hover:text-[#00FFC2] transition-colors">
                    {service.title}
                  </h3>
                  <p className="font-body text-[#A0A0A0] mb-6">
                    {service.description}
                  </p>

                  {/* Features */}
                  <div className="flex flex-wrap gap-2">
                    {service.features.map((feature, fIndex) => (
                      <span
                        key={fIndex}
                        className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs font-body text-white/70"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>

                  {/* Scanline Effect */}
                  {isHovered && (
                    <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-xl">
                      <div
                        className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00FFC2] to-transparent"
                        style={{
                          animation: 'scan 2s linear infinite',
                        }}
                      />
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Tech Stack */}
        <div className="text-center">
          <h3 className="font-display text-lg tracking-wider text-white mb-8">
            TECHNOLOGY ARSENAL
          </h3>
          <div
            ref={techRef}
            className="flex flex-wrap justify-center gap-4"
          >
            {techStack.map((tech, index) => {
              const Icon = tech.icon;
              return (
                <div
                  key={index}
                  className="group flex items-center gap-3 px-5 py-3 bg-white/5 border border-white/10 rounded-full hover:border-[#00FFC2]/50 hover:bg-[#00FFC2]/5 transition-all duration-300"
                  data-cursor-hover
                >
                  <Icon
                    className="w-5 h-5 transition-colors"
                    style={{ color: tech.color }}
                  />
                  <span className="font-body text-sm text-white group-hover:text-[#00FFC2] transition-colors">
                    {tech.name}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* CSS Animation */}
      <style>{`
        @keyframes gradient-shift {
          0% { background-position: 0% 50%; }
          100% { background-position: 200% 50%; }
        }
        @keyframes scan {
          0% { top: 0; }
          100% { top: 100%; }
        }
      `}</style>
    </section>
  );
};

export default Services;
