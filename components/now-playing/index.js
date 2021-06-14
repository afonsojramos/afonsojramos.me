import useSWR from 'swr'
import Link from '@components/link'
import fetcher from '@lib/fetcher'
import { Spotify } from '../icons'
import iconStyles from '../icons/icons.module.css'
import styles from './now-playing.module.css'

export default function NowPlaying() {
  const { data } = useSWR('/api/now-playing', fetcher)

  return (
    <div>
      <Spotify className={iconStyles.inline} />{' '}
      <span className={styles.nowPlaying}>
        {data?.isPlaying ? 'Now' : 'Not Currently'} Playing
      </span>
      {data?.isPlaying ? (
        <span>
          {': '}
          <Link href={data.track.albumUrl} external>
            <img src={data.track.image} className={iconStyles.inline}></img>{' '}
          </Link>
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
        </span>
      ) : (
        <p></p>
      )}
    </div>
  )
}
