"use client";

import { useRef } from "react";
import Image from "next/image";
import { TransitionLink } from "@/components/transition-link";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";

gsap.registerPlugin(ScrollTrigger);

export function Hero() {
  const container = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const imageRef2 = useRef<HTMLDivElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.fromTo(
      imageRef.current,
      { scale: 1.5, filter: "blur(20px)" },
      { scale: 1, filter: "blur(0px)", duration: 2.2, ease: "power3.out" },
    );

    const tl = gsap.timeline();

    tl.fromTo(
      imageRef2.current,
      { y: 60, opacity: 0, scale: 0.97 },
      { y: 0, opacity: 1, scale: 1, duration: 1.2, ease: "power4.out" },
    )
      .to(descRef.current, { opacity: 1, duration: 0.01 }, "-=0.6")
      .fromTo(
        ctaRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" },
        "-=0.2",
      )
      .fromTo(
        scrollRef.current,
        { y: 15, opacity: 0 },
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

    ScrollTrigger.create({
      trigger: container.current,
      start: "top top",
      end: "bottom top",
      scrub: 1,
      onUpdate: (self) => {
        if (!overlayRef.current) return;
        gsap.set(overlayRef.current, {
          y: self.progress * -40,
          opacity: 0.6 + self.progress * 0.4,
        });
      },
    });

    ScrollTrigger.create({
      trigger: container.current,
      start: "top top",
      end: "bottom top",
      scrub: 1,
      onUpdate: (self) => {
        if (!contentRef.current) return;
        gsap.set(contentRef.current, {
          y: self.progress * -30,
        });
      },
    });

    if (descRef.current) {
      const split = new SplitType(descRef.current, { types: "words" });
      gsap.fromTo(
        split.words,
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          stagger: 0.03,
          ease: "power2.out",
          delay: 1.2,
        },
      );
    }
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
        <div
          ref={overlayRef}
          className="absolute inset-0 bg-gradient-to-r from-[#090909] via-[#090909]/70 to-transparent"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#090909] via-transparent to-[#090909]/20" />
      </div>

      <div
        ref={contentRef}
        className="relative z-10 mx-auto flex min-h-screen max-w-7xl items-center px-6"
      >
        <div className="  max-w-3xl ">
          <div ref={imageRef2}>
            <Image
              src="/images/kalla-text.png"
              alt="KALLA Band"
              width={500}
              height={200}
              className="object-contain w-50 md:w-[500px] h-auto"
              loading="eager"
              priority
            />
          </div>

          <p
            ref={descRef}
            className="relative -top-8 md:-top-10 max-w-xl text-base leading-relaxed text-[#A1A1AA] sm:text-lg"
          >
            adalah band emotional alternative pop asal Bandung yang lahir dari
            keresahan, kenangan, dan fase-fase kehidupan yang tidak selalu bisa
            diungkapkan lewat kata-kata.
          </p>

          <div
            ref={ctaRef}
            className="relative -top-4 md:-top-0 flex flex-col gap-4 sm:flex-row"
          >
            <TransitionLink
              href="/music"
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-[#DC2626] px-8 py-3.5 text-sm font-medium text-white transition-all duration-500 hover:bg-[#EF4444]"
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

      <div
        ref={scrollRef}
        className="absolute bottom-10 left-1/2 z-10 -translate-x-1/2"
      >
        <div className="h-10 w-6 rounded-full border border-[rgba(255,255,255,0.2)] flex items-start justify-center p-1.5">
          <div className="h-2.5 w-1.5 rounded-full bg-[#A1A1AA] animate-scroll" />
        </div>
      </div>
    </section>
  );
}
