import type { Metadata, Viewport } from 'next';
import Link from 'next/link';
import './globals.css';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://typing-race-game.vercel.app';
export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: 'Typing Race — Free Typing Speed Test Game', template: '%s | Typing Race' },
  description: 'Test your typing speed for free in a fun racing game. Improve your words per minute (WPM), accuracy, and typing skills with instant results.',
  applicationName: 'Typing Race',
  keywords: ['typing test', 'typing speed test', 'racing typing game', 'free typing practice', 'WPM test'],
  alternates: { canonical: '/' },
  openGraph: { type: 'website', url: '/', siteName: 'Typing Race', title: 'Typing Race — Free Typing Speed Test Game', description: 'Race with every word. Test your typing speed and accuracy for free.' },
  robots: { index: true, follow: true },
};
export const viewport: Viewport = { width: 'device-width', initialScale: 1, themeColor: '#10151c' };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const jsonLd = { '@context': 'https://schema.org', '@type': 'WebApplication', name: 'Typing Race', applicationCategory: 'EducationalApplication', operatingSystem: 'Any', description: 'A free browser-based typing speed test and racing game that measures words per minute and accuracy.', offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' }, url: siteUrl };
  return <html lang="en"><body><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }} /><header className="site-header"><Link href="/" className="brand"><span className="brand-icon">⌁</span> typing<span className="brand-accent">race</span></Link><nav><Link href="/typing-test">Typing test</Link><Link href="/typing-practice">Practice guide</Link></nav></header>{children}<footer className="footer"><span>© {new Date().getFullYear()} Typing Race</span><span>Practice a little. Improve every day.</span></footer></body></html>;
}
