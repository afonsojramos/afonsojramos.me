import { graphql, useStaticQuery } from 'gatsby';
import { MetadataProps } from './metadata-props';

export const GetSiteMetadata = () => {
  return useStaticQuery<MetadataProps>(graphql`
    query {
      site {
        siteMetadata {
          author
          basePath
          siteDescription
          siteHeadline
          siteImage
          siteKeywords
          siteLanguage
          siteTitle
          siteTitleAlt
          siteUrl
        }
      }
    }
  `).site.siteMetadata;
};
