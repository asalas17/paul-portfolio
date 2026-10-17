import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://paulcohen.vercel.app"),
  title: "Paul Cohen — AI Automation & Operations",
  description:
    "Paul Cohen helps SaaS teams turn messy processes into simple, automated workflows with n8n, Zapier, Make, and API integrations.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Paul Cohen — AI Automation & Operations",
    description:
      "Good systems. Less friction. Connecting tools, teams, and data to make day-to-day work easier.",
    url: "/",
    siteName: "Paul Cohen",
    locale: "en_US",
    type: "website",
    images: [{ url: "/paul-linkedin.jpg", alt: "Paul Cohen" }],
  },
  twitter: {
    card: "summary",
    title: "Paul Cohen — AI Automation & Operations",
    description:
      "Helping SaaS teams turn messy processes into simple, automated workflows.",
    images: ["/paul-linkedin.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
