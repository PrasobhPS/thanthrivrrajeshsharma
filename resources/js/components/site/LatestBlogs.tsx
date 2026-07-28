import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { ArrowRight, MoveRight, Clock, ShieldCheck, Zap } from "lucide-react";
import { fetchResearchFindings, type ResearchFindingPayload } from "@/lib/site-api";
import { useLocale } from "@/i18n/LocaleProvider";

function formatPublishedDate(isoDate: string, locale: string): string {
  const date = new Date(`${isoDate}T12:00:00`);
  return new Intl.DateTimeFormat(locale === "ml" ? "ml-IN" : "en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(date);
}

function readTimeLabel(minutes: number): string {
  return `${minutes} Min Read`;
}

function protocolSuffix(category: string): string {
  const first = category.trim().split(/\s+/)[0] ?? category;

  return first.toUpperCase();
}

export function LatestBlogs() {
  const { t, locale } = useLocale();
  const [active, setActive] = useState(0);

  const { data: posts, isLoading, isError } = useQuery({
    queryKey: ["research-findings"],
    queryFn: fetchResearchFindings,
    staleTime: 60_000,
  });

  const count = posts?.length ?? 0;

  useEffect(() => {
    if (count === 0) {
      setActive(0);
      return;
    }
    if (active >= count) {
      setActive(0);
    }
  }, [active, count]);

  const selected: ResearchFindingPayload | undefined = posts?.[active];
  const showContent = !isLoading && !isError && count > 0 && selected;

  return (
    <section id="journal" className="relative py-24 sm:py-32 bg-[#fdfcf6] text-[#1a1a1a] overflow-hidden">
      <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none">
        <div className="absolute top-0 left-1/2 w-px h-full bg-[#1a1a1a]" />
        <div className="absolute top-1/2 left-0 w-full h-px bg-[#1a1a1a]" />
        <div className="absolute inset-0 bg-[radial-gradient(#1a1a1a_1px,transparent_1px)] bg-[size:40px_40px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-[1440px] px-8 sm:px-12 w-full">
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

        {(isError || (!isLoading && count === 0)) && (
          <p className="mb-12 text-center text-sm text-[#1a1a1a]/50 font-serif max-w-xl mx-auto">
            {isError ? t("journal.loadError") : t("journal.empty")}
          </p>
        )}

        {isLoading && (
          <div className="grid lg:grid-cols-12 gap-12 animate-pulse opacity-50">
            <div className="lg:col-span-6 space-y-4">
              {[0, 1, 2].map((i) => (
                <div key={i} className="h-24 bg-[#1a1a1a]/5 rounded-xl" />
              ))}
            </div>
            <div className="lg:col-span-6 h-[500px] bg-[#1a1a1a]/5 rounded-[4rem] hidden lg:block" />
          </div>
        )}

        {showContent && posts && selected && (
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-24">
          <div className="lg:col-span-6 space-y-2">
            {posts.map((post, index) => (
              <div
                key={post.id}
                onMouseEnter={() => setActive(index)}
                onFocus={() => setActive(index)}
                role="button"
                tabIndex={0}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    setActive(index);
                  }
                }}
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
                        {post.reference_code}
                      </span>
                      <span className="text-[9px] font-bold tracking-widest uppercase opacity-30">
                        · {formatPublishedDate(post.published_at, locale)}
                      </span>
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
              <button type="button" className="group flex items-center gap-6 text-[10px] font-black tracking-widest uppercase text-gold">
                All Research Papers
                <div className="h-12 w-12 rounded-full border border-gold/20 flex items-center justify-center group-hover:bg-gold group-hover:text-white transition-all">
                  <MoveRight size={18} />
                </div>
              </button>
            </div>
          </div>

          <div className="lg:col-span-6 sticky top-32 h-[500px] lg:h-[600px] hidden lg:block">
            <div className="relative h-full w-full rounded-[4rem] overflow-hidden border border-[#1a1a1a]/10 shadow-2xl bg-[#1a1a1a]">
              {posts.map((post, index) => (
                <div
                  key={`img-${post.id}`}
                  className={`absolute inset-0 transition-all duration-1000 transform
                    ${active === index ? "opacity-40 scale-100" : "opacity-0 scale-110 pointer-events-none"}
                  `}
                >
                  <img src={post.image_url} alt="" className="w-full h-full object-cover grayscale" />
                </div>
              ))}

              <div className="relative h-full p-16 flex flex-col justify-between z-10">
                <div className="flex justify-between items-start">
                  <div className="px-6 py-2 bg-gold text-[#1a1a1a] rounded-full text-[9px] font-black tracking-widest uppercase">
                    {selected.category}
                  </div>
                  <div className="flex items-center gap-3 text-white/40 text-[9px] font-bold tracking-widest uppercase">
                    <Clock size={14} className="text-gold" />
                    {readTimeLabel(selected.read_time_minutes)}
                  </div>
                </div>

                <div className="space-y-8">
                  <div className="flex flex-wrap gap-4">
                    {selected.tags.map((tag) => (
                      <span key={tag} className="text-[10px] font-black tracking-[0.2em] uppercase text-gold/60 border-b border-gold/20 pb-1">
                        #{tag}
                      </span>
                    ))}
                  </div>
                  <p className="font-serif text-2xl text-white/80 leading-relaxed animate-fade-up" key={`excerpt-${active}`}>
                    &ldquo;{selected.excerpt}&rdquo;
                  </p>
                  <div className="pt-8 flex items-center gap-4 text-[10px] font-black tracking-[0.5em] text-white/20 uppercase">
                    <Zap size={14} className="text-gold" />
                    Protocol ID: {selected.reference_code}·{protocolSuffix(selected.category)}
                  </div>
                </div>
              </div>

              <div className="absolute inset-6 border border-white/5 rounded-[3rem] pointer-events-none" />
            </div>
          </div>
        </div>
        )}

        <div className="mt-20 flex flex-col sm:flex-row items-center justify-between gap-8 opacity-20 animate-fade-up">
          <div className="text-[9px] font-black tracking-[0.5em] uppercase">
            Tantric Knowledge Management System v4.0.1
          </div>
          <div className="flex gap-16 text-[9px] font-bold tracking-widest uppercase text-gold">
            {["Ancient Physics", "Geometric Calibration", "Tantric Research"].map((label) => (
              <span key={label}>{label}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
