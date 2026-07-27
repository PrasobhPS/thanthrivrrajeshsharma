import { useState } from "react";
import { ArrowRight, MoveRight, Clock, ShieldCheck, Zap, Minus } from "lucide-react";
import b1 from "@/assets/ritual-1.jpg";
import b2 from "@/assets/ritual-2.jpg";
import b3 from "@/assets/ritual-3.jpg";
import { useLocale } from "@/i18n/LocaleProvider";

const blogPosts = [
  {
    id: "J-27",
    category: "Sacred Geometry",
    title: "The Living Mathematics of Sri Yantra",
    excerpt: "Exploring how ancient geometric patterns encode the fundamental frequencies of the human consciousness through mathematical deconstruction.",
    img: b1,
    date: "12 May 2024",
    readTime: "9 Min Read",
    tags: ["Quantum", "Vedic", "Geometry"]
  },
  {
    id: "J-26",
    category: "Sonic Science",
    title: "Mantra Resonance & Cellular Calibration",
    excerpt: "The intersection of Vedic chanting and quantum physics: How sound waves reshape our energetic blueprint at a cellular level.",
    img: b2,
    date: "04 May 2024",
    readTime: "7 Min Read",
    tags: ["Acoustics", "Physics", "Healing"]
  },
  {
    id: "J-25",
    category: "Ancient Physics",
    title: "The Fire Protocol: Agnihotra Decoded",
    excerpt: "A deep dive into the thermal and chemical transitions during traditional fire rituals and their measurable impact on the surrounding environment.",
    img: b3,
    date: "28 April 2024",
    readTime: "12 Min Read",
    tags: ["Alchemy", "Thermal", "Vastu"]
  },
  {
    id: "J-24",
    category: "Consciousness",
    title: "Decoding the 27 Nakshatras",
    excerpt: "A technical analysis of planetary nodes and their influence on the human neurological architecture according to ancient scripts.",
    img: b1,
    date: "15 April 2024",
    readTime: "15 Min Read",
    tags: ["Astrology", "Neuro", "Vedic"]
  }
];

export function LatestBlogs() {
  const { t } = useLocale();
  const [active, setActive] = useState(0);

  return (
    <section id="journal" className="relative py-24 sm:py-32 bg-[#fdfcf6] text-[#1a1a1a] overflow-hidden">
      
      {/* Editorial Ambience: Architectural Grid Lines */}
      <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none">
        <div className="absolute top-0 left-1/2 w-px h-full bg-[#1a1a1a]" />
        <div className="absolute top-1/2 left-0 w-full h-px bg-[#1a1a1a]" />
        <div className="absolute inset-0 bg-[radial-gradient(#1a1a1a_1px,transparent_1px)] bg-[size:40px_40px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-[1440px] px-8 sm:px-12 w-full">
        
        {/* Header: High-Density Authority */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-12 mb-20 animate-mask-reveal">
          <div className="max-w-2xl">
            <div className="flex items-center gap-4 mb-6">
              <div className="h-px w-16 bg-gold" />
              <span className="text-[10px] font-black tracking-[0.5em] uppercase text-gold">{t("journal.eyebrow")}</span>
            </div>
            <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl leading-none tracking-tighter">
              {t("journal.titleLine1")} <span className="text-gold">{t("journal.titleLine2")}</span>
            </h2>
          </div>
          <div className="flex flex-col items-start gap-4 lg:pb-4 animate-fade-up">
            <div className="flex items-center gap-3 px-6 py-2 bg-[#1a1a1a]/5 border border-[#1a1a1a]/10 rounded-full">
              <ShieldCheck size={16} className="text-gold" />
              <span className="text-[9px] font-black tracking-widest uppercase">{t("journal.verified")}</span>
            </div>
          </div>
        </div>

        {/* The 'Archival Split-View' Layout */}
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-24">
          
          {/* Left Column: Interactive Title List */}
          <div className="lg:col-span-6 space-y-2">
            {blogPosts.map((post, index) => (
              <div 
                key={post.id}
                onMouseEnter={() => setActive(index)}
                className={`group relative py-8 px-6 cursor-pointer border-b border-[#1a1a1a]/5 transition-all duration-500
                  ${active === index ? "bg-[#1a1a1a] text-white" : "hover:bg-[#1a1a1a]/[0.02]"}
                `}
              >
                <div className="flex items-center justify-between gap-6">
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-3">
                      <span className={`text-[9px] font-black tracking-widest uppercase transition-colors duration-500
                        ${active === index ? "text-gold" : "text-gold/60"}
                      `}>
                        {post.id}
                      </span>
                      <span className="text-[9px] font-bold tracking-widest uppercase opacity-30">· {post.date}</span>
                    </div>
                    <h3 className="font-serif text-3xl sm:text-4xl tracking-tight leading-none">
                      {post.title}
                    </h3>
                  </div>
                  <div className={`transition-all duration-500 transform
                    ${active === index ? "translate-x-0 opacity-100" : "-translate-x-4 opacity-0"}
                  `}>
                    <ArrowRight size={24} className="text-gold" />
                  </div>
                </div>
              </div>
            ))}

            <div className="pt-12">
              <button className="group flex items-center gap-6 text-[10px] font-black tracking-widest uppercase text-gold">
                All Research Papers 
                <div className="h-12 w-12 rounded-full border border-gold/20 flex items-center justify-center group-hover:bg-gold group-hover:text-white transition-all">
                  <MoveRight size={18} />
                </div>
              </button>
            </div>
          </div>

          {/* Right Column: Dynamic Preview Area */}
          <div className="lg:col-span-6 sticky top-32 h-[500px] lg:h-[600px] hidden lg:block">
            <div className="relative h-full w-full rounded-[4rem] overflow-hidden border border-[#1a1a1a]/10 shadow-2xl bg-[#1a1a1a]">
              {/* Background Image Reveal */}
              {blogPosts.map((post, index) => (
                <div 
                  key={`img-${post.id}`}
                  className={`absolute inset-0 transition-all duration-1000 transform
                    ${active === index ? "opacity-40 scale-100" : "opacity-0 scale-110 pointer-events-none"}
                  `}
                >
                  <img src={post.img} alt="" className="w-full h-full object-cover grayscale" />
                </div>
              ))}

              {/* HUD Overlay Content */}
              <div className="relative h-full p-16 flex flex-col justify-between z-10">
                <div className="flex justify-between items-start">
                  <div className="px-6 py-2 bg-gold text-[#1a1a1a] rounded-full text-[9px] font-black tracking-widest uppercase">
                    {blogPosts[active].category}
                  </div>
                  <div className="flex items-center gap-3 text-white/40 text-[9px] font-bold tracking-widest uppercase">
                    <Clock size={14} className="text-gold" />
                    {blogPosts[active].readTime}
                  </div>
                </div>

                <div className="space-y-8">
                  <div className="flex gap-4">
                    {blogPosts[active].tags.map(tag => (
                      <span key={tag} className="text-[10px] font-black tracking-[0.2em] uppercase text-gold/60 border-b border-gold/20 pb-1">
                        #{tag}
                      </span>
                    ))}
                  </div>
                  <p className="font-serif text-2xl text-white/80 leading-relaxed animate-fade-up" key={`excerpt-${active}`}>
                    "{blogPosts[active].excerpt}"
                  </p>
                  <div className="pt-8 flex items-center gap-4 text-[10px] font-black tracking-[0.5em] text-white/20 uppercase">
                    <Zap size={14} className="text-gold" />
                    Protocol ID: {blogPosts[active].id}·{blogPosts[active].category.split(' ')[0]}
                  </div>
                </div>
              </div>

              {/* Floating Frame */}
              <div className="absolute inset-6 border border-white/5 rounded-[3rem] pointer-events-none" />
            </div>
          </div>

        </div>

        {/* Global Technical Meta */}
        <div className="mt-20 flex flex-col sm:flex-row items-center justify-between gap-8 opacity-20 animate-fade-up">
          <div className="text-[9px] font-black tracking-[0.5em] uppercase">
            Tantric Knowledge Management System v4.0.1
          </div>
          <div className="flex gap-16 text-[9px] font-bold tracking-widest uppercase text-gold">
            {["Ancient Physics", "Geometric Calibration", "Tantric Research"].map((t) => (
              <span key={t}>{t}</span>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
