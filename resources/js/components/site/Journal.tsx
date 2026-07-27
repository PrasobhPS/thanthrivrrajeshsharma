const posts = [
  {
    cat: "Tantra",
    title: "The Living Geometry of the Sri Yantra",
    excerpt: "How a single diagram encodes the entire architecture of the universe.",
    read: "8 min",
    date: "May 04",
    feat: true,
  },
  {
    cat: "Mantra",
    title: "Vedic Sounds & the Origin of Vibration",
    excerpt: "Before the word, there was the breath. Before the breath, Om.",
    read: "6 min",
    date: "Apr 28",
  },
  {
    cat: "Wisdom",
    title: "What is Mantra, Really?",
    excerpt: "Beyond the chant — a doorway between the spoken and unspoken.",
    read: "5 min",
    date: "Apr 19",
  },
  {
    cat: "Sadhana",
    title: "The Discipline of 41 Days",
    excerpt: "Why the rishis chose this particular cycle of devotion.",
    read: "7 min",
    date: "Apr 09",
  },
];

export function Journal() {
  const [feat, ...rest] = posts;
  return (
    <section id="journal" className="relative py-40">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex items-end justify-between mb-20 flex-wrap gap-6">
          <div>
            <div className="text-[11px] tracking-[0.3em] uppercase text-gold mb-8">— The Journal · Issue No. 27</div>
            <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl leading-[1.1] tracking-tighter">
              Reflections from <br />
              <span className="text-gradient-gold">the silence.</span>
            </h2>
          </div>
          <a href="#" className="group inline-flex items-center gap-3 text-xs tracking-[0.25em] uppercase text-gold">
            All Writings
            <span className="h-8 w-8 rounded-full border border-gold/40 grid place-items-center group-hover:bg-gold group-hover:text-primary-foreground transition">→</span>
          </a>
        </div>

        <div className="grid lg:grid-cols-12 gap-6">
          {/* Featured */}
          <article className="lg:col-span-7 group glass rounded-3xl p-10 hover:border-gold/40 transition-all relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-glow opacity-30 blur-3xl" />
            <div className="relative">
              <div className="flex items-center gap-3 mb-12">
                <span className="rounded-full glass-gold px-3 py-1 text-[10px] tracking-[0.25em] uppercase text-gold">Featured</span>
                <span className="text-[10px] tracking-[0.25em] uppercase text-muted-foreground">{feat.cat} · {feat.date}</span>
              </div>
              <h3 className="font-serif text-4xl lg:text-5xl leading-[1.05] text-foreground mb-6 group-hover:text-gradient-gold transition">
                {feat.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed mb-12 max-w-xl">{feat.excerpt}</p>
              <div className="flex items-center justify-between pt-8 border-t border-border">
                <span className="text-xs tracking-widest uppercase text-muted-foreground">{feat.read} read</span>
                <span className="text-gold transition-transform group-hover:translate-x-1">Read essay →</span>
              </div>
            </div>
          </article>

          {/* List */}
          <div className="lg:col-span-5 space-y-3">
            {rest.map((p, i) => (
              <article
                key={p.title}
                className="group glass rounded-2xl p-6 hover:border-gold/40 transition cursor-pointer"
              >
                <div className="flex items-start gap-5">
                  <div className="font-serif text-3xl text-gold/40 group-hover:text-gold transition leading-none pt-1">
                    0{i + 2}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-[9px] tracking-[0.25em] uppercase text-gold">{p.cat}</span>
                      <span className="text-[9px] tracking-[0.25em] uppercase text-muted-foreground">· {p.date}</span>
                    </div>
                    <h3 className="font-serif text-xl text-foreground mb-2 group-hover:text-gradient-gold transition leading-snug">
                      {p.title}
                    </h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">{p.excerpt}</p>
                  </div>
                  <span className="text-gold opacity-0 group-hover:opacity-100 transition">→</span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
