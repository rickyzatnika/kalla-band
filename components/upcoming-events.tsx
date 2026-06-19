"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Calendar, MapPin, ArrowRight } from "lucide-react";

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
  return (
    <section className="border-t border-[rgba(255,255,255,0.06)] px-6 py-32">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-16 flex items-end justify-between"
        >
          <div>
            <p className="text-xs font-medium tracking-[0.3em] text-[#C08457] uppercase">
              Jadwal
            </p>
            <h2 className="mt-4 font-serif text-5xl font-bold tracking-wide sm:text-6xl">
              Agenda Mendatang
            </h2>
          </div>
          <Link
            href="/events"
            className="hidden items-center gap-2 text-sm text-[#A1A1AA] transition-colors hover:text-white md:flex"
          >
            Semua Agenda <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2">
          {events.map((event, i) => (
            <motion.div
              key={event.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.15, duration: 0.8, ease: "easeOut" }}
              className="group rounded-2xl border border-[rgba(255,255,255,0.08)] bg-[#111111] p-8 transition-all duration-500 hover:border-[#C08457]/30 hover:bg-[#181818]"
            >
              <div className="mb-1 inline-block rounded-full border border-[rgba(255,255,255,0.08)] px-4 py-1.5 text-xs font-medium text-[#C08457]">
                {event.type}
              </div>
              <h3 className="mt-4 font-serif text-2xl font-bold tracking-wide">
                {event.title}
              </h3>
              <div className="mt-6 space-y-3">
                <div className="flex items-center gap-3 text-sm text-[#A1A1AA]">
                  <Calendar className="h-4 w-4 text-[#C08457]" />
                  {event.date}
                </div>
                <div className="flex items-center gap-3 text-sm text-[#A1A1AA]">
                  <MapPin className="h-4 w-4 text-[#C08457]" />
                  {event.venue}, {event.location}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="mt-8 flex justify-center md:hidden"
        >
          <Link
            href="/events"
            className="inline-flex items-center gap-2 rounded-full border border-[rgba(255,255,255,0.15)] px-8 py-3 text-sm font-medium text-white transition-all duration-300 hover:border-white/30"
          >
            Semua Agenda <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
