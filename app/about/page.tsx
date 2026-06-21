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
  const headerRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const heroTitle = useRef<HTMLHeadingElement>(null);
  const heroDesc = useRef<HTMLParagraphElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<HTMLDivElement>(null);
  const quoteRef = useRef<HTMLDivElement>(null);

  useEffect(() => { document.title = "Tentang — KALLA"; }, []);

  useGSAP(() => {
    gsap.fromTo(
      bgRef.current,
      { scale: 1.3, filter: "blur(12px)" },
      { scale: 1, filter: "blur(0px)", duration: 1.8, ease: "power3.out" },
    );

    ScrollTrigger.create({
      trigger: headerRef.current,
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

    gsap.to(itemsRef.current, {
      x: () => -(members.length - 1) * window.innerWidth,
      ease: "none",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: "bottom bottom",
        pin: panelRef.current,
        scrub: 1.5,
        invalidateOnRefresh: true,
      },
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
        <section
          ref={headerRef}
          className="relative overflow-hidden px-6 py-32"
        >
          <div
            ref={bgRef}
            className="absolute inset-0"
          >
              <Image
                  src="/images/hero.jpeg"
                  alt=""
                  fill
                  className="object-cover"
                  priority
                />
            <div className="absolute inset-0 bg-gradient-to-r from-[#090909] via-[#090909]/70 to-transparent" />
          </div>
          <div className="relative z-10 mx-auto max-w-5xl">
            <div ref={heroRef}>
              <p className="text-xs font-medium tracking-[0.3em] text-[#DC2626] capitalize">
                Tentang
              </p>
              <h1
                ref={heroTitle}
                className="mt-4 font-title text-6xl font-bold tracking-wide sm:text-7xl"
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

        <section className="border-t border-[rgba(255,255,255,0.06)] py-32">
          <div className="px-6">
            <div className="mx-auto max-w-6xl">
              <p className="text-xs font-medium tracking-[0.3em] text-[#DC2626] capitalize">
                Kolektif
              </p>
              <h2 className="mt-4 font-title text-5xl font-bold tracking-wide">
                Personil
              </h2>
            </div>
          </div>

          <div
            ref={sectionRef}
            style={{ height: `${members.length * 100}vh` }}
            className="relative mt-16"
          >
            <div ref={panelRef} className="h-screen overflow-hidden">
              <div ref={itemsRef} className="flex h-full">
                {members.map((member, i) => (
                  <div
                    key={member.name}
                    className="min-w-[100vw] flex-shrink-0 flex items-center justify-center px-6"
                  >
                    <div className="w-full max-w-6xl grid gap-6 lg:grid-cols-2 lg:gap-20 items-center">
                      <div
                        className={`relative aspect-[3/4] max-h-[45vh] lg:max-h-none overflow-hidden rounded-3xl bg-[#111111] ${i % 2 === 1 ? "lg:order-2" : ""}`}
                      >
                        <Image
                          src={member.image}
                          alt={member.name}
                          fill
                          className="object-cover object-center transition-all duration-700 hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#090909] via-transparent to-transparent" />
                      </div>
                      <div className={i % 2 === 1 ? "lg:order-1" : ""}>
                        <span className="font-mono text-7xl font-bold text-[#DC2626]/10">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <h3 className="mt-2 font-title text-4xl font-bold tracking-wide">
                          {member.name}
                        </h3>
                        <p className="mt-2 font-medium text-[#DC2626]">
                          {member.role}
                        </p>
                        <p className="hidden mt-4 text-sm leading-relaxed text-[#A1A1AA] md:text-lg md:max-w-lg md:block">
                          {member.bio}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="border-t border-[rgba(255,255,255,0.06)] px-6 py-32">
          <div className="mx-auto max-w-3xl text-center">
            <div ref={quoteRef}>
              <p className="font-title text-2xl italic leading-relaxed text-[#A1A1AA]">
                &ldquo;KALLA bukan sekadar band, tetapi ruang untuk menyuarakan
                rasa-rasa yang sering kali hanya bisa dipendam.&rdquo;
              </p>
              <p className="mt-6 text-sm text-[#DC2626]">
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
