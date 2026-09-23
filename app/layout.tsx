import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Imóveis — Casas, apartamentos e terrenos em Moçambique",
  description: "Encontre casas, apartamentos, terrenos e imóveis comerciais para comprar ou arrendar em Moçambique."
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt">
      <body>{children}</body>
    </html>
  );
}