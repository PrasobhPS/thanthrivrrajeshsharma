export function CTA() {
  return (
    <section id="consult" className="relative py-40 overflow-hidden">
      <div className="absolute inset-0 bg-cosmic" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] bg-gradient-glow opacity-50 blur-3xl" />

      {/* Concentric rings */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
        {[400, 600, 800, 1000].map((s, i) => (
          <div
            key={s}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-gold/10"
            style={{ width: s, height: s, animation: `pulse-glow ${4 + i}s ease-in-out infinite` }}
          />
        ))}
      </div>

      <div className="relative mx-auto max-w-4xl px-6 text-center">
        <div className="inline-flex items-center gap-3 glass-gold rounded-full px-4 py-2 mb-8">
          <span className="h-1.5 w-1.5 rounded-full bg-gold animate-[pulse-glow_2s_ease-in-out_infinite]" />
          <span className="text-[11px] tracking-[0.3em] uppercase text-gold">Sunday Letter</span>
        </div>

        <h2 className="font-serif text-5xl sm:text-6xl lg:text-7xl leading-[0.95]">
          Receive the weekly
          <span className="block text-gradient-gold">whispers of wisdom.</span>
        </h2>
        <p className="mt-8 text-muted-foreground max-w-xl mx-auto leading-relaxed">
          A single, unhurried letter every Sunday morning — rituals, reflections, and a
          mantra to carry through your week. Read by 12,000+ seekers.
        </p>

        <form
          onSubmit={(e) => e.preventDefault()}
          className="mt-12 flex flex-col sm:flex-row gap-3 max-w-xl mx-auto glass rounded-full p-2 border-gold/20"
        >
          <input
            type="email"
            placeholder="your@sacred.email"
            required
            className="flex-1 bg-transparent px-6 py-3 text-foreground placeholder:text-muted-foreground outline-none text-sm"
          />
          <button className="rounded-full bg-gradient-gold px-7 py-3 text-xs font-medium tracking-[0.25em] uppercase text-primary-foreground glow-gold hover:opacity-95 transition">
            Subscribe
          </button>
        </form>

        <div className="mt-10 flex items-center justify-center gap-6 text-[10px] tracking-[0.3em] uppercase text-muted-foreground">
          <span>No noise</span>
          <span className="h-px w-12 bg-border" />
          <span>Only nectar</span>
          <span className="h-px w-12 bg-border" />
          <span>Unsubscribe anytime</span>
        </div>
      </div>
    </section>
  );
}
