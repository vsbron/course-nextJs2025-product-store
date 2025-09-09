import type { Metadata } from "next";
import { Roboto } from "next/font/google";

import Container from "@/components/global/Container";
import Navbar from "@/components/navbar/Navbar";

import Providers from "./providers";

import "./globals.css";

// Import the font
const RobotoSans = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
});

// Set the meta data
export const metadata: Metadata = {
  title: "Product Store",
  description: "A nifty store built by Next.js",
};

// The Root Layout
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${RobotoSans.variable} antialiased`}>
        <Providers>
          <Navbar />
          <Container className="py-20">{children}</Container>
        </Providers>
      </body>
    </html>
  );
}
