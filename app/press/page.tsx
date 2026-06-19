"use client";

import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { motion } from "framer-motion";
import { Download, FileText, Image as ImageIcon, Mail } from "lucide-react";

const downloadItems = [
  { title: "Foto Band Resolusi Tinggi", type: "ZIP", size: "50 MB", icon: ImageIcon },
  { title: "Biografi Band", type: "PDF", size: "2 MB", icon: FileText },
  { title: "Technical Rider", type: "PDF", size: "3.5 MB", icon: FileText },
  { title: "Logo & Aset Branding", type: "ZIP", size: "15 MB", icon: ImageIcon },
];

export default function Press() {
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
                Pers & Media
              </p>
              <h1 className="mt-4 font-serif text-6xl font-bold tracking-wide sm:text-7xl">
                Press Kit
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-[#A1A1AA]">
                Semua yang perlu Anda ketahui tentang KALLA. Unduh aset, baca cerita kami, dan hubungi tim kami.
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
              Unduh Media Kit
            </motion.h2>

            <div className="grid gap-4 md:grid-cols-2">
              {downloadItems.map((item, i) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ delay: i * 0.08, duration: 0.5 }}
                    className="group flex items-center justify-between rounded-2xl border border-[rgba(255,255,255,0.08)] bg-[#111111] p-6 transition-all duration-300 hover:border-[#C08457]/30"
                  >
                    <div className="flex items-start gap-4">
                      <Icon className="mt-1 h-5 w-5 flex-shrink-0 text-[#C08457]" />
                      <div>
                        <p className="font-medium">{item.title}</p>
                        <p className="mt-1 text-xs text-[#A1A1AA]">{item.type} &bull; {item.size}</p>
                      </div>
                    </div>
                    <button className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border border-[rgba(255,255,255,0.08)] text-[#A1A1AA] transition-all duration-300 hover:border-[#C08457] hover:text-[#C08457]">
                      <Download className="h-4 w-4" />
                    </button>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        <section className="border-t border-[rgba(255,255,255,0.06)] px-6 py-32">
          <div className="mx-auto max-w-3xl text-center">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <Mail className="mx-auto h-8 w-8 text-[#C08457]" />
              <h2 className="mt-4 font-serif text-4xl font-bold tracking-wide">
                Pertanyaan Media
              </h2>
              <p className="mt-4 text-[#A1A1AA]">
                Untuk pertanyaan pers, wawancara, atau kemitraan media.
              </p>
              <a
                href="mailto:press@kalla.id"
                className="mt-6 inline-block text-lg font-medium text-[#C08457] transition-colors hover:text-[#D4A373]"
              >
                press@kalla.id
              </a>
            </motion.div>
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
}
