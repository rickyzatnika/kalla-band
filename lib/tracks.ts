export type Track = {
  slug: string;
  title: string;
  duration: string;
  released: boolean;
  year?: string;
  artwork?: string;
  heroArtwork?: string;
  gallery?: string[];
  video?: string;
  description?: string;
  quote?: string;
};

export const tracks: Track[] = [
  {
    slug: "tak-lagi-sama",
    title: "Tak Lagi Sama",
    duration: "3:45",
    released: true,
    year: "2026",
    artwork: "/images/tak-lagi-sama/artwork.webp",
    heroArtwork: "/images/tak-lagi-sama/hero.webp",
    gallery: [
      "/images/tak-lagi-sama/1.webp",
      "/images/tak-lagi-sama/2.webp",
      "/images/tak-lagi-sama/3.webp",
    ],
    video: "/video/tak-lagi-sama/tak-lagi-sama.MP4",
    description:
      "Bercerita tentang seseorang yang masih berusaha mempertahankan sebuah hubungan, sementara orang yang dicintainya perlahan berubah dan semakin menjauh. Di tengah usaha untuk tetap bertahan, muncul kesadaran bahwa sebuah hubungan tidak mungkin diperjuangkan seorang diri.",
    quote:
      "Lagu ini tentang fase ketika kita sadar bahwa seseorang yang dulu begitu dekat perlahan berubah. Kita masih ingin bertahan, tapi akhirnya harus menerima bahwa mungkin kita sudah tidak lagi berjalan ke arah yang sama.",
  },
  { slug: "tanpa-kepastian", title: "Tanpa Kepastian", duration: "4:12", released: false },
  { slug: "berharap", title: "Berharap", duration: "3:28", released: false },
  {
    slug: "wujud-tak-sempurna",
    title: "Wujud Tak Sempurna",
    duration: "5:02",
    released: false,
  },
  { slug: "dulu", title: "Dulu", duration: "3:51", released: false },
  { slug: "sepi-tanpamu", title: "Sepi Tanpamu", duration: "4:35", released: false },
];

export const getTrackBySlug = (slug: string) =>
  tracks.find((track) => track.slug === slug && track.released);