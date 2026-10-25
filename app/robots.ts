import type { MetadataRoute } from 'next';
export default function robots(): MetadataRoute.Robots {
  const base = (process.env.NEXT_PUBLIC_SITE_URL || 'https://typing-race-game.vercel.app').replace(/\/$/, '');
  return { rules: { userAgent: '*', allow: '/' }, sitemap: `${base}/sitemap.xml`, host: base };
}
