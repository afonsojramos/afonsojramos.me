interface NotPlayingInterface {
  isPlaying: false
}

interface NowPlayingInterface {
  isPlaying: true
  track: TrackInterface
  artists: ArtistInterface[]
}

interface TrackInterface {
  title: string
  album: string
  albumUrl: string
  image: string
  url: string
}

interface ArtistInterface {
  name: string
  url: string
}

export type {
  NotPlayingInterface,
  NowPlayingInterface,
  TrackInterface,
  ArtistInterface
}
