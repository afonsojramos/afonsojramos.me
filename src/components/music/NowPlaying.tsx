import { Show, createResource } from "solid-js";
import type { JSX } from "solid-js";
import { cn } from "~/lib/utils";
import type { TopTracksResponse } from "~/types/lastfm";

interface NowPlayingData {
  isPlaying: boolean;
  title?: string;
  artist?: string;
  album?: string;
  albumImage?: string;
  songUrl?: string;
  error?: string;
}

const renderNowPlaying = ({
  isPlaying,
  nowPlaying,
  title,
  artist,
  album,
  albumImage,
  songUrl,
}: NowPlayingData & { nowPlaying: string }) => {
  return (
    <div class="flex items-center mt-4 mb-6">
      <Show when={albumImage}>
        <div class="mr-4 flex-shrink-0">
          <a href={songUrl} target="_blank" rel="noopener noreferrer">
            <img src={albumImage} alt={`${title} by ${artist}`} class="rounded-md w-24 h-24" />
          </a>
        </div>
      </Show>
      <div class="flex flex-col">
        <div class="flex items-center">
          <div
            class={cn(
              "w-2 h-2 rounded-full mr-2 animate-pulse",
              isPlaying ? "bg-green-500" : "bg-red-400",
            )}
          />
          <span class="text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400 text-ellipsis overflow-hidden whitespace-nowrap max-w-40 sm:max-w-none">
            {nowPlaying}
          </span>
        </div>
        <a
          href={songUrl}
          target="_blank"
          rel="noopener noreferrer"
          class="text-lg font-medium text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 truncate max-w-xs"
        >
          {title}
        </a>
        <p class="text-gray-600 dark:text-gray-300">{artist}</p>
        {album && <p class="text-gray-500 dark:text-gray-400 text-sm">{album}</p>}
      </div>
    </div>
  );
};

export default function NowPlaying(props: { topTracks: TopTracksResponse["tracks"] }): JSX.Element {
  const fetchNowPlaying = async (): Promise<NowPlayingData> => {
    try {
      const apiUrl = "http://localhost:4322/api/now-playing";

      const response = await fetch(apiUrl);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data as NowPlayingData;
    } catch (error) {
      console.error("Failed to fetch now playing data:", error);
      return { isPlaying: false, error: "Failed to fetch data" };
    }
  };

  const [data] = createResource<NowPlayingData>(fetchNowPlaying);
  const randomTopTrack = props.topTracks[Math.floor(Math.random() * props.topTracks.length)];

  return (
    <Show
      when={data()?.isPlaying}
      fallback={
        <Show
          when={data()}
          fallback={
            <div class="flex items-center mt-4 mb-6">
              <div class="mr-4 flex-shrink-0">
                <div class="rounded-md w-24 h-24 bg-gray-200 dark:bg-gray-700 animate-pulse" />
              </div>
              <div class="flex flex-col space-y-2">
                <div class="flex items-center">
                  <div class="w-2 h-2 bg-gray-300 dark:bg-gray-600 rounded-full mr-2" />
                  <div class="h-3 w-20 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                </div>
                <div class="h-5 w-32 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                <div class="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                <div class="h-3 w-28 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
              </div>
            </div>
          }
        >
          {renderNowPlaying({
            isPlaying: false,
            nowPlaying: "Not playing anything right now, but if I was it would be:",
            title: randomTopTrack.title,
            artist: randomTopTrack.artist,
            album: `#${randomTopTrack.rank} in the past month`,
            albumImage: randomTopTrack.albumImage,
            songUrl: randomTopTrack.songUrl,
          })}
        </Show>
      }
    >
      {renderNowPlaying({
        isPlaying: data()?.isPlaying ?? false,
        nowPlaying: "Now playing:",
        title: data()?.title,
        artist: data()?.artist,
        album: data()?.album,
        albumImage: data()?.albumImage,
        songUrl: data()?.songUrl,
      })}
    </Show>
  );
}
