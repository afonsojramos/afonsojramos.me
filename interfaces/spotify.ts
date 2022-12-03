interface SpotifyArtistInterface {
  external_urls: {
    spotify: string;
  };
  name: string;
}

interface SpotifyTopTracksInterface {
  artists: { name: string }[];
  external_urls: { spotify: string };
  name: string;
}

export type { SpotifyArtistInterface, SpotifyTopTracksInterface };
