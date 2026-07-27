import { ArrowRight, Zap, Activity, Microscope, ScrollText } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { fetchServices, type ServicePayload } from "@/lib/site-api";

const serviceIcons = [Microscope, Activity, ScrollText];

function formatRate(rate: string | number): string {
  const value = typeof rate === "string" ? Number(rate) : rate;
  if (!Number.isFinite(value) || value <= 0) {
    return "";
  }
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);
}

export function Disciplines() {
  const { data: services, isLoading, isError } = useQuery({
    queryKey: ["services"],
    queryFn: fetchServices,
    staleTime: 60_000,
  });

  const list: ServicePayload[] = !isError && services ? services : [];

  return (
    <section id="disciplines" className="relative py-20 sm:py-24 bg-[#020617] text-[#fdfcf6] overflow-hidden">
      <div className="absolute inset-0 z-0 pointer-events-none opacity-20">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-full bg-white/[0.05]" />
        <div className="absolute top-1/4 -left-1/4 w-[800px] h-[800px] bg-blue-900/20 blur-[200px] rounded-full" />
        <div className="absolute bottom-1/4 -right-1/4 w-[600px] h-[600px] bg-gold/10 blur-[200px] rounded-full" />
      </div>

      <div className="relative z-10 mx-auto max-w-[1440px] px-8 sm:px-12 w-full">
        <div className="grid lg:grid-cols-12 gap-12 mb-16 items-end">
          <div className="lg:col-span-8 space-y-8">
            <div className="flex items-center gap-4 animate-fade-in">
              <span className="h-2 w-2 rounded-full bg-gold animate-pulse" />
              <span className="text-[10px] font-black tracking-[0.6em] uppercase text-gold">Sacred Framework v4.0</span>
            </div>
            <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl leading-[1.1] tracking-tighter animate-mask-reveal">
              Our Sacred <br />
              <span className="text-gold">Services</span>
            </h2>
          </div>
          <div className="lg:col-span-4 border-l border-white/10 pl-12 py-4 animate-fade-up">
            <p className="text-sm text-[#fdfcf6]/40 leading-relaxed font-serif max-w-xs">
              "We provide traditional Vedic interventions and consecrated instruments designed for modern spiritual breakthroughs."
            </p>
          </div>
        </div>

        {(isError || (!isLoading && list.length === 0)) && (
          <p className="mb-8 text-sm text-white/50 font-serif max-w-xl">
            {isError
              ? "We could not load the services. Check that the API is running and VITE_API_BASE_URL is set."
              : "Services will appear here once they are added in the admin panel (Services)."}
          </p>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 sm:gap-1px bg-white/5 border border-white/10 rounded-[4rem] overflow-hidden">
          {isLoading &&
            Array.from({ length: 3 }).map((_, index) => (
              <div key={`sk-${index}`} className="relative bg-[#020617] p-12 sm:p-16 animate-pulse">
                <div className="h-16 w-16 rounded-2xl bg-white/5 mb-16" />
                <div className="h-10 w-3/4 bg-white/10 rounded mb-8" />
                <div className="h-20 w-full bg-white/5 rounded" />
              </div>
            ))}

          {!isLoading &&
            list.map((item, index) => {
              const Icon = serviceIcons[index % serviceIcons.length];
              const details = item.short_description?.trim() || item.description?.trim() || "";
              const rateLabel = formatRate(item.rate);
              const metrics = [
                item.duration ? `Duration: ${item.duration}` : null,
                rateLabel ? `From ${rateLabel}` : null,
              ].filter(Boolean) as string[];

              return (
                <div
                  key={item.id}
                  className="group relative bg-[#020617] p-12 sm:p-16 transition-all duration-700 hover:bg-white/[0.02]"
                >
                  {item.image_url ? (
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-1000">
                      <img src={item.image_url} alt={item.name} className="w-full h-full object-cover grayscale" />
                    </div>
                  ) : null}

                  <div className="flex justify-between items-start mb-16 relative z-10">
                    <div className="space-y-1">
                      <div className="text-[9px] font-black tracking-[0.4em] text-gold uppercase">
                        SC-{String(index + 1).padStart(2, "0")}
                      </div>
                      <h4 className="text-[10px] font-bold tracking-widest text-white/30 uppercase">Service</h4>
                    </div>
                    <div className="h-16 w-16 rounded-2xl border border-white/5 flex items-center justify-center text-gold group-hover:scale-110 group-hover:bg-gold group-hover:text-black transition-all duration-500 overflow-hidden">
                      {item.image_url ? (
                        <img
                          src={item.image_url}
                          alt=""
                          className="h-full w-full object-cover opacity-80 group-hover:opacity-100"
                        />
                      ) : (
                        <Icon className="w-8 h-8" />
                      )}
                    </div>
                  </div>

                  <div className="relative z-10">
                    <h3 className="text-4xl font-serif tracking-tighter leading-none mb-8 group-hover:text-gold transition-colors">
                      {item.name}
                    </h3>
                    <p className="text-base text-[#fdfcf6]/40 leading-relaxed mb-12 min-h-[5rem]">
                      {details}
                    </p>

                    {metrics.length > 0 ? (
                      <div className="space-y-4 mb-16">
                        {metrics.map((m) => (
                          <div
                            key={m}
                            className="flex items-center gap-4 text-[9px] font-black tracking-widest text-white/20 uppercase"
                          >
                            <Zap size={12} className="text-gold/40" />
                            {m}
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="mb-16" />
                    )}

                    <button
                      type="button"
                      className="flex items-center gap-6 group/btn text-[10px] font-black tracking-widest uppercase text-gold"
                    >
                      Read More
                      <div className="h-12 w-12 rounded-full border border-gold/20 flex items-center justify-center group-hover/btn:bg-gold group-hover/btn:text-black transition-all">
                        <ArrowRight size={18} className="group-hover/btn:translate-x-1 transition-transform" />
                      </div>
                    </button>
                  </div>

                  <div className="absolute bottom-0 left-0 w-full h-1 bg-gold scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left" />
                </div>
              );
            })}
        </div>

        <div className="mt-16 flex flex-col sm:flex-row items-center justify-between gap-8 animate-fade-up">
          <div className="flex items-center gap-6">
            <div className="flex -space-x-4">
              {list.slice(0, 3).map((item) => (
                <div
                  key={item.id}
                  className="h-10 w-10 rounded-full border-2 border-[#020617] bg-white/5 overflow-hidden"
                >
                  {item.image_url ? (
                    <img src={item.image_url} alt="" className="w-full h-full object-cover grayscale opacity-50" />
                  ) : null}
                </div>
              ))}
            </div>
            <div className="text-[10px] font-bold tracking-widest text-white/30 uppercase">
              {list.length > 0 ? `${list.length} Sacred Services` : "Services"}{" "}
              <span className="text-gold">Available</span>
            </div>
          </div>

          <div className="flex gap-12 text-[9px] font-black tracking-[0.3em] text-white/10 uppercase">
            <span>Verified Heritage</span>
            <span>Real-time Calibration</span>
            <span>Tantric Logic</span>
          </div>
        </div>
      </div>
    </section>
  );
}
