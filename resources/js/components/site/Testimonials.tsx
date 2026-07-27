import { useState } from "react";
import { ArrowLeft, ArrowRight, Quote, Sparkles, MapPin } from "lucide-react";
import r1 from "@/assets/ritual-1.jpg";
import r2 from "@/assets/ritual-2.jpg";
import r3 from "@/assets/ritual-3.jpg";
import { useLocale } from "@/i18n/LocaleProvider";

const slides = [
  {
    id: "01",
    quote: "Thanthri ji didn't read my chart — he read my soul. The clarity I received in one session reshaped my entire decade. Truly a master of his craft.",
    name: "Akhil Raj Narayan",
    role: "Tech Founder",
    city: "Mumbai",
    img: r1,
    tag: "Astro-Logic"
  },
  {
    id: "02",
    quote: "The Sri Yantra he consecrated sits at the heart of my home. The shift in our family's energy has been undeniable. A profound manifestation.",
    name: "Priya Menon",
    role: "Architect",
    city: "Bengaluru",
    img: r2,
    tag: "Energetics"
  },
  {
    id: "03",
    quote: "Years of restlessness dissolved into a single mantra he gave me. There is a quiet now where there was only noise. A life-changing transition.",
    name: "David Hartwell",
    role: "Author",
    city: "London",
    img: r3,
    tag: "Sadhana"
  }
];

export function Testimonials() {
  const { t } = useLocale();
  const [active, setActive] = useState(0);

  const next = () => setActive((prev) => (prev + 1) % slides.length);
  const prev = () => setActive((prev) => (prev - 1 + slides.length) % slides.length);

  const slide = slides[active];

  return (
    <section id="devotees" className="relative py-10 sm:py-12 bg-[#fdfcf6] text-[#1a1a1a] overflow-hidden">
      {/* Advanced Ambience: Architectural Axis */}
      <div className="absolute inset-0 z-0 opacity-[0.05] pointer-events-none">
        <div className="absolute top-0 left-1/2 h-full w-px bg-gold" />
        <div className="absolute top-1/2 left-0 w-full h-px bg-gold" />
      </div>

      <div className="relative z-10 mx-auto max-w-[1440px] px-8 sm:px-12">
        
        {/* Header: Centered Minimalism */}
        <div className="max-w-4xl mx-auto text-center mb-6 animate-mask-reveal">
          <div className="inline-flex items-center gap-3 mb-4 bg-gold/5 border border-gold/20 px-6 py-2 rounded-full">
            <Sparkles size={14} className="text-gold animate-pulse" />
            <span className="text-[10px] font-black tracking-[0.5em] uppercase text-gold">{t("devotees.eyebrow")}</span>
          </div>
          <h2 className="font-serif text-4xl sm:text-6xl leading-none tracking-tighter">
            {t("devotees.titleLine1")} <span className="text-gold">{t("devotees.titleLine2")}</span>
          </h2>
        </div>

        {/* Advanced Slider Layout: The 'Kinetic Split' (No Cards) */}
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          
          {/* Left Column: The Morphed Portal */}
          <div className="lg:col-span-4 relative flex justify-center">
            <div className="relative w-full max-w-[320px] aspect-square">
              {/* Dynamic Shape Mask (Reference inspired) */}
              <div className="absolute inset-0 bg-gold/5 border-2 border-gold/10 rounded-[40%_60%_70%_30%_/_40%_50%_60%_50%] animate-blob" />
              
              <div className="relative h-full w-full rounded-[40%_60%_70%_30%_/_40%_50%_60%_50%] overflow-hidden border border-gold/30 shadow-[0_0_60px_rgba(245,130,32,0.2)] transition-all duration-1000 animate-blob">
                <img 
                  key={slide.img}
                  src={slide.img} 
                  alt="" 
                  className="w-full h-full object-cover animate-mask-reveal"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#fdfcf6]/20 via-transparent to-transparent opacity-40" />
              </div>

              {/* Floating ID Indicator */}
              <div className="absolute -bottom-6 -right-6 h-24 w-24 bg-[#1a1a1a] text-white rounded-full flex flex-col items-center justify-center shadow-2xl">
                <span className="text-[9px] font-black tracking-widest uppercase text-gold/40">Portal</span>
                <span className="font-serif text-3xl font-bold">{slide.id}</span>
              </div>
            </div>
          </div>

          {/* Right Column: The Narrative Narrative */}
          <div className="lg:col-span-8 space-y-12">
            <div key={active} className="space-y-8 animate-fade-up">
              <div className="flex items-center gap-4">
                <Quote className="text-gold" size={24} />
                <div className="text-[10px] font-black tracking-[0.4em] uppercase text-gold/60">{slide.tag} Protocol</div>
              </div>
              
              <p className="font-serif text-xl sm:text-3xl leading-[1.2] tracking-tight text-[#1a1a1a]">
                "{slide.quote}"
              </p>

              <div className="flex items-center justify-between pt-8 border-t border-gold/10">
                <div className="space-y-1">
                  <h4 className="font-serif text-2xl font-bold">{slide.name}</h4>
                  <div className="flex items-center gap-3 text-[10px] font-black tracking-widest text-gold/60 uppercase">
                    <MapPin size={12} />
                    {slide.city} · {slide.role}
                  </div>
                </div>
              </div>
            </div>

            {/* Slider Navigation: Advanced Minimalism */}
            <div className="flex items-center gap-12 pt-12">
              <div className="flex gap-4">
                <button 
                  onClick={prev}
                  className="h-16 w-16 rounded-full border border-gold/20 flex items-center justify-center hover:bg-gold hover:text-[#fdfcf6] hover:border-gold transition-all duration-500 group"
                >
                  <ArrowLeft size={24} className="group-hover:-translate-x-1 transition-transform" />
                </button>
                <button 
                  onClick={next}
                  className="h-16 w-16 rounded-full border border-gold/20 flex items-center justify-center hover:bg-gold hover:text-[#fdfcf6] hover:border-gold transition-all duration-500 group"
                >
                  <ArrowRight size={24} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </div>

              {/* Progress: The Narrative Timeline */}
              <div className="flex-1 flex items-center gap-6">
                <div className="text-[10px] font-black tracking-widest uppercase text-[#1a1a1a]/20">Progress</div>
                <div className="flex-1 h-px bg-gold/10 relative">
                  <div 
                    className="absolute top-0 left-0 h-full bg-gold transition-all duration-1000" 
                    style={{ width: `${((active + 1) / slides.length) * 100}%` }}
                  />
                </div>
                <div className="font-serif text-sm font-bold text-gold">{active + 1} / {slides.length}</div>
              </div>
            </div>
          </div>

        </div>

        {/* Global HUD Footer */}
        <div className="mt-8 border-t border-gold/20 pt-8 flex flex-col sm:flex-row items-center justify-between gap-8 opacity-40 animate-fade-up">
          <div className="text-[9px] font-black tracking-[0.5em] text-[#1a1a1a] uppercase">
            A Global Legacy of Spiritual Excellence
          </div>
          <div className="flex gap-16 text-[9px] font-bold tracking-widest text-gold uppercase">
            {["Ancient Physics", "Geometric Calibration", "Tantric Research"].map((t) => (
              <span key={t}>{t}</span>
            ))}
          </div>
        </div>

      </div>
      
      {/* Blob Keyframes (Added to styles.css in a real project) */}
      <style>{`
        @keyframes blob {
          0%, 100% { border-radius: 40% 60% 70% 30% / 40% 50% 60% 50%; }
          33% { border-radius: 60% 40% 50% 70% / 50% 60% 30% 60%; }
          66% { border-radius: 50% 50% 30% 70% / 60% 40% 70% 40%; }
        }
        .animate-blob {
          animation: blob 10s infinite alternate;
        }
      `}</style>
    </section>
  );
}
