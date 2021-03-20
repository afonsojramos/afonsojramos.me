import React from 'react';
import { Helmet } from 'react-helmet';
import { GetSiteMetadata } from '../hooks/site-metadata';

const SEO = () => {
  const { siteTitle, basePath, siteKeywords, siteTitleAlt, siteUrl, siteDescription, siteLanguage, siteImage, author } = GetSiteMetadata();

  const url = `${siteUrl}${basePath || ``}`;
  const image = `${siteUrl}${siteImage}`;

  return (
    <Helmet title={siteTitle} defaultTitle={siteTitle} titleTemplate={`%s | ${siteTitleAlt}`}>
      <html lang={siteLanguage} />
      <meta name="description" content={siteDescription} />
      <meta name="keywords" content={siteKeywords} />
      <meta name="image" content={image} />
      <meta property="og:title" content={siteTitle} />
      <meta property="og:url" content={url} />
      <meta property="og:description" content={siteDescription} />
      <meta property="og:image" content={image} />
      <meta property="og:type" content="website" />
      <meta property="og:image:alt" content={siteDescription} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={siteTitle} />
      <meta name="twitter:url" content={url} />
      <meta name="twitter:description" content={siteDescription} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:image:alt" content={siteDescription} />
      <meta name="twitter:creator" content={author} />

      <meta name="theme-color" content="#ffffff" />
    </Helmet>
  );
};

export default SEO;
