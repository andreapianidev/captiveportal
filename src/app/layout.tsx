import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "WiFi Portal Cloud - Captive Portal Demo",
  description: "Trasforma il WiFi del tuo locale in uno strumento di marketing potente. Demo del sistema Captive Portal.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="it">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
