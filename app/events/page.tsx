"use client";

import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { motion } from "framer-motion";
import { Calendar, MapPin } from "lucide-react";

const upcomingEvents = [
  {
    date: "28 Desember 2026",
    time: "19:00 - 23:00",
    title: "Year End Festival",
    location: "Jakarta International Expo",
    venue: "Jakarta International Expo",
    city: "Jakarta",
    type: "Festival",
  },
  {
    date: "15 Januari 2027",
    time: "19:00 - 22:00",
    title: "Acoustic Night",
    location: "Bandung Convention Center",
    venue: "Bandung Convention Center",
    city: "Bandung",
    type: "Konser",
  },
];

export default function Events() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-[#090909] pt-20">
        <section className="px-6 py-32">
          <div className="mx-auto max-w-5xl">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <p className="text-xs font-medium tracking-[0.3em] text-[#C08457] uppercase">
                Pengalaman Live
              </p>
              <h1 className="mt-4 font-serif text-6xl font-bold tracking-wide sm:text-7xl">
                Agenda & Tur
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-[#A1A1AA]">
                Saksikan KALLA secara langsung dan rasakan pengalaman emotional alternative pop yang intim dan penuh rasa.
              </p>
            </motion.div>
          </div>
        </section>

        <section className="border-t border-[rgba(255,255,255,0.06)] px-6 py-32">
          <div className="mx-auto max-w-5xl">
            <motion.h2
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="mb-16 font-serif text-4xl font-bold tracking-wide"
            >
              Mendatang
            </motion.h2>

            <div className="space-y-6">
              {upcomingEvents.map((event, i) => (
                <motion.div
                  key={event.title}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ delay: i * 0.15, duration: 0.8, ease: "easeOut" }}
                  className="group rounded-2xl border border-[rgba(255,255,255,0.08)] bg-[#111111] p-8 transition-all duration-500 hover:border-[#C08457]/30"
                >
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <div className="mb-3 inline-block rounded-full border border-[rgba(255,255,255,0.08)] px-4 py-1 text-xs font-medium text-[#C08457]">
                        {event.type}
                      </div>
                      <h3 className="font-serif text-2xl font-bold tracking-wide">
                        {event.title}
                      </h3>
                    </div>
                  </div>
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
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
}
