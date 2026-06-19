"use client";

import { useRef } from "react";
import Image from "next/image";
import { TransitionLink } from "@/components/transition-link";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function Hero() {
  const container = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const tagRef = useRef<HTMLParagraphElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.fromTo(
      imageRef.current,
      { scale: 1.5, filter: "blur(20px)" },
      { scale: 1, filter: "blur(0px)", duration: 2.2, ease: "power3.out" },
    );

    const tl = gsap.timeline();

    tl.fromTo(
      tagRef.current,
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
    )
      .fromTo(
        titleRef.current,
        { y: 60, opacity: 0, scale: 0.97 },
        { y: 0, opacity: 1, scale: 1, duration: 1.2, ease: "power4.out" },
        "-=0.3",
      )
      .fromTo(
        descRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
        "-=0.4",
      )
      .fromTo(
        ctaRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" },
        "-=0.2",
      );

    ScrollTrigger.create({
      trigger: container.current,
      start: "top top",
      end: "bottom top",
      scrub: 1,
      onUpdate: (self) => {
        if (!imageRef.current) return;
        gsap.set(imageRef.current, {
          y: self.progress * -80,
          scale: 1 + self.progress * 0.08,
          opacity: 1 - self.progress * 0.25,
        });
      },
    });
  });

  return (
    <section
      ref={container}
      className="relative min-h-screen w-full overflow-hidden"
    >
      <div ref={imageRef} className="absolute inset-0 will-change-transform">
        <Image
          src="/images/hero.jpeg"
          alt="KALLA Band"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#090909] via-[#090909]/70 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#090909] via-transparent to-[#090909]/20" />
      </div>

      <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl items-center px-6">
        <div className="max-w-3xl">
          <p
            ref={tagRef}
            className="text-xs font-medium tracking-[0.3em] text-[#C08457] uppercase"
          >
            Emotional Alternative Pop
          </p>

          <h1
            ref={titleRef}
            className="mt-3 font-serif text-8xl font-bold leading-[0.85] tracking-tight sm:text-9xl lg:text-[11rem]"
          >
            KALLA
          </h1>

          <p
            ref={descRef}
            className="mt-6 max-w-xl text-base leading-relaxed text-[#A1A1AA] sm:text-lg"
          >
            Band emotional alternative pop asal Bandung. Musik tentang
            kehilangan, cinta diam-diam, kerinduan, dan proses menerima hidup.
          </p>

          <div ref={ctaRef} className="mt-10 flex flex-col gap-4 sm:flex-row">
            <TransitionLink
              href="/music"
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-[#C08457] px-8 py-3.5 text-sm font-medium text-white transition-all duration-500 hover:bg-[#D4A373]"
            >
              Dengarkan Musik
              <span className="inline-block transition-transform duration-500 group-hover:translate-x-1">
                →
              </span>
            </TransitionLink>
            <TransitionLink
              href="/about"
              className="inline-flex items-center justify-center rounded-full border border-[rgba(255,255,255,0.15)] px-8 py-3.5 text-sm font-medium text-white transition-all duration-500 hover:border-white/30"
            >
              Tentang KALLA
            </TransitionLink>
          </div>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 z-10 -translate-x-1/2">
        <div className="h-10 w-6 rounded-full border border-[rgba(255,255,255,0.2)] flex items-start justify-center p-1.5">
          <div className="h-2.5 w-1.5 rounded-full bg-[#A1A1AA] animate-scroll" />
        </div>
      </div>
    </section>
  );
}
