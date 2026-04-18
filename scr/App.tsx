import { useState, useEffect, useRef, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import PreLoader from './sections/PreLoader';
import ParticleBackground from './components/ParticleBackground';
import NeonCursor from './components/NeonCursor';
import Navigation from './components/Navigation';
import Hero from './sections/Hero';
import About from './sections/About';
import WorkShowcase from './sections/WorkShowcase';
import Services from './sections/Services';
import Team from './sections/Team';
import Testimonials from './sections/Testimonials';
import Contact from './sections/Contact';
import LowPowerToggle from './components/LowPowerToggle';
import EasterEgg from './components/EasterEgg';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [lowPowerMode, setLowPowerMode] = useState(false);
  const [easterEggTriggered, setEasterEggTriggered] = useState(false);
  const mainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check for low power mode preference
    const savedMode = localStorage.getItem('mycha-low-power');
    if (savedMode === 'true') {
      setLowPowerMode(true);
    }

    // Check for touch device
    const isTouchDevice = window.matchMedia('(pointer: coarse)').matches;
    if (isTouchDevice) {
      setLowPowerMode(true);
    }
  }, []);

  useEffect(() => {
    if (!isLoading && mainRef.current) {
      // Initialize scroll animations
      ScrollTrigger.refresh();
      
      // Animate sections on scroll
      const sections = gsap.utils.toArray<HTMLElement>('.animate-section');
      sections.forEach((section) => {
        gsap.fromTo(
          section,
          { opacity: 0.8, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });
    }
  }, [isLoading]);

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  const toggleLowPowerMode = () => {
    const newMode = !lowPowerMode;
    setLowPowerMode(newMode);
    localStorage.setItem('mycha-low-power', newMode.toString());
  };

  return (
    <div className="relative min-h-screen bg-[#050505] grain">
      {/* PreLoader */}
      {isLoading && (
        <PreLoader 
          onComplete={handleLoadingComplete} 
        />
      )}

      {/* Custom Cursor - Desktop Only */}
      {!lowPowerMode && <NeonCursor />}

      {/* Particle Background */}
      {!lowPowerMode && !isLoading && (
        <div className="fixed inset-0 z-0">
          <Canvas
            camera={{ position: [0, 0, 50], fov: 75 }}
            dpr={[1, 2]}
            gl={{ antialias: true, alpha: true }}
          >
            <Suspense fallback={null}>
              <ParticleBackground />
            </Suspense>
          </Canvas>
        </div>
      )}

      {/* Static Background for Low Power Mode */}
      {lowPowerMode && (
        <div className="fixed inset-0 z-0 bg-gradient-to-b from-[#050505] via-[#0a0a0a] to-[#050505]">
          <div className="absolute inset-0 grid-lines opacity-50" />
        </div>
      )}

      {/* Main Content */}
      <main 
        ref={mainRef}
        className={`relative z-10 transition-opacity duration-1000 ${
          isLoading ? 'opacity-0' : 'opacity-100'
        }`}
      >
        {/* Navigation */}
        <Navigation />

        {/* Hero Section */}
        <Hero lowPowerMode={lowPowerMode} />

        {/* About Section */}
        <About />

        {/* Work Showcase */}
        <WorkShowcase lowPowerMode={lowPowerMode} />

        {/* Services */}
        <Services />

        {/* Team */}
        <Team />

        {/* Testimonials */}
        <Testimonials />

        {/* Contact */}
        <Contact />

        {/* Footer */}
        <footer className="py-8 border-t border-white/10">
          <div className="section-padding text-center">
            <p className="text-[#A0A0A0] text-sm font-body">
              &copy; {new Date().getFullYear()} MYCHA Tech Agency. All rights reserved.
            </p>
            <p className="text-[#00FFC2] text-xs mt-2 font-display tracking-wider">
              ENGINEERING THE DIGITAL DIMENSION
            </p>
          </div>
        </footer>
      </main>

      {/* Low Power Mode Toggle */}
      <LowPowerToggle 
        enabled={lowPowerMode} 
        onToggle={toggleLowPowerMode} 
      />

      {/* Easter Egg Handler */}
      <EasterEgg 
        onTrigger={() => setEasterEggTriggered(true)}
        triggered={easterEggTriggered}
      />

      {/* Easter Egg Overlay */}
      {easterEggTriggered && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90">
          <div className="text-center">
            <h2 className="font-display text-4xl md:text-6xl text-[#00FFC2] neon-glow mb-4">
              SYSTEM UNLOCKED
            </h2>
            <p className="text-white font-body text-lg mb-8">
              Welcome to the hidden dimension of MYCHA
            </p>
            <button
              onClick={() => setEasterEggTriggered(false)}
              className="btn-neon"
            >
              RETURN TO REALITY
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
