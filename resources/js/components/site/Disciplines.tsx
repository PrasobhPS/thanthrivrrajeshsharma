import { ArrowRight, Compass, Flame, ScrollText, ShieldCheck, Zap, Activity, Microscope } from "lucide-react";
import r1 from "@/assets/ritual-1.jpg";
import r2 from "@/assets/ritual-2.jpg";
import r3 from "@/assets/ritual-3.jpg";

const disciplineList = [
  {
    id: "SC-01",
    tag: "Collections",
    title: "Thanthri Collections",
    desc: "Welcome to the sacred collections of spiritual and antique items which will enlighten your life and surroundings.",
    img: r1,
    icon: <Microscope className="w-8 h-8" />,
    metrics: ["Spiritual Artifacts", "Antique Enlightenment"],
    accent: "blue"
  },
  {
    id: "SC-02",
    tag: "Rituals",
    title: "Pooja & Homam",
    desc: "Pooja is a ritual of worship and adoration of Paramathma (God) in the Vedic tradition, designed for spiritual recalibration.",
    img: r2,
    icon: <Activity className="w-8 h-8" />,
    metrics: ["Vedic Protocol", "Space Activation"],
    accent: "gold"
  },
  {
    id: "SC-03",
    tag: "Instruments",
    title: "Sacred Yantras",
    desc: "Yantra is a Sanskrit word meaning loom, instrument or machine—a divine geometric portal for spiritual activation and protection.",
    img: r3,
    icon: <ScrollText className="w-8 h-8" />,
    metrics: ["Geometric Portal", "41-Day Consecration"],
    accent: "red"
  }
];

export function Disciplines() {
  return (
    <section id="disciplines" className="relative py-20 sm:py-24 bg-[#020617] text-[#fdfcf6] overflow-hidden">
      
      {/* Structural HUD Elements */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-20">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-full bg-white/[0.05]" />
        
        {/* Glowing Orbs */}
        <div className="absolute top-1/4 -left-1/4 w-[800px] h-[800px] bg-blue-900/20 blur-[200px] rounded-full" />
        <div className="absolute bottom-1/4 -right-1/4 w-[600px] h-[600px] bg-gold/10 blur-[200px] rounded-full" />
      </div>

      <div className="relative z-10 mx-auto max-w-[1440px] px-8 sm:px-12 w-full">
        
        {/* Header: Architectural Precision */}
        <div className="grid lg:grid-cols-12 gap-12 mb-16 items-end">
          <div className="lg:col-span-8 space-y-8">
            <div className="flex items-center gap-4 animate-fade-in">
              <span className="h-2 w-2 rounded-full bg-gold animate-pulse" />
              <span className="text-[10px] font-black tracking-[0.6em] uppercase text-gold">Sacred Framework v4.0</span>
            </div>
            <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl leading-[1.1] tracking-tighter animate-mask-reveal">
              Our Sacred <br />
              <span className="text-gold">Services</span>
            </h2>
          </div>
          <div className="lg:col-span-4 border-l border-white/10 pl-12 py-4 animate-fade-up">
            <p className="text-sm text-[#fdfcf6]/40 leading-relaxed font-serif max-w-xs">
              "We provide traditional Vedic interventions and consecrated instruments designed for modern spiritual breakthroughs."
            </p>
          </div>
        </div>

        {/* Disciplines Grid: The Lab Interface */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 sm:gap-1px bg-white/5 border border-white/10 rounded-[4rem] overflow-hidden">
          {disciplineList.map((item, index) => (
            <div 
              key={item.id} 
              className="group relative bg-[#020617] p-12 sm:p-16 transition-all duration-700 hover:bg-white/[0.02]"
            >
              {/* Background Reveal */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-1000">
                <img src={item.img} alt={item.title} className="w-full h-full object-cover grayscale" />
              </div>

              {/* HUD ID */}
              <div className="flex justify-between items-start mb-16 relative z-10">
                <div className="space-y-1">
                  <div className="text-[9px] font-black tracking-[0.4em] text-gold uppercase">{item.id}</div>
                  <h4 className="text-[10px] font-bold tracking-widest text-white/30 uppercase">{item.tag}</h4>
                </div>
                <div className="h-16 w-16 rounded-2xl border border-white/5 flex items-center justify-center text-gold group-hover:scale-110 group-hover:bg-gold group-hover:text-black transition-all duration-500">
                  {item.icon}
                </div>
              </div>

              <div className="relative z-10">
                <h3 className="text-4xl font-serif tracking-tighter leading-none mb-8 group-hover:text-gold transition-colors">
                  {item.title}
                </h3>
                <p className="text-base text-[#fdfcf6]/40 leading-relaxed mb-12 min-h-[5rem]">
                  {item.desc}
                </p>

                {/* Technical Specs */}
                <div className="space-y-4 mb-16">
                  {item.metrics.map((m) => (
                    <div key={m} className="flex items-center gap-4 text-[9px] font-black tracking-widest text-white/20 uppercase">
                      <Zap size={12} className="text-gold/40" />
                      {m}
                    </div>
                  ))}
                </div>

                {/* CTA */}
                <button className="flex items-center gap-6 group/btn text-[10px] font-black tracking-widest uppercase text-gold">
                  Read More
                  <div className="h-12 w-12 rounded-full border border-gold/20 flex items-center justify-center group-hover/btn:bg-gold group-hover/btn:text-black transition-all">
                    <ArrowRight size={18} className="group-hover/btn:translate-x-1 transition-transform" />
                  </div>
                </button>
              </div>

              {/* Interaction Border */}
              <div className="absolute bottom-0 left-0 w-full h-1 bg-gold scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left" />
            </div>
          ))}
        </div>

        {/* Technical Footer */}
        <div className="mt-16 flex flex-col sm:flex-row items-center justify-between gap-8 animate-fade-up">
          <div className="flex items-center gap-6">
            <div className="flex -space-x-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-10 w-10 rounded-full border-2 border-[#020617] bg-white/5 overflow-hidden">
                  <img src={disciplineList[i-1].img} alt="node" className="w-full h-full object-cover grayscale opacity-50" />
                </div>
              ))}
            </div>
            <div className="text-[10px] font-bold tracking-widest text-white/30 uppercase">
              4.8/5.0 <span className="text-gold">Protocol Accuracy</span>
            </div>
          </div>
          
          <div className="flex gap-12 text-[9px] font-black tracking-[0.3em] text-white/10 uppercase">
            <span>Verified Heritage</span>
            <span>Real-time Calibration</span>
            <span>Tantric Logic</span>
          </div>
        </div>
      </div>
    </section>
  );
}
