import { getNowPlaying } from '@lib/spotify'

export default async function handler(_, res) {
  const response = await getNowPlaying()

  if (response.status === 204 || response.status > 400) {
    return res.status(200).json({ isPlaying: false })
  }

  const song = await response.json()

  if (song.item === null) {
    return res.status(200).json({ isPlaying: false })
  }

  const isPlaying = song.is_playing
  const track = {
    title: song.item.name,
    album: song.item.album.name,
    albumUrl: song.item.album.external_urls.spotify,
    image: song.item.album.images[0].url,
    url: song.item.external_urls.spotify
  }
  const artists = song.item.artists.map((_artist) => {
    return {
      name: _artist.name,
      url: _artist.external_urls.spotify
    }
  })

  res.setHeader(
    'Cache-Control',
    'public, s-maxage=60, stale-while-revalidate=30'
  )

  return res.status(200).json({
    artists,
    track,
    isPlaying
  })
}
