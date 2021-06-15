import useSWR from 'swr'
import Link from '@components/link'
import fetcher from '@lib/fetcher'
import { Spotify } from '../icons'
import iconStyles from '../icons/icons.module.css'
import styles from './now-playing.module.css'

export default function NowPlaying({ bigPicture = false }) {
  const { data } = useSWR('/api/now-playing', fetcher)

  return (
    <div>
      {!bigPicture && (
        <span>
          <Spotify className={iconStyles.inline} />{' '}
          <span className={styles.nowPlaying}>
            {data?.isPlaying ? 'Now Playing: ' : 'Music is on Pause'}
          </span>
        </span>
      )}
      {data?.isPlaying ? (
        <span className={bigPicture && styles.nowPlayingData}>
          <Link href={data.track.albumUrl} external>
            <img
              src={data.track.image}
              className={bigPicture ? styles.bigPicture : iconStyles.inline}
            ></img>{' '}
          </Link>
          <span>
            {bigPicture && (
              <span className={styles.nowPlaying}>
                {data?.isPlaying ? 'Now Playing' : 'Music is on Pause'}
                <br />
              </span>
            )}
            <Link underline href={data.track.url} external>
              {data.track.title}
            </Link>
            {bigPicture ? <br /> : ' – '}
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
