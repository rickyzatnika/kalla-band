"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, Play } from "lucide-react";
import SplitType from "split-type";
import { tracks } from "@/lib/tracks";
import { TransitionLink } from "@/components/transition-link";
import { StreamingCta } from "@/components/streaming-cta";

gsap.registerPlugin(ScrollTrigger);

export default function Music() {
  const main = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const trackListRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => { document.title = "Musik — KALLA"; }, []);

  useGSAP(() => {
    gsap.fromTo(
      bgRef.current,
      { scale: 1.3, filter: "blur(12px)" },
      { scale: 1, filter: "blur(0px)", duration: 1.8, ease: "power3.out" },
    );

    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top top",
      end: "bottom top",
      scrub: 1,
      onUpdate: (self) => {
        gsap.set(bgRef.current, {
          y: self.progress * -80,
          scale: 1 + self.progress * 0.08,
        });
      },
    });

    gsap.fromTo(
      headerRef.current,
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power3.out" },
    );

    if (titleRef.current) {
      const split = new SplitType(titleRef.current, { types: "lines" });
      gsap.fromTo(
        split.lines,
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, stagger: 0.15, ease: "power4.out" },
      );
    }

    ScrollTrigger.create({
      trigger: trackListRef.current,
      start: "top 80%",
      onEnter: () => {
        const els = trackListRef.current
          ? Array.from(trackListRef.current.children)
          : [];
        gsap.fromTo(
          els,
          { x: -30, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.06,
            ease: "power3.out",
          },
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
          { y: 0, opacity: 1, scale: 1, duration: 1, ease: "power4.out" },
        );
      },
      once: true,
    });
  });

  return (
    <>
      <Navigation />
      <main ref={main} className="min-h-screen bg-[#090909] pt-20">
        <section ref={sectionRef} className="relative overflow-hidden px-6 py-32">
          <div ref={bgRef} className="absolute inset-0">
            <Image
              src="/images/cover-album.jpeg"
              alt=""
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#090909] via-[#090909]/70 to-transparent" />
          </div>
          <div className="relative z-10 mx-auto max-w-5xl">
            <div ref={headerRef}>
              <p className="text-xs font-medium tracking-[0.3em] text-[#DC2626] capitalize">
                Diskografi
              </p>
              <h1 ref={titleRef} className="mt-4 font-title text-6xl font-bold tracking-wide sm:text-7xl">
                Musik
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-[#A1A1AA]">
                Musik KALLA banyak bercerita tentang kehilangan, cinta
                diam-diam, kerinduan, waktu, kenangan, dan proses menerima
                hidup.
              </p>
            </div>
          </div>
        </section>

        <section className="border-t border-[rgba(255,255,255,0.06)] px-6 py-32">
          <div className="mx-auto max-w-5xl">
            <div className="mb-16 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <h2 className="font-title text-4xl font-bold tracking-wide">
                Trek Teratas
              </h2>
              
            </div>

            <div
              ref={trackListRef}
              className="overflow-hidden rounded-3xl border border-[rgba(255,255,255,0.08)] bg-[#111111]"
            >
              {tracks.map((track, i) => {
                const num = String(i + 1).padStart(2, "0");

                if (!track.released) {
                  return (
                    <div
                      key={track.slug}
                      aria-disabled
                      className="grid cursor-not-allowed grid-cols-[auto_1fr_auto] items-center gap-x-5 border-t border-white/5 px-6 py-6 opacity-45 first:border-t-0 sm:px-8"
                    >
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/10 font-mono text-sm text-[#A1A1AA]">
                        {num}
                      </span>
                      <div className="min-w-0">
                        <p className="truncate font-medium">{track.title}</p>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="rounded-full border border-white/10 px-3 py-1 text-[11px] font-medium text-[#A1A1AA]">
                          Segera
                        </span>
                        <span className="hidden font-mono text-sm text-[#A1A1AA] sm:block">
                          {track.duration}
                        </span>
                      </div>
                    </div>
                  );
                }

                return (
                  <TransitionLink
                    key={track.slug}
                    href={`/music/${track.slug}`}
                    className="group grid grid-cols-[auto_1fr_auto] items-center gap-x-5 border-t border-white/5 px-6 py-6 transition-colors duration-300 first:border-t-0 hover:bg-[#181818] sm:px-8"
                  >
                    <span className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/10 font-mono text-sm text-[#DC2626] transition-colors duration-300 group-hover:border-[#DC2626] group-hover:bg-[#DC2626]">
                      <span className="transition-opacity duration-200 group-hover:opacity-0">
                        {num}
                      </span>
                      <Play
                        className="absolute h-4 w-4 fill-current text-white opacity-0 transition-opacity duration-200 group-hover:opacity-100"
                        fill="currentColor"
                      />
                    </span>
                    <div className="min-w-0">
                      <p className="truncate text-lg font-semibold transition-colors duration-300 group-hover:text-[#DC2626]">
                        {track.title}
                      </p>
                      <p className="mt-0.5 text-xs text-[#A1A1AA]">
                        {track.year ? `${track.year} \u00b7 ` : ""}Single
                      </p>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="font-mono text-sm text-[#A1A1AA]">
                        {track.duration}
                      </span>
                      <ArrowRight className="hidden h-5 w-5 -translate-x-2 text-[#DC2626] opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100 sm:block" />
                    </div>
                  </TransitionLink>
                );
              })}
            </div>

            <div ref={ctaRef} className="mt-16">
              <StreamingCta />
            </div>
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
}
