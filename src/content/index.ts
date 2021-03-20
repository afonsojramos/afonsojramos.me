export interface IJob {
  date: string;
  title: string;
  company?: string;
  link?: string;
  bullets: string[];
}

export interface IProject {
  title: string;
  description: string;
  github?: string;
  keywords: string[];
}

export interface IEducation {
  date: string;
  degree: string;
  school: string;
  web: string;
  details: string;
  link?: string;
}

export interface ILanguage {
  languages: string;
  icon: string;
  level: string;
}

export interface IContentStructure {
  data: {
    hero: {
      edges: {
        node: {
          frontmatter: {
            title: string;
            subtitle: string;
            slogan: string;
          };
          html: string;
        };
      }[];
    };
    about: {
      edges: {
        node: {
          frontmatter: {
            title: string;
            education: IEducation[];
            languages: ILanguage[];
          };
          html: string;
        };
      }[];
    };
    experience: {
      edges: {
        node: {
          frontmatter: {
            title: string;
            jobs: IJob[];
          };
          html: string;
        };
      }[];
    };
    extra: {
      edges: {
        node: {
          frontmatter: {
            title: string;
            jobs: IJob[];
          };
          html: string;
        };
      }[];
    };
    portfolio: {
      edges: {
        node: {
          frontmatter: {
            title: string;
            projects: IProject[];
          };
          html: string;
        };
      }[];
    };
  };
}
