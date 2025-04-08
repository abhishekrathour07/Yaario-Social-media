import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/customs/Navbar/Navbar";
import { Toaster } from 'sonner';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Yaario Social-media",
  description: "Social media platform friend connection ,share your idea , connect to world",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-slate-900`}
      >
        <div className="block md:hidden">
          <Navbar />
        </div>
        <main className="pt-16 md:pt-0">
          {children}
        </main>
        <Toaster 
          position="top-right" 
          theme="dark"
          expand
          visibleToasts={6}
          duration={4000}
        />
      </body>
    </html>
  );
}
