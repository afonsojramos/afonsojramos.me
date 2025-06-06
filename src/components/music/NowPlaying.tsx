import { Show, createResource } from "solid-js";
import type { JSX } from "solid-js";

interface NowPlayingData {
  isPlaying: boolean;
  title?: string;
  artist?: string;
  album?: string;
  albumImage?: string;
  songUrl?: string;
  error?: string;
}

export default function NowPlaying(): JSX.Element {
  const fetchNowPlaying = async (): Promise<NowPlayingData> => {
    try {
      const apiUrl = "https://afonsojramos.me/api/now-playing";

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

  return (
    <Show
      when={data()?.isPlaying}
      fallback={
        <Show when={data()}>
          <div class="text-gray-500 dark:text-gray-400 text-sm mt-4 mb-6">
            Not playing anything right now
          </div>
        </Show>
      }
    >
      <div class="flex items-center mt-4 mb-6">
        <Show when={data()?.albumImage}>
          <div class="mr-4 flex-shrink-0">
            <a href={data()?.songUrl} target="_blank" rel="noopener noreferrer">
              <img
                src={data()?.albumImage}
                alt={`${data()?.title} by ${data()?.artist}`}
                class="rounded-md w-24 h-24"
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
            href={data()?.songUrl}
            target="_blank"
            rel="noopener noreferrer"
            class="text-lg font-medium text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 truncate max-w-xs"
          >
            {data()?.title}
          </a>
          <p class="text-gray-600 dark:text-gray-300">{data()?.artist}</p>
          {data()?.album && <p class="text-gray-500 dark:text-gray-400 text-sm">{data()?.album}</p>}
        </div>
      </div>
    </Show>
  );
}
