"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import SplitType from "split-type";

gsap.registerPlugin(ScrollTrigger);

const galleryItems = [
  {
    id: 1,
    image: "/gallery-1.png",
    title: "Penampilan Live",
    category: "Konser",
  },
  { id: 2, image: "/gallery-2.png", title: "Sesi Studio", category: "Studio" },
  { id: 3, image: "/gallery-3.png", title: "Festival", category: "Konser" },
  {
    id: 4,
    image: "/gallery-4.png",
    title: "Momen Festival",
    category: "Acara",
  },
  { id: 5, image: "/gallery-5.png", title: "Rekaman", category: "Studio" },
];

const categories = ["Semua", "Konser", "Studio", "Acara"];

export default function Gallery() {
  const [selected, setSelected] = useState<string | null>(null);
  const [activeCat, setActiveCat] = useState("Semua");
  const sectionRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const filterRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => { document.title = "Galeri — KALLA"; }, []);

  const filtered =
    activeCat === "Semua"
      ? galleryItems
      : galleryItems.filter((item) => item.category === activeCat);

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

    if (titleRef.current) {
      const split = new SplitType(titleRef.current, { types: "lines" });
      gsap.fromTo(
        split.lines,
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, stagger: 0.15, ease: "power4.out" },
      );
    }

    const filterEls = filterRef.current
      ? Array.from(filterRef.current.children)
      : [];
    gsap.fromTo(
      filterEls,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5, stagger: 0.08, ease: "power2.out" },
    );

    ScrollTrigger.create({
      trigger: gridRef.current,
      start: "top 80%",
      onEnter: () => {
        const els = gridRef.current ? Array.from(gridRef.current.children) : [];
        gsap.fromTo(
          els,
          { y: 60, opacity: 0, scale: 0.95 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.8,
            stagger: 0.1,
            ease: "power3.out",
          },
        );
      },
      once: true,
    });
  });

  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-[#090909] pt-20">
        <section
          ref={sectionRef}
          className="relative overflow-hidden px-6 py-32"
        >
          <div
            ref={bgRef}
            className="absolute opacity-50 inset-0"
          >
            <Image
              src="/images/cover-album.jpeg"
              alt=""
              fill
              className="object-cover blur-[5px] "
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#090909] via-[#090909]/70 to-transparent" />
          </div>
          <div className="relative z-10 mx-auto max-w-6xl">
            <div ref={headerRef}>
              <p className="text-xs font-medium tracking-[0.3em] text-[#DC2626] capitalize">
                Visual
              </p>
              <h1 ref={titleRef} className="mt-4 font-title text-6xl font-bold tracking-wide sm:text-7xl">
                Galeri
              </h1>
            </div>

            <div ref={filterRef} className="mt-12 flex flex-wrap gap-3">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCat(cat)}
                  className={`rounded-full px-5 py-2 text-sm font-medium transition-all duration-300 ${
                    activeCat === cat
                      ? "bg-[#DC2626] text-white"
                      : "border border-[rgba(255,255,255,0.08)] text-[#A1A1AA] hover:border-[#DC2626]/30 hover:text-white"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div
              ref={gridRef}
              className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
            >
              {filtered.map((item) => (
                <div
                  key={item.id}
                  className="group relative aspect-[4/5] cursor-pointer overflow-hidden rounded-3xl bg-[#111111]"
                  onClick={() => setSelected(item.image)}
                >
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover transition-all duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#090909] via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  <div className="absolute inset-x-0 bottom-0 p-6 opacity-0 transition-all duration-500 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0">
                    <p className="font-title text-lg font-bold">{item.title}</p>
                    <p className="mt-1 text-xs text-[#DC2626]">
                      {item.category}
                    </p>
                  </div>
                </div>
              ))}
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
                className="relative max-h-[90vh] max-w-5xl"
                onClick={(e) => e.stopPropagation()}
              >
                <Image
                  src={selected}
                  alt="Gallery"
                  width={1400}
                  height={1000}
                  className="h-auto w-full rounded-2xl object-contain"
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
