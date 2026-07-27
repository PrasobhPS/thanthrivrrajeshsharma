import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Play, Radio, ShieldCheck, MoveRight, MoreVertical, Zap } from "lucide-react";
import { fetchYoutubeVideos } from "@/lib/site-api";
import { YoutubeLightbox } from "@/components/site/YoutubeLightbox";
import { useLocale } from "@/i18n/LocaleProvider";

const channelUrl = import.meta.env.VITE_THANTHRI_YOUTUBE_CHANNEL_URL as string | undefined;

export function Media() {
  const { t } = useLocale();
  const [open, setOpen] = useState(false);
  const [activeYoutubeId, setActiveYoutubeId] = useState<string | null>(null);
  const [activeTitle, setActiveTitle] = useState("");

  const { data: videos, isLoading, isError } = useQuery({
    queryKey: ["youtube-videos"],
    queryFn: fetchYoutubeVideos,
    staleTime: 60_000,
  });

  const openVideo = (youtubeId: string, title: string) => {
    setActiveYoutubeId(youtubeId);
    setActiveTitle(title);
    setOpen(true);
  };

  const closeVideo = () => {
    setOpen(false);
    setActiveYoutubeId(null);
    setActiveTitle("");
  };

  const rowCount = isLoading ? 8 : Math.max(videos?.length ?? 0, 0);
  const placeholders = Array.from({ length: rowCount }, (_, i) => i);

  return (
    <>
      <YoutubeLightbox
        open={open}
        youtubeId={activeYoutubeId}
        title={activeTitle || t("media.videoDialog")}
        onClose={closeVideo}
        closeLabel={t("common.close")}
      />

      <section id="media" className="relative py-16 bg-[#fdfcf6] text-[#1a1a1a] overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-[0.02] pointer-events-none">
          <div className="absolute inset-0 bg-[linear-gradient(#1a1a1a_1px,transparent_1px),linear-gradient(90deg,#1a1a1a_1px,transparent_1px)] bg-[size:50px_50px]" />
        </div>

        <div className="relative z-10 mx-auto max-w-[1440px] px-8 sm:px-12 w-full">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-12 mb-10 animate-mask-reveal">
            <div className="max-w-2xl">
              <div className="flex items-center gap-4 mb-4">
                <div className="h-px w-16 bg-gold" />
                <span className="text-[10px] font-black tracking-[0.5em] uppercase text-gold">{t("media.eyebrow")}</span>
              </div>
              <h2 className="font-serif text-5xl sm:text-7xl leading-none tracking-tighter">
                {t("media.titleLine1")} <span className="text-gold">{t("media.titleLine2")}</span>
              </h2>
              <p className="mt-4 text-xs text-[#1a1a1a]/50 font-serif leading-relaxed max-w-lg">
                {t("media.introPrefix")}{" "}
                <span className="text-[#1a1a1a]/70">{t("media.defaultChannel")}</span>. {t("media.introSuffix")}
              </p>
            </div>
            <div className="flex items-center gap-4 px-6 py-3 bg-[#1a1a1a]/5 border border-[#1a1a1a]/10 rounded-full animate-pulse">
              <Radio size={16} className="text-red-600" />
              <span className="text-[10px] font-black tracking-widest uppercase text-[#1a1a1a]/60">{t("media.youtube")}</span>
            </div>
          </div>

          {(isError || (!isLoading && (!videos || videos.length === 0))) && (
            <p className="mb-8 text-sm text-[#1a1a1a]/50 font-serif max-w-xl">
              {isError ? t("media.loadError") : t("media.empty")}
            </p>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12">
            {isLoading
              ? placeholders.map((i) => (
                  <div
                    key={`sk-${i}`}
                    className="flex flex-col animate-pulse"
                    style={{ animationDelay: `${i * 50}ms` }}
                  >
                    <div className="aspect-video rounded-2xl bg-[#1a1a1a]/10" />
                    <div className="mt-4 flex gap-3">
                      <div className="h-9 w-9 shrink-0 rounded-full bg-[#1a1a1a]/10" />
                      <div className="flex flex-1 flex-col gap-2">
                        <div className="h-4 rounded bg-[#1a1a1a]/10" />
                        <div className="h-3 w-2/3 rounded bg-[#1a1a1a]/10" />
                      </div>
                    </div>
                  </div>
                ))
              : (videos ?? []).map((v, index) => (
                  <button
                    key={v.id}
                    type="button"
                    onClick={() => openVideo(v.youtube_id, v.title)}
                    className="group flex flex-col cursor-pointer text-left animate-fade-up outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 rounded-2xl"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <div className="relative aspect-video rounded-2xl overflow-hidden bg-white shadow-md transition-all duration-500 group-hover:shadow-xl group-hover:-translate-y-1">
                      <img
                        src={v.thumbnail_url}
                        alt=""
                        className="w-full h-full object-cover grayscale brightness-90 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-700"
                      />

                      {v.tag ? (
                        <div className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1 bg-black/50 backdrop-blur-md rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                          <Zap size={10} className="text-gold" />
                          <span className="text-[8px] font-black tracking-widest uppercase text-white">{v.tag}</span>
                        </div>
                      ) : null}

                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500">
                        <div className="h-12 w-12 rounded-full bg-gold text-[#fdfcf6] flex items-center justify-center shadow-2xl scale-90 group-hover:scale-100">
                          <Play size={20} fill="currentColor" />
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 flex gap-3">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-full border border-[#1a1a1a]/5 bg-gold/10">
                        <Play size={14} className="text-gold" />
                      </div>

                      <div className="flex min-w-0 flex-1 flex-col">
                        <div className="flex items-start justify-between gap-2">
                          <h3 className="font-serif text-base font-bold text-[#1a1a1a] leading-tight group-hover:text-gold transition-colors line-clamp-2">
                            {v.title}
                          </h3>
                          <MoreVertical size={14} className="text-[#1a1a1a]/20 mt-1 shrink-0" aria-hidden />
                        </div>
                        <div className="mt-1 flex items-center gap-2">
                          <span className="text-[9px] font-black tracking-widest text-[#1a1a1a]/40 uppercase line-clamp-1">
                            {v.channel_label?.trim() || t("media.defaultChannel")}
                          </span>
                          <ShieldCheck size={10} className="text-gold shrink-0" />
                        </div>
                        {v.meta_line?.trim() ? (
                          <div className="text-[#1a1a1a]/40 text-[9px] font-bold tracking-widest uppercase">
                            {v.meta_line.trim()}
                          </div>
                        ) : null}
                      </div>
                    </div>
                  </button>
                ))}
          </div>

          <div className="mt-10 flex flex-col lg:flex-row items-center justify-between gap-12 border-t border-[#1a1a1a]/5 pt-12 animate-fade-up">
            <div className="max-w-md">
              <div className="flex items-center gap-3 mb-4 text-gold">
                <ShieldCheck size={18} />
                <span className="text-[9px] font-black tracking-widest uppercase text-gold/60">
                  {t("media.curatedBadge")}
                </span>
              </div>
              <p className="text-xs text-[#1a1a1a]/40 leading-relaxed font-serif">{t("media.curatedBody")}</p>
            </div>
            {channelUrl ? (
              <a
                href={channelUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative bg-[#1a1a1a] text-[#fdfcf6] px-12 py-5 rounded-full font-black text-[10px] tracking-widest uppercase hover:bg-gold hover:text-[#1a1a1a] transition-all shadow-2xl flex items-center gap-6"
              >
                {t("media.openChannel")} <MoveRight size={18} className="group-hover:translate-x-2 transition-transform" />
              </a>
            ) : (
              <p className="text-[10px] font-black tracking-widest uppercase text-[#1a1a1a]/30">
                {t("media.channelEnvHint")}
              </p>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
