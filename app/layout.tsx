import type { Metadata } from "next";
import { Noto_Serif_JP } from "next/font/google";
import "./globals.css";

const notoSerifJP = Noto_Serif_JP({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "900"],
});

export const metadata: Metadata = {
  title: "Entrelab - 未来を共創する場所",
  description: "ラフな起業アイデアを共有し、フィードバックを集め、共同創業者を見つけよう。完璧である必要はありません。必要なのは情熱だけ。",
  openGraph: {
    title: "Entrelab - 未来を共創する場所",
    description: "ラフな起業アイデアを共有し、フィードバックを集め、共同創業者を見つけよう。完璧である必要はありません。必要なのは情熱だけ。",
    type: "website",
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
