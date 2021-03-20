import { graphql, useStaticQuery } from 'gatsby';
import { MetadataProps } from './metadata-props';

export const GetSiteConfig = () => {
  return useStaticQuery<MetadataProps>(graphql`
    query {
      site {
        siteMetadata {
          siteConfig {
            name
            location
            email
            github
            socialMedia {
              identifier
              url
            }
            navLinks {
              section
              url
            }
          }
        }
      }
    }
  `).site.siteMetadata.siteConfig;
};
