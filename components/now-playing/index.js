import useSWR from 'swr'
import Link from '@components/link'
import fetcher from '@lib/fetcher'
import Lottie from 'react-lottie-player'
import { replaceColor } from 'lottie-colorify'
import { useTheme } from 'next-themes'

import { Spotify } from '../icons'
import iconStyles from '../icons/icons.module.css'
import styles from './now-playing.module.css'
import lottiePlay from '@components/icons/lottie/play.json'

export default function NowPlaying({ bigPicture = false }) {
  const { data } = useSWR('/api/now-playing', fetcher)
  const { theme } = useTheme()

  return (
    <div className={bigPicture ? styles.bigPicture : styles.nowPlaying}>
      <span className={styles.nowPlaying}>
        <Link
          href={'https://open.spotify.com/user/1167513964?si=59c88013d20a4da9'}
        >
          <Spotify className={iconStyles.inline} />
          <Lottie
            animationData={
              theme === 'dark'
                ? replaceColor('#000000', '#ffffff', lottiePlay)
                : lottiePlay
            }
            loop={false}
            style={{
              width: 39,
              height: 39,
              alignSelf: 'center',
            }}
            segments={!data?.isPlaying ? [0, 100] : [100, 190]}
            speed={0.7}
            play
            className={data ? styles.show : styles.noShow}
          />
        </Link>
      </span>
      {data && data.track && (
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
