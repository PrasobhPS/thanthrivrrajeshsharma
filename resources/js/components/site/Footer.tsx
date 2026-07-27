import { Facebook, Instagram, Youtube, Twitter, Send, MapPin, Phone, Mail, QrCode, MessageCircle } from "lucide-react";
import { useLocale } from "@/i18n/LocaleProvider";

export function Footer() {
  const { t } = useLocale();
  return (
    <footer className="relative bg-[#020617] text-[#fdfcf6] pt-16 pb-10 overflow-hidden border-t border-white/5">
      {/* Background Ambience: Subtle Cosmic Dust */}
      <div className="absolute inset-0 z-0 opacity-10 pointer-events-none">
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-blue-600/10 blur-[200px] rounded-full" />
      </div>

      <div className="relative z-10 mx-auto max-w-[1440px] px-8 sm:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-16 mb-12">
          
          {/* Column 1: Identity (Reference inspired) */}
          <div className="lg:col-span-4 space-y-10">
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="h-10 w-10 rounded-xl bg-gold flex items-center justify-center text-[#020617] font-serif text-2xl font-bold">D</div>
                <h3 className="font-serif text-2xl tracking-tighter">
                  Divine <span className="text-gold">Canvas</span>
                </h3>
              </div>
              <p className="text-sm text-[#fdfcf6]/40 leading-relaxed font-serif max-w-sm">
                "{t("footer.tagline")}"
              </p>
            </div>

            <div className="flex gap-4">
              {[Facebook, Instagram, Youtube, Twitter].map((Icon, i) => (
                <a key={i} href="#" className="h-12 w-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-gold hover:text-[#020617] hover:border-gold transition-all duration-500">
                  <Icon size={20} />
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Quick Navigation (Reference inspired) */}
          <div className="lg:col-span-2 space-y-8">
            <h4 className="text-[10px] font-black tracking-[0.4em] uppercase text-gold">{t("footer.nexus")}</h4>
            <ul className="space-y-4 text-sm text-[#fdfcf6]/40 font-serif">
              <li><a href="#" className="hover:text-gold transition-colors">{t("footer.theMaster")}</a></li>
              <li><a href="#" className="hover:text-gold transition-colors">{t("footer.sacredRituals")}</a></li>
              <li><a href="#" className="hover:text-gold transition-colors">{t("footer.yantraGallery")}</a></li>
              <li><a href="#" className="hover:text-gold transition-colors">{t("footer.theArchive")}</a></li>
            </ul>
          </div>

          {/* Column 3: Protocols (Reference inspired) */}
          <div className="lg:col-span-2 space-y-8">
            <h4 className="text-[10px] font-black tracking-[0.4em] uppercase text-gold">{t("footer.protocols")}</h4>
            <ul className="space-y-4 text-sm text-[#fdfcf6]/40 font-serif">
              <li><a href="#" className="hover:text-gold transition-colors">{t("footer.lifeDecoding")}</a></li>
              <li><a href="#" className="hover:text-gold transition-colors">{t("footer.fireCalibration")}</a></li>
              <li><a href="#" className="hover:text-gold transition-colors">{t("footer.spaceHealing")}</a></li>
              <li><a href="#" className="hover:text-gold transition-colors">{t("footer.ancestralRite")}</a></li>
            </ul>
          </div>

          {/* Column 4: Contact & QR (Reference inspired) */}
          <div className="lg:col-span-4 space-y-10">
            <div className="space-y-6">
              <h4 className="text-[10px] font-black tracking-[0.4em] uppercase text-gold">Research Access</h4>
              <ul className="space-y-6">
                <li className="flex gap-4 group">
                  <div className="h-10 w-10 rounded-full border border-white/10 flex items-center justify-center text-gold/40 group-hover:text-gold group-hover:border-gold transition-all">
                    <MapPin size={18} />
                  </div>
                  <div>
                    <div className="text-[10px] font-black tracking-widest uppercase text-white/20 mb-1">Centre</div>
                    <p className="text-sm text-[#fdfcf6]/60 font-serif">Palakkad, Kerala, India</p>
                  </div>
                </li>
                <li className="flex gap-4 group">
                  <div className="h-10 w-10 rounded-full border border-white/10 flex items-center justify-center text-gold/40 group-hover:text-gold group-hover:border-gold transition-all">
                    <Mail size={18} />
                  </div>
                  <div>
                    <div className="text-[10px] font-black tracking-widest uppercase text-white/20 mb-1">Communications</div>
                    <p className="text-sm text-[#fdfcf6]/60 font-serif">oracle@divinecanvas.com</p>
                  </div>
                </li>
              </ul>
            </div>

            {/* QR Portal (Reference inspired) */}
            <div className="flex items-center gap-6 p-6 bg-white/[0.03] border border-white/10 rounded-3xl group hover:border-gold/30 transition-all">
              <div className="p-2 bg-white rounded-xl">
                <QrCode size={40} className="text-[#020617]" />
              </div>
              <div className="space-y-1">
                <div className="text-[9px] font-black tracking-widest uppercase text-gold">Digital Portal</div>
                <p className="text-[10px] text-white/40 leading-tight">Scan for immediate <br /> ritual verification</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Technical Metadata */}
        <div className="pt-12 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-8 opacity-40">
          <div className="text-[9px] font-black tracking-[0.5em] uppercase">
            © 2024 DIVINE DIGITAL CANVAS · CORE PROTOCOL 2.0
          </div>
          <div className="flex flex-wrap justify-center gap-8 sm:gap-12 text-[9px] font-bold tracking-widest uppercase">
            {typeof import.meta.env.VITE_ADMIN_URL === "string" && import.meta.env.VITE_ADMIN_URL ? (
              <a
                href={import.meta.env.VITE_ADMIN_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gold transition-colors"
              >
                Content admin
              </a>
            ) : null}
            <span>Verified Results</span>
            <span>Est. 1997</span>
            <span>Tantric Engineering</span>
          </div>
        </div>
      </div>

      {/* Floating WhatsApp Action (Reference inspired) */}
      <a 
        href="#" 
        className="fixed bottom-10 right-10 z-50 h-16 w-16 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-all group"
      >
        <MessageCircle size={32} fill="currentColor" className="group-hover:rotate-12 transition-transform" />
        <div className="absolute right-full mr-6 px-6 py-3 bg-white text-[#020617] rounded-full text-[10px] font-black tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-all translate-x-10 group-hover:translate-x-0 shadow-2xl pointer-events-none whitespace-nowrap">
          Open Ritual Portal
        </div>
      </a>
    </footer>
  );
}
