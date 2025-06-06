import type { Context } from "~/pages/api/[...slugs]";
import type { LastFmRecentTracks, LastFmTopTracks } from "~/types/lastfm";

const USERNAME = "ephons";
const LASTFM_API_ROOT = "https://ws.audioscrobbler.com/2.0/";

const RECENT_TRACKS_ENDPOINT = (c: Context) => {
  return `${LASTFM_API_ROOT}?method=user.getrecenttracks&user=${USERNAME}&api_key=${c.env.LASTFM_API_KEY}&format=json&limit=1`;
};

const TOP_TRACKS_ENDPOINT = (c: Context) => {
  return `${LASTFM_API_ROOT}?method=user.gettoptracks&user=${USERNAME}&api_key=${c.env.LASTFM_API_KEY}&format=json&limit=10&period=1year`;
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

    console.log(latestTrack);
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
  c.header("Cache-Control", "public, s-maxage=60, stale-while-revalidate=30");
  try {
    const response = await fetch(TOP_TRACKS_ENDPOINT(c));

    if (!response.ok) {
      return c.json({ tracks: [], error: `API error: ${response.status}` });
    }

    const data = (await response.json()) as LastFmTopTracks;

    console.log(data);

    const tracks = data.toptracks.track.map((track) => {
      const largeImage = track.image.find(
        (img: { size: string; "#text": string }) => img.size === "large",
      );
      const albumImageUrl = largeImage ? largeImage["#text"] : "";

      return {
        title: track.name,
        artist: track.artist.name,
        albumImage: albumImageUrl,
        songUrl: track.url,
      };
    });

    return c.json({ tracks });
  } catch (error) {
    console.error("Error fetching top tracks:", error);
    return c.json({ tracks: [], error: "Failed to fetch data from Last.fm" });
  }
};
