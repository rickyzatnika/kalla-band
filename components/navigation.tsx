"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { TransitionLink } from "@/components/transition-link";

gsap.registerPlugin(SplitText);

const links = [
  { href: "/", label: "Beranda", num: "1" },
  { href: "/about", label: "Tentang", num: "2" },
  { href: "/music", label: "Musik", num: "3" },
  { href: "/events", label: "Agenda", num: "4" },
  { href: "/gallery", label: "Galeri", num: "5" },
  { href: "/press", label: "Press Kit", num: "6" },
  { href: "/booking", label: "Booking", num: "7" },
  { href: "/contact", label: "Kontak", num: "8" },
];

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const leftPanel = useRef<HTMLDivElement>(null);
  const rightPanel = useRef<HTMLDivElement>(null);
  const leftItems = useRef<HTMLDivElement>(null);
  const rightItems = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    const lenis = (window as any).__lenis;
    lenis?.stop();
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";

    gsap.set(rightItems.current!.children, { y: 20, opacity: 0 });

    const split = SplitText.create(".nav-label", {
      type: "words",
      wordsClass: "nav-word",
    });

    gsap.set(split.words, { yPercent: 100, opacity: 0 });

    const tl = gsap.timeline({ delay: 0 });

    tl.to(leftPanel.current, { x: "0%", duration: 1, ease: "power4.out" }, 0)
      .to(rightPanel.current, { x: "0%", duration: 1, ease: "power4.out" }, 0)
      .fromTo(
        rightItems.current!.children,
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.4,
          stagger: 0.05,
          ease: "power3.out",
        },
        "-=0.4",
      )
      .to(
        split.words,
        {
          yPercent: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.03,
          ease: "power3.out",
        },
        "-=0.4",
      );
  }, [isOpen]);

  useEffect(() => {
    return () => {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
      const lenis = (window as any).__lenis;
      lenis?.start();
    };
  }, []);

  const close = () => {
    gsap.to(leftPanel.current, {
      x: "-100%",
      duration: 0.8,
      ease: "power4.in",
    });
    gsap.to(rightPanel.current, {
      x: "100%",
      duration: 0.8,
      ease: "power4.in",
      onComplete: () => {
        setIsOpen(false);
        const lenis = (window as any).__lenis;
        lenis?.start();
        document.body.style.overflow = "";
        document.documentElement.style.overflow = "";
      },
    });
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 md:px-14 py-5">
        <TransitionLink href="/">
          <Image
            src="/images/bulat.png"
            alt="KALLA"
            width={40}
            height={40}
            className="h-9 w-auto"
            priority
          />
        </TransitionLink>
        <button
          onClick={() => (isOpen ? close() : setIsOpen(true))}
          className="relative z-50 cursor-pointer flex flex-col items-end gap-1.5"
          aria-label={isOpen ? "Close menu" : "Open menu"}
        >
          <span
            className={`block h-px bg-white transition-all duration-300 ${
              isOpen ? "w-5 rotate-45 translate-y-[3.5px]" : "w-7"
            }`}
          />
          <span
            className={`block  opacity-100 h-px bg-white transition-all duration-300 ${
              isOpen ? " hidden opacity-0" : "w-5"
            }`}
          />
          <span
            className={`block h-px bg-white transition-all duration-300 ${
              isOpen ? "w-5 -rotate-45 -translate-y-[3.5px]" : "w-3"
            }`}
          />
        </button>
      </header>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex flex-col md:flex-row overflow-y-auto md:overflow-hidden">
          <div
            ref={leftPanel}
            className="flex w-full md:h-full items-start bg-[#131313]/60 backdrop-blur-2xl"
            style={{ transform: "translateX(-100%)" }}
          >
            <div className="w-full pt-16 sm:pt-20 md:pt-0">
              <div ref={leftItems} className="flex flex-col">
                {links.map((link) => (
                  <TransitionLink
                    key={link.href}
                    href={link.href}
                    className="group flex pl-[6%] max-sm:pl-[3%] items-center gap-4 py-4 max-sm:py-2 border-b border-white/10 transition-transform duration-300 hover:translate-x-2"
                  >
                    <span className="font-mono text-xs tracking-wider text-[#DC2626]">
                      ({link.num})
                    </span>
                    <span className="nav-label text-xl max-sm:text-lg font-title font-bold tracking-tight text-white transition-all duration-300 sm:text-2xl lg:text-3xl">
                      {link.label}
                    </span>
                  </TransitionLink>
                ))}
              </div>
            </div>
          </div>

          <div
            ref={rightPanel}
            className="relative flex w-full md:h-full items-center justify-center bg-[#090909]"
            style={{ transform: "translateX(100%)" }}
          >
            {/* close button — hidden on mobile (header button handles it) */}
            <button
              onClick={() => (isOpen ? close() : setIsOpen(true))}
              className="absolute top-4 right-14 z-50 cursor-pointer p-3 flex-col items-end gap-1.5 hidden md:flex"
              aria-label={isOpen ? "Close menu" : "Open menu"}
            >
              <span
                className={`block h-px bg-white transition-all duration-300 ${
                  isOpen ? "w-5 rotate-45 translate-y-[3.5px]" : "w-7"
                }`}
              />
              <span
                className={`block  opacity-100 h-px bg-white transition-all duration-300 ${
                  isOpen ? " hidden opacity-0" : "w-5"
                }`}
              />
              <span
                className={`block h-px bg-white transition-all duration-300 ${
                  isOpen ? "w-5 -rotate-45 -translate-y-[3.5px]" : "w-3"
                }`}
              />
            </button>
            <div
              ref={rightItems}
              className="flex flex-col items-center gap-14 max-sm:gap-8 text-center py-10 md:py-0"
            >
              <div>
                <Image
                  src="/images/LOGO.png"
                  alt="KALLA"
                  width={500}
                  height={200}
                  className="w-50 object-contain"
                  priority
                />
              </div>

              <div className="space-y-5">
                <div>
                  <p className="mb-1 text-xs font-mono tracking-[0.15em] text-[#DC2626] uppercase">
                    Email
                  </p>
                  <a
                    href="mailto:hello@kalla.id"
                    className="text-sm text-[#A1A1AA] transition-colors hover:text-white"
                  >
                    hello@kalla.id
                  </a>
                </div>
                <div>
                  <p className="mb-1 text-xs font-mono tracking-[0.15em] text-[#DC2626] uppercase">
                    Lokasi
                  </p>
                  <p className="text-sm text-[#A1A1AA]">Bandung, Indonesia</p>
                </div>
              </div>

              <div>
                <p className="mb-3 text-xs font-mono tracking-[0.15em] text-[#DC2626] uppercase">
                  Social
                </p>
                <div className="flex gap-6">
                  {["Instagram", "YouTube", "Spotify"].map((s) => (
                    <a
                      key={s}
                      href="#"
                      className="text-sm text-[#A1A1AA] underline underline-offset-4 transition-colors hover:text-white"
                    >
                      {s}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
