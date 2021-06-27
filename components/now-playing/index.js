import useSWR from 'swr'
import Link from '@components/link'
import fetcher from '@lib/fetcher'

import { Spotify } from '../icons'
import iconStyles from '../icons/icons.module.css'
import styles from './now-playing.module.css'

export default function NowPlaying({ bigPicture = false }) {
  const { data } = useSWR('/api/now-playing', fetcher)

  return (
    <div className={bigPicture ? styles.bigPicture : styles.nowPlaying}>
      <span>
        <Link
          href={'https://open.spotify.com/user/1167513964?si=59c88013d20a4da9'}
          external
        >
          <Spotify className={iconStyles.inline} />
        </Link>
        {!bigPicture &&
          (data?.isPlaying ? <b> Now Playing: </b> : <b> Music on Pause </b>)}
      </span>
      {data && data.isPlaying && (
        <span className={styles.show}>
          <Link href={data.track.albumUrl} external>
            <img
              src={data.track.image}
              className={
                bigPicture ? styles.bigPictureImage : iconStyles.inline
              }
            ></img>{' '}
          </Link>
          <span>
            <Link underline href={data.track.url} external>
              {data.track.title}
            </Link>

            {bigPicture ? <br /> : ' – '}
            {data.artists.map((artist, index) => {
              return (
                <>
                  <Link key={artist.name} underline href={artist.url} external>
                    {artist.name}
                  </Link>
                  {index < data.artists.length - 1 ? ', ' : ''}
                </>
              )
            })}
          </span>
        </span>
      )}
    </div>
  )
}
