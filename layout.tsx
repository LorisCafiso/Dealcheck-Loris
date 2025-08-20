import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
})

export const metadata: Metadata = {
  title: "DealCheck – I veri sconti in un attimo",
  description:
    "Monitora i tuoi prodotti preferiti con IA e non perderti più nemmeno un ribasso. Veri sconti su tech, moda e tanto altro.",
  keywords: "sconti, offerte, deals, risparmio, AI, monitoraggio prezzi, carrello intelligente",
  authors: [{ name: "DealCheck" }],
  creator: "DealCheck",
  publisher: "DealCheck",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://dealcheck.app"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "DealCheck – I veri sconti in un attimo",
    description: "Monitora i tuoi prodotti preferiti con IA e non perderti più nemmeno un ribasso.",
    url: "https://dealcheck.app",
    siteName: "DealCheck",
    locale: "it_IT",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "DealCheck – I veri sconti in un attimo",
    description: "Monitora i tuoi prodotti preferiti con IA e non perderti più nemmeno un ribasso.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "DealCheck",
  },
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="it" className={`${inter.variable}`}>
      <head>
        <meta name="theme-color" content="#6366f1" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="DealCheck" />
        <meta name="mobile-web-app-capable" content="yes" />
        <link rel="apple-touch-icon" href="/icon-192x192.png" />
        <style>{`
html {
  font-family: ${inter.style.fontFamily};
  --font-sans: ${inter.variable};
  --font-heading: ${inter.variable};
}
        `}</style>
      </head>
      <body className="font-sans antialiased">{children}</body>
    </html>
  )
}
