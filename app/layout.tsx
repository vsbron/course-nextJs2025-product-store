import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";

const RobotoSans = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Product Store",
  description: "A nifty store built by Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${RobotoSans.variable} antialiased`}>{children}</body>
    </html>
  );
}
