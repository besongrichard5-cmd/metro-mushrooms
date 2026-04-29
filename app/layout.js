import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from '@/components/Navbar';
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Metro Mushrooms.",
  description: "A psychedelic journey into the world of mushrooms. Explore our shop, discover the latest research, and connect with a community of mycology enthusiasts. Always under construction, always evolving.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-[100dvh] flex flex-col bg-[#000d14] text-white selection:bg-cyan-500/30">
        <Navbar/>
        <main className="flex-grow">
          {children}
        </main>
        <Footer/>
       
      </body>
    </html>
  );
}