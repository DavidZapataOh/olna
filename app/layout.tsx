import type { Metadata, Viewport } from 'next';
import { Figtree, Fraunces } from 'next/font/google';
import './globals.css';

const figtree = Figtree({
  subsets: ['latin'],
  weight: 'variable',
  variable: '--font-figtree',
  display: 'swap',
});

const fraunces = Fraunces({
  subsets: ['latin'],
  weight: 'variable',
  style: ['normal', 'italic'],
  axes: ['SOFT', 'opsz'],
  variable: '--font-fraunces',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://olna.co'),
  title: 'Olna · Invierte en las empresas que usas todos los días',
  description:
    'Olna invierte por ti en las empresas que usas todos los días, desde $5.000 al día y en automático: el S&P 500 o las que elijas. Sin suscripción ni mínimo. Déjanos tu correo y te avisamos cuando abra.',
  alternates: { canonical: '/', languages: { 'es-CO': '/', 'x-default': '/' } },
  icons: {
    icon: [
      { url: '/brand/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon.ico', sizes: 'any' },
    ],
    apple: '/brand/apple-touch-icon.png',
  },
  manifest: '/brand/site.webmanifest',
  openGraph: {
    title: 'Invierte en las empresas que usas todos los días.',
    description: 'Desde $5.000 al día, en automático. Empiezas con 500 de las más grandes de EE. UU. o eliges las tuyas.',
    locale: 'es_CO',
    type: 'website',
    images: [{ url: '/plates/scene.webp', width: 2304, height: 1536, alt: 'Imagen ilustrativa: un mensajero sostiene su teléfono con Olna abierta.' }],
  },
};

export const viewport: Viewport = {
  themeColor: '#123B3F',
};

// Pone html[data-motion] antes del primer pintado (LANDING_OLNA.md §4.1).
const motionScript = `(function(){var m=window.matchMedia('(prefers-reduced-motion: reduce)');var s=function(){document.documentElement.dataset.motion=m.matches?'reduced':'full'};document.documentElement.classList.add('js');s();m.addEventListener&&m.addEventListener('change',s);})();`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es-CO" className={`${figtree.variable} ${fraunces.variable}`} data-motion="full" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: motionScript }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
