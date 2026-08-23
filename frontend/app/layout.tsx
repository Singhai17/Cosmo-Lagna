import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'COSMO LAGNA • Sidereal Ephemeris & Vedic Intelligence',
  description: 'Precision Sidereal Ephemeris, Vedic Numerology, 3D Planetary Orbits & Canonical Parashari Jyotish',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700;800&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="bg-obsidian-950 text-slate-100 antialiased selection:bg-vedic-gold selection:text-obsidian-950">
        {children}
      </body>
    </html>
  );
}
