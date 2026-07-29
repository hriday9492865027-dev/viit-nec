import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'NEC E-Cell | In association with E-Cell IIT Bombay',
  description: 'Entrepreneurship Cell of NEC College in association with E-Cell IIT Bombay.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`scroll-smooth ${inter.variable}`}>
      <body className="bg-white text-slate-900 antialiased selection:bg-blue-700 selection:text-white font-sans">
        {children}
      </body>
    </html>
  );
}
