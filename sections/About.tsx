import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { GraduationCap, Code, Palette, Cpu } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const scanlineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const image = imageRef.current;
    const content = contentRef.current;
    const scanline = scanlineRef.current;

    if (!section || !image || !content) return;

    // Create scroll trigger for the section
    const triggers: ScrollTrigger[] = [];

    // Image parallax and reveal
    const imgTrigger = ScrollTrigger.create({
      trigger: section,
      start: 'top 80%',
      onEnter: () => {
        gsap.fromTo(
          image,
          { opacity: 0, x: -50, scale: 0.95 },
          { opacity: 1, x: 0, scale: 1, duration: 1, ease: 'power3.out' }
        );
      },
      once: true,
    });
    triggers.push(imgTrigger);

    // Content reveal
    const contentTrigger = ScrollTrigger.create({
      trigger: section,
      start: 'top 70%',
      onEnter: () => {
        gsap.fromTo(
          content.children,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: 'power2.out' }
        );
      },
      once: true,
    });
    triggers.push(contentTrigger);

    // Scanline animation
    if (scanline) {
      gsap.to(scanline, {
        y: '100%',
        duration: 3,
        repeat: -1,
        ease: 'none',
      });
    }

    return () => {
      triggers.forEach((t) => t.kill());
    };
  }, []);

  const skills = [
    { icon: Code, label: 'Web Development', level: 95 },
    { icon: Palette, label: 'UI/UX Design', level: 90 },
    { icon: Cpu, label: 'Software Engineering', level: 88 },
    { icon: GraduationCap, label: 'Problem Solving', level: 92 },
  ];

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative min-h-screen py-24 section-padding animate-section"
    >
      {/* Background Grid */}
      <div className="absolute inset-0 grid-lines opacity-20" />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="font-accent text-xs tracking-[0.5em] text-[#00FFC2] mb-4 block">
            [ ABOUT THE ARCHITECT ]
          </span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white">
            THE MIND BEHIND <span className="text-[#00FFC2]">MYCHA</span>
          </h2>
        </div>

        {/* Content Grid */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image Column */}
          <div ref={imageRef} className="relative">
            {/* Main Image Container */}
            <div className="relative aspect-[4/5] rounded-lg overflow-hidden">
              <img
                src="/profile.jpg"
                alt="Olanrewaju Gbolahan"
                className="w-full h-full object-cover"
              />
              
              {/* Scanline Effect */}
              <div
                ref={scanlineRef}
                className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-b from-transparent via-[#00FFC2] to-transparent opacity-50"
                style={{ transform: 'translateY(-100%)' }}
              />
              
              {/* Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent" />
              
              {/* Wireframe Border */}
              <div className="absolute inset-0 border border-[#00FFC2]/30 rounded-lg" />
              
              {/* Corner Accents */}
              <div className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-[#00FFC2]" />
              <div className="absolute top-4 right-4 w-8 h-8 border-r-2 border-t-2 border-[#00FFC2]" />
              <div className="absolute bottom-4 left-4 w-8 h-8 border-l-2 border-b-2 border-[#00FFC2]" />
              <div className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-[#00FFC2]" />
            </div>

            {/* Floating Stats Card */}
            <div className="absolute -bottom-6 -right-6 glass-strong p-6 rounded-lg">
              <div className="font-display text-3xl font-bold text-[#00FFC2]">5+</div>
              <div className="font-body text-sm text-[#A0A0A0]">Years Experience</div>
            </div>
          </div>

          {/* Content Column */}
          <div ref={contentRef} className="space-y-6">
            {/* Name & Title */}
            <div>
              <h3 className="font-display text-3xl md:text-4xl font-bold text-white mb-2">
                Olanrewaju Gbolahan
              </h3>
              <p className="font-body text-lg text-[#00FFC2]">
                Founder & Lead Developer
              </p>
            </div>

            {/* Bio */}
            <div className="space-y-4 font-body text-[#A0A0A0] text-lg leading-relaxed">
              <p>
                A graduate of <span className="text-white">Joseph Ayo Babalola University</span>, 
                I am the architect behind MYCHA Tech Agency. My journey in technology began with a 
                passion for creating digital experiences that transcend the ordinary.
              </p>
              <p>
                As the leader of the <span className="text-[#00FFC2]">DANMOS TEAM</span>, I bring together 
                raw engineering prowess and architectural design thinking. We don&apos;t just write code; 
                we engineer digital environments that captivate, engage, and deliver results.
              </p>
              <p>
                Specializing in <span className="text-white">Web3, AI integration, and Fintech solutions</span>, 
                I help high-growth startups and luxury brands establish their digital presence 
                with cutting-edge technology and futuristic design.
              </p>
            </div>

            {/* Education Badge */}
            <div className="flex items-center gap-4 p-4 bg-white/5 rounded-lg border border-white/10">
              <GraduationCap className="w-8 h-8 text-[#00FFC2]" />
              <div>
                <div className="font-display text-sm text-white">Education</div>
                <div className="font-body text-sm text-[#A0A0A0]">
                  Joseph Ayo Babalola University
                </div>
              </div>
            </div>

            {/* Skills */}
            <div className="space-y-4">
              <h4 className="font-display text-lg text-white tracking-wider">
                CORE COMPETENCIES
              </h4>
              <div className="grid grid-cols-2 gap-4">
                {skills.map((skill, index) => {
                  const Icon = skill.icon;
                  return (
                    <div
                      key={index}
                      className="flex items-center gap-3 p-3 bg-white/5 rounded-lg border border-white/10 hover:border-[#00FFC2]/50 transition-colors"
                    >
                      <Icon className="w-5 h-5 text-[#00FFC2]" />
                      <div className="flex-1">
                        <div className="font-body text-sm text-white">{skill.label}</div>
                        <div className="h-1 bg-white/10 rounded-full mt-1 overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-[#00FFC2] to-[#8B5CF6] rounded-full"
                            style={{ width: `${skill.level}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
