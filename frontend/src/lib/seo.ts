import { APP_NAME, APP_URL } from './constants';

interface SeoProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article' | 'product';
}

export function buildSeo({
  title,
  description = 'BKP — Premium handcrafted furniture for discerning homes. Explore luxury sofas, beds, dining sets and custom furniture from Hyderabad.',
  image = '/og-default.jpg',
  url = APP_URL,
  type = 'website',
}: SeoProps = {}) {
  const fullTitle = title ? `${title} | ${APP_NAME}` : `${APP_NAME} — Crafted for Discerning Homes`;
  const fullImage = image.startsWith('http') ? image : `${APP_URL}${image}`;

  return {
    title: fullTitle,
    description,
    openGraph: {
      title: fullTitle,
      description,
      url,
      type,
      images: [{ url: fullImage, width: 1200, height: 630, alt: fullTitle }],
      siteName: APP_NAME,
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [fullImage],
    },
  };
}
