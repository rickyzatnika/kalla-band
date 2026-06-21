"use client";

import { useRef } from "react";
import { Calendar, MapPin, ArrowRight } from "lucide-react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TransitionLink } from "@/components/transition-link";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

const events = [
  {
    date: "28 Desember 2026",
    location: "Jakarta",
    venue: "Jakarta International Expo",
    title: "Year End Festival",
    type: "Festival",
  },
  {
    date: "15 Januari 2027",
    location: "Bandung",
    venue: "Bandung Convention Center",
    title: "Acoustic Night",
    type: "Konser",
  },
];

export function UpcomingEvents() {
  const section = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section.current,
          start: "top 70%",
          end: "top 30%",
          toggleActions: "play none none reverse",
        },
      });

      tl.fromTo(
        headerRef.current,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
      ).fromTo(
        cardsRef.current ? Array.from(cardsRef.current.children) : [],
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.15,
          ease: "power2.out",
        },
        "-=0.4",
      );
    });
  });

  return (
    <section
      ref={section}
      className="border-t border-[rgba(255,255,255,0.06)] px-6 pt-32"
    >
      <div className="mx-auto max-w-7xl">
        <div ref={headerRef} className="mb-16 flex items-end justify-between">
          <div>
            <p className="text-xs font-medium tracking-[0.3em] text-[#DC2626] uppercase">
              Jadwal
            </p>
            <h2 className="mt-4 font-title text-5xl font-bold tracking-wide sm:text-6xl">
              Agenda Mendatang
            </h2>
          </div>
          <TransitionLink
            href="/events"
            className="hidden items-center gap-2 text-sm text-[#A1A1AA] transition-colors hover:text-white md:flex"
          >
            Semua Agenda <ArrowRight className="h-4 w-4" />
          </TransitionLink>
        </div>

        <div ref={cardsRef} className="grid gap-6 md:grid-cols-2">
          {events.map((event) => (
            <div
              key={event.title}
              className="group rounded-2xl border border-[rgba(255,255,255,0.08)] bg-[#111111] p-8 transition-all duration-500 hover:border-[#DC2626]/30 hover:bg-[#181818]"
            >
              <div className="mb-1 inline-block rounded-full border border-[rgba(255,255,255,0.08)] px-4 py-1.5 text-xs font-medium text-[#DC2626]">
                {event.type}
              </div>
              <h3 className="mt-4 font-title text-2xl font-bold tracking-wide">
                {event.title}
              </h3>
              <div className="mt-6 space-y-3">
                <div className="flex items-center gap-3 text-sm text-[#A1A1AA]">
                  <Calendar className="h-4 w-4 text-[#DC2626]" />
                  {event.date}
                </div>
                <div className="flex items-center gap-3 text-sm text-[#A1A1AA]">
                  <MapPin className="h-4 w-4 text-[#DC2626]" />
                  {event.venue}, {event.location}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div ref={ctaRef} className="mt-8 flex justify-center md:hidden">
          <TransitionLink
            href="/events"
            className="inline-flex items-center gap-2 rounded-full border border-[rgba(255,255,255,0.15)] px-8 py-3 text-sm font-medium text-white transition-all duration-300 hover:border-white/30"
          >
            Semua Agenda <ArrowRight className="h-4 w-4" />
          </TransitionLink>
        </div>
      </div>
      <div className="w-ful py-8 flex items-center justify-center">
        <Image
          src="/images/stage-plot.jpeg"
          alt="stageplot"
          width={800}
          height={400}
          priority
          loading="eager"
          className="w-full object-contain"
        />
      </div>
      <div className="w-ful pb-8 flex items-center justify-center">
        <Image
          src="/images/TAGLINE.png"
          alt="stageplot"
          width={500}
          height={250}
          priority
          loading="eager"
          className="w-full max-w-[500px] h-auto object-contain"
        />
      </div>
    </section>
  );
}
