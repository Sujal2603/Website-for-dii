import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "For My Favorite Human | A Sister's Scrapbook",
  description: "A tiny universe of memories, made with love for the world's loveliest sister.",
  keywords: ["sister", "memories", "digital scrapbook", "family"],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
