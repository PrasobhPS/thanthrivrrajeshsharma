import { MoveRight, ShieldCheck, History, GraduationCap, Flame, Star } from "lucide-react";
import { useLocale } from "@/i18n/LocaleProvider";
import { useConsultationEnquiry } from "@/components/site/consultation-enquiry-context";
import { useDefaultGuruPortrait } from "@/hooks/use-default-guru-portrait";

export function About() {
  const { t } = useLocale();
  const { openEnquiry } = useConsultationEnquiry();
  const { src: masterImg, alt: masterAlt } = useDefaultGuruPortrait();
  return (
    <section id="about" className="relative py-16 sm:py-20 bg-[#fdfcf6] text-[#1a1a1a] overflow-hidden">
      {/* Advanced Ambience: Architectural Depth */}
      <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#c5a059_1px,transparent_1px)] [background-size:32px:32px]" />
      
      <div className="relative z-10 mx-auto max-w-[1440px] px-8 sm:px-12">
        
        {/* Header: Editorial Asymmetry */}
        <div className="grid lg:grid-cols-12 gap-12 mb-16 items-end animate-mask-reveal">
          <div className="lg:col-span-8">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-px bg-gold" />
              <span className="text-[10px] font-black tracking-[0.6em] uppercase text-gold font-heading">{t("about.eyebrow")}</span>
            </div>
            <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl leading-none tracking-tighter">
              {t("about.titleLine1")} <br />
              <span className="text-gold">{t("about.titleLine2")}</span>
            </h2>
          </div>
          <div className="lg:col-span-4 lg:pb-4 border-l border-gold/20 lg:pl-12 animate-fade-up">
            <div className="flex items-center gap-3 mb-4 text-gold">
              <Star size={16} fill="currentColor" />
              <span className="text-[9px] font-black tracking-widest uppercase font-heading">{t("about.authority")}</span>
            </div>
            <p className="text-sm text-[#1a1a1a]/40 leading-relaxed font-serif">
              "{t("about.authorityQuote")}"
            </p>
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-16 lg:gap-24 items-center">
          
          {/* Visual Hub: Center Portrait with Ghostly Art */}
          <div className="lg:col-span-5 relative group">
            {/* The Verification Badge (Reference inspired) */}
            <div className="absolute -top-10 -left-10 z-20 bg-[#1a1a1a] text-white p-8 rounded-[3rem_3rem_3rem_0] shadow-2xl animate-float">
              <div className="flex items-center gap-4 mb-2">
                <ShieldCheck size={20} className="text-gold" />
                <span className="text-[9px] font-black tracking-widest uppercase font-heading">Verified</span>
              </div>
              <div className="font-serif text-2xl font-bold">A+ Vedic <br /> Grade</div>
            </div>

            <div className="relative aspect-[4/5] rounded-[4rem] overflow-hidden border-2 border-gold/10 shadow-2xl transition-all duration-1000 group-hover:border-gold/30">
              <img 
                src={masterImg} 
                alt={masterAlt}
                className="w-full h-full object-cover grayscale brightness-90 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#fdfcf6] via-transparent to-transparent opacity-60" />
              
              {/* Ghostly Overlay (Abstract Ritual Art feel) */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(197,160,89,0.05),transparent_70%)] mix-blend-overlay" />
            </div>

            {/* The Tradition Seal (Rotating) */}
            <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-white border border-gold/10 rounded-full shadow-2xl flex items-center justify-center p-8 animate-spin-slow group-hover:border-gold/30 transition-all">
              <div className="relative w-full h-full border border-gold/10 rounded-full flex items-center justify-center">
                <Flame size={24} className="text-gold" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-[7px] font-black tracking-[0.4em] uppercase text-[#1a1a1a]/20">
                    Est · 1997 · Ancient · Physics
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Narrative Content: Professional & Dense */}
          <div className="lg:col-span-7 space-y-12">
            <div className="space-y-8 animate-fade-up" style={{ animationDelay: '400ms' }}>
              <p className="text-2xl text-[#1a1a1a]/80 leading-snug font-light font-serif">
                Thanthri V R Rajesh Sharmma represents a 1,000-year legacy of Tantric mastery, 
                re-engineered for the modern seeker.
              </p>
              <p className="text-sm text-[#1a1a1a]/50 leading-relaxed max-w-xl">
                His research into the mathematical logic of Vedic rituals has transformed the lives 
                of over 12,000 devotees worldwide, blending deep meditative sadhana with a 
                relentless pursuit of spiritual truth.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-12 pt-12 border-t border-gold/10 animate-fade-up" style={{ animationDelay: '600ms' }}>
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-gold">
                  <History size={18} />
                  <span className="text-[9px] font-black tracking-widest uppercase font-heading">The Sadhana</span>
                </div>
                <div className="text-3xl font-serif">27+ Years</div>
                <p className="text-[9px] font-bold tracking-widest uppercase text-[#1a1a1a]/30">Intensive Research</p>
              </div>
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-gold">
                  <GraduationCap size={18} />
                  <span className="text-[9px] font-black tracking-widest uppercase font-heading">The Impact</span>
                </div>
                <div className="text-3xl font-serif">12,000+</div>
                <p className="text-[9px] font-bold tracking-widest uppercase text-[#1a1a1a]/30">Souls Guided</p>
              </div>
            </div>

            {/* Floating Inquiry Bar (Reference inspired) */}
            <div className="bg-white border border-gold/10 rounded-[2.5rem] p-3 pl-10 flex items-center justify-between shadow-2xl animate-fade-up" style={{ animationDelay: '800ms' }}>
              <div className="flex items-center gap-6">
                <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-[10px] font-black tracking-widest uppercase text-[#1a1a1a]/40">
                  Daily Consultation Portal: Active
                </span>
              </div>
              <button
                type="button"
                onClick={openEnquiry}
                className="bg-[#1a1a1a] text-white px-10 py-5 rounded-[2rem] flex items-center gap-4 hover:bg-gold transition-all group shadow-xl"
              >
                <span className="text-[10px] font-black tracking-widest uppercase font-heading">
                  {t("enquiry.openCta")}
                </span>
                <MoveRight size={18} className="group-hover:translate-x-2 transition-transform" />
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
