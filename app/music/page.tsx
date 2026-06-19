"use client";

import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { motion } from "framer-motion";
import { Music2, ExternalLink } from "lucide-react";

const tracks = [
  { title: "Neon Dreams", duration: "3:45" },
  { title: "Whisper", duration: "4:12" },
  { title: "Cinematic", duration: "3:28" },
  { title: "Echo", duration: "5:02" },
  { title: "Midnight", duration: "3:51" },
  { title: "Reflections", duration: "4:35" },
];

export default function Music() {
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
                Diskografi
              </p>
              <h1 className="mt-4 font-serif text-6xl font-bold tracking-wide sm:text-7xl">
                Musik
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-[#A1A1AA]">
                Musik KALLA banyak bercerita tentang kehilangan, cinta diam-diam, kerinduan, waktu, kenangan, dan proses menerima hidup.
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
              Trek Teratas
            </motion.h2>

            <div className="overflow-hidden rounded-2xl border border-[rgba(255,255,255,0.08)]">
              {tracks.map((track, i) => (
                <motion.div
                  key={track.title}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05, duration: 0.4 }}
                  className="group flex items-center justify-between border-b border-[rgba(255,255,255,0.06)] px-6 py-4 transition-colors last:border-b-0 hover:bg-[#111111]"
                >
                  <div className="flex items-center gap-6">
                    <span className="w-6 text-sm text-[#A1A1AA]">{i + 1}</span>
                    <div>
                      <p className="font-medium">{track.title}</p>
                    </div>
                  </div>
                  <span className="text-sm text-[#A1A1AA]">{track.duration}</span>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="mt-16 rounded-2xl border border-[rgba(255,255,255,0.08)] bg-[#111111] p-10 text-center"
            >
              <Music2 className="mx-auto h-10 w-10 text-[#C08457]" />
              <h3 className="mt-4 font-serif text-3xl font-bold tracking-wide">
                Streaming di Spotify
              </h3>
              <p className="mt-3 text-[#A1A1AA]">
                Dengarkan semua musik KALLA di platform streaming favoritmu.
              </p>
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#C08457] px-8 py-3.5 text-sm font-medium text-white transition-all duration-300 hover:bg-[#D4A373]"
              >
                <ExternalLink className="h-4 w-4" />
                Dengarkan di Spotify
              </a>
            </motion.div>
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
}
