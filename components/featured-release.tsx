"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ExternalLink } from "lucide-react";
import { TransitionLink } from "@/components/transition-link";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

export function FeaturedRelease() {
  const section = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLParagraphElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  const imageWrapRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();

    mm.add("(min-width: 1024px)", () => {
      gsap.set(imageWrapRef.current, { clipPath: "inset(0 100% 0 0)" });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section.current,
          start: "top 70%",
          end: "top 30%",
          toggleActions: "play none none reverse",
        },
      });

      tl.fromTo(
        labelRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
      )
        .fromTo(
          titleRef.current,
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 1, ease: "power4.out" },
          "-=0.4",
        )
        .to(
          imageWrapRef.current,
          { clipPath: "inset(0 0% 0 0)", duration: 1.2, ease: "power4.out" },
          "-=0.4",
        )
        .fromTo(
          listRef.current ? Array.from(listRef.current.children) : [],
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: "power2.out" },
          "-=0.6",
        )
        .fromTo(
          ctaRef.current,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" },
          "-=0.2",
        );
    });

    mm.add("(max-width: 1023px)", () => {
      gsap.fromTo(
        labelRef.current,
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section.current,
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
        },
      );

      gsap.fromTo(
        titleRef.current,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power4.out",
          scrollTrigger: {
            trigger: section.current,
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
        },
      );

      gsap.fromTo(
        imageWrapRef.current,
        { scale: 0.95, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 1,
          ease: "power4.out",
          scrollTrigger: {
            trigger: imageWrapRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        },
      );

      gsap.fromTo(
        listRef.current ? Array.from(listRef.current.children) : [],
        { y: 15, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          stagger: 0.08,
          ease: "power2.out",
          scrollTrigger: {
            trigger: listRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        },
      );
    });
  });

  const items = [
    "Tak Lagi Sama",
    "Tanpa Kepastian",
    "Berharap",
    "Wujud Tak Sempurna",
    "Dulu",
    "Sepi Tanpamu",
  ];

  return (
    <section
      ref={section}
      className="relative overflow-hidden border-t border-[rgba(255,255,255,0.06)] px-6 py-32"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mb-20">
          <p
            ref={labelRef}
            className="text-xs font-medium tracking-[0.3em] text-[#DC2626] capitalize"
          >
            Rilis Terbaru
          </p>
          <h2
            ref={titleRef}
            className="mt-4 font-title text-5xl font-bold tracking-wide sm:text-6xl"
          >
            Dengarkan Kalla
          </h2>
        </div>

        <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
          <div
            ref={imageWrapRef}
            className="relative col-span-1 w-full h-full  rounded-3xl bg-[#111]"
          >
            <div className="flex w-full h-full items-center justify-center">
              <Image
                src="/images/cover-album.jpeg"
                alt="album cover"
                className="object-contain object-left  rounded-3xl"
                width={600}
                height={200}
                priority
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-[#090909] via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6">
              <p className="mt-1 text-sm text-[#A1A1AA]">2026</p>
            </div>
          </div>
          <div className="col-span-1">
            <div>
              <p className="font-title text-2xl font-bold tracking-wide">
                Tentang Mimpi yang Belum Usai
              </p>
              <p className="mt-4 text-lg leading-relaxed text-[#A1A1AA]">
                Album ini berisi satu single original KALLA serta beberapa lagu
                lama dari proyek band sebelumnya yang diaransemen ulang.
                Perpaduan ini menjadi simbol bahwa masa lalu tidak benar-benar
                selesai, melainkan bisa hidup kembali dalam bentuk yang baru.
              </p>
            </div>

            <div ref={listRef} className="mt-8 ">
              {items.map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-4 border-b border-[rgba(255,255,255,0.06)] py-2"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-[#DC2626]" />
                  <span className="text-sm text-[#A1A1AA]">{item}</span>
                </div>
              ))}
            </div>

            <div
              ref={ctaRef}
              className="mt-8 flex flex-col gap-4 pt-4 sm:flex-row"
            >
              <TransitionLink
                href="/music"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#DC2626] px-8 py-3.5 text-sm font-medium text-white transition-all duration-300 hover:bg-[#EF4444]"
              >
                <ExternalLink className="h-4 w-4" />
                Lihat Diskografi
              </TransitionLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
