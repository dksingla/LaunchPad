import { Metadata } from 'next';

import PageContent from '@/lib/shared/PageContent';
import { generateMetadataObject } from '@/lib/shared/metadata';
import fetchContentType from '@/lib/strapi/fetchContentType';

export async function generateMetadata(): Promise<Metadata> {
  const pageData = await fetchContentType(
    'pages',
    {
      filters: {
        slug: 'homepage',
      },
      populate: 'seo.metaImage',
    },
    true
  );

  const seo = pageData?.seo;
  const metadata = generateMetadataObject(seo);
  return metadata;
}

export default async function HomePage() {
  const pageData = await fetchContentType(
    'pages',
    {
      filters: {
        slug: 'homepage',
      },
    },
    true
  );

  return <PageContent pageData={pageData} />;
}
