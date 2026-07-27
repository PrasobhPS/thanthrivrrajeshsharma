import y1 from "@/assets/yantra-1.jpg";
import y2 from "@/assets/yantra-2.jpg";
import y3 from "@/assets/yantra-3.jpg";

const products = [
  { img: y1, name: "Aghora Yantra", price: "₹ 4,800", tag: "Limited", desc: "Copper · 7\"" },
  { img: y2, name: "Mahasudarshana", price: "₹ 6,200", tag: "Featured", desc: "Silver · 9\"" },
  { img: y3, name: "Mahalakshmi", price: "₹ 5,400", tag: "New", desc: "Brass · 7\"" },
  { img: y1, name: "Mahamrityunjaya", price: "₹ 7,800", tag: "Sacred", desc: "Copper · 11\"" },
];

export function Products() {
  return (
    <section id="library" className="relative py-40 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-indigo-deep/20 to-background" />
      <div className="relative mx-auto max-w-7xl px-6">
        <div className="grid lg:grid-cols-12 gap-10 mb-20 items-end">
          <div className="lg:col-span-7">
            <div className="text-[11px] tracking-[0.3em] uppercase text-gold mb-8">— The Atelier · Spring '26</div>
            <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl leading-[1.1] tracking-tighter">
              Consecrated objects <br />
              <span className="text-gradient-gold">of divine intent.</span>
            </h2>
          </div>
          <div className="lg:col-span-5 flex lg:justify-end">
            <p className="text-muted-foreground max-w-md">
              Hand-crafted, energised through 41 days of mantra, dispatched with a personal
              invocation card. Each piece is numbered and signed.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((p, i) => (
            <article
              key={p.name}
              className="group relative cursor-pointer"
            >
              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-midnight glass">
                <img
                  src={p.img}
                  alt={p.name}
                  loading="lazy"
                  className="h-full w-full object-cover transition-all duration-1000 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-midnight/90 via-transparent to-transparent" />

                <div className="absolute top-4 left-4 flex items-center gap-2">
                  <span className="rounded-full glass-gold px-3 py-1 text-[9px] tracking-widest uppercase text-gold">
                    {p.tag}
                  </span>
                </div>

                <div className="absolute top-4 right-4 font-serif text-gold/60 text-sm">
                  N° 0{i + 1}
                </div>

                <button className="absolute bottom-4 right-4 h-12 w-12 rounded-full bg-gradient-gold text-primary-foreground grid place-items-center opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-500 glow-gold">
                  +
                </button>
              </div>

              <div className="pt-5 flex items-start justify-between gap-3">
                <div>
                  <div className="font-serif text-lg text-foreground">{p.name}</div>
                  <div className="text-[10px] tracking-widest uppercase text-muted-foreground mt-1">
                    {p.desc}
                  </div>
                </div>
                <div className="text-gold font-serif text-lg">{p.price}</div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
