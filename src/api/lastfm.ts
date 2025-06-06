import type { Context } from "~/pages/api/[...slugs]";
import type { LastFmRecentTracks, LastFmTopTracks } from "~/types/lastfm";

const USERNAME = "ephons";
const LASTFM_API_ROOT = "https://ws.audioscrobbler.com/2.0/";
const ITUNES_API_ROOT = "https://itunes.apple.com/search";

const RECENT_TRACKS_ENDPOINT = (c: Context) => {
  return `${LASTFM_API_ROOT}?method=user.getrecenttracks&user=${USERNAME}&api_key=${c.env.LASTFM_API_KEY}&format=json&limit=1`;
};

const TOP_TRACKS_ENDPOINT = (c: Context) => {
  return `${LASTFM_API_ROOT}?method=user.gettoptracks&user=${USERNAME}&api_key=${c.env.LASTFM_API_KEY}&format=json&limit=30&period=1month`;
};

const getAlbumArtwork = async (artist: string, track: string, album?: string): Promise<string> => {
  try {
    // Try searching by artist and track first
    const searchTerm = album ? `${artist} ${album}` : `${artist} ${track}`;
    const response = await fetch(
      `${ITUNES_API_ROOT}?term=${encodeURIComponent(searchTerm)}&media=music&entity=song&limit=1`,
    );

    if (!response.ok) {
      return "";
    }

    const data = await response.json();

    if (data.results && data.results.length > 0) {
      const artwork = data.results[0].artworkUrl100;
      // Get higher resolution version (600x600)
      return artwork ? artwork.replace("100x100", "600x600") : "";
    }

    return "";
  } catch (error) {
    console.error("Error fetching album artwork:", error);
    return "";
  }
};

export const getNowPlaying = async (c: Context) => {
  c.header("Cache-Control", "public, max-age=60, stale-while-revalidate=30");
  try {
    const response = await fetch(RECENT_TRACKS_ENDPOINT(c));

    if (!response.ok) {
      return c.json({ isPlaying: false, error: `API error: ${response.status}` });
    }

    const data = (await response.json()) as LastFmRecentTracks;
    const tracks = data.recenttracks.track;

    if (tracks.length === 0) {
      return c.json({ isPlaying: false });
    }

    const latestTrack = tracks[0];

    const isPlaying = latestTrack["@attr"]?.nowplaying === "true";

    const largeImage = latestTrack.image.find(
      (img: { size: string; "#text": string }) => img.size === "large",
    );
    const albumImageUrl = largeImage ? largeImage["#text"] : "";

    return c.json({
      isPlaying,
      title: latestTrack.name,
      artist: latestTrack.artist["#text"],
      album: latestTrack.album?.["#text"] || "",
      albumImage: albumImageUrl,
      songUrl: latestTrack.url,
    });
  } catch (error) {
    console.error("Error fetching now playing:", error);
    return c.json({ isPlaying: false, error: "Failed to fetch data from Last.fm" });
  }
};

export const getTopTracks = async (c: Context) => {
  c.header("Cache-Control", "public, max-age=604800, stale-while-revalidate=604800");
  try {
    const response = await fetch(TOP_TRACKS_ENDPOINT(c));

    if (!response.ok) {
      return c.json({ tracks: [], error: `API error: ${response.status}` });
    }

    const data = (await response.json()) as LastFmTopTracks;

    const tracks = await Promise.all(
      data.toptracks.track.map(async (track) => {
        // Fetch album artwork from iTunes instead of using Last.fm images
        const albumImageUrl = await getAlbumArtwork(track.artist.name, track.name);

        return {
          title: track.name,
          artist: track.artist.name,
          albumImage: albumImageUrl,
          songUrl: track.url,
          rank: track["@attr"].rank,
        };
      }),
    );

    return c.json({ tracks });
  } catch (error) {
    console.error("Error fetching top tracks:", error);
    return c.json({ tracks: [], error: "Failed to fetch data from Last.fm" });
  }
};
