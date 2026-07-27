import y1 from "@/assets/yantra-1.jpg";
import y2 from "@/assets/yantra-2.jpg";
import y3 from "@/assets/yantra-3.jpg";

const yantras = [
  { img: y1, name: "Sri Yantra", purpose: "Abundance & Cosmic Order", n: "01" },
  { img: y2, name: "Mahalakshmi", purpose: "Prosperity & Grace", n: "02" },
  { img: y3, name: "Sudarshana", purpose: "Protection & Clarity", n: "03" },
  { img: y1, name: "Kubera", purpose: "Wealth & Stability", n: "04" },
  { img: y2, name: "Bhairava", purpose: "Fearlessness", n: "05" },
  { img: y3, name: "Ganapathi", purpose: "Removal of Obstacles", n: "06" },
];

export function YantraGallery() {
  return (
    <section id="yantras" className="relative py-40 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-indigo-deep/30 to-background" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-glow opacity-30 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="grid lg:grid-cols-12 gap-10 mb-20 items-end">
          <div className="lg:col-span-7">
            <div className="text-[11px] tracking-[0.3em] uppercase text-gold mb-8">— Sacred Geometry · 06 Yantras</div>
            <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl leading-[1.1] tracking-tighter">
              Mathematical hymns <br />
              <span className="text-gradient-gold">of the divine.</span>
            </h2>
          </div>
          <div className="lg:col-span-5">
            <p className="text-muted-foreground leading-relaxed">
              Each yantra is a frequency rendered in line — a geometric blueprint that, when
              invoked, awakens the cosmos within you. Hover to feel the field.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-px bg-border rounded-3xl overflow-hidden">
          {yantras.map((y) => (
            <article
              key={y.n}
              className="group relative aspect-[4/5] overflow-hidden bg-midnight cursor-pointer"
            >
              <img
                src={y.img}
                alt={y.name}
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover opacity-70 transition-all duration-1000 group-hover:opacity-100 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-midnight via-midnight/40 to-transparent transition-opacity group-hover:opacity-60" />

              <div className="absolute top-6 left-6 right-6 flex items-start justify-between">
                <span className="font-serif text-gold text-xl">{y.n}</span>
                <span className="text-[10px] tracking-widest uppercase text-muted-foreground opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 transition-all duration-500">
                  Invoke →
                </span>
              </div>

              <div className="absolute inset-x-0 bottom-0 p-7">
                <div className="font-serif text-3xl text-foreground mb-2 transition-transform duration-500 group-hover:-translate-y-1">
                  {y.name}
                </div>
                <div className="text-[10px] tracking-[0.25em] uppercase text-gold">
                  {y.purpose}
                </div>
                <div className="mt-5 h-px w-12 bg-gold scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-700" />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
