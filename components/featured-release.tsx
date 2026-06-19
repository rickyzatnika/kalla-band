"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Play, ExternalLink } from "lucide-react";

const fadeUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" },
  transition: { duration: 0.8, ease: "easeOut" },
};

export function FeaturedRelease() {
  return (
    <section className="relative overflow-hidden border-t border-[rgba(255,255,255,0.06)] px-6 py-32">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-20"
        >
          <p className="text-xs font-medium tracking-[0.3em] text-[#C08457] uppercase">
            Rilis Terbaru
          </p>
          <h2 className="mt-4 font-serif text-5xl font-bold tracking-wide sm:text-6xl">
            Dengarkan KALLA
          </h2>
        </motion.div>

        <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="relative aspect-[4/5] w-full max-w-md overflow-hidden rounded-3xl bg-[#111111]"
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="h-24 w-24 rounded-full border-2 border-white/20 flex items-center justify-center backdrop-blur-sm transition-all duration-500 hover:border-[#C08457] hover:bg-[#C08457]/20 cursor-pointer group">
                <Play className="h-8 w-8 text-white ml-1 transition-transform duration-500 group-hover:scale-110" />
              </div>
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-[#090909] via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6">
              <p className="font-serif text-2xl font-bold">Single Terbaru</p>
              <p className="mt-1 text-sm text-[#A1A1AA]">2026</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="space-y-8"
          >
            <div>
              <p className="font-serif text-4xl font-bold tracking-wide">
                Karya Terbaru
              </p>
              <p className="mt-4 text-lg leading-relaxed text-[#A1A1AA]">
                KALLA menghadirkan musik dengan karakter yang hangat, melankolis, dan relatable. Terinspirasi dari atmosfer pop rock Indonesia awal 2000-an yang dipadukan dengan sentuhan modern emotional pop.
              </p>
            </div>

            <div className="space-y-4">
              {[
                "Emotional melodic hooks",
                "Ambient clean guitar",
                "Intimate verses",
                "Powerful emotional chorus",
              ].map((item, i) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  className="flex items-center gap-4 border-b border-[rgba(255,255,255,0.06)] pb-4"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-[#C08457]" />
                  <span className="text-sm text-[#A1A1AA]">{item}</span>
                </motion.div>
              ))}
            </div>

            <div className="flex flex-col gap-4 pt-4 sm:flex-row">
              <Link
                href="/music"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#C08457] px-8 py-3.5 text-sm font-medium text-white transition-all duration-300 hover:bg-[#D4A373]"
              >
                <ExternalLink className="h-4 w-4" />
                Lihat Diskografi
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
