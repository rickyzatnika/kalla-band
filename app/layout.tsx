import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { Poppins } from "next/font/google";
import { SmoothScroll } from "@/components/smooth-scroll";
import "./globals.css";

const cinzel = localFont({
  src: [
    {
      path: "../public/fonts/CinzelDecorative-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/CinzelDecorative-Bold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../public/fonts/CinzelDecorative-Black.ttf",
      weight: "900",
      style: "normal",
    },
  ],
  variable: "--font-cinzel",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "KALLA — Emotional Alternative Pop from Bandung",
  description:
    "KALLA adalah band emotional alternative pop asal Bandung. Musik tentang kehilangan, cinta diam-diam, kerinduan, dan proses menerima hidup.",
  openGraph: {
    title: "KALLA",
    description:
      "Emotional alternative pop from Bandung. Musik tentang kehilangan, cinta diam-diam, kerinduan, dan proses menerima hidup.",
    siteName: "KALLA",
    type: "website",
    locale: "id_ID",
  },
  icons: {
    icon: "/images/LOGO.png",
  },
};

export const viewport: Viewport = {
  colorScheme: "dark",
  themeColor: "#090909",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className="dark">
      <body className={`${cinzel.variable} ${poppins.variable} antialiased`}>
        <SmoothScroll>
          <div className="overflow-x-hidden">{children}</div>
        </SmoothScroll>
      </body>
    </html>
  );
}
