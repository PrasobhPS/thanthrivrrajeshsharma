import { Play, ArrowRight, Search, Target, Activity, ShieldCheck } from "lucide-react";
import mudraImg from "@/assets/master-mudra-hero.png";
import { useLocale } from "@/i18n/LocaleProvider";

export function Hero() {
  const { t } = useLocale();
  return (
    <section className="relative min-h-screen lg:h-svh flex flex-col bg-[#020617] text-[#fdfcf6] overflow-hidden">

      {/* Absolute Zero Background: Pure Obsidian */}
      <div className="absolute inset-0 bg-[#020617]" />

      {/* Header Spacer */}
      <div className="h-20 lg:h-28 w-full shrink-0 relative z-10" />

      {/* Optimized Mastery Layout: Content Left, Visual Right */}
      <div className="flex-1 relative z-10 flex items-center">
        <div className="mx-auto max-w-[1440px] px-8 sm:px-12 w-full">
          <div className="grid lg:grid-cols-12 gap-20 items-center">

            {/* Left Column: Namboothiri Profile Authority */}
            <div className="lg:col-span-6 space-y-8 order-1">
              <div className="space-y-4 animate-mask-reveal">
                <div className="flex items-center gap-4">
                  <div className="h-px w-12 bg-gold" />
                  <span className="text-[10px] font-black tracking-[0.6em] uppercase text-gold font-heading">{t("hero.eyebrow")}</span>
                </div>

                <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl leading-[1.1] tracking-tighter">
                  {t("hero.titleLine1")} <br />
                  <span className="text-gold font-serif">{t("hero.titleLine2")}</span>
                </h1>
              </div>

              <div className="space-y-8 animate-fade-up" style={{ animationDelay: '400ms' }}>
                <p className="max-w-xl text-sm lg:text-base text-[#fdfcf6]/50 leading-relaxed font-serif italic-none border-l border-white/10 pl-8">
                  "{t("hero.quote")}"
                </p>

                <div className="flex flex-col sm:flex-row items-center gap-6 pt-4">
                  <button className="w-full sm:w-auto bg-gold text-black px-10 py-5 rounded-full font-black text-[10px] tracking-widest uppercase hover:bg-white transition-all shadow-2xl flex items-center justify-center gap-4 group font-heading">
                    {t("hero.connect")} <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
                  </button>
                  <button className="flex items-center gap-4 group">
                    <div className="h-12 w-12 rounded-full border border-white/10 flex items-center justify-center group-hover:border-gold transition-all relative overflow-hidden">
                      <div className="absolute inset-0 bg-gold/10 scale-0 group-hover:scale-100 transition-transform duration-500 rounded-full" />
                      <Play size={18} fill="currentColor" className="text-gold ml-1 relative z-10" />
                    </div>
                    <span className="text-[9px] font-black tracking-widest uppercase text-[#fdfcf6]/40 group-hover:text-gold transition-colors font-heading">{t("hero.watchRitual")}</span>
                  </button>
                </div>
              </div>

              {/* Technical Node Metrics */}
              <div className="grid grid-cols-3 gap-8 pt-8 border-t border-white/5 animate-fade-up" style={{ animationDelay: '800ms' }}>
                {[
                  { label: t("hero.lineage"), val: t("hero.lineageVal"), icon: ShieldCheck },
                  { label: t("hero.science"), val: t("hero.scienceVal"), icon: Activity },
                  { label: t("hero.focus"), val: t("hero.focusVal"), icon: Search }
                ].map((m, i) => (
                  <div key={i} className="space-y-2">
                    <div className="text-[8px] font-black tracking-widest uppercase text-gold/40 font-heading">{m.label}</div>
                    <div className="flex items-center gap-2">
                      <m.icon size={12} className="text-white/20" />
                      <div className="text-xs font-bold text-white">{m.val}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column: The Sacred Mudra Visual */}
            <div className="lg:col-span-6 relative group order-2 animate-fade-up" style={{ animationDelay: '400ms' }}>
              <div className="relative h-[450px] lg:h-[600px] w-full flex items-center justify-center">

                {/* Divine Light Aura */}
                <div className="absolute w-[90%] h-[90%] bg-gold/5 blur-[150px] rounded-full animate-pulse" />

                {/* The Mudra Portal */}
                <div className="relative w-full h-full flex items-center justify-center overflow-hidden transition-all duration-1000 group-hover:scale-105"
                  style={{
                    maskImage: 'radial-gradient(circle, black 45%, transparent 70%)',
                    WebkitMaskImage: 'radial-gradient(circle, black 45%, transparent 70%)'
                  }}>
                  <img
                    src={mudraImg}
                    alt="Sacred Master Mudra"
                    className="w-full h-full object-cover brightness-110 contrast-110 drop-shadow-[0_0_100px_rgba(255,204,0,0.2)]"
                  />

                  {/* Subtle Technical Grid Overlay on Image */}
                  <div className="absolute inset-0 opacity-10 pointer-events-none bg-[url('data:image/svg+xml,%3Csvg_xmlns=%22http://www.w3.org/2000/svg%22_width=%22100%22_height=%22100%22_viewBox=%220_0_100_100%22%3E%3Ccircle_cx=%2250%22_cy=%2250%22_r=%220.5%22_fill=%22rgba(255,255,255,0.5)%22/%3E%3C/svg%3E')]" />
                </div>

                {/* Floating Vibrational Tags */}
                <div className="absolute top-[30%] left-[40%] bg-black/80 backdrop-blur-md border border-gold/20 px-4 py-2 rounded-lg animate-float" style={{ animationDelay: '0s' }}>
                  <div className="text-[7px] font-black tracking-widest uppercase text-gold/60 font-heading">Freq_Analysis</div>
                  <div className="text-[10px] font-bold text-white tracking-widest">7.83Hz</div>
                </div>
                <div className="absolute bottom-[25%] right-[25%] bg-black/80 backdrop-blur-md border border-gold/20 px-4 py-2 rounded-lg animate-float" style={{ animationDelay: '2s' }}>
                  <div className="text-[7px] font-black tracking-widest uppercase text-gold/60 font-heading">Neural_Res</div>
                  <div className="text-[10px] font-bold text-white tracking-widest">ACTIVE</div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
