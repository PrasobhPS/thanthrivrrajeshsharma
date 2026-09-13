import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { MessageCircle, Phone } from "lucide-react";
import { useLocale, type Locale } from "@/i18n/LocaleProvider";
import { useConsultationEnquiry } from "@/components/site/consultation-enquiry-context";
import { WhatsAppLink } from "@/components/site/WhatsAppLink";
import { CONTACT_PHONE, CONTACT_PHONE_DISPLAY } from "@/lib/whatsapp";

const linkKeys = [
  { labelKey: "nav.archive", href: "#about" },
  { labelKey: "nav.rituals", href: "#services" },
  { labelKey: "nav.devotees", href: "#devotees" },
  { labelKey: "nav.gallery", href: "#gallery" },
  { labelKey: "nav.journal", href: "#journal" },
  { labelKey: "nav.media", href: "#media" },
] as const;

export function Nav() {
  const { locale, setLocale, t } = useLocale();
  const { openEnquiry } = useConsultationEnquiry();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const setLanguage = (next: Locale) => {
    if (next !== locale) {
      setLocale(next);
    }
  };

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled ? "py-3" : "py-6"
      }`}
    >
      <div className="mx-auto max-w-[1440px] px-3 sm:px-8 lg:px-12">
        <div
          className={`flex items-center justify-between gap-2 rounded-full px-3 sm:px-5 py-2.5 sm:py-3 transition-all duration-500 ${
            scrolled ? "glass shadow-2xl" : ""
          }`}
        >
          <Link to="/" className="flex items-center gap-2 sm:gap-3 shrink-0">
            <div className="relative h-9 w-9">
              <div className="absolute inset-0 rounded-full bg-gradient-gold opacity-30 blur-md" />
              <div className="relative h-9 w-9 rounded-full border border-gold/40 bg-midnight grid place-items-center">
                <span className="font-serif text-gold text-lg leading-none">ॐ</span>
              </div>
            </div>
            <div className="leading-tight hidden min-[420px]:block">
              <div className="text-[10px] tracking-[0.25em] text-gold uppercase font-heading">Thanthri</div>
              <div className="font-serif text-sm text-foreground">V R Rajesh Sharmma</div>
            </div>
          </Link>

          <nav className="hidden xl:flex items-center gap-8">
            {linkKeys.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-xs font-heading tracking-widest text-muted-foreground hover:text-gold transition-colors relative group uppercase"
              >
                {t(l.labelKey)}
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-gold transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-1.5 sm:gap-3">
            <a
              href={`tel:${CONTACT_PHONE}`}
              aria-label={`${t("nav.callNow")} ${CONTACT_PHONE_DISPLAY}`}
              className="inline-flex items-center gap-1.5 sm:gap-2 rounded-full border border-gold/60 bg-gold px-2.5 sm:px-4 py-1.5 sm:py-2 text-[#020617] shadow-[0_8px_24px_-8px_oklch(0.82_0.16_82/0.85)] transition hover:bg-white"
            >
              <Phone size={14} className="shrink-0" />
              <span className="font-serif text-[12px] sm:text-sm font-semibold tracking-wide whitespace-nowrap">
                {CONTACT_PHONE_DISPLAY}
              </span>
            </a>
            <div
              className="hidden md:flex items-center rounded-full border border-white/10 bg-black/20 p-0.5 text-[9px] font-heading tracking-widest uppercase"
              role="group"
              aria-label={t("nav.langEn")}
            >
              <button
                type="button"
                onClick={() => setLanguage("en")}
                className={`rounded-full px-3 py-1.5 transition-colors ${
                  locale === "en" ? "bg-gold text-primary-foreground" : "text-muted-foreground hover:text-gold"
                }`}
              >
                EN
              </button>
              <button
                type="button"
                onClick={() => setLanguage("ml")}
                className={`rounded-full px-3 py-1.5 transition-colors ${
                  locale === "ml" ? "bg-gold text-primary-foreground" : "text-muted-foreground hover:text-gold"
                }`}
              >
                ML
              </button>
            </div>

            <WhatsAppLink
              message={t("whatsapp.greeting")}
              ariaLabel={t("whatsapp.chatCta")}
              className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-[#25D366] text-white transition hover:scale-105"
            >
              <MessageCircle size={16} fill="currentColor" />
            </WhatsAppLink>
            <button
              type="button"
              onClick={openEnquiry}
              className="hidden lg:inline-flex items-center gap-2 rounded-full bg-gradient-gold px-4 py-2 sm:px-5 sm:py-2.5 text-[10px] font-heading tracking-widest uppercase text-primary-foreground hover:opacity-90 transition shadow-[0_8px_30px_-8px_oklch(0.82_0.16_82/0.6)]"
            >
              {t("nav.consultation")}
              <span aria-hidden className="hidden sm:inline">
                →
              </span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
