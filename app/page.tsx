import { Hero } from "@/components/hero";
import { Navigation } from "@/components/navigation";
import { TaglineTrain } from "@/components/tagline-train";
import { FeaturedRelease } from "@/components/featured-release";
import { UpcomingEvents } from "@/components/upcoming-events";
import { ComingSoonPopup } from "@/components/coming-soon-popup";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <>
      <Navigation />
      <Hero />
      <TaglineTrain />
      <FeaturedRelease />
      <UpcomingEvents />
      <ComingSoonPopup />
      <Footer />
    </>
  );
}
