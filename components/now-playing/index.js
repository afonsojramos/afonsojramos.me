import useSWR from 'swr'
import Link from '@components/link'
import fetcher from '@lib/fetcher'
import { Spotify } from '../icons'
import iconStyles from '../icons/icons.module.css'

export default function NowPlaying() {
  const { data } = useSWR('/api/now-playing', fetcher)

  return data?.isPlaying ? (
    <div>
      <img src={data.track.image} className={iconStyles.inline}></img>
      {'   '}
      <span>
        <Link underline href={data.track.url} external>
          {data.track.title}
        </Link>
        {' – '}
        <span>
          {data?.artists.map((artist, index) => {
            return (
              <span key={artist.name}>
                <Link underline href={artist.url} external>
                  {artist.name}
                </Link>
                {index < data?.artists.length - 1 ? ', ' : ''}
              </span>
            )
          })}
        </span>
      </span>
    </div>
  ) : (
    <div>
      <Spotify className={iconStyles.inline} />
      <span>Not Playing</span>
      {' – '}
      'Spotify'
    </div>
  )
}
