import type { Metadata } from "next";
import { Manrope, Syne } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Yeswanth Krishnamoorthi | Java Full Stack Developer",
  description:
    "Portfolio of Yeswanth Krishnamoorthi featuring Java full stack development, Mphasis project experience, AI applications, and enterprise workflow systems.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${manrope.variable} ${syne.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
