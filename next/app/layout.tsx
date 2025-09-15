import type { Metadata, Viewport } from 'next';
import { ViewTransitions } from 'next-view-transitions';
import { Inter } from 'next/font/google';

import './globals.css';

import { SlugProvider } from './context/SlugContext';
import { Footer } from '@/components/footer';
import { Navbar } from '@/components/navbar';
import { CartProvider } from '@/context/cart-context';
import { generateMetadataObject } from '@/lib/shared/metadata';
import fetchContentType from '@/lib/strapi/fetchContentType';
import { cn } from '@/lib/utils';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500', '600', '700', '800', '900'],
});

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#06b6d4' },
    { media: '(prefers-color-scheme: dark)', color: '#06b6d4' },
  ],
};

// Default Global SEO for pages without them
export async function generateMetadata(): Promise<Metadata> {
  const pageData = await fetchContentType(
    'global',
    {
      populate: 'seo.metaImage',
    },
    true
  );

  const seo = pageData?.seo;
  const metadata = generateMetadataObject(seo);
  return metadata;
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pageData = await fetchContentType('global', {}, true);

  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <SlugProvider>
          <ViewTransitions>
            <CartProvider>
              <div
                className={cn(
                  inter.className,
                  'bg-charcoal antialiased h-full w-full'
                )}
              >
                <Navbar data={pageData.navbar} />
                {children}
                <Footer data={pageData.footer} />
              </div>
            </CartProvider>
          </ViewTransitions>
        </SlugProvider>
      </body>
    </html>
  );
}
