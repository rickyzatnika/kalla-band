import { Hero } from "@/components/hero";
import { Navigation } from "@/components/navigation";
import { TaglineTrain } from "@/components/tagline-train";
import { FeaturedRelease } from "@/components/featured-release";
import { UpcomingEvents } from "@/components/upcoming-events";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <>
      <Navigation />
      <Hero />
      <TaglineTrain />
      <FeaturedRelease />
      <UpcomingEvents />
      <Footer />
    </>
  );
}
