import { clsx } from 'clsx';
import type { Metadata, Viewport } from 'next';
import { Poppins } from 'next/font/google';
import type { ReactNode } from 'react';
import './globals.css';

export const metadata: Metadata = {
  title: 'weasq BPT dashboard',
  description: 'Internal dashboard for weasQ BPT workflows.',
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      'index': false,
      'follow': false,
      'noimageindex': true,
      'max-video-preview': -1,
      'max-image-preview': 'none',
      'max-snippet': -1,
    },
  },
  manifest: '/favicons/site.webmanifest',
  icons: {
    icon: [
      { url: '/favicons/favicon.ico' },
      { url: '/favicons/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicons/favicon-96x96.png', sizes: '96x96', type: 'image/png' },
    ],
    apple: [{ url: '/favicons/apple-touch-icon.png', sizes: '180x180' }],
  },
};

export const viewport: Viewport = {
  initialScale: 1,
  minimumScale: 1,
  width: 'device-width',
};

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '600'],
  display: 'swap',
  variable: '--font-poppins',
});

const RootLayout = ({ children }: Readonly<{ children: ReactNode }>): ReactNode => {
  return (
    <html lang="en">
      <body
        className={clsx(
          poppins.variable,
          'min-h-screen',
          'bg-slate-950',
          'text-slate-100',
          'antialiased',
        )}
      >
        {children}
      </body>
    </html>
  );
};

export default RootLayout;
