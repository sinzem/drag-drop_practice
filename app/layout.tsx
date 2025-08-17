import type { Metadata } from "next";
import { actayReg, actayWide } from "./styles/fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "Drag and Drop",
  description: "Drag and Drop practice",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${actayReg.variable} ${actayWide.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
