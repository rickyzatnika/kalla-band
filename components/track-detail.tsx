"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Clock,
  ArrowLeft,
  ExternalLink,
  Music2,
  Camera,
  Play,
  X,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import SplitType from "split-type";
import { TransitionLink } from "@/components/transition-link";
import type { Track } from "@/lib/tracks";

gsap.registerPlugin(ScrollTrigger);

export function TrackDetail({ track }: { track: Track }) {
  const [lightbox, setLightbox] = useState<string | null>(null);

  const sectionRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const metaRef = useRef<HTMLDivElement>(null);
  const coverRef = useRef<HTMLDivElement>(null);
  const storyRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);
  const backRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.title = `${track.title} — KALLA`;
  }, [track.title]);

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

    gsap.fromTo(
      metaRef.current,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, ease: "power2.out", delay: 0.6 },
    );

    const mm = gsap.matchMedia();
    mm.add("(min-width: 1024px)", () => {
      gsap.set(coverRef.current, { clipPath: "inset(0 100% 0 0)" });
      ScrollTrigger.create({
        trigger: coverRef.current,
        start: "top 75%",
        once: true,
        onEnter: () => {
          gsap.to(coverRef.current, {
            clipPath: "inset(0 0% 0 0)",
            duration: 1.2,
            ease: "power4.out",
          });
        },
      });
    });

    mm.add("(max-width: 1023px)", () => {
      gsap.fromTo(
        coverRef.current,
        { scale: 0.95, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 1,
          ease: "power4.out",
          scrollTrigger: {
            trigger: coverRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        },
      );
    });

    gsap.fromTo(
      storyRef.current ? Array.from(storyRef.current.children) : [],
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: storyRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      },
    );

    gsap.fromTo(
      videoRef.current,
      { y: 50, opacity: 0, scale: 0.98 },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 1,
        ease: "power4.out",
        scrollTrigger: {
          trigger: videoRef.current,
          start: "top 82%",
          toggleActions: "play none none reverse",
        },
      },
    );

    gsap.fromTo(
      galleryRef.current ? Array.from(galleryRef.current.children) : [],
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.7,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: {
          trigger: galleryRef.current,
          start: "top 82%",
          toggleActions: "play none none reverse",
        },
      },
    );

    gsap.fromTo(
      backRef.current,
      { y: 20, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        ease: "power2.out",
        scrollTrigger: {
          trigger: backRef.current,
          start: "top 90%",
          toggleActions: "play none none reverse",
        },
      },
    );
  }, [track]);

  const sectionHead = (label: string, title: string) => (
    <div className="mb-12 sm:mb-16">
      <p className="text-xs font-medium tracking-[0.3em] text-[#DC2626] capitalize">
        {label}
      </p>
      <h2 className="mt-4 font-title text-4xl font-bold tracking-wide sm:text-5xl">
        {title}
      </h2>
    </div>
  );

  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-[#090909] pt-20">
        <section
          ref={sectionRef}
          className="relative overflow-hidden px-6 py-32 sm:py-40"
        >
          <div ref={bgRef} className="absolute inset-0">
            <Image
              src={track.artwork ?? "/images/cover-album.jpeg"}
              alt=""
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#090909] via-[#090909]/70 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#090909] via-transparent to-transparent" />
          </div>
          <div className="relative z-10 mx-auto max-w-6xl">
            <div ref={headerRef}>
              <p className="text-xs font-medium tracking-[0.3em] text-[#DC2626] capitalize">
                Rilis Terbaru
              </p>
              <h1
                ref={titleRef}
                className="mt-4 font-title text-6xl font-bold tracking-wide sm:text-7xl lg:text-8xl"
              >
                {track.title}
              </h1>
              <div
                ref={metaRef}
                className="mt-8 flex flex-wrap items-center gap-4"
              >
                <span className="rounded-full bg-[#DC2626] px-4 py-1.5 text-xs font-semibold text-white">
                  Single
                </span>
                {track.year && (
                  <span className="text-sm text-[#A1A1AA]">{track.year}</span>
                )}
                <span className="flex items-center gap-2 text-sm text-[#A1A1AA]">
                  <Clock className="h-4 w-4 text-[#DC2626]" />
                  {track.duration}
                </span>
                {track.video && (
                  <span className="flex items-center gap-2 text-sm text-[#A1A1AA]">
                    <Play className="h-4 w-4 text-[#DC2626]" />
                    Cuplikan Video
                  </span>
                )}
              </div>
            </div>
          </div>
        </section>

        <div className="relative z-10 mx-auto max-w-6xl px-6">
          <section className="grid gap-14 py-32 lg:grid-cols-12 lg:items-center lg:gap-20">
            <div className="relative lg:col-span-5">
              <div className="absolute -left-4 -top-4 h-full w-full rounded-3xl border border-[#DC2626]/30 lg:-left-6 lg:-top-6" />
              <div
                ref={coverRef}
                className="relative overflow-hidden rounded-3xl bg-[#111111] will-change-transform"
              >
                <Image
                  src={track.artwork ?? "/images/cover-album.jpeg"}
                  alt={`${track.title} artwork`}
                  width={800}
                  height={800}
                  className="aspect-square w-full object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#090909] via-transparent to-transparent" />
                <div className="absolute bottom-5 left-5">
                  <p className="font-title text-lg font-bold tracking-wide">
                    {track.title}
                  </p>
                  <p className="mt-1 text-xs text-[#A1A1AA]">
                    KALLA &mdash; {track.year}
                  </p>
                </div>
              </div>
            </div>

            <div
              ref={storyRef}
              className="flex flex-col gap-8 lg:col-span-7"
            >
              {track.description && (
                <p className="text-lg leading-relaxed text-[#A1A1AA] sm:text-xl">
                  {track.description}
                </p>
              )}

              {track.quote && (
                <blockquote className="border-l-2 border-[#DC2626] pl-6">
                  <p className="text-base italic leading-relaxed text-[#A1A1AA] sm:text-lg">
                    &ldquo;{track.quote}&rdquo;
                  </p>
                </blockquote>
              )}

              <div>
                <a
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-[#DC2626] px-8 py-3.5 text-sm font-medium text-white transition-all duration-300 hover:bg-[#EF4444]"
                >
                  <ExternalLink className="h-4 w-4" />
                  Dengarkan di Spotify
                </a>
              </div>
            </div>
          </section>

          {track.video && (
            <section className="border-t border-[rgba(255,255,255,0.06)] py-32">
              {sectionHead("Dengarkan", "Teaser")}
              <div className="mx-auto max-w-[280px] sm:max-w-[320px]">
                <div
                  ref={videoRef}
                  className="overflow-hidden rounded-3xl border border-[rgba(255,255,255,0.08)] bg-[#111111]"
                >
                  <video
                    controls
                    playsInline
                    preload="metadata"
                    poster={track.artwork}
                    className="aspect-[9/16] w-full object-cover"
                  >
                    <source src={track.video} type="video/mp4" />
                    Browser kamu tidak mendukung video.
                  </video>
                </div>
                <p className="mt-4 flex items-center justify-center gap-2 text-center text-xs text-[#A1A1AA]">
                  <Music2 className="h-3.5 w-3.5 text-[#DC2626]" />
                  {track.title} &mdash; 
                </p>
              </div>
            </section>
          )}

          {track.gallery && track.gallery.length > 0 && (
            <section className="border-t border-[rgba(255,255,255,0.06)] py-32">
              {sectionHead("Galeri", "Press Release")}
              <div
                ref={galleryRef}
                className="grid grid-cols-1 gap-6 lg:grid-cols-3"
              >
                {track.gallery.map((src, i) => (
                  <button
                    key={src}
                    onClick={() => setLightbox(src)}
                    className="group cursor-zoom-in overflow-hidden rounded-2xl border border-[rgba(255,255,255,0.08)] bg-[#111111] p-3 pb-5 text-left transition-all duration-500 hover:border-[#DC2626]/40 hover:bg-[#181818]"
                  >
                    <div className="relative aspect-square overflow-hidden rounded-xl">
                      <Image
                        src={src}
                        alt={`${track.title} press release ${i + 1}`}
                        fill
                        className="object-cover transition-all duration-700 group-hover:scale-105"
                        sizes="(max-width: 1024px) 100vw, 33vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#090909]/80 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                        <Camera className="h-6 w-6 text-[#DC2626]" />
                      </div>
                    </div>
                    <div className="mt-3 flex items-center justify-between gap-2 px-1">
                      <span className="font-mono text-[11px] uppercase tracking-wider text-[#A1A1AA]">
                        KALLA &mdash; {track.year}
                      </span>
                      <span className="font-mono text-[11px] text-[#DC2626]">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </section>
          )}
        </div>

        <div ref={backRef} className="flex justify-center pb-32">
          <TransitionLink
            href="/music"
            className="group inline-flex items-center gap-3 rounded-full border border-[rgba(255,255,255,0.15)] px-8 py-3.5 text-sm font-medium text-white transition-all duration-300 hover:border-white/30"
          >
            <ArrowLeft className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1" />
            Kembali
          </TransitionLink>
        </div>

        <Footer />
      </main>

      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-[#090909]/95 p-6 backdrop-blur-sm"
            onClick={() => setLightbox(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="relative max-h-[85vh] max-w-5xl"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={lightbox}
                alt="Dokumentasi KALLA"
                width={1600}
                height={1200}
                className="h-auto max-h-[85vh] w-auto rounded-2xl object-contain"
              />
              
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}