import { useEffect, useRef, useState } from 'react';

interface EasterEggProps {
  onTrigger: () => void;
  triggered: boolean;
}

const EasterEgg = ({ onTrigger, triggered }: EasterEggProps) => {
  const [keySequence, setKeySequence] = useState<string[]>([]);
  const targetSequence = ['M', 'Y', 'C', 'H', 'A'];
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if user is typing in an input
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }

      const key = e.key.toUpperCase();
      
      // Add key to sequence
      setKeySequence((prev) => {
        const newSequence = [...prev, key].slice(-5);
        
        // Check if sequence matches
        if (newSequence.join('') === targetSequence.join('')) {
          onTrigger();
          
          // Play sound if enabled
          if (audioRef.current) {
            audioRef.current.play().catch(() => {});
          }
        }
        
        return newSequence;
      });
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onTrigger]);

  // Reset sequence after 2 seconds of inactivity
  useEffect(() => {
    if (keySequence.length === 0) return;
    
    const timeout = setTimeout(() => {
      setKeySequence([]);
    }, 2000);

    return () => clearTimeout(timeout);
  }, [keySequence]);

  // Don't show indicator if already triggered
  if (triggered) return null;

  return (
    <>
      {/* Key Sequence Indicator (subtle) */}
      {keySequence.length > 0 && (
        <div className="fixed bottom-24 right-8 z-40 flex gap-1">
          {targetSequence.map((key, index) => (
            <div
              key={index}
              className={`w-6 h-8 flex items-center justify-center font-mono text-xs border rounded ${
                index < keySequence.length && keySequence[index] === key
                  ? 'bg-[#00FFC2]/20 border-[#00FFC2] text-[#00FFC2]'
                  : 'bg-white/5 border-white/20 text-white/30'
              }`}
            >
              {key}
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default EasterEgg;
