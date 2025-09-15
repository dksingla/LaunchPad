import { IconShoppingCartUp } from '@tabler/icons-react';
import { Metadata } from 'next';

import { Container } from '@/components/container';
import { AmbientColor } from '@/components/decorations/ambient-color';
import { FeatureIconContainer } from '@/components/dynamic-zone/features/feature-icon-container';
import { Heading } from '@/components/elements/heading';
import { Subheading } from '@/components/elements/subheading';
import { Featured } from '@/components/products/featured';
import { ProductItems } from '@/components/products/product-items';
import { generateMetadataObject } from '@/lib/shared/metadata';
import fetchContentType from '@/lib/strapi/fetchContentType';

export async function generateMetadata(): Promise<Metadata> {
  const pageData = await fetchContentType('product-page', {}, true);

  const seo = pageData?.seo;
  const metadata = generateMetadataObject(seo);
  return metadata;
}

export default async function Products() {
  // Fetch the product-page and products data
  const productPage = await fetchContentType('product-page', {}, true);
  const products = await fetchContentType('products');
  const featured = products?.data.filter(
    (product: { featured: boolean }) => product.featured
  );

  return (
    <div className="relative overflow-hidden w-full">
      <AmbientColor />
      <Container className="pt-40 pb-40">
        <FeatureIconContainer className="flex justify-center items-center overflow-hidden">
          <IconShoppingCartUp className="h-6 w-6 text-white" />
        </FeatureIconContainer>
        <Heading as="h1" className="pt-4">
          {productPage.heading}
        </Heading>
        <Subheading className="max-w-3xl mx-auto">
          {productPage.sub_heading}
        </Subheading>
        <Featured products={featured} />
        <ProductItems products={products?.data} />
      </Container>
    </div>
  );
}
