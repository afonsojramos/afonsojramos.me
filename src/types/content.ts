export type Talk = {
  title: string;
  description: string;
  conference: string;
  date: string;
  link: string;
};

export type Country = {
  visited: string[];
  lived: string[];
  next: string[];
};

export type Concert = {
  title: string;
  festival: string;
  image: string;
};

export type Album = {
  title: string;
  artist: string;
  image: string;
  url: string;
};

export type Year = {
  year: string;
  concerts?: Concert[];
  albums: Album[];
  description?: string;
};
