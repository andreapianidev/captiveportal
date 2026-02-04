import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "WiFi Portal Cloud | Captive Portal WiFi per Ristoranti e Aziende",
  description:
    "Trasforma il WiFi del tuo locale in uno strumento di marketing. Raccogli contatti, invia campagne email e fidelizza i clienti con il captive portal più semplice d'Italia.",
  keywords: [
    "captive portal",
    "wifi marketing",
    "wifi ristoranti",
    "raccolta contatti wifi",
    "captive portal ristorante",
    "wifi hotel",
    "GDPR wifi",
    "wifi portal cloud",
    "marketing wifi",
    "fidelizzazione clienti",
  ],
  openGraph: {
    title: "WiFi Portal Cloud | Captive Portal WiFi per Ristoranti e Aziende",
    description:
      "Trasforma il WiFi del tuo locale in uno strumento di marketing. Raccogli contatti, invia campagne email e fidelizza i clienti.",
    type: "website",
    locale: "it_IT",
    siteName: "WiFi Portal Cloud",
  },
  twitter: {
    card: "summary_large_image",
    title: "WiFi Portal Cloud | Captive Portal per Aziende",
    description:
      "Raccogli contatti e fidelizza i clienti con il WiFi del tuo locale. GDPR compliant, multi-sede, campagne email integrate.",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "/",
  },
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
