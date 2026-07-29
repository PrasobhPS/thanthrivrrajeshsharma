import { MoveRight, ShieldCheck, History, GraduationCap, Flame, Star } from "lucide-react";
import { useLocale } from "@/i18n/LocaleProvider";
import { useConsultationEnquiry } from "@/components/site/consultation-enquiry-context";
import { useDefaultGuruPortrait } from "@/hooks/use-default-guru-portrait";
import {
  pickProfileText,
  splitVerificationGrade,
  useDefaultGuruProfileDetail,
} from "@/hooks/use-default-guru-profile-detail";

export function About() {
  const { t } = useLocale();
  const { openEnquiry } = useConsultationEnquiry();
  const { src: masterImg, alt: masterAlt } = useDefaultGuruPortrait();
  const profile = useDefaultGuruProfileDetail();

  const eyebrow = pickProfileText(profile.eyebrow, t("about.eyebrow"));
  const titleLine1 = pickProfileText(profile.title_line_1, t("about.titleLine1"));
  const titleLine2 = pickProfileText(profile.title_line_2, t("about.titleLine2"));
  const authority = pickProfileText(profile.authority_label, t("about.authority"));
  const authorityQuote = pickProfileText(profile.authority_quote, t("about.authorityQuote"));
  const verificationBadge = pickProfileText(profile.verification_badge_label, "Verified");
  const verificationGradeLines = splitVerificationGrade(profile.verification_grade);
  const traditionSeal = pickProfileText(profile.tradition_seal_text, "Est · 1997 · Ancient · Physics");
  const bioLead = pickProfileText(
    profile.bio_lead,
    "Thanthri V R Rajesh Sharmma represents a 1,000-year legacy of Tantric mastery, re-engineered for the modern seeker.",
  );
  const bioDescription = pickProfileText(
    profile.bio_description,
    "His research into the mathematical logic of Vedic rituals has transformed the lives of over 12,000 devotees worldwide, blending deep meditative sadhana with a relentless pursuit of spiritual truth.",
  );
  const statOneLabel = pickProfileText(profile.stat_one_label, "The Sadhana");
  const statOneValue = pickProfileText(profile.stat_one_value, "27+ Years");
  const statOneSublabel = pickProfileText(profile.stat_one_sublabel, "Intensive Research");
  const statTwoLabel = pickProfileText(profile.stat_two_label, "The Impact");
  const statTwoValue = pickProfileText(profile.stat_two_value, "12,000+");
  const statTwoSublabel = pickProfileText(profile.stat_two_sublabel, "Souls Guided");
  const consultationStatus = pickProfileText(
    profile.consultation_status_text,
    "Daily Consultation Portal: Active",
  );

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
              <span className="text-[10px] font-black tracking-[0.6em] uppercase text-gold font-heading">{eyebrow}</span>
            </div>
            <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl leading-none tracking-tighter">
              {titleLine1} <br />
              <span className="text-gold">{titleLine2}</span>
            </h2>
          </div>
          <div className="lg:col-span-4 lg:pb-4 border-l border-gold/20 lg:pl-12 animate-fade-up">
            <div className="flex items-center gap-3 mb-4 text-gold">
              <Star size={16} fill="currentColor" />
              <span className="text-[9px] font-black tracking-widest uppercase font-heading">{authority}</span>
            </div>
            <p className="text-sm text-[#1a1a1a]/40 leading-relaxed font-serif">
              "{authorityQuote}"
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
                <span className="text-[9px] font-black tracking-widest uppercase font-heading">{verificationBadge}</span>
              </div>
              <div className="font-serif text-2xl font-bold">
                {verificationGradeLines.length > 0 ? (
                  verificationGradeLines.map((line, index) => (
                    <span key={line}>
                      {index > 0 ? <br /> : null}
                      {line}
                    </span>
                  ))
                ) : (
                  <>
                    A+ Vedic <br /> Grade
                  </>
                )}
              </div>
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
                    {traditionSeal}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Narrative Content: Professional & Dense */}
          <div className="lg:col-span-7 space-y-12">
            <div className="space-y-8 animate-fade-up" style={{ animationDelay: '400ms' }}>
              <p className="text-2xl text-[#1a1a1a]/80 leading-snug font-light font-serif">
                {bioLead}
              </p>
              <p className="text-sm text-[#1a1a1a]/50 leading-relaxed max-w-xl">
                {bioDescription}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-12 pt-12 border-t border-gold/10 animate-fade-up" style={{ animationDelay: '600ms' }}>
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-gold">
                  <History size={18} />
                  <span className="text-[9px] font-black tracking-widest uppercase font-heading">{statOneLabel}</span>
                </div>
                <div className="text-3xl font-serif">{statOneValue}</div>
                <p className="text-[9px] font-bold tracking-widest uppercase text-[#1a1a1a]/30">{statOneSublabel}</p>
              </div>
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-gold">
                  <GraduationCap size={18} />
                  <span className="text-[9px] font-black tracking-widest uppercase font-heading">{statTwoLabel}</span>
                </div>
                <div className="text-3xl font-serif">{statTwoValue}</div>
                <p className="text-[9px] font-bold tracking-widest uppercase text-[#1a1a1a]/30">{statTwoSublabel}</p>
              </div>
            </div>

            {/* Floating Inquiry Bar (Reference inspired) */}
            <div className="bg-white border border-gold/10 rounded-[2.5rem] p-3 pl-10 flex items-center justify-between shadow-2xl animate-fade-up" style={{ animationDelay: '800ms' }}>
              <div className="flex items-center gap-6">
                <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-[10px] font-black tracking-widest uppercase text-[#1a1a1a]/40">
                  {consultationStatus}
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
