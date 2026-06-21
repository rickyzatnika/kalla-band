"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Calendar, MapPin } from "lucide-react";
import SplitType from "split-type";

gsap.registerPlugin(ScrollTrigger);

const upcomingEvents = [
  {
    date: "28 Desember 2026",
    time: "19:00 - 23:00",
    title: "Year End Festival",
    venue: "Jakarta International Expo",
    city: "Jakarta",
    type: "Festival",
  },
  {
    date: "15 Januari 2027",
    time: "19:00 - 22:00",
    title: "Acoustic Night",
    venue: "Bandung Convention Center",
    city: "Bandung",
    type: "Konser",
  },
];

export default function Events() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => { document.title = "Agenda — KALLA"; }, []);

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
      { y: 0, opacity: 1, duration: 1, ease: "power3.out" }
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
      trigger: listRef.current,
      start: "top 80%",
      onEnter: () => {
        const els = listRef.current ? Array.from(listRef.current.children) : [];
        gsap.fromTo(
          els,
          { y: 50, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: "power3.out" }
        );
      },
      once: true,
    });
  });

  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-[#090909] pt-20">
        <section ref={sectionRef} className="relative overflow-hidden px-6 py-32">
          <div ref={bgRef} className="absolute inset-0">
            <Image
              src="/gallery-1.png"
              alt=""
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#090909] via-[#090909]/70 to-transparent" />
          </div>
          <div className="relative z-10 mx-auto max-w-5xl">
            <div ref={headerRef}>
              <p className="text-xs font-medium tracking-[0.3em] text-[#DC2626] uppercase">
                Pengalaman Live
              </p>
              <h1 ref={titleRef} className="mt-4 font-title text-6xl font-bold tracking-wide sm:text-7xl">
                Agenda & Tur
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-[#A1A1AA]">
                Saksikan KALLA secara langsung dan rasakan pengalaman emotional alternative pop yang intim dan penuh rasa.
              </p>
            </div>
          </div>
        </section>

        <section className="border-t border-[rgba(255,255,255,0.06)] px-6 py-32">
          <div className="mx-auto max-w-5xl">
            <h2 className="mb-16 font-title text-4xl font-bold tracking-wide">
              Mendatang
            </h2>

            <div ref={listRef} className="space-y-6">
              {upcomingEvents.map((event) => (
                <div
                  key={event.title}
                  className="group rounded-2xl border border-[rgba(255,255,255,0.08)] bg-[#111111] p-8 transition-all duration-500 hover:border-[#DC2626]/30"
                >
                  <div className="mb-3 inline-block rounded-full border border-[rgba(255,255,255,0.08)] px-4 py-1 text-xs font-medium text-[#DC2626]">
                    {event.type}
                  </div>
                  <h3 className="font-title text-2xl font-bold tracking-wide">
                    {event.title}
                  </h3>
                  <div className="mt-6 grid gap-4 sm:grid-cols-2">
                    <div className="flex items-start gap-3">
                      <Calendar className="mt-0.5 h-4 w-4 flex-shrink-0 text-[#DC2626]" />
                      <div>
                        <p className="text-sm text-[#A1A1AA]">{event.date}</p>
                        <p className="text-xs text-[#A1A1AA]/60">{event.time}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0 text-[#DC2626]" />
                      <div>
                        <p className="text-sm text-[#A1A1AA]">{event.venue}</p>
                        <p className="text-xs text-[#A1A1AA]/60">{event.city}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
}
