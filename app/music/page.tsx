"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Music2, ExternalLink } from "lucide-react";
import SplitType from "split-type";

gsap.registerPlugin(ScrollTrigger);

const tracks = [
  { title: "Tak Lagi Sama", duration: "3:45" },
  { title: "Tanpa Kepastian", duration: "4:12" },
  { title: "Berharap", duration: "3:28" },
  { title: "Wujud Tak Sempurna", duration: "5:02" },
  { title: "Dulu", duration: "3:51" },
  { title: "Sepi Tanpamu", duration: "4:35" },
];

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
            <h2 className="mb-16 font-title text-4xl font-bold tracking-wide">
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
                    <span className="w-6 text-sm text-[#A1A1AA] font-mono">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <p className="font-medium">{track.title}</p>
                  </div>
                  <span className="text-sm text-[#A1A1AA]">
                    {track.duration}
                  </span>
                </div>
              ))}
            </div>

            <div
              ref={ctaRef}
              className="mt-16 rounded-2xl border border-[rgba(255,255,255,0.08)] bg-[#111111] p-10 text-center"
            >
              <Music2 className="mx-auto h-10 w-10 text-[#DC2626]" />
              <h3 className="mt-4 font-title text-3xl font-bold tracking-wide">
                Streaming di Spotify
              </h3>
              <p className="mt-3 text-[#A1A1AA]">
                Dengarkan semua musik KALLA di platform streaming favoritmu.
              </p>
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#DC2626] px-8 py-3.5 text-sm font-medium text-white transition-all duration-300 hover:bg-[#EF4444]"
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
