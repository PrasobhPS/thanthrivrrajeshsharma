import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/site/Nav";
import { Hero } from "@/components/site/Hero";
import { About } from "@/components/site/About";
import { Disciplines } from "@/components/site/Disciplines";
import { Testimonials } from "@/components/site/Testimonials";
import { Gallery } from "@/components/site/Gallery";
import { LatestBlogs } from "@/components/site/LatestBlogs";
import { Media } from "@/components/site/Media";
import { Footer } from "@/components/site/Footer";
import { BackToTop } from "@/components/site/BackToTop";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Thanthri V R Rajesh Sharmma — Online Tantric Research Centre" },
      {
        name: "description",
        content:
          "An advanced digital sanctuary of Tantric wisdom. Sacred consultations, consecrated yantras, and immersive ritual archives with Thanthri V R Rajesh Sharmma.",
      },
      { property: "og:title", content: "Thanthri V R Rajesh Sharmma" },
      {
        property: "og:description",
        content: "Sacred guidance, consecrated yantras, and Tantric wisdom for the modern seeker.",
      },
      { property: "og:type", content: "website" },
    ],
  }),
});

function Index() {
  return (
    <main className="relative bg-[#020617] text-white">
      <Nav />
      <Hero />
      <About />
      <Disciplines />
      <Testimonials />
      <Gallery />
      <LatestBlogs />
      <Media />
      <Footer />
      <BackToTop />
    </main>
  );
}
