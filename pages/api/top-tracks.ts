import { getTopTracks } from '@lib/spotify'
import { NextApiRequest, NextApiResponse } from 'next'
import { SpotifyTopTracksInterface } from './interfaces/spotify.interface'
import { TopTracksInterface } from './interfaces/top-tracks.interface'

export default async function handler(
  _req: NextApiRequest,
  res: NextApiResponse<TopTracksInterface>
) {
  const response = await getTopTracks()
  const { items } = await response.json()

  const tracks = items.slice(0, 10).map((track: SpotifyTopTracksInterface) => ({
    artist: track.artists.map((_artist) => _artist.name).join(', '),
    songUrl: track.external_urls.spotify,
    title: track.name
  }))

  res.setHeader(
    'Cache-Control',
    'public, s-maxage=86400, stale-while-revalidate=43200'
  )

  return res.status(200).json({ tracks })
}
