import { BlocksRenderer } from '@strapi/blocks-react-renderer';
import React from 'react';

import { BlogLayout } from '@/components/blog-layout';
import fetchContentType from '@/lib/strapi/fetchContentType';

export default async function SingleArticlePage(props: {
  params: Promise<{ slug: string }>;
}) {
  const params = await props.params;
  const article = await fetchContentType(
    'articles',
    {
      filters: {
        slug: params.slug,
      },
    },
    true
  );

  if (!article) {
    return <div>Blog not found</div>;
  }

  return (
    <BlogLayout article={article}>
      <BlocksRenderer content={article.content} />
    </BlogLayout>
  );
}
