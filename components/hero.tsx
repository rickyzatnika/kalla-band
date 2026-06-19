"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!ref.current) return;
      const { clientX, clientY } = e;
      const x = (clientX / window.innerWidth - 0.5) * 8;
      const y = (clientY / window.innerHeight - 0.5) * 8;
      ref.current.style.transform = `translate(${x}px, ${y}px)`;
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section className="relative min-h-screen w-full overflow-hidden">
      <div
        ref={ref}
        className="absolute inset-0 transition-transform duration-1000 ease-out"
      >
        <Image
          src="/images/hero.jpeg"
          alt="KALLA Band"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-linear-to-r from-[#090909] via-[#090909]/60 to-transparent" />
        <div className="absolute inset-0 bg-linear-to-t from-[#090909] via-transparent to-[#090909]/20" />
      </div>

      <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl items-center px-6">
        <div className="max-w-2xl">
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-xs font-medium tracking-[0.3em] text-[#C08457] uppercase"
          >
            Emotional Alternative Pop
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="mt-6 font-serif text-7xl font-bold leading-[0.9] tracking-wide sm:text-8xl lg:text-9xl"
          >
            KALLA
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            className="mt-6 max-w-lg text-lg leading-relaxed text-[#A1A1AA]"
          >
            Band emotional alternative pop asal Bandung. Musik tentang
            kehilangan, cinta diam-diam, kerinduan, dan proses menerima hidup.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
            className="mt-10 flex flex-col gap-4 sm:flex-row"
          >
            <Link
              href="/music"
              className="inline-flex items-center justify-center rounded-full bg-[#C08457] px-8 py-3.5 text-sm font-medium text-white transition-all duration-300 hover:bg-[#D4A373]"
            >
              Dengarkan Musik
            </Link>
            <Link
              href="/about"
              className="inline-flex items-center justify-center rounded-full border border-[rgba(255,255,255,0.15)] px-8 py-3.5 text-sm font-medium text-white transition-all duration-300 hover:border-white/30"
            >
              Tentang KALLA
            </Link>
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 z-10 -translate-x-1/2"
      >
        <ChevronDown className="h-6 w-6 animate-pulse text-[#A1A1AA]" />
      </motion.div>
    </section>
  );
}
