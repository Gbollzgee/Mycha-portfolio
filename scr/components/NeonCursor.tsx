import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const NeonCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if touch device
    const isTouchDevice = window.matchMedia('(pointer: coarse)').matches;
    if (isTouchDevice) return;

    const cursor = cursorRef.current;
    const cursorDot = cursorDotRef.current;
    if (!cursor || !cursorDot) return;

    const onMouseMove = (e: MouseEvent) => {
      setIsVisible(true);
      
      // Fast, responsive cursor movement
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.08,
        ease: 'power2.out',
      });
      
      gsap.to(cursorDot, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.02,
        ease: 'none',
      });
    };

    const onMouseEnter = () => setIsVisible(true);
    const onMouseLeave = () => setIsVisible(false);

    // Handle hoverable elements
    const handleElementHover = () => {
      setIsHovering(true);
    };

    const handleElementLeave = () => {
      setIsHovering(false);
    };

    // Add listeners
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseenter', onMouseEnter);
    document.addEventListener('mouseleave', onMouseLeave);

    // Add hover listeners to interactive elements
    const interactiveElements = document.querySelectorAll('a, button, [data-cursor-hover]');
    interactiveElements.forEach((el) => {
      el.addEventListener('mouseenter', handleElementHover);
      el.addEventListener('mouseleave', handleElementLeave);
    });

    // Hide default cursor
    document.body.style.cursor = 'none';

    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseenter', onMouseEnter);
      document.removeEventListener('mouseleave', onMouseLeave);
      
      interactiveElements.forEach((el) => {
        el.removeEventListener('mouseenter', handleElementHover);
        el.removeEventListener('mouseleave', handleElementLeave);
      });
      
      document.body.style.cursor = 'auto';
    };
  }, []);

  // Re-attach hover listeners when DOM changes
  useEffect(() => {
    const observer = new MutationObserver(() => {
      const interactiveElements = document.querySelectorAll('a, button, [data-cursor-hover]');
      interactiveElements.forEach((el) => {
        el.addEventListener('mouseenter', () => setIsHovering(true));
        el.addEventListener('mouseleave', () => setIsHovering(false));
      });
    });

    observer.observe(document.body, { childList: true, subtree: true });

    return () => observer.disconnect();
  }, []);

  // Don't render on touch devices
  if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) {
    return null;
  }

  return (
    <>
      {/* Outer Ring */}
      <div
        ref={cursorRef}
        className={`fixed top-0 left-0 pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 transition-opacity duration-200 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
        style={{ willChange: 'transform' }}
      >
        <div
          className={`rounded-full border-2 transition-all duration-200 ${
            isHovering 
              ? 'w-16 h-16 border-[#8B5CF6] bg-[#8B5CF6]/10' 
              : 'w-10 h-10 border-[#00FFC2]'
          }`}
          style={{
            boxShadow: isHovering 
              ? '0 0 20px rgba(139, 92, 246, 0.5), inset 0 0 20px rgba(139, 92, 246, 0.1)' 
              : '0 0 15px rgba(0, 255, 194, 0.5), inset 0 0 10px rgba(0, 255, 194, 0.1)',
          }}
        />
      </div>

      {/* Center Dot */}
      <div
        ref={cursorDotRef}
        className={`fixed top-0 left-0 pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 transition-opacity duration-200 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
        style={{ willChange: 'transform' }}
      >
        <div
          className={`w-2 h-2 rounded-full transition-all duration-150 ${
            isHovering ? 'bg-[#8B5CF6] scale-150' : 'bg-[#00FFC2]'
          }`}
          style={{
            boxShadow: isHovering 
              ? '0 0 10px #8B5CF6' 
              : '0 0 8px #00FFC2',
          }}
        />
      </div>
    </>
  );
};

export default NeonCursor;
