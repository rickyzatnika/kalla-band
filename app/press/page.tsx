"use client";

import { useState, useRef, useEffect } from "react";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Download, Mail, X } from "lucide-react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

gsap.registerPlugin(ScrollTrigger);

const pressImages = Array.from({ length: 8 }, (_, i) => ({
  src: `/images/press-release/${i + 1}.jpeg`,
  alt: `Press Release ${i + 1}`,
}));

const techImages = Array.from({ length: 5 }, (_, i) => ({
  src: `/images/technical-riders/${i + 1}.jpeg`,
  alt: `Technical Rider ${i + 1}`,
}));

export default function Press() {
  const [selected, setSelected] = useState<string | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const pressRef = useRef<HTMLDivElement>(null);
  const techRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);

  useEffect(() => { document.title = "Press Kit — KALLA"; }, []);

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
      { y: 0, opacity: 1, duration: 1, ease: "power3.out" },
    );

    ScrollTrigger.create({
      trigger: pressRef.current,
      start: "top 80%",
      onEnter: () => {
        gsap.fromTo(
          pressRef.current,
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
        );
      },
      once: true,
    });

    ScrollTrigger.create({
      trigger: techRef.current,
      start: "top 80%",
      onEnter: () => {
        gsap.fromTo(
          techRef.current,
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
        );
      },
      once: true,
    });

    ScrollTrigger.create({
      trigger: contactRef.current,
      start: "top 85%",
      onEnter: () => {
        gsap.fromTo(
          contactRef.current,
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 1, ease: "power4.out" },
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
          <div ref={bgRef} className="absolute inset-0 w-screen left-1/2 -translate-x-1/2">
            <Image
              src="/gallery-2.png"
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
                Pers & Media
              </p>
              <h1 className="mt-4 font-title text-6xl font-bold tracking-wide sm:text-7xl">
                Press Kit
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-[#A1A1AA]">
                Semua yang perlu Anda ketahui tentang KALLA. Unduh aset, baca
                cerita kami, dan hubungi tim kami.
              </p>
            </div>
          </div>
        </section>

        <section ref={gridRef} className="border-t border-[rgba(255,255,255,0.06)] px-6 py-32">
          <div className="mx-auto max-w-6xl">
            <div className="mb-20">
              <h2 className="font-title text-4xl font-bold tracking-wide sm:text-5xl">
                Media Kit
              </h2>
              <p className="mt-4 max-w-xl text-base leading-relaxed text-[#A1A1AA]">
                Unduh aset resmi KALLA untuk keperluan publikasi, media, dan acara.
              </p>
            </div>

            <div className="space-y-24">
              <div ref={pressRef}>
                <div className="mb-8 flex items-end justify-between border-b border-[rgba(255,255,255,0.06)] pb-4">
                  <div>
                    <span className="text-xs font-medium tracking-[0.3em] text-[#DC2626] uppercase">
                      01
                    </span>
                    <h3 className="mt-1 font-title text-2xl font-bold tracking-wide sm:text-3xl">
                      Press Release
                    </h3>
                  </div>
                  <a
                    href="/images/press-release/Press-Release-KALLA.pdf"
                    download
                    className="hidden items-center gap-2 rounded-full bg-[#DC2626] px-6 py-2.5 text-sm font-medium text-white transition-all duration-300 hover:bg-[#EF4444] sm:inline-flex"
                  >
                    <Download className="h-4 w-4" />
                    Download PDF
                  </a>
                </div>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
                  {pressImages.map((img, i) => (
                    <button
                      key={img.src}
                      onClick={() => setSelected(img.src)}
                      className="group relative cursor-pointer overflow-hidden rounded-2xl bg-[#111111]"
                    >
                      <div className="relative aspect-[4/3]">
                        <Image
                          src={img.src}
                          alt={img.alt}
                          fill
                          className="object-cover transition-all duration-700 group-hover:scale-105"
                          sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 25vw"
                        />
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-[#090909] via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                      <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-4 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                        <p className="text-xs text-white/80">Klik untuk perbesar</p>
                      </div>
                    </button>
                  ))}
                </div>
                <a
                  href="/images/press-release/Press-Release-KALLA.pdf"
                  download
                  className="mt-4 inline-flex items-center gap-2 rounded-full bg-[#DC2626] px-6 py-3 text-sm font-medium text-white transition-all duration-300 hover:bg-[#EF4444] sm:hidden"
                >
                  <Download className="h-4 w-4" />
                  Download PDF
                </a>
              </div>

              <div ref={techRef}>
                <div className="mb-8 flex items-end justify-between border-b border-[rgba(255,255,255,0.06)] pb-4">
                  <div>
                    <span className="text-xs font-medium tracking-[0.3em] text-[#DC2626] uppercase">
                      02
                    </span>
                    <h3 className="mt-1 font-title text-2xl font-bold tracking-wide sm:text-3xl">
                      Technical Riders
                    </h3>
                  </div>
                  <a
                    href="/images/technical-riders/technical-riders.pdf"
                    download
                    className="hidden items-center gap-2 rounded-full bg-[#DC2626] px-6 py-2.5 text-sm font-medium text-white transition-all duration-300 hover:bg-[#EF4444] sm:inline-flex"
                  >
                    <Download className="h-4 w-4" />
                    Download PDF
                  </a>
                </div>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">
                  {techImages.map((img) => (
                    <button
                      key={img.src}
                      onClick={() => setSelected(img.src)}
                      className="group relative cursor-pointer overflow-hidden rounded-2xl bg-[#111111]"
                    >
                      <div className="relative aspect-[4/3]">
                        <Image
                          src={img.src}
                          alt={img.alt}
                          fill
                          className="object-cover transition-all duration-700 group-hover:scale-105"
                          sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 20vw"
                        />
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-[#090909] via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                      <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-4 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                        <p className="text-xs text-white/80">Klik untuk perbesar</p>
                      </div>
                    </button>
                  ))}
                </div>
                <a
                  href="/images/technical-riders/technical-riders.pdf"
                  download
                  className="mt-4 inline-flex items-center gap-2 rounded-full bg-[#DC2626] px-6 py-3 text-sm font-medium text-white transition-all duration-300 hover:bg-[#EF4444] sm:hidden"
                >
                  <Download className="h-4 w-4" />
                  Download PDF
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className="border-t border-[rgba(255,255,255,0.06)] px-6 py-32">
          <div className="mx-auto max-w-3xl text-center">
            <div ref={contactRef}>
              <Mail className="mx-auto h-8 w-8 text-[#DC2626]" />
              <h2 className="mt-4 font-title text-4xl font-bold tracking-wide">
                Pertanyaan Media
              </h2>
              <p className="mt-4 text-[#A1A1AA]">
                Untuk pertanyaan pers, wawancara, atau kemitraan media.
              </p>
              <a
                href="mailto:press@kalla.id"
                className="mt-6 inline-block text-lg font-medium text-[#DC2626] transition-colors hover:text-[#EF4444]"
              >
                press@kalla.id
              </a>
            </div>
          </div>
        </section>

        <AnimatePresence>
          {selected && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-[#090909]/95 backdrop-blur-sm p-6"
              onClick={() => setSelected(null)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="relative max-h-[85vh] max-w-4xl"
                onClick={(e) => e.stopPropagation()}
              >
                <Image
                  src={selected}
                  alt="Preview"
                  width={1200}
                  height={900}
                  className="h-auto w-full max-h-[85vh] rounded-2xl object-contain"
                />
                <button
                  onClick={() => setSelected(null)}
                  className="absolute -top-14 right-0 flex h-10 w-10 items-center justify-center rounded-full bg-[#DC2626] text-white transition-all hover:bg-[#EF4444]"
                >
                  <X className="h-5 w-5" />
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <Footer />
      </main>
    </>
  );
}
