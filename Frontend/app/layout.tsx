import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import WhatsappIcon from "./components/WhatsappIcon";

import BackToTop from "./components/BackToTop";
import Chatbot from "./components/Chatbot";

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: ["400", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "SquareConnect | Premium Transport Solutions",
  description:
    "SquareConnect delivers Tour Travels, Cruise Transfer, Hospital Transfers, Airport Transfer and Transport solutions.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={poppins.variable}>
      <body>
        <Navbar />
        {children}
        <Footer />
        <WhatsappIcon />
        <BackToTop />
        <Chatbot />
      </body>

    </html>
  );
}

