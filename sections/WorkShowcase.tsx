import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ExternalLink, X, Gamepad2, Building2, FolderGit2 } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface WorkShowcaseProps {
  lowPowerMode: boolean;
}

interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  image: string;
  link: string;
  icon: React.ComponentType<{ className?: string }>;
  technologies: string[];
  features: string[];
}

const projects: Project[] = [
  {
    id: 'mycha-game',
    title: 'MYCHA GAME',
    category: 'Web3 Gaming',
    description: 'An immersive cyberpunk web-based gaming experience featuring real-time multiplayer capabilities, NFT integration, and blockchain-powered rewards.',
    image: '/project-game.jpg',
    link: 'https://gbollzgee.github.io/MYCHA_GAME/',
    icon: Gamepad2,
    technologies: ['Three.js', 'WebGL', 'Solidity', 'React'],
    features: ['Real-time Multiplayer', 'NFT Marketplace', 'Blockchain Rewards', 'Immersive 3D'],
  },
  {
    id: 'danmos',
    title: 'DANMOS COMPANY',
    category: 'Corporate Website',
    description: 'A premium corporate web presence for DANMOS Group, featuring modern design principles, seamless user experience, and robust backend infrastructure.',
    image: '/project-danmos.jpg',
    link: 'https://gbollzgee.github.io/danmoscompany/',
    icon: Building2,
    technologies: ['React', 'Node.js', 'MongoDB', 'Tailwind'],
    features: ['Responsive Design', 'CMS Integration', 'Analytics Dashboard', 'SEO Optimized'],
  },
  {
    id: 'portfolio-v1',
    title: 'PORTFOLIO V1',
    category: 'Personal Portfolio',
    description: 'The first iteration of my personal portfolio, showcasing creative web development skills with bold typography and smooth animations.',
    image: '/project-portfolio.jpg',
    link: 'https://gbollzgee.github.io/mycha-portfolio-/',
    icon: FolderGit2,
    technologies: ['HTML5', 'CSS3', 'JavaScript', 'GSAP'],
    features: ['Smooth Animations', 'Modern Typography', 'Interactive Elements', 'Mobile First'],
  },
];

const WorkShowcase = ({ lowPowerMode }: WorkShowcaseProps) => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const cards = cardsRef.current;
    if (!section || !cards) return;

    const triggers: ScrollTrigger[] = [];

    // Cards entrance animation
    const cardTrigger = ScrollTrigger.create({
      trigger: section,
      start: 'top 70%',
      onEnter: () => {
        gsap.fromTo(
          cards.children,
          { opacity: 0, y: 60, rotateX: 15 },
          {
            opacity: 1,
            y: 0,
            rotateX: 0,
            duration: 0.8,
            stagger: 0.2,
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

  const openProject = (project: Project) => {
    setSelectedProject(project);
    document.body.style.overflow = 'hidden';
  };

  const closeProject = () => {
    setSelectedProject(null);
    document.body.style.overflow = 'auto';
  };

  return (
    <section
      id="work"
      ref={sectionRef}
      className="relative min-h-screen py-24 section-padding animate-section"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-[#0a0a0a] to-[#050505]" />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="font-accent text-xs tracking-[0.5em] text-[#00FFC2] mb-4 block">
            [ DEPLOYED SYSTEMS ]
          </span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
            FEATURED <span className="text-[#00FFC2]">PROJECTS</span>
          </h2>
          <p className="font-body text-lg text-[#A0A0A0] max-w-2xl mx-auto">
            Explore my digital creations. Each project represents a unique challenge 
            solved with innovative technology and design.
          </p>
        </div>

        {/* Projects Grid */}
        <div
          ref={cardsRef}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          style={{ perspective: '1000px' }}
        >
          {projects.map((project) => {
            const Icon = project.icon;
            const isHovered = hoveredProject === project.id;

            return (
              <div
                key={project.id}
                className="group relative"
                onMouseEnter={() => setHoveredProject(project.id)}
                onMouseLeave={() => setHoveredProject(null)}
                style={{ transformStyle: 'preserve-3d' }}
              >
                <div
                  className={`relative overflow-hidden rounded-xl bg-[#0a0a0a] border border-white/10 transition-all duration-500 ${
                    isHovered ? 'border-[#00FFC2]/50' : ''
                  }`}
                  style={{
                    transform: isHovered && !lowPowerMode
                      ? 'rotateY(5deg) rotateX(-5deg) translateZ(20px)'
                      : 'rotateY(0) rotateX(0) translateZ(0)',
                    transition: 'transform 0.5s cubic-bezier(0.19, 1, 0.22, 1)',
                  }}
                >
                  {/* Image */}
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className={`w-full h-full object-cover transition-transform duration-700 ${
                        isHovered ? 'scale-110' : 'scale-100'
                      }`}
                    />
                    
                    {/* Overlay */}
                    <div
                      className={`absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/50 to-transparent transition-opacity duration-300 ${
                        isHovered ? 'opacity-90' : 'opacity-70'
                      }`}
                    />

                    {/* Category Badge */}
                    <div className="absolute top-4 left-4 px-3 py-1 bg-[#00FFC2]/20 border border-[#00FFC2]/50 rounded-full">
                      <span className="font-body text-xs text-[#00FFC2]">{project.category}</span>
                    </div>

                    {/* Icon */}
                    <div className="absolute top-4 right-4 w-10 h-10 bg-white/10 backdrop-blur-sm rounded-lg flex items-center justify-center text-[#00FFC2]">
                      <Icon />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="font-display text-xl font-bold text-white mb-2 group-hover:text-[#00FFC2] transition-colors">
                      {project.title}
                    </h3>
                    <p className="font-body text-sm text-[#A0A0A0] mb-4 line-clamp-2">
                      {project.description}
                    </p>

                    {/* Technologies */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.technologies.slice(0, 3).map((tech, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-white/5 rounded text-xs font-body text-white/70"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Actions */}
                    <div className="flex gap-3">
                      <button
                        onClick={() => openProject(project)}
                        data-cursor-hover
                        className="flex-1 py-2 bg-[#00FFC2]/10 border border-[#00FFC2]/50 rounded-lg font-body text-sm text-[#00FFC2] hover:bg-[#00FFC2]/20 transition-colors"
                      >
                        View Details
                      </button>
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        data-cursor-hover
                        className="px-4 py-2 bg-white/5 border border-white/20 rounded-lg hover:bg-white/10 transition-colors flex items-center justify-center"
                      >
                        <ExternalLink className="w-4 h-4 text-white" />
                      </a>
                    </div>
                  </div>

                  {/* Glow Effect */}
                  {isHovered && !lowPowerMode && (
                    <div className="absolute inset-0 rounded-xl pointer-events-none">
                      <div className="absolute inset-0 bg-gradient-to-r from-[#00FFC2]/10 to-[#8B5CF6]/10 rounded-xl" />
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Project Detail Modal */}
      {selectedProject && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl"
          onClick={closeProject}
        >
          <div
            className="relative w-full max-w-4xl max-h-[90vh] overflow-auto bg-[#0a0a0a] border border-[#00FFC2]/30 rounded-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={closeProject}
              data-cursor-hover
              className="absolute top-4 right-4 z-10 w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors"
            >
              <X className="w-5 h-5 text-white" />
            </button>

            {/* Modal Content */}
            <div className="relative">
              {/* Hero Image */}
              <div className="relative aspect-video">
                <img
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent" />
              </div>

              {/* Content */}
              <div className="p-8 -mt-20 relative">
                {/* Icon */}
                <div className="w-16 h-16 bg-[#00FFC2] rounded-xl flex items-center justify-center mb-6 text-[#050505]">
                  <selectedProject.icon />
                </div>

                {/* Title */}
                <span className="font-body text-sm text-[#00FFC2] mb-2 block">
                  {selectedProject.category}
                </span>
                <h3 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">
                  {selectedProject.title}
                </h3>
                <p className="font-body text-lg text-[#A0A0A0] mb-8">
                  {selectedProject.description}
                </p>

                {/* Features */}
                <div className="mb-8">
                  <h4 className="font-display text-sm tracking-wider text-white mb-4">
                    KEY FEATURES
                  </h4>
                  <div className="grid grid-cols-2 gap-3">
                    {selectedProject.features.map((feature, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-2 p-3 bg-white/5 rounded-lg"
                      >
                        <div className="w-2 h-2 bg-[#00FFC2] rounded-full" />
                        <span className="font-body text-sm text-white">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Technologies */}
                <div className="mb-8">
                  <h4 className="font-display text-sm tracking-wider text-white mb-4">
                    TECHNOLOGIES
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.technologies.map((tech, index) => (
                      <span
                        key={index}
                        className="px-4 py-2 bg-[#00FFC2]/10 border border-[#00FFC2]/30 rounded-full font-body text-sm text-[#00FFC2]"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* CTA */}
                <a
                  href={selectedProject.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor-hover
                  className="inline-flex items-center gap-3 btn-neon"
                >
                  <ExternalLink className="w-5 h-5" />
                  Visit Live Site
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default WorkShowcase;
