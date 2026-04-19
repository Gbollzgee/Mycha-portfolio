import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Linkedin, Twitter, Github } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface TeamMember {
  name: string;
  role: string;
  image: string;
  bio: string;
  socials: {
    linkedin?: string;
    twitter?: string;
    github?: string;
  };
}

const teamMembers: TeamMember[] = [
  {
    name: 'Olanrewaju Gbolahan',
    role: 'Founder & Lead Developer',
    image: '/profile.jpg',
    bio: 'Visionary tech leader with expertise in full-stack development and system architecture.',
    socials: {
      linkedin: '#',
      twitter: 'https://twitter.com/Mychaleo',
      github: 'https://github.com/Gbollzgee',
    },
  },
  {
    name: 'Amara Okafor',
    role: 'Senior Frontend Developer',
    image: '/team-1.jpg',
    bio: 'React specialist passionate about creating seamless user experiences.',
    socials: {
      linkedin: '#',
      github: '#',
    },
  },
  {
    name: 'Emmanuel Adeyemi',
    role: 'UI/UX Designer',
    image: '/team-2.jpg',
    bio: 'Creative designer transforming complex ideas into intuitive interfaces.',
    socials: {
      linkedin: '#',
      twitter: '#',
    },
  },
  {
    name: 'Chioma Nwosu',
    role: 'Project Manager',
    image: '/team-3.jpg',
    bio: 'Strategic thinker ensuring projects are delivered on time and exceed expectations.',
    socials: {
      linkedin: '#',
    },
  },
  {
    name: 'David Ogunlesi',
    role: 'Backend Engineer',
    image: '/team-4.jpg',
    bio: 'Database architect and API specialist building robust server solutions.',
    socials: {
      github: '#',
      linkedin: '#',
    },
  },
  {
    name: 'Ngozi Ibrahim',
    role: 'Marketing Specialist',
    image: '/team-5.jpg',
    bio: 'Digital marketing expert driving growth and brand visibility.',
    socials: {
      linkedin: '#',
      twitter: '#',
    },
  },
];

const Team = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const [hoveredMember, setHoveredMember] = useState<string | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const cards = cardsRef.current;
    if (!section || !cards) return;

    const triggers: ScrollTrigger[] = [];

    // Cards entrance animation - data stream effect
    const cardTrigger = ScrollTrigger.create({
      trigger: section,
      start: 'top 70%',
      onEnter: () => {
        gsap.fromTo(
          cards.children,
          { opacity: 0, y: 80 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: 'power3.out',
          }
        );
      },
      once: true,
    });
    triggers.push(cardTrigger);

    return () => {
      triggers.forEach((t) => t.kill());
    };
  }, []);

  return (
    <section
      id="team"
      ref={sectionRef}
      className="relative min-h-screen py-24 section-padding animate-section"
    >
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-[#0a0a0a] to-[#050505]" />
        <div className="absolute inset-0 grid-lines opacity-10" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="font-accent text-xs tracking-[0.5em] text-[#00FFC2] mb-4 block">
            [ THE DANMOS COLLECTIVE ]
          </span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
            MEET THE <span className="text-[#00FFC2]">TEAM</span>
          </h2>
          <p className="font-body text-lg text-[#A0A0A0] max-w-2xl mx-auto">
            A collective of passionate innovators, designers, and developers 
            dedicated to crafting exceptional digital experiences.
          </p>
        </div>

        {/* Team Grid */}
        <div
          ref={cardsRef}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {teamMembers.map((member, index) => {
            const isHovered = hoveredMember === member.name;
            const isOtherHovered = hoveredMember !== null && hoveredMember !== member.name;

            return (
              <div
                key={index}
                className={`group relative transition-all duration-500 ${
                  isOtherHovered ? 'opacity-40 grayscale' : 'opacity-100'
                }`}
                onMouseEnter={() => setHoveredMember(member.name)}
                onMouseLeave={() => setHoveredMember(null)}
              >
                <div className="relative overflow-hidden rounded-xl bg-[#0a0a0a] border border-white/10 hover:border-[#00FFC2]/50 transition-all duration-300">
                  {/* Image */}
                  <div className="relative aspect-[3/4] overflow-hidden">
                    <img
                      src={member.image}
                      alt={member.name}
                      className={`w-full h-full object-cover transition-all duration-500 ${
                        isHovered ? 'scale-105' : 'scale-100'
                      }`}
                    />
                    
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/50 to-transparent" />

                    {/* Scanline Overlay */}
                    <div
                      className={`absolute inset-0 pointer-events-none transition-opacity duration-300 ${
                        isHovered ? 'opacity-100' : 'opacity-0'
                      }`}
                      style={{
                        background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0, 255, 194, 0.03) 2px, rgba(0, 255, 194, 0.03) 4px)',
                      }}
                    />

                    {/* Data Stream Effect */}
                    <div className="absolute top-0 left-0 right-0 h-full overflow-hidden pointer-events-none">
                      {[...Array(5)].map((_, i) => (
                        <div
                          key={i}
                          className={`absolute w-px bg-gradient-to-b from-transparent via-[#00FFC2]/30 to-transparent transition-all duration-300 ${
                            isHovered ? 'opacity-100' : 'opacity-0'
                          }`}
                          style={{
                            left: `${20 + i * 15}%`,
                            height: '100%',
                            animation: isHovered ? `data-stream ${2 + i * 0.5}s linear infinite` : 'none',
                            animationDelay: `${i * 0.3}s`,
                          }}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    {/* Role Badge */}
                    <div className="inline-block px-3 py-1 bg-[#00FFC2]/20 border border-[#00FFC2]/50 rounded-full mb-3">
                      <span className="font-body text-xs text-[#00FFC2]">{member.role}</span>
                    </div>

                    {/* Name */}
                    <h3 className="font-display text-xl font-bold text-white mb-2 group-hover:text-[#00FFC2] transition-colors">
                      {member.name}
                    </h3>

                    {/* Bio */}
                    <p
                      className={`font-body text-sm text-[#A0A0A0] mb-4 transition-all duration-300 ${
                        isHovered ? 'opacity-100 max-h-20' : 'opacity-0 max-h-0'
                      } overflow-hidden`}
                    >
                      {member.bio}
                    </p>

                    {/* Social Links */}
                    <div
                      className={`flex gap-3 transition-all duration-300 ${
                        isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                      }`}
                    >
                      {member.socials.linkedin && (
                        <a
                          href={member.socials.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          data-cursor-hover
                          className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center hover:bg-[#00FFC2]/20 transition-colors"
                        >
                          <Linkedin className="w-4 h-4 text-white" />
                        </a>
                      )}
                      {member.socials.twitter && (
                        <a
                          href={member.socials.twitter}
                          target="_blank"
                          rel="noopener noreferrer"
                          data-cursor-hover
                          className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center hover:bg-[#00FFC2]/20 transition-colors"
                        >
                          <Twitter className="w-4 h-4 text-white" />
                        </a>
                      )}
                      {member.socials.github && (
                        <a
                          href={member.socials.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          data-cursor-hover
                          className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center hover:bg-[#00FFC2]/20 transition-colors"
                        >
                          <Github className="w-4 h-4 text-white" />
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Corner Accents */}
                  <div className="absolute top-4 left-4 w-6 h-6 border-l border-t border-[#00FFC2]/30 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="absolute top-4 right-4 w-6 h-6 border-r border-t border-[#00FFC2]/30 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Team Stats */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { value: '6+', label: 'Team Members' },
            { value: '50+', label: 'Projects Delivered' },
            { value: '100%', label: 'Client Satisfaction' },
            { value: '24/7', label: 'Support Available' },
          ].map((stat, index) => (
            <div
              key={index}
              className="text-center p-6 bg-white/5 border border-white/10 rounded-xl"
            >
              <div className="font-display text-3xl font-bold text-[#00FFC2] mb-1">
                {stat.value}
              </div>
              <div className="font-body text-sm text-[#A0A0A0]">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* CSS Animation */}
      <style>{`
        @keyframes data-stream {
          0% {
            transform: translateY(-100%);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translateY(100%);
            opacity: 0;
          }
        }
      `}</style>
    </section>
  );
};

export default Team;
