import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

export function BackToTop() {
  const [show, setShow] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrollY / windowHeight) * 100;
      
      setScrollProgress(progress);
      setShow(scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-32 right-10 z-50 flex items-center justify-center transition-all duration-700 ${
        show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10 pointer-events-none"
      } group`}
      aria-label="Back to Top"
    >
      {/* Structural HUD Frame */}
      <div className="relative h-16 w-16 flex items-center justify-center">
        
        {/* Progress Ring (SVG) */}
        <svg className="absolute inset-0 h-full w-full -rotate-90">
          <circle
            cx="32"
            cy="32"
            r="30"
            stroke="rgba(255, 255, 255, 0.05)"
            strokeWidth="1"
            fill="transparent"
          />
          <circle
            cx="32"
            cy="32"
            r="30"
            stroke="var(--gold)"
            strokeWidth="1.5"
            fill="transparent"
            strokeDasharray="188.4"
            strokeDashoffset={188.4 - (scrollProgress / 100) * 188.4}
            className="transition-all duration-200"
          />
        </svg>

        {/* Inner Glass Orb */}
        <div className="h-12 w-12 rounded-full bg-white/[0.03] backdrop-blur-md border border-white/10 flex items-center justify-center group-hover:scale-110 group-hover:border-gold/40 transition-all duration-500 shadow-2xl overflow-hidden relative">
          <div className="absolute inset-0 bg-gradient-to-tr from-gold/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <ArrowUp 
            size={18} 
            className="text-gold group-hover:-translate-y-1 group-hover:scale-110 transition-transform duration-500" 
          />
        </div>

        {/* Floating Technical Tags */}
        <div className="absolute -top-1 -right-8 opacity-0 group-hover:opacity-100 transition-all duration-500 -translate-x-4 group-hover:translate-x-0 pointer-events-none">
          <div className="text-[8px] font-black tracking-[0.3em] uppercase text-gold/60 font-heading bg-black/80 backdrop-blur-sm border border-gold/20 px-2 py-1 rounded">
            Top
          </div>
        </div>
      </div>
    </button>
  );
}
