"use client";

import { useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const IMAGES_PER_SET = 6;

export function TaglineTrain() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const track = trackRef.current;
    if (!track) return;

    const halfWidth = track.scrollWidth / 2;
    if (halfWidth > 0) {
      gsap.killTweensOf(track, "x");
      gsap.to(track, {
        x: -halfWidth,
        duration: Math.max(halfWidth / 80, 14),
        ease: "none",
        repeat: -1,
      });
    }

    gsap.fromTo(
      track,
      { y: 60, opacity: 0, scale: 0.95 },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 1.2,
        ease: "power4.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      },
    );
  });

  return (
    <section
      ref={sectionRef}
      className="relative h-40 w-full overflow-hidden bg-[#090909] sm:h-60"
    >
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-1/4 bg-gradient-to-r from-[#090909] via-[#090909]/80 to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-1/2 bg-gradient-to-l from-[#090909] via-[#090909]/80 to-transparent" />

      <div
        ref={trackRef}
        className="flex h-full items-center will-change-transform"
      >
        {Array.from({ length: IMAGES_PER_SET * 2 }).map((_, i) => (
          <div
            key={i}
            className="flex-shrink-0 w-screen flex items-center justify-center px-6 sm:px-12"
          >
            <Image
              src="/images/TAGLINE_1.png"
              alt=""
              width={600}
              height={160}
              className="h-24 w-auto object-contain sm:h-36"
              priority
            />
          </div>
        ))}
      </div>
    </section>
  );
}
