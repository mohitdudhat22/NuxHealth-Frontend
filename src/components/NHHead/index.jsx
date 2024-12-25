import { Helmet } from "react-helmet";

export const NHHead = ({
  title,
  description,
  keywords,
  ogTitle,
  ogDescription,
  ogImage,
  ogUrl = "",
  twitterCard,
  twitterTitle,
  twitterDescription,
  twitterImage,
}) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />

      {/* Open Graph tags for social media sharing */}
      <meta property="og:title" content={ogTitle || title} />
      <meta property="og:description" content={ogDescription || description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:url" content={ogUrl} />
      <meta property="og:type" content="website" />

      {/* Twitter Card tags */}
      <meta
        name="twitter:card"
        content={twitterCard || "summary_large_image"}
      />
      <meta name="twitter:title" content={twitterTitle || ogTitle || title} />
      <meta
        name="twitter:description"
        content={twitterDescription || ogDescription || description}
      />
      <meta name="twitter:image" content={twitterImage || ogImage} />

      {/* Canonical URL to avoid duplicate content issues */}
      <link rel="canonical" href={ogUrl} />

      {/* Responsive design meta tag */}
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />

      {/* Additional useful meta tags */}
      <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
      <meta name="robots" content="index, follow" />
    </Helmet>
  );
};
