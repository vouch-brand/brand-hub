import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Vouch Brand Hub",
  description: "The single source of truth for the Vouch brand — guidelines, assets, voice, and visual identity.",
  icons: {
    icon: "/favicon.png",
  },
  openGraph: {
    title: "Vouch Brand Hub",
    description: "The single source of truth for the Vouch brand — guidelines, assets, voice, and visual identity.",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Vouch Brand Hub",
    description: "The single source of truth for the Vouch brand — guidelines, assets, voice, and visual identity.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
