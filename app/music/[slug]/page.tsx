import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { tracks, getTrackBySlug } from "@/lib/tracks";
import { TrackDetail } from "@/components/track-detail";

export const dynamicParams = false;

export function generateStaticParams() {
  return tracks
    .filter((track) => track.released)
    .map((track) => ({ slug: track.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const track = getTrackBySlug(slug);
  if (!track) return {};
  return {
    title: `${track.title} — KALLA`,
    description: track.description,
    openGraph: {
      title: `${track.title} — KALLA`,
      description: track.description,
      siteName: "KALLA",
      type: "website",
      locale: "id_ID",
    },
  };
}

export default async function TrackPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const track = getTrackBySlug(slug);
  if (!track) notFound();

  return <TrackDetail track={track} />;
}