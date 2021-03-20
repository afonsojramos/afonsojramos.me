export interface MetadataProps {
  site: {
    siteMetadata: {
      author: string;
      basePath: string;
      siteDescription: string;
      siteHeadline: string;
      siteImage: string;
      siteKeywords: string;
      siteLanguage: string;
      siteTitle: string;
      siteTitleAlt: string;
      siteUrl: string;
      [key: string]: unknown;
      siteConfig: {
        name: string;
        location: string;
        email: string;
        github: string;
        socialMedia: {
          identifier: string;
          url: string;
        }[];
        navLinks: {
          section: string;
          url: string;
        }[];
      };
    };
  };
}
