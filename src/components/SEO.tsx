// src/components/SEO.tsx
import Head from "next/head";
import { useRouter } from "next/router";

interface SEOProps {
  title?: string;
  description?: string;
  imageUrl?: string;
  url?: string; // Optional override
}

const SEO: React.FC<SEOProps> = ({
  title = "Support SF Schools - Explore local volunteer and donation opportunities",
  description = "A website to explore local schools and their available donation and volunteer opportunities.",
  imageUrl = "https://supportsfschools.org/SocialPreview.png",
  url, // Optional override
}) => {
  const router = useRouter();

  // Generate full URL for the current page
  const baseUrl = "https://www.supportsfschools.org";
  const canonicalUrl = url || `${baseUrl}${router.asPath}`;

  return (
    <Head>
      {/* Basic metadata */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonicalUrl} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={imageUrl} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta property="twitter:domain" content="supportsfschools.org" />
      <meta property="twitter:url" content={canonicalUrl} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />
    </Head>
  );
};

export default SEO;
