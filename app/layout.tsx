import type { Metadata } from "next";
import { Noto_Serif_JP } from "next/font/google";
import "./globals.css";

const notoSerifJP = Noto_Serif_JP({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "900"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://entrelab.vercel.app"),
  title: {
    default: "起業アイデアを気軽に投げて磨ける | Entrelab",
    template: "%s | Entrelab",
  },
  description: "Entrelabは、ラフな起業アイデアを投稿し、他者からフィードバックをもらいながら一緒に育てていける実験型プラットフォームです。",
  keywords: ["起業", "アイデア", "スタートアップ", "共同創業者", "メンター", "フィードバック", "Entrelab", "アントレラボ"],
  authors: [{ name: "Entrelab Team" }],
  creator: "Entrelab Team",
  publisher: "Entrelab",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  verification: {
    google: "WKcz8JRn70AwMSXU7dSGnzcwx20fME7V2jklZoa2Ais",
  },
  openGraph: {
    title: "起業アイデアを気軽に投げて磨ける | Entrelab",
    description: "Entrelabは、ラフな起業アイデアを投稿し、他者からフィードバックをもらいながら一緒に育てていける実験型プラットフォームです。",
    url: "/",
    siteName: "Entrelab",
    locale: "ja_JP",
    type: "website",
    images: [
      {
        url: "/og-image.png", // Need to create this or ensure it exists
        width: 1200,
        height: 630,
        alt: "Entrelab - 未来を共創する場所",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "起業アイデアを気軽に投げて磨ける | Entrelab",
    description: "Entrelabは、ラフな起業アイデアを投稿し、他者からフィードバックをもらいながら一緒に育てていける実験型プラットフォームです。",
    images: ["/og-image.png"],
    // creator: "@your_twitter_handle", // Optional: Add if you have one
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "/",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body
        className={`${notoSerifJP.className} bg-black text-white min-h-screen selection:bg-white selection:text-black antialiased`}
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
