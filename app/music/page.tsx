"use client";

import { useRef } from "react";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Music2, ExternalLink } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const tracks = [
  { title: "Neon Dreams", duration: "3:45" },
  { title: "Whisper", duration: "4:12" },
  { title: "Cinematic", duration: "3:28" },
  { title: "Echo", duration: "5:02" },
  { title: "Midnight", duration: "3:51" },
  { title: "Reflections", duration: "4:35" },
];

export default function Music() {
  const main = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const trackListRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.fromTo(
      headerRef.current,
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power3.out" }
    );

    ScrollTrigger.create({
      trigger: trackListRef.current,
      start: "top 80%",
      onEnter: () => {
        const els = trackListRef.current ? Array.from(trackListRef.current.children) : [];
        gsap.fromTo(
          els,
          { x: -30, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.6, stagger: 0.06, ease: "power3.out" }
        );
      },
      once: true,
    });

    ScrollTrigger.create({
      trigger: ctaRef.current,
      start: "top 85%",
      onEnter: () => {
        gsap.fromTo(
          ctaRef.current,
          { y: 40, opacity: 0, scale: 0.97 },
          { y: 0, opacity: 1, scale: 1, duration: 1, ease: "power4.out" }
        );
      },
      once: true,
    });
  });

  return (
    <>
      <Navigation />
      <main ref={main} className="min-h-screen bg-[#090909] pt-20">
        <section className="px-6 py-32">
          <div className="mx-auto max-w-5xl">
            <div ref={headerRef}>
              <p className="text-xs font-medium tracking-[0.3em] text-[#C08457] uppercase">
                Diskografi
              </p>
              <h1 className="mt-4 font-serif text-6xl font-bold tracking-wide sm:text-7xl">
                Musik
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-[#A1A1AA]">
                Musik KALLA banyak bercerita tentang kehilangan, cinta diam-diam, kerinduan, waktu, kenangan, dan proses menerima hidup.
              </p>
            </div>
          </div>
        </section>

        <section className="border-t border-[rgba(255,255,255,0.06)] px-6 py-32">
          <div className="mx-auto max-w-5xl">
            <h2 className="mb-16 font-serif text-4xl font-bold tracking-wide">
              Trek Teratas
            </h2>

            <div
              ref={trackListRef}
              className="overflow-hidden rounded-2xl border border-[rgba(255,255,255,0.08)]"
            >
              {tracks.map((track, i) => (
                <div
                  key={track.title}
                  className="group flex items-center justify-between border-b border-[rgba(255,255,255,0.06)] px-6 py-4 transition-colors last:border-b-0 hover:bg-[#111111]"
                >
                  <div className="flex items-center gap-6">
                    <span className="w-6 text-sm text-[#A1A1AA] font-mono">{String(i + 1).padStart(2, "0")}</span>
                    <p className="font-medium">{track.title}</p>
                  </div>
                  <span className="text-sm text-[#A1A1AA]">{track.duration}</span>
                </div>
              ))}
            </div>

            <div ref={ctaRef} className="mt-16 rounded-2xl border border-[rgba(255,255,255,0.08)] bg-[#111111] p-10 text-center">
              <Music2 className="mx-auto h-10 w-10 text-[#C08457]" />
              <h3 className="mt-4 font-serif text-3xl font-bold tracking-wide">
                Streaming di Spotify
              </h3>
              <p className="mt-3 text-[#A1A1AA]">
                Dengarkan semua musik KALLA di platform streaming favoritmu.
              </p>
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#C08457] px-8 py-3.5 text-sm font-medium text-white transition-all duration-300 hover:bg-[#D4A373]"
              >
                <ExternalLink className="h-4 w-4" />
                Dengarkan di Spotify
              </a>
            </div>
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
}
