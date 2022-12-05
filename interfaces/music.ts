interface IYear {
  year: string;
  concerts: IConcert[];
  albums: IAlbum[];
  description?: string;
}

interface IConcert {
  title: string;
  festival: string;
  image: string;
}

interface IAlbum {
  title: string;
  artist: string;
  image: string;
  url: string;
}

export type { IYear, IConcert, IAlbum };
