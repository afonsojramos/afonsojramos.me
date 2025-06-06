export type LastFmNowPlaying = {
  name: string;
  artist: {
    "#text": string;
    mbid?: string;
  };
  url: string;
  image: { size: string; "#text": string }[];
  album: {
    "#text": string;
    mbid?: string;
  };
  date: {
    uts: string;
    "#text": string;
  };
  "@attr"?: {
    nowplaying: "true" | string;
  };
};

export type LastFmTopTrack = {
  mbid: string;
  name: string;
  image: { size: string; "#text": string }[];
  artist: { url: string; name: string; mbid: string };
  url: string;
  duration: string;
  "@attr": { rank: string };
  playcount: string;
};

export type LastFmRecentTracks = {
  recenttracks: {
    track: LastFmNowPlaying[];
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
    track: LastFmTopTrack[];
    "@attr": {
      user: string;
      totalPages: string;
      page: string;
      perPage: string;
      total: string;
    };
  };
};

export type TopTracksResponse = {
  tracks: {
    title: string;
    artist: string;
    albumImage: string;
    songUrl: string;
    rank: string;
  }[];
};

export type NowPlayingResponse = {
  isPlaying: boolean;
  title?: string;
  artist?: string;
  album?: string;
  albumImage?: string;
  songUrl?: string;
  error?: string;
};
