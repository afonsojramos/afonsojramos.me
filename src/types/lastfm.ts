export type LastFmArtist = {
  name: string;
  url: string;
  mbid?: string;
};

export type LastFmTrack = {
  name: string;
  artist: LastFmArtist;
  url: string;
  image: { size: string; "#text": string }[];
  album?: {
    "#text": string;
    mbid?: string;
  };
  date?: {
    uts: string;
    "#text": string;
  };
  "@attr"?: {
    nowplaying: "true" | string;
  };
};

export type LastFmRecentTracks = {
  recenttracks: {
    track: LastFmTrack[];
    "@attr": {
      user: string;
      totalPages: string;
      page: string;
      perPage: string;
      total: string;
    };
  };
};

export type LastFmTopTracks = {
  toptracks: {
    track: LastFmTrack[];
    "@attr": {
      user: string;
      totalPages: string;
      page: string;
      perPage: string;
      total: string;
    };
  };
};
