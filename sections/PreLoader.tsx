import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';

interface PreLoaderProps {
  onComplete: () => void;
}

const PreLoader = ({ onComplete }: PreLoaderProps) => {
  const [progress, setProgress] = useState(0);
  const [text, setText] = useState('INITIALISING MYCHA SYSTEMS...');
  const containerRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<SVGCircleElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);

  // Scramble text effect
  const scrambleText = (finalText: string, duration: number = 800) => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*';
    const steps = 10;
    const stepDuration = duration / steps;
    let step = 0;

    const interval = setInterval(() => {
      if (step >= steps) {
        setText(finalText);
        clearInterval(interval);
        return;
      }

      const scrambled = finalText
        .split('')
        .map((char, i) => {
          if (char === ' ') return ' ';
          if (step / steps > i / finalText.length) return char;
          return chars[Math.floor(Math.random() * chars.length)];
        })
        .join('');

      setText(scrambled);
      step++;
    }, stepDuration);
  };

  useEffect(() => {
    // Start scramble effect
    scrambleText('INITIALISING MYCHA SYSTEMS...', 1000);

    // Simulate loading progress
    const duration = 2500;
    const startTime = Date.now();

    const updateProgress = () => {
      const elapsed = Date.now() - startTime;
      const newProgress = Math.min((elapsed / duration) * 100, 100);
      setProgress(newProgress);

      if (newProgress < 100) {
        requestAnimationFrame(updateProgress);
      } else {
        // Loading complete
        setTimeout(() => {
          exitAnimation();
        }, 500);
      }
    };

    requestAnimationFrame(updateProgress);

    // Animate ring
    if (ringRef.current) {
      const circumference = 2 * Math.PI * 90;
      ringRef.current.style.strokeDasharray = `${circumference}`;
      ringRef.current.style.strokeDashoffset = `${circumference}`;
      
      gsap.to(ringRef.current, {
        strokeDashoffset: 0,
        duration: 2.5,
        ease: 'none',
      });
    }

    // Pulse animation for logo
    if (logoRef.current) {
      gsap.to(logoRef.current, {
        scale: 1.05,
        duration: 1,
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut',
      });
    }

    return () => {
      // Cleanup
    };
  }, []);

  const exitAnimation = () => {
    const tl = gsap.timeline({
      onComplete: () => {
        onComplete();
      },
    });

    // Circular iris close effect
    tl.to(containerRef.current, {
      clipPath: 'circle(0% at 50% 50%)',
      duration: 0.8,
      ease: 'power3.inOut',
    });
  };

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9999] bg-[#050505] flex flex-col items-center justify-center"
      style={{ clipPath: 'circle(150% at 50% 50%)' }}
    >
      {/* Background Grid */}
      <div className="absolute inset-0 grid-lines opacity-30" />

      {/* Digital Noise Overlay */}
      <div className="absolute inset-0 opacity-10">
        <div 
          className="w-full h-full"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%' height='100%' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          }}
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center">
        {/* Logo with Progress Ring */}
        <div className="relative w-48 h-48 md:w-64 md:h-64 mb-8">
          {/* Outer Ring */}
          <svg className="absolute inset-0 w-full h-full -rotate-90">
            <circle
              cx="50%"
              cy="50%"
              r="90"
              fill="none"
              stroke="rgba(0, 255, 194, 0.1)"
              strokeWidth="2"
            />
            <circle
              ref={ringRef}
              cx="50%"
              cy="50%"
              r="90"
              fill="none"
              stroke="#00FFC2"
              strokeWidth="3"
              strokeLinecap="round"
              className="drop-shadow-[0_0_10px_rgba(0,255,194,0.8)]"
            />
          </svg>

          {/* Center Logo */}
          <div 
            ref={logoRef}
            className="absolute inset-0 flex items-center justify-center"
          >
            <div className="text-center">
              <span className="font-display text-5xl md:text-7xl font-bold text-white">
                M
              </span>
            </div>
          </div>

          {/* Orbiting Particles */}
          <div className="absolute inset-0 animate-spin-slow">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="absolute w-2 h-2 bg-[#00FFC2] rounded-full"
                style={{
                  top: `${50 + 40 * Math.sin((i * 120 * Math.PI) / 180)}%`,
                  left: `${50 + 40 * Math.cos((i * 120 * Math.PI) / 180)}%`,
                  transform: 'translate(-50%, -50%)',
                  boxShadow: '0 0 10px #00FFC2',
                }}
              />
            ))}
          </div>
        </div>

        {/* Loading Text */}
        <div className="text-center">
          <p className="font-display text-sm md:text-base tracking-[0.3em] text-[#00FFC2] mb-4">
            {text}
          </p>

          {/* Progress Percentage */}
          <div className="font-mono text-3xl md:text-4xl text-white font-bold">
            {Math.floor(progress)}%
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-64 md:w-96 h-1 bg-white/10 rounded-full mt-8 overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-[#00FFC2] to-[#8B5CF6] transition-all duration-100"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Corner Decorations */}
      <div className="absolute top-8 left-8 w-16 h-16 border-l-2 border-t-2 border-[#00FFC2]/30" />
      <div className="absolute top-8 right-8 w-16 h-16 border-r-2 border-t-2 border-[#00FFC2]/30" />
      <div className="absolute bottom-8 left-8 w-16 h-16 border-l-2 border-b-2 border-[#00FFC2]/30" />
      <div className="absolute bottom-8 right-8 w-16 h-16 border-r-2 border-b-2 border-[#00FFC2]/30" />
    </div>
  );
};

export default PreLoader;
