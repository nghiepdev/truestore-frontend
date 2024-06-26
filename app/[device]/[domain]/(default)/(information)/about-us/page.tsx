import type {Metadata} from 'next';

import {Signature} from '@/components/common';
import {getPlatformConfig} from '@common/platform/ssr';

export const metadata: Metadata = {
  title: 'About Us',
};

export default async function AboutPage({params}: PageProps) {
  const domain = params.domain;
  const platform = await getPlatformConfig(domain);

  return (
    <article className="prose lg:prose-lg">
      <h2>About Us</h2>

      <div>
        Dear Valued Customers,
        <p>
          Welcome to <strong>{domain}</strong> that is operated under{' '}
          <strong>{platform.company}</strong> - a company incorporated under{' '}
          <strong>Singapore</strong> law located at:{' '}
          <strong>{platform.address}</strong> and its affiliates provide access
          to the{' '}
          <strong>
            {'"'} {domain}{' '}
          </strong>
          {'"'} to your shopping experience.
        </p>
        <p>
          We&apos;re dedicated to giving you the best and a variety of products
          with the highest quality of products, that are guaranteed to meet
          their needs and keep them satisfied! We have dedicated staff and
          strategic partners who help us research and create the products that
          bring the most value to our customers. We always keep an eye on the
          latest trends for such kinds of our products and continuously improve
          our products and out our customer&apos;s wishes first.
        </p>
        <p>
          Our mission is to bring customers the best experience when using our
          products in both product quality and service quality.
        </p>
        <p>
          The interests of our customers are always the top priority for us, so
          we hope you will enjoy our products as much as we enjoy making them
          available to you.
        </p>
        <p>
          If you have any questions or comments, please do not hesitate to
          contact us through:
        </p>
        <Signature />
        <p>Sincerely,</p>
      </div>
    </article>
  );
}
