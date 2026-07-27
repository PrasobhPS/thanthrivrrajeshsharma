import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { ArrowUpRight, Sparkles, MoveRight, ShieldCheck, Zap } from "lucide-react";
import { fetchGalleryPhotos, type GalleryPhotoPayload } from "@/lib/site-api";

export function Gallery() {
  const [hovered, setHovered] = useState<number | null>(null);

  const { data: photos, isLoading, isError } = useQuery({
    queryKey: ["gallery-photos"],
    queryFn: fetchGalleryPhotos,
    staleTime: 60_000,
  });

  type Panel =
    | { kind: "photo"; photo: GalleryPhotoPayload; displayIndex: number }
    | { kind: "skeleton"; displayIndex: number };

  let panels: Panel[] = [];

  if (isLoading) {
    panels = Array.from({ length: 6 }, (_, displayIndex) => ({ kind: "skeleton", displayIndex }));
  } else if (!isError && photos && photos.length > 0) {
    panels = photos.map((photo, displayIndex) => ({ kind: "photo", photo, displayIndex }));
  }

  return (
    <section id="gallery" className="relative py-16 bg-[#020617] text-[#fdfcf6] overflow-hidden">
      <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(197,160,89,0.3)_1px,transparent_1px),linear-gradient(90deg,rgba(197,160,89,0.3)_1px,transparent_1px)] bg-[size:80px_80px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-[1440px] px-8 sm:px-12">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-12 mb-10 animate-mask-reveal">
          <div className="max-w-2xl">
            <div className="flex items-center gap-4 mb-6">
              <div className="h-px w-16 bg-gold" />
              <span className="text-[10px] font-black tracking-[0.5em] uppercase text-gold">
                The Archival Exhibition
              </span>
            </div>
            <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl leading-[1.1] tracking-tighter">
              Are You In Search Of Path Towards <br />
              <span className="text-gold">Enlightenment?</span>
            </h2>
          </div>
          <div className="flex flex-col items-start gap-6 lg:pb-4 animate-fade-up">
            <div className="flex items-center gap-3 bg-gold/10 border border-gold/20 px-6 py-2 rounded-full">
              <Sparkles size={16} className="text-gold animate-pulse" />
              <span className="text-[9px] font-black tracking-[0.4em] uppercase text-gold">
                High-Fidelity Research
              </span>
            </div>
          </div>
        </div>

        {(isError || (!isLoading && (!photos || photos.length === 0))) && (
          <p className="mb-8 text-sm text-white/50 font-serif max-w-xl">
            {isError
              ? "We could not load the gallery. Check that the API is running and VITE_API_BASE_URL is set."
              : "Gallery images will appear here once they are added in the admin panel (Gallery photos)."}
          </p>
        )}

        <div className="flex flex-col lg:flex-row h-[600px] lg:h-[700px] gap-2 lg:gap-4 overflow-hidden rounded-[3rem] border border-white/10 p-2 lg:p-4 bg-white/[0.02]">
          {panels.map((panel, index) => (
            <div
              key={panel.kind === "photo" ? `photo-${panel.photo.id}` : `sk-${panel.displayIndex}`}
              onMouseEnter={() => setHovered(index)}
              onMouseLeave={() => setHovered(null)}
              className={`relative h-full transition-all duration-[1.2s] cubic-bezier(0.16, 1, 0.3, 1) overflow-hidden rounded-[2.5rem] border border-white/5 group
                ${panel.kind === "skeleton" ? "cursor-wait animate-pulse opacity-60" : "cursor-pointer"}
                ${hovered === null ? "flex-1" : hovered === index ? "flex-[5]" : "flex-[0.8] opacity-40"}
              `}
            >
              <div className="absolute inset-0 z-0">
                {panel.kind === "skeleton" ? (
                  <div className="w-full h-full bg-white/10" />
                ) : (
                  <>
                    <img
                      src={panel.photo.image_url}
                      alt={panel.photo.alt_text || panel.photo.title}
                      className={`w-full h-full object-cover transition-all duration-[1.5s] 
                    ${hovered === index ? "grayscale-0 scale-105" : "grayscale brightness-50 scale-110 opacity-30"}
                  `}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-transparent opacity-90 group-hover:opacity-40 transition-opacity duration-1000" />
                  </>
                )}
              </div>

              {panel.kind === "photo" && (
                <>
                  <div
                    className={`absolute inset-0 flex items-center justify-center transition-all duration-700 pointer-events-none
                ${hovered === index ? "opacity-0 -translate-y-10" : "opacity-100 translate-y-0"}
              `}
                  >
                    <span className="font-serif text-2xl lg:text-3xl font-black text-white/10 rotate-90 whitespace-nowrap uppercase tracking-widest">
                      {panel.photo.title}
                    </span>
                  </div>

                  <div
                    className={`relative z-10 h-full p-10 flex flex-col justify-between transition-all duration-700
                ${hovered === index ? "opacity-100 translate-y-0 delay-300" : "opacity-0 translate-y-10"}
              `}
                  >
                    <div className="flex justify-between items-start">
                      <div className="space-y-2">
                        <div className="flex items-center gap-3">
                          <Zap size={16} className="text-gold animate-pulse" />
                          <span className="text-[10px] font-black tracking-widest text-gold uppercase">
                            {(panel.photo.category ?? "Gallery").trim() || "Gallery"} Activated
                          </span>
                        </div>
                        {panel.photo.alt_text?.trim() ? (
                          <span className="text-[9px] font-bold tracking-[0.2em] text-white/40 uppercase block">
                            {panel.photo.alt_text.trim()}
                          </span>
                        ) : null}
                      </div>
                      <div className="h-14 w-14 rounded-full bg-gold text-[#020617] flex items-center justify-center shadow-2xl">
                        <ArrowUpRight size={24} />
                      </div>
                    </div>

                    <div className="space-y-4">
                      <span className="font-serif text-8xl font-black text-white/5 absolute top-0 right-0 pointer-events-none">
                        {String(panel.displayIndex + 1).padStart(2, "0")}
                      </span>
                      <h3 className="font-serif text-5xl lg:text-7xl font-black tracking-tighter text-white">
                        {panel.photo.title}
                      </h3>
                      <div className="flex items-center gap-4 border-t border-gold/20 pt-6">
                        <ShieldCheck size={18} className="text-gold" />
                        <span className="text-[10px] font-black tracking-[0.5em] uppercase text-gold/60 underline decoration-gold/20 underline-offset-8">
                          Artifact Protocol Secured
                        </span>
                      </div>
                    </div>
                  </div>

                  <div
                    className={`absolute inset-4 border border-gold/10 rounded-[2rem] pointer-events-none transition-all duration-1000
                ${hovered === index ? "opacity-100 scale-100" : "opacity-0 scale-95"}
              `}
                  />
                </>
              )}
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-col lg:flex-row items-center justify-between gap-12 border-t border-white/5 pt-12 animate-fade-up">
          <div className="max-w-md">
            <p className="text-sm text-white/40 leading-relaxed font-serif">
              "ATRC is an international spiritual organization founded by Thanthri V R Rajesh Sharmma along with a group of
              traditional Brahmin Nampoothiri priests, who are well versed in vedic, tantrik and astrological knowledge."
            </p>
          </div>
          <button
            type="button"
            className="group relative bg-gold text-[#020617] px-14 py-6 rounded-full font-black text-xs tracking-widest uppercase hover:bg-white transition-all shadow-2xl flex items-center gap-6"
          >
            Enter The Full Protocol <MoveRight size={18} className="group-hover:translate-x-2 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
}
