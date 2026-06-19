"use client";

import Image from "next/image";

export function TaglineTrain() {
  return (
    <section className="relative h-40 w-full overflow-hidden bg-[#090909] sm:h-60">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-1/3 bg-gradient-to-r from-[#090909] via-[#090909] to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-1/2 bg-gradient-to-l from-[#090909] via-[#090909]/80 to-transparent" />

      <div className="flex h-full items-center marquee-track">
        <div className="flex h-full items-center marquee-content">
          {Array.from({ length: 6 }).map((_, i) => (
            <Image
              key={`a-${i}`}
              src="/images/TAGLINE_1.png"
              alt=""
              width={600}
              height={160}
              className="marquee-item h-20 w-auto flex-shrink-0 object-contain sm:h-28"
              priority
            />
          ))}
        </div>
        <div className="flex h-full items-center marquee-content">
          {Array.from({ length: 6 }).map((_, i) => (
            <Image
              key={`b-${i}`}
              src="/images/TAGLINE_1.png"
              alt=""
              width={600}
              height={160}
              className="marquee-item h-20 w-auto flex-shrink-0 object-contain sm:h-28"
              priority
            />
          ))}
        </div>
      </div>

      <style>
        {`
          .marquee-track {
            white-space: nowrap;
            animation: marquee 24s linear infinite;
            will-change: transform;
          }

          .marquee-content {
            display: flex;
            align-items: center;
            gap: 8rem;
            padding: 0 4rem;
          }

          @keyframes marquee {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(-50%);
            }
          }
        `}
      </style>
    </section>
  );
}
