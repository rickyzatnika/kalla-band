"use client";

import Image from "next/image";
import {
  SiSpotify,
  SiApplemusic,
  SiYoutubemusic,
  SiDeezer,
  SiTiktok,
} from "react-icons/si";
import { FaAmazon } from "react-icons/fa6";
import type { IconType } from "react-icons";
import { cn } from "@/lib/utils";
import { getTrackBySlug, type Track } from "@/lib/tracks";

export const platforms: { name: string; href: string; Icon: IconType }[] = [
  {
    name: "Spotify",
    href: "https://open.spotify.com/album/28o3YEPJdUh7csf240aUJC",
    Icon: SiSpotify,
  },
  {
    name: "Apple Music",
    href: "https://music.apple.com/us/song/tak-lagi-sama/6807558048",
    Icon: SiApplemusic,
  },
  {
    name: "YouTube Music",
    href: "https://music.youtube.com/watch?v=t_mY7qi59C0",
    Icon: SiYoutubemusic,
  },
  {
    name: "Amazon Music",
    href: "https://music.amazon.com/tracks/B0HHG3XWV5",
    Icon: FaAmazon,
  },
  {
    name: "Deezer",
    href: "https://link.deezer.com/s/34iTxD9NlTmghSzbkdHMa",
    Icon: SiDeezer,
  },
  {
    name: "TikTok",
    href: "https://vt.tiktok.com/ZS9BEDp6yAoT4-8KkGW/",
    Icon: SiTiktok,
  },
];

export function StreamingButtons({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "grid grid-cols-2 gap-3 sm:grid-cols-3",
        className,
      )}
    >
      {platforms.map(({ name, href, Icon }) => (
        <a
          key={name}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center gap-2.5 rounded-xl border border-[rgba(255,255,255,0.08)] bg-[#090909] px-4 py-3 text-sm font-medium text-white transition-all duration-300 hover:-translate-y-0.5 hover:border-[#DC2626]/40"
        >
          <Icon className="h-4 w-4 shrink-0 text-[#DC2626] transition-colors duration-300 group-hover:text-white" />
          <span className="truncate">{name}</span>
        </a>
      ))}
    </div>
  );
}

export function StreamingCta({
  track,
  showArtwork = true,
}: {
  track?: Track;
  showArtwork?: boolean;
}) {
  const featured = track ?? getTrackBySlug("tak-lagi-sama");

  const content = (
    <div>
      <p className="text-xs font-medium tracking-[0.3em] text-[#DC2626] capitalize">
        New Rilis
      </p>
      <h3 className="mt-3 font-title text-3xl font-bold tracking-wide sm:text-4xl">
        {featured?.title ?? "Tak Lagi Sama"}
      </h3>
      <p className="mt-4 text-[#A1A1AA]">Dengarkan selengkapnya disini :</p>
      <StreamingButtons className="mt-8" />
    </div>
  );

  if (!showArtwork) return content;

  return (
    <div className="overflow-hidden rounded-3xl border border-[rgba(255,255,255,0.08)] bg-[#111111]">
      <div className="grid gap-10 p-8 sm:p-12 lg:grid-cols-[38%_1fr] lg:items-center lg:gap-14">
        <div className="relative mx-auto w-full max-w-[240px]">
          <div className="absolute -left-3 -top-3 h-full w-full rounded-2xl border border-[#DC2626]/40" />
          <div className="relative overflow-hidden rounded-2xl bg-[#090909]">
            <Image
              src={featured?.artwork ?? "/images/cover-album.jpeg"}
              alt={`${featured?.title ?? "KALLA"} artwork`}
              width={480}
              height={480}
              className="aspect-square w-full object-cover"
            />
          </div>
        </div>
        {content}
      </div>
    </div>
  );
}