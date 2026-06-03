import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Treino App - Gestão de Treinos e Dieta",
  description: "Aplicativo para gestão de treinos e dieta com IA",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
