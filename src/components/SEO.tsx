import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article';
  publishedTime?: string;
  author?: string;
  noIndex?: boolean;
}

const SEO = ({
  title = 'WorkWhirl | Executive Staffing & Talent Solutions',
  description = 'Premium executive staffing and talent acquisition solutions. We connect top-tier professionals with leading organizations across all industries.',
  keywords = 'executive staffing, talent acquisition, recruitment, headhunting, HR consulting, contract staffing, permanent placement',
  image = '/og-image.png',
  url = 'https://workwhirl.com',
  type = 'website',
  publishedTime,
  author = 'WorkWhirl',
  noIndex = false,
}: SEOProps) => {
  const fullTitle = title.includes('WorkWhirl') ? title : `${title} | WorkWhirl`;
  
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': type === 'article' ? 'Article' : 'Organization',
    name: 'WorkWhirl',
    url: url,
    logo: `${url}/logo.png`,
    description: description,
    ...(type === 'article' && {
      headline: title,
      datePublished: publishedTime,
      author: {
        '@type': 'Person',
        name: author,
      },
      publisher: {
        '@type': 'Organization',
        name: 'WorkWhirl',
        logo: {
          '@type': 'ImageObject',
          url: `${url}/logo.png`,
        },
      },
    }),
    ...(type === 'website' && {
      sameAs: [
        'https://linkedin.com/company/workwhirl',
        'https://twitter.com/workwhirl',
      ],
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'House No. 95B Second Floor, Sector 18A Dwarka',
        addressLocality: 'New Delhi',
        postalCode: '110078',
        addressCountry: 'IN',
      },
      contactPoint: [
        {
          '@type': 'ContactPoint',
          telephone: '+918006996317',
          contactType: 'customer service',
          email: 'contact@workwhirl.com',
          availableLanguage: ['English', 'Hindi'],
          areaServed: 'IN',
        },
        {
          '@type': 'ContactPoint',
          telephone: '+917982234448',
          contactType: 'customer support',
          email: 'contact@workwhirl.com',
          availableLanguage: ['English', 'Hindi'],
          areaServed: 'IN',
        },
      ],
    }),
  };

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="title" content={fullTitle} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content={author} />
      <link rel="canonical" href={url} />
      
      {noIndex && <meta name="robots" content="noindex, nofollow" />}

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content="WorkWhirl" />
      
      {publishedTime && (
        <meta property="article:published_time" content={publishedTime} />
      )}

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={url} />
      <meta property="twitter:title" content={fullTitle} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={image} />

      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
    </Helmet>
  );
};

export default SEO;
