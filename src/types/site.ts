export type Site = {
  name: string;
  jobTitle: string;
  email: string;
  website: string;
  about: string[];
  numPostsOnHomepage: number;
  numWorksOnHomepage: number;
};

export type Metadata = {
  title: string;
  description: string;
};

export type Socials = {
  name: string;
  href: string;
  value: string;
}[];
