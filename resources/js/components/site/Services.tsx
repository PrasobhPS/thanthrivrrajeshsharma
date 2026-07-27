import { ArrowRight, Compass, Flame, ScrollText, ShieldCheck } from "lucide-react";
import r1 from "@/assets/ritual-1.jpg";
import r2 from "@/assets/ritual-2.jpg";
import r3 from "@/assets/ritual-3.jpg";

const serviceList = [
  {
    id: "DIVINE-01",
    tag: "Astro-Logic",
    title: "Vedic Path Decoding",
    desc: "A scientific dismantling of karmic barriers using 27 years of proprietary Tantric research.",
    img: r1,
    icon: <Compass className="w-8 h-8" />,
    features: ["Karmic Mapping", "Mantra Remedies"],
    shape: "lg:col-span-8"
  },
  {
    id: "DIVINE-02",
    tag: "Energetics",
    title: "Fire Protocol",
    desc: "Precision rituals designed to recalibrate your space frequency.",
    img: r2,
    icon: <Flame className="w-8 h-8" />,
    features: ["Vastu Healing", "Space Activation"],
    shape: "lg:col-span-4"
  },
  {
    id: "DIVINE-03",
    tag: "Artifacts",
    title: "Consecrated Yantras",
    desc: "Mathematical power-grids charged through 41 days of intense meditative sadhana.",
    img: r3,
    icon: <ScrollText className="w-8 h-8" />,
    features: ["Hand-Drawn", "41-Day Charge"],
    shape: "lg:col-span-12"
  }
];

export function Services() {
  return (
    <section id="services" className="relative py-24 sm:py-32 bg-[#020617] text-white overflow-hidden">
      {/* Advanced Ambience: Cosmic Grid & Glowing Nodes */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 left-0 w-[800px] h-[800px] bg-blue-600/10 blur-[200px] rounded-full" />
        <div className="absolute bottom-1/4 right-0 w-[600px] h-[600px] bg-gold/5 blur-[200px] rounded-full" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(197,160,89,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(197,160,89,0.02)_1px,transparent_1px)] bg-[size:60px_60px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-[1440px] px-8 sm:px-12">
        
        {/* Header: High-End Asymmetry */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-12 mb-20 animate-mask-reveal">
          <div className="max-w-2xl">
            <div className="flex items-center gap-4 mb-6">
              <div className="h-px w-12 bg-gold" />
              <span className="text-[10px] font-black tracking-[0.6em] uppercase text-gold">Sacred Technologies</span>
            </div>
            <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl leading-none tracking-tighter">
              Divine <span className="text-gold">Gateways</span>
            </h2>
          </div>
          <p className="lg:max-w-xs text-sm text-white/40 leading-relaxed font-serif">
            "Transforming ancient Vedic algorithms into modern spiritual breakthroughs."
          </p>
        </div>

        {/* Services Grid: The Kinetic Bento (Reference inspired) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {serviceList.map((service, index) => (
            <div 
              key={service.id} 
              className={`group relative ${service.shape} min-h-[480px] overflow-hidden rounded-[3rem] border border-white/10 bg-white/[0.02] backdrop-blur-3xl transition-all duration-700 hover:border-gold/40 hover:shadow-[0_0_80px_rgba(197,160,89,0.1)] animate-fade-up`}
              style={{ animationDelay: `${600 + index * 200}ms` }}
            >
              {/* Background Ritual Image with Parallax Reveal */}
              <div className="absolute inset-0 z-0">
                <img 
                  src={service.img} 
                  alt={service.title} 
                  className="w-full h-full object-cover grayscale opacity-20 group-hover:opacity-60 group-hover:grayscale-0 group-hover:scale-110 transition-all duration-[2s]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-transparent opacity-80" />
              </div>

              {/* Card Content: Professional & Modern */}
              <div className="relative z-10 p-12 h-full flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start mb-12">
                    <div className="space-y-1">
                      <span className="text-[9px] font-black tracking-widest text-gold/40 uppercase">{service.id}</span>
                      <h4 className="text-[10px] font-bold tracking-[0.3em] uppercase text-white/30">{service.tag}</h4>
                    </div>
                    <div className="p-4 rounded-3xl bg-white/5 border border-white/10 text-gold group-hover:bg-gold group-hover:text-[#020617] transition-all duration-700">
                      {service.icon}
                    </div>
                  </div>

                  <h3 className="text-4xl sm:text-5xl font-serif tracking-tighter leading-none mb-6">
                    {service.title.split(' ')[0]} <br />
                    <span className="text-gold">{service.title.split(' ').slice(1).join(' ')}</span>
                  </h3>
                  
                  <p className="text-base text-white/50 leading-relaxed max-w-sm mb-12">
                    {service.desc}
                  </p>

                  <ul className="space-y-4">
                    {service.features.map((f) => (
                      <li key={f} className="flex items-center gap-4 text-[10px] font-bold tracking-widest text-white/30 uppercase">
                        <ShieldCheck size={14} className="text-gold/40 group-hover:text-gold transition-colors" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Creative Action Trigger */}
                <div className="pt-12 flex items-center justify-between">
                  <div className="h-px flex-1 bg-white/10 group-hover:bg-gold/20 transition-colors" />
                  <button className="flex items-center gap-4 pl-10 group/btn text-[10px] font-black tracking-widest uppercase text-gold">
                    Initialize Protocol 
                    <div className="h-12 w-12 rounded-full border border-gold/20 flex items-center justify-center group-hover:bg-gold group-hover:text-[#020617] transition-all duration-500">
                      <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                    </div>
                  </button>
                </div>
              </div>

              {/* Floating ID Label (Awwwards Style) */}
              <div className="absolute top-1/2 -right-12 -translate-y-1/2 rotate-90 text-[8px] font-black tracking-[1em] text-white/[0.03] group-hover:text-gold/10 transition-colors uppercase pointer-events-none">
                Research·Portal
              </div>
            </div>
          ))}
        </div>

        {/* Global Technical Footer */}
        <div className="mt-32 flex flex-col sm:flex-row items-center justify-between gap-8 border-t border-white/5 pt-16 animate-fade-up">
          <div className="flex items-center gap-6 text-[9px] font-black tracking-[0.5em] text-blue-400/20 uppercase">
            <span>Terminal Connection</span>
            <div className="h-1.5 w-1.5 rounded-full bg-gold" />
            <span>Vedic Core 2.0</span>
          </div>
          <div className="flex gap-16 text-[9px] font-bold tracking-widest text-white/10 uppercase">
            {["Ancient Physics", "Geometric Calibration", "Tantric Cloud"].map((t) => (
              <span key={t}>{t}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
