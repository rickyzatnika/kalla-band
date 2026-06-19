"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";

gsap.registerPlugin(ScrollTrigger);

const members = [
  {
    name: "Dyaz Putra",
    role: "Vokalis",
    image: "/images/dyz.png",
    bio: "Vokalis utama dengan karakter warm low-mid tone, soft, slightly raspy, dan heartfelt yang menjadi identitas utama dalam musik KALLA.",
  },
  {
    name: "Ashid",
    role: "Drummer",
    image: "/images/ashid.jpeg",
    bio: "Drummer yang menghadirkan permainan drum yang dinamis dan penuh rasa.",
  },
  {
    name: "Dedi",
    role: "Bassis",
    image: "/images/dedi.jpeg",
    bio: "Memberikan fondasi yang hangat melalui bassline yang memperkuat emosi dan kedalaman setiap lagu.",
  },
  {
    name: "Ageu",
    role: "Gitaris",
    image: "/images/ageu.jpeg",
    bio: "Memberikan warna khas melalui permainan gitar yang atmosferik, melodis, dan emosional.",
  },
  {
    name: "Biden",
    role: "Lead Guitar",
    image: "/images/biden.jpeg",
    bio: "Memberikan sentuhan melodi, hook, dan warna emosional melalui permainan lead guitar yang khas.",
  },
];

export default function About() {
  const main = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const heroTitle = useRef<HTMLHeadingElement>(null);
  const heroDesc = useRef<HTMLParagraphElement>(null);
  const membersRef = useRef<HTMLDivElement>(null);
  const quoteRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline();

    tl.fromTo(
      heroRef.current,
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power3.out" },
    );

    if (heroTitle.current) {
      const split = new SplitType(heroTitle.current, { types: "lines" });
      gsap.fromTo(
        split.lines,
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, stagger: 0.15, ease: "power4.out" },
      );
    }

    ScrollTrigger.create({
      trigger: membersRef.current,
      start: "top 75%",
      onEnter: () => {
        const els = membersRef.current
          ? Array.from(membersRef.current.children)
          : [];
        gsap.fromTo(
          els,
          { y: 50, opacity: 0, scale: 0.95 },
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

    ScrollTrigger.create({
      trigger: quoteRef.current,
      start: "top 80%",
      onEnter: () => {
        gsap.fromTo(
          quoteRef.current,
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 1.2, ease: "power4.out" },
        );
      },
      once: true,
    });
  });

  return (
    <>
      <Navigation />
      <main ref={main} className="min-h-screen bg-[#090909] pt-20">
        <section className="px-6 py-32">
          <div className="mx-auto max-w-5xl">
            <div ref={heroRef}>
              <p className="text-xs font-medium tracking-[0.3em] text-[#C08457] uppercase">
                Tentang
              </p>
              <h1
                ref={heroTitle}
                className="mt-4 font-serif text-6xl font-bold tracking-wide sm:text-7xl"
              >
                Cerita KALLA
              </h1>
              <p
                ref={heroDesc}
                className="mt-6 max-w-2xl text-lg leading-relaxed text-[#A1A1AA]"
              >
                KALLA adalah band emotional alternative pop asal Bandung yang
                lahir dari keresahan, kenangan, dan fase-fase kehidupan yang
                tidak selalu bisa diungkapkan lewat kata-kata.
              </p>
            </div>
          </div>
        </section>

        <section className="border-t border-[rgba(255,255,255,0.06)] px-6 py-32">
          <div className="mx-auto max-w-5xl">
            <p className="text-xs font-medium tracking-[0.3em] text-[#C08457] uppercase">
              Kolektif
            </p>
            <h2 className="mt-4 font-serif text-5xl font-bold tracking-wide">
              Personil
            </h2>

            <div
              ref={membersRef}
              className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5"
            >
              {members.map((member) => (
                <div key={member.name} className="group">
                  <div className="relative aspect-[3/4] overflow-hidden rounded-3xl bg-[#111111]">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover object-center transition-all duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#090909] via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  </div>
                  <div className="mt-4">
                    <h3 className="font-serif text-xl font-bold tracking-wide">
                      {member.name}
                    </h3>
                    <p className="mt-1 text-sm font-medium text-[#C08457]">
                      {member.role}
                    </p>
                    <p className="mt-2 text-sm leading-relaxed text-[#A1A1AA]">
                      {member.bio}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="border-t border-[rgba(255,255,255,0.06)] px-6 py-32">
          <div className="mx-auto max-w-3xl text-center">
            <div ref={quoteRef}>
              <p className="font-serif text-2xl italic leading-relaxed text-[#A1A1AA]">
                &ldquo;KALLA bukan sekadar band, tetapi ruang untuk menyuarakan
                rasa-rasa yang sering kali hanya bisa dipendam.&rdquo;
              </p>
              <p className="mt-6 text-sm text-[#C08457]">
                — Karena bagi KALLA, beberapa rasa mungkin tidak pernah
                benar-benar hilang. Mereka hanya tinggal di satu
                &ldquo;kala.&rdquo;
              </p>
            </div>
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
}
