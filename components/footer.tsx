"use client";

import Image from "next/image";
import { Mail, ExternalLink, Music2 } from "lucide-react";
import { TransitionLink } from "@/components/transition-link";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const year = new Date().getFullYear();

  useGSAP(() => {
    if (!contentRef.current) return;
    gsap.fromTo(
      contentRef.current,
      { y: 60, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1.2,
        ease: "power4.out",
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      },
    );
  });

  return (
    <footer ref={footerRef} className=" w-full px-6 py-20 bg-[url('/images/bg.jpg')] bg-contain ">
      <div ref={contentRef} className="mx-auto max-w-7xl">
        <div className="grid gap-12 md:grid-cols-4">
          <div className="md:col-span-2">
            <Image
              src="/images/LOGO.png"
              alt="KALLA"
              width={56}
              height={56}
              loading="eager"
              className="h-12 w-auto"
            />
            <p className="mt-4 max-w-md text-sm leading-relaxed text-[#A1A1AA]">
              Band emotional alternative pop asal Bandung. Musik tentang
              kehilangan, cinta diam-diam, kerinduan, dan proses menerima hidup.
            </p>
          </div>

          <div>
            <p className="mb-4 text-xs font-medium tracking-[0.2em] text-[#DC2626] capitalize">
              Navigasi
            </p>
            <ul className="space-y-3">
              {[
                { label: "Tentang", href: "/about" },
                { label: "Musik", href: "/music" },
                { label: "Agenda", href: "/events" },
                { label: "Booking", href: "/booking" },
                { label: "Kontak", href: "/contact" },
              ].map((link) => (
                <li key={link.href}>
                  <TransitionLink
                    href={link.href}
                    className="text-sm text-[#A1A1AA] transition-colors duration-300 hover:text-white"
                  >
                    {link.label}
                  </TransitionLink>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="mb-4 text-xs font-medium tracking-[0.2em] text-[#DC2626] capitalize">
              Terhubung
            </p>
            <ul className="space-y-3">
              <li>
                <a
                  href="mailto:hello@kalla.id"
                  className="flex items-center gap-2 text-sm text-[#A1A1AA] transition-colors duration-300 hover:text-white"
                >
                  <Mail className="h-4 w-4" />
                  hello@kalla.id
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="flex items-center gap-2 text-sm text-[#A1A1AA] transition-colors duration-300 hover:text-white"
                >
                  <ExternalLink className="h-4 w-4" />
                  @kalla.band
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="flex items-center gap-2 text-sm text-[#A1A1AA] transition-colors duration-300 hover:text-white"
                >
                  <ExternalLink className="h-4 w-4" />
                  KALLA Official
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="flex items-center gap-2 text-sm text-[#A1A1AA] transition-colors duration-300 hover:text-white"
                >
                  <Music2 className="h-4 w-4" />
                  Spotify
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 border-t border-[rgba(255,255,255,0.06)] pt-8 text-center text-sm text-[#A1A1AA]">
          <p>&copy; {year} KALLA. Hak cipta dilindungi.</p>
        </div>
      </div>
    </footer>
  );
}
