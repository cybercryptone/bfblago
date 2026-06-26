import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: 'БФ Благо — Помогаем нуждающимся',
    template: '%s | БФ Благо',
  },
  description: 'Благотворительный фонд «БФ Благо» помогает нуждающимся получить необходимое лечение. Присоединяйтесь к нашей миссии.',
  keywords: ['благотворительный фонд', 'помощь нуждающимся', 'пожертвование', 'лечение'],
  authors: [{ name: 'БФ Благо' }],
  openGraph: {
    type: 'website',
    locale: 'ru_RU',
    url: process.env.NEXT_PUBLIC_BASE_URL,
    siteName: 'БФ Благо',
    title: 'БФ Благо — Помогаем нуждающимся',
    description: 'Благотворительный фонд «БФ Благо» помогает нуждающимся получить необходимое лечение.',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'БФ Благо' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'БФ Благо — Помогаем нуждающимся',
    description: 'Благотворительный фонд «БФ Благо» помогает нуждающимся.',
    images: ['/og-image.jpg'],
  },
  manifest: '/manifest.json',
  icons: {
    icon: '/favicon.ico',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <body className="min-h-screen flex flex-col">
        {children}
      </body>
    </html>
  );
}
