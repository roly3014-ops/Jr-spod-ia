import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "JR Spot IA",
  description: "Creación automática de spots publicitarios con inteligencia artificial",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
