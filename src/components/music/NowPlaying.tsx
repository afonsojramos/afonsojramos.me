import { Show, createResource } from "solid-js";
import type { JSX } from "solid-js";
import { cn } from "~/lib/utils";

interface NowPlayingData {
  isPlaying: boolean;
  title?: string;
  artist?: string;
  album?: string;
  albumImage?: string;
  songUrl?: string;
  error?: string;
}

interface NowPlayingProps {
  bigPicture?: boolean;
}

export default function NowPlaying(props: NowPlayingProps): JSX.Element {
  const fetchNowPlaying = async (): Promise<NowPlayingData> => {
    try {
      const response = await fetch(`${import.meta.env.SITE}/api/now-playing`);
      const data = await response.json();
      return data as NowPlayingData;
    } catch (error) {
      console.error("Failed to fetch now playing data:", error);
      return { isPlaying: false, error: "Failed to fetch data" };
    }
  };

  const [data] = createResource<NowPlayingData>(fetchNowPlaying);

  const { isPlaying, title, artist, album, albumImage, songUrl } = data() || {};

  return (
    <div class={`now-playing ${props.bigPicture ? "big-picture" : ""}`}>
      <Show
        when={isPlaying}
        fallback={
          <div class="text-gray-500 dark:text-gray-400 text-sm mt-4 mb-6">
            Not playing anything right now
          </div>
        }
      >
        <div class="flex items-center mt-4 mb-6">
          <Show when={albumImage}>
            <div class="mr-4 flex-shrink-0">
              <a href={songUrl} target="_blank" rel="noopener noreferrer">
                <img
                  src={albumImage}
                  alt={`${title} by ${artist}`}
                  class={cn("rounded-md", props.bigPicture ? "w-24 h-24" : "w-16 h-16")}
                />
              </a>
            </div>
          </Show>
          <div class="flex flex-col">
            <div class="flex items-center">
              <div class="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse" />
              <span class="text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400">
                Now Playing
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
      </Show>
    </div>
  );
}
