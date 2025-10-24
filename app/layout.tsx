import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "IG Story Prompt Generator",
  description: "Generate high-conversion Instagram Story prompts (meme-style) for ads",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
