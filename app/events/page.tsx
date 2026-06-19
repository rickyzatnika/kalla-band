"use client";

import { useRef } from "react";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Calendar, MapPin } from "lucide-react";

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
  const headerRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.fromTo(
      headerRef.current,
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power3.out" }
    );

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
        <section className="px-6 py-32">
          <div className="mx-auto max-w-5xl">
            <div ref={headerRef}>
              <p className="text-xs font-medium tracking-[0.3em] text-[#C08457] uppercase">
                Pengalaman Live
              </p>
              <h1 className="mt-4 font-serif text-6xl font-bold tracking-wide sm:text-7xl">
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
            <h2 className="mb-16 font-serif text-4xl font-bold tracking-wide">
              Mendatang
            </h2>

            <div ref={listRef} className="space-y-6">
              {upcomingEvents.map((event) => (
                <div
                  key={event.title}
                  className="group rounded-2xl border border-[rgba(255,255,255,0.08)] bg-[#111111] p-8 transition-all duration-500 hover:border-[#C08457]/30"
                >
                  <div className="mb-3 inline-block rounded-full border border-[rgba(255,255,255,0.08)] px-4 py-1 text-xs font-medium text-[#C08457]">
                    {event.type}
                  </div>
                  <h3 className="font-serif text-2xl font-bold tracking-wide">
                    {event.title}
                  </h3>
                  <div className="mt-6 grid gap-4 sm:grid-cols-2">
                    <div className="flex items-start gap-3">
                      <Calendar className="mt-0.5 h-4 w-4 flex-shrink-0 text-[#C08457]" />
                      <div>
                        <p className="text-sm text-[#A1A1AA]">{event.date}</p>
                        <p className="text-xs text-[#A1A1AA]/60">{event.time}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0 text-[#C08457]" />
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
