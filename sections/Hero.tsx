import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Float } from '@react-three/drei';
import * as THREE from 'three';
import { ChevronDown } from 'lucide-react';

gsap.registerPlugin(ScrollToPlugin);

interface HeroProps {
  lowPowerMode: boolean;
}

// 3D Tech Orb Component
const TechOrb = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.1;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.15;
    }
    if (ringRef.current) {
      ringRef.current.rotation.z = state.clock.elapsedTime * 0.05;
    }
  });

  return (
    <group>
      {/* Central Icosahedron */}
      <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
        <mesh ref={meshRef}>
          <icosahedronGeometry args={[2, 0]} />
          <meshStandardMaterial
            color="#00FFC2"
            wireframe
            transparent
            opacity={0.6}
          />
        </mesh>
      </Float>

      {/* Inner Core */}
      <mesh>
        <octahedronGeometry args={[1, 0]} />
        <meshStandardMaterial
          color="#8B5CF6"
          emissive="#8B5CF6"
          emissiveIntensity={0.5}
          transparent
          opacity={0.8}
        />
      </mesh>

      {/* Orbital Rings */}
      <group ref={ringRef}>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[3.5, 0.02, 16, 100]} />
          <meshBasicMaterial color="#00FFC2" transparent opacity={0.4} />
        </mesh>
        <mesh rotation={[0, Math.PI / 3, 0]}>
          <torusGeometry args={[4, 0.02, 16, 100]} />
          <meshBasicMaterial color="#8B5CF6" transparent opacity={0.3} />
        </mesh>
        <mesh rotation={[Math.PI / 4, 0, Math.PI / 6]}>
          <torusGeometry args={[4.5, 0.015, 16, 100]} />
          <meshBasicMaterial color="#00FFC2" transparent opacity={0.2} />
        </mesh>
      </group>

      {/* Floating Particles */}
      {[...Array(8)].map((_, i) => (
        <mesh
          key={i}
          position={[
            Math.cos((i / 8) * Math.PI * 2) * 5,
            Math.sin((i / 8) * Math.PI * 2) * 5,
            0,
          ]}
        >
          <sphereGeometry args={[0.08, 8, 8]} />
          <meshBasicMaterial color="#00FFC2" />
        </mesh>
      ))}
    </group>
  );
};

// Import useFrame
import { useFrame } from '@react-three/fiber';

const Hero = ({ lowPowerMode }: HeroProps) => {
  const [displayText, setDisplayText] = useState('');
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);

  const phrases = [
    'I build websites.',
    'I solve problems.',
    'I innovate.',
  ];

  // Typewriter Effect
  useEffect(() => {
    const currentPhrase = phrases[phraseIndex];
    const typeSpeed = isDeleting ? 50 : 100;
    const pauseSpeed = 2000;

    const timeout = setTimeout(() => {
      if (!isDeleting && displayText === currentPhrase) {
        setIsDeleting(true);
        setTimeout(() => {}, pauseSpeed);
      } else if (isDeleting && displayText === '') {
        setIsDeleting(false);
        setPhraseIndex((prev) => (prev + 1) % phrases.length);
      } else {
        setDisplayText(
          isDeleting
            ? currentPhrase.substring(0, displayText.length - 1)
            : currentPhrase.substring(0, displayText.length + 1)
        );
      }
    }, isDeleting && displayText === '' ? 500 : typeSpeed);

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, phraseIndex]);

  // Entrance Animation
  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.5 });

    // Title animation
    if (titleRef.current) {
      tl.fromTo(
        titleRef.current,
        { opacity: 0, rotateX: 90, y: 50 },
        { opacity: 1, rotateX: 0, y: 0, duration: 1.2, ease: 'power3.out' }
      );
    }

    // Subtitle animation
    if (subtitleRef.current) {
      tl.fromTo(
        subtitleRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' },
        '-=0.5'
      );
    }

    return () => {
      tl.kill();
    };
  }, []);

  const scrollToAbout = () => {
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      gsap.to(window, {
        duration: 1,
        scrollTo: { y: aboutSection, offsetY: 0 },
        ease: 'power3.inOut',
      });
    }
  };

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="/hero-bg.jpg"
          alt=""
          className="w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#050505]/50 via-transparent to-[#050505]" />
      </div>

      {/* 3D Tech Orb - Desktop Only */}
      {!lowPowerMode && (
        <div className="absolute right-[10%] top-1/2 -translate-y-1/2 w-[400px] h-[400px] hidden lg:block z-10">
          <Canvas camera={{ position: [0, 0, 10], fov: 50 }}>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} intensity={1} color="#00FFC2" />
            <pointLight position={[-10, -10, -10]} intensity={0.5} color="#8B5CF6" />
            <TechOrb />
            <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
          </Canvas>
        </div>
      )}

      {/* Content */}
      <div className="relative z-20 text-center section-padding max-w-5xl mx-auto">
        {/* Main Title */}
        <h1
          ref={titleRef}
          className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6"
          style={{ perspective: '1000px' }}
        >
          WELCOME TO{' '}
          <span className="text-[#00FFC2] neon-glow">MYCHA</span>
          <br />
          <span className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-normal">
            PORTFOLIO
          </span>
        </h1>

        {/* Typewriter Subtitle */}
        <p
          ref={subtitleRef}
          className="font-body text-xl sm:text-2xl md:text-3xl text-[#A0A0A0] mb-8 typewriter-cursor"
        >
          {displayText}
          <span className="animate-pulse">|</span>
        </p>

        {/* CTA Button */}
        <button
          onClick={scrollToAbout}
          data-cursor-hover
          className="btn-neon text-lg"
        >
          [ EXPLORE THE SYSTEM ]
        </button>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-8 mt-16 max-w-2xl mx-auto">
          {[
            { value: '50+', label: 'Projects' },
            { value: '30+', label: 'Clients' },
            { value: '5+', label: 'Years Exp.' },
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <div className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-[#00FFC2]">
                {stat.value}
              </div>
              <div className="font-body text-sm text-[#A0A0A0] mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 animate-bounce">
        <ChevronDown className="w-8 h-8 text-[#00FFC2]" />
      </div>

      {/* Corner Decorations */}
      <div className="absolute top-20 left-8 w-24 h-24 border-l-2 border-t-2 border-[#00FFC2]/20 hidden md:block" />
      <div className="absolute top-20 right-8 w-24 h-24 border-r-2 border-t-2 border-[#00FFC2]/20 hidden md:block" />
      <div className="absolute bottom-20 left-8 w-24 h-24 border-l-2 border-b-2 border-[#00FFC2]/20 hidden md:block" />
      <div className="absolute bottom-20 right-8 w-24 h-24 border-r-2 border-b-2 border-[#00FFC2]/20 hidden md:block" />
    </section>
  );
};

export default Hero;
