import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Quote, ChevronLeft, ChevronRight, Star } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface Testimonial {
  quote: string;
  author: string;
  role: string;
  company: string;
  rating: number;
}

const testimonials: Testimonial[] = [
  {
    quote: "MYCHA transformed our vision into a functional masterpiece. The technical depth Gbolahan brings is unmatched. Every detail was meticulously crafted, and the final product exceeded our expectations.",
    author: "CEO, Danmos Group",
    role: "Chief Executive Officer",
    company: "Danmos Group",
    rating: 5,
  },
  {
    quote: "Fast, innovative, and visually stunning. The best software engineer we've collaborated with this year. Their understanding of modern web technologies and design principles is exceptional.",
    author: "Tech Lead",
    role: "Technical Lead",
    company: "Global Solutions",
    rating: 5,
  },
  {
    quote: "Working with MYCHA was a game-changer for our startup. They delivered a world-class product that helped us secure our Series A funding. Highly recommended for any serious tech project.",
    author: "Founder",
    role: "CEO & Founder",
    company: "TechStart Inc.",
    rating: 5,
  },
];

const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const autoPlayRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const content = contentRef.current;
    if (!section || !content) return;

    const triggers: ScrollTrigger[] = [];

    // Entrance animation
    const contentTrigger = ScrollTrigger.create({
      trigger: section,
      start: 'top 70%',
      onEnter: () => {
        gsap.fromTo(
          content,
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }
        );
      },
      once: true,
    });
    triggers.push(contentTrigger);

    return () => {
      triggers.forEach((t) => t.kill());
    };
  }, []);

  // Auto-rotate testimonials
  useEffect(() => {
    autoPlayRef.current = setInterval(() => {
      goToNext();
    }, 5000);

    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, [activeIndex]);

  const goToNext = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
    setTimeout(() => setIsAnimating(false), 500);
  };

  const goToPrev = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    setTimeout(() => setIsAnimating(false), 500);
  };

  const goToSlide = (index: number) => {
    if (isAnimating || index === activeIndex) return;
    setIsAnimating(true);
    setActiveIndex(index);
    setTimeout(() => setIsAnimating(false), 500);
  };

  const currentTestimonial = testimonials[activeIndex];

  return (
    <section
      id="testimonials"
      ref={sectionRef}
      className="relative min-h-screen py-24 section-padding animate-section flex items-center"
    >
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-[#050505] to-[#0a0a0a]" />
        <div className="absolute inset-0 grid-lines opacity-10" />
        
        {/* Decorative Orbs */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-[#00FFC2]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-[#8B5CF6]/5 rounded-full blur-3xl" />
      </div>

      <div ref={contentRef} className="relative z-10 max-w-5xl mx-auto w-full">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="font-accent text-xs tracking-[0.5em] text-[#00FFC2] mb-4 block">
            [ SYSTEM FEEDBACK ]
          </span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white">
            CLIENT <span className="text-[#00FFC2]">TESTIMONIALS</span>
          </h2>
        </div>

        {/* Testimonial Carousel */}
        <div className="relative">
          {/* Quote Icon */}
          <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-16 h-16 bg-[#00FFC2]/10 border border-[#00FFC2]/30 rounded-full flex items-center justify-center">
            <Quote className="w-8 h-8 text-[#00FFC2]" />
          </div>

          {/* Main Content */}
          <div className="glass-strong rounded-2xl p-8 md:p-12 pt-16 text-center">
            {/* Rating */}
            <div className="flex justify-center gap-1 mb-6">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-5 h-5 ${
                    i < currentTestimonial.rating
                      ? 'text-[#00FFC2] fill-[#00FFC2]'
                      : 'text-white/20'
                  }`}
                />
              ))}
            </div>

            {/* Quote */}
            <blockquote className="font-body text-xl md:text-2xl text-white leading-relaxed mb-8 min-h-[120px] flex items-center justify-center">
              "{currentTestimonial.quote}"
            </blockquote>

            {/* Author */}
            <div className="flex flex-col items-center">
              <div className="w-16 h-1 bg-gradient-to-r from-[#00FFC2] to-[#8B5CF6] rounded-full mb-4" />
              <cite className="font-display text-lg text-white not-italic">
                {currentTestimonial.author}
              </cite>
              <span className="font-body text-sm text-[#A0A0A0]">
                {currentTestimonial.role}, {currentTestimonial.company}
              </span>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={goToPrev}
              data-cursor-hover
              className="w-12 h-12 bg-white/5 border border-white/20 rounded-full flex items-center justify-center hover:bg-[#00FFC2]/20 hover:border-[#00FFC2]/50 transition-all"
            >
              <ChevronLeft className="w-5 h-5 text-white" />
            </button>

            {/* Dots */}
            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  data-cursor-hover
                  className={`w-3 h-3 rounded-full transition-all ${
                    index === activeIndex
                      ? 'bg-[#00FFC2] w-8'
                      : 'bg-white/20 hover:bg-white/40'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={goToNext}
              data-cursor-hover
              className="w-12 h-12 bg-white/5 border border-white/20 rounded-full flex items-center justify-center hover:bg-[#00FFC2]/20 hover:border-[#00FFC2]/50 transition-all"
            >
              <ChevronRight className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>

        {/* Background Testimonials (Visual Effect) */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {testimonials.map((_, index) => {
            if (index === activeIndex) return null;
            const isPrev = index === (activeIndex - 1 + testimonials.length) % testimonials.length;
            const isNext = index === (activeIndex + 1) % testimonials.length;
            
            return (
              <div
                key={index}
                className={`absolute top-1/2 -translate-y-1/2 glass rounded-xl p-6 opacity-20 blur-sm transition-all duration-500 ${
                  isPrev ? 'left-0 -translate-x-1/2' : ''
                } ${isNext ? 'right-0 translate-x-1/2' : ''} ${
                  !isPrev && !isNext ? 'hidden' : ''
                }`}
                style={{
                  transform: `translateY(-50%) ${isPrev ? 'translateX(-50%)' : 'translateX(50%)'} scale(0.8)`,
                }}
              >
                <Quote className="w-6 h-6 text-[#00FFC2] mb-4" />
                <p className="font-body text-sm text-white line-clamp-3">
                  {testimonials[index].quote}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
