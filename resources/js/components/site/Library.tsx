import r1 from "@/assets/ritual-1.jpg";
import r2 from "@/assets/ritual-2.jpg";
import r3 from "@/assets/ritual-3.jpg";
import g from "@/assets/guru-portrait.jpg";
import { useState } from "react";

const tabs = [
  {
    id: "rituals",
    label: "Rituals",
    items: [
      { img: r1, name: "Deepa Aradhana", dur: "12 min", tag: "Live" },
      { img: r2, name: "Sudarshana Homa", dur: "48 min", tag: "Series" },
      { img: r3, name: "Lakshmi Pooja", dur: "32 min", tag: "Premium" },
      { img: g, name: "Guided Meditation", dur: "21 min", tag: "Free" },
    ],
  },
  {
    id: "teachings",
    label: "Teachings",
    items: [
      { img: g, name: "Origins of Tantra", dur: "Series", tag: "New" },
      { img: r2, name: "Fire as Devata", dur: "27 min", tag: "Lecture" },
      { img: r3, name: "Living Yantras", dur: "33 min", tag: "Premium" },
      { img: r1, name: "Mantra Sadhana", dur: "44 min", tag: "Diksha" },
    ],
  },
  {
    id: "music",
    label: "Sacred Music",
    items: [
      { img: r2, name: "Om Namah Shivaya", dur: "108 cycles", tag: "Audio" },
      { img: r1, name: "Gayatri Chant", dur: "45 min", tag: "Audio" },
      { img: r3, name: "Sahasranama", dur: "60 min", tag: "Recital" },
      { img: g, name: "Bhairava Stuti", dur: "21 min", tag: "Audio" },
    ],
  },
];

export function Library() {
  const [active, setActive] = useState(tabs[0].id);
  const current = tabs.find((t) => t.id === active)!;

  return (
    <section id="teachings" className="relative py-40">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid lg:grid-cols-12 gap-10 mb-16 items-end">
          <div className="lg:col-span-7">
            <div className="text-[11px] tracking-[0.3em] uppercase text-gold mb-8">— The Library · 240+ films</div>
            <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl leading-[1.1] tracking-tighter">
              A cinematic archive of <br />
              <span className="text-gradient-gold">sacred practice.</span>
            </h2>
          </div>
          <div className="lg:col-span-5">
            <p className="text-muted-foreground">
              Stream live ceremonies, recorded teachings, sacred music and guided
              meditations — anytime, anywhere.
            </p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-2 mb-10 flex-wrap border-b border-border">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setActive(t.id)}
              className={`relative px-5 py-4 text-sm tracking-widest uppercase transition ${
                active === t.id ? "text-gold" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {t.label}
              {active === t.id && (
                <span className="absolute bottom-[-1px] inset-x-0 h-px bg-gradient-gold" />
              )}
            </button>
          ))}
          <div className="ml-auto text-[10px] tracking-widest uppercase text-muted-foreground hidden sm:block">
            {current.items.length} films
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {/* Big featured */}
          <article className="sm:col-span-2 lg:col-span-2 lg:row-span-2 group relative aspect-[4/5] sm:aspect-[16/10] lg:aspect-auto rounded-3xl overflow-hidden glass cursor-pointer">
            <img
              src={current.items[0].img}
              alt={current.items[0].name}
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-1000 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-midnight via-midnight/40 to-transparent" />
            <div className="absolute top-6 left-6 flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-destructive animate-pulse" />
              <span className="text-[10px] tracking-widest uppercase text-foreground">Now Playing</span>
            </div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-20 w-20 rounded-full bg-gradient-gold grid place-items-center text-primary-foreground text-2xl glow-gold opacity-90 group-hover:scale-110 transition">
              ▶
            </div>
            <div className="absolute inset-x-0 bottom-0 p-8">
              <div className="text-[10px] tracking-[0.3em] uppercase text-gold mb-3">Featured · {current.items[0].tag}</div>
              <h3 className="font-serif text-3xl lg:text-4xl text-foreground mb-2">{current.items[0].name}</h3>
              <div className="text-xs tracking-widest uppercase text-muted-foreground">{current.items[0].dur}</div>
            </div>
          </article>

          {current.items.slice(1).map((it, i) => (
            <article
              key={i}
              className="group relative aspect-[4/5] rounded-2xl overflow-hidden glass cursor-pointer hover:border-gold/40 transition"
            >
              <img
                src={it.img}
                alt={it.name}
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-1000 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-midnight via-midnight/30 to-transparent" />
              <div className="absolute top-4 right-4 rounded-full glass-gold px-3 py-1 text-[9px] tracking-widest uppercase text-gold">
                {it.tag}
              </div>
              <div className="absolute top-4 left-4 h-10 w-10 rounded-full glass grid place-items-center text-gold opacity-0 group-hover:opacity-100 transition">
                ▶
              </div>
              <div className="absolute inset-x-0 bottom-0 p-5">
                <div className="font-serif text-lg text-foreground leading-tight">{it.name}</div>
                <div className="text-[10px] tracking-widest uppercase text-gold mt-1">{it.dur}</div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
