"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ExternalLink } from "lucide-react";
import { TransitionLink } from "@/components/transition-link";

gsap.registerPlugin(ScrollTrigger);

export function FeaturedRelease() {
  const section = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLParagraphElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  const imageWrapRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();

    mm.add("(min-width: 1024px)", () => {
      gsap.set(imageWrapRef.current, { clipPath: "inset(0 100% 0 0)" });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section.current,
          start: "top 70%",
          end: "top 30%",
          toggleActions: "play none none reverse",
        },
      });

      tl.fromTo(
        labelRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
      )
      .fromTo(
        titleRef.current,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power4.out" },
        "-=0.4"
      )
      .to(
        imageWrapRef.current,
        { clipPath: "inset(0 0% 0 0)", duration: 1.2, ease: "power4.out" },
        "-=0.4"
      )
      .fromTo(
        listRef.current ? Array.from(listRef.current.children) : [],
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: "power2.out" },
        "-=0.6"
      )
      .fromTo(
        ctaRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" },
        "-=0.2"
      );
    });
  });

  const items = [
    "Emotional melodic hooks",
    "Ambient clean guitar",
    "Intimate verses",
    "Powerful emotional chorus",
  ];

  return (
    <section
      ref={section}
      className="relative overflow-hidden border-t border-[rgba(255,255,255,0.06)] px-6 py-32"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mb-20">
          <p
            ref={labelRef}
            className="text-xs font-medium tracking-[0.3em] text-[#C08457] uppercase"
          >
            Rilis Terbaru
          </p>
          <h2
            ref={titleRef}
            className="mt-4 font-serif text-5xl font-bold tracking-wide sm:text-6xl"
          >
            Dengarkan KALLA
          </h2>
        </div>

        <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
          <div ref={imageWrapRef} className="relative aspect-[4/5] w-full max-w-md overflow-hidden rounded-3xl bg-[#111111]">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="h-24 w-24 rounded-full border-2 border-white/20 flex items-center justify-center backdrop-blur-sm transition-all duration-500 hover:border-[#C08457] hover:bg-[#C08457]/20 cursor-pointer group">
                <svg className="h-8 w-8 text-white ml-1" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-[#090909] via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6">
              <p className="font-serif text-2xl font-bold">Single Terbaru</p>
              <p className="mt-1 text-sm text-[#A1A1AA]">2026</p>
            </div>
          </div>

          <div>
            <div>
              <p className="font-serif text-4xl font-bold tracking-wide">
                Karya Terbaru
              </p>
              <p className="mt-4 text-lg leading-relaxed text-[#A1A1AA]">
                KALLA menghadirkan musik dengan karakter yang hangat, melankolis, dan relatable. Terinspirasi dari atmosfer pop rock Indonesia awal 2000-an yang dipadukan dengan sentuhan modern emotional pop.
              </p>
            </div>

            <div ref={listRef} className="mt-8 space-y-4">
              {items.map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-4 border-b border-[rgba(255,255,255,0.06)] pb-4"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-[#C08457]" />
                  <span className="text-sm text-[#A1A1AA]">{item}</span>
                </div>
              ))}
            </div>

            <div ref={ctaRef} className="mt-8 flex flex-col gap-4 pt-4 sm:flex-row">
              <TransitionLink
                href="/music"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#C08457] px-8 py-3.5 text-sm font-medium text-white transition-all duration-300 hover:bg-[#D4A373]"
              >
                <ExternalLink className="h-4 w-4" />
                Lihat Diskografi
              </TransitionLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
