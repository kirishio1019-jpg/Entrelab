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
    default: "Entrelab - 未来を共創する場所",
    template: "%s | Entrelab",
  },
  description: "ラフな起業アイデアを共有し、フィードバックを集め、共同創業者を見つけよう。完璧である必要はありません。必要なのは情熱だけ。",
  keywords: ["起業", "アイデア", "スタートアップ", "共同創業者", "メンター", "フィードバック", "Entrelab", "アントレラボ"],
  authors: [{ name: "Entrelab Team" }],
  creator: "Entrelab Team",
  publisher: "Entrelab",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "Entrelab - 未来を共創する場所",
    description: "ラフな起業アイデアを共有し、フィードバックを集め、共同創業者を見つけよう。完璧である必要はありません。必要なのは情熱だけ。",
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
    title: "Entrelab - 未来を共創する場所",
    description: "ラフな起業アイデアを共有し、フィードバックを集め、共同創業者を見つけよう。",
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
