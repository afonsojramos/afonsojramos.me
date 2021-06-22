import Page from '@components/page'
import Entry from '@components/entry'
import Link from '@components/link'
import entryStyles from '../components/entry/entry.module.css'
import styles from '../components/page/page.module.css'

// Data
import music from '@data/music.json'
import NowPlaying from '@components/now-playing'

const Music = () => {
  const { data: years } = music
  return (
    <Page
      title="Music"
      description="Collection of pictures of the most memorable concerts so far."
    >
      <h1>Favorite Albums & Concerts</h1>
      <NowPlaying bigPicture />
      <div className={styles.sidenav}>
        <ul>
          {years.map(({ year }) => {
            return (
              <li>
                <Link key={year} href={'#' + year}>
                  {year}
                </Link>
              </li>
            )
          })}
        </ul>
      </div>
      <article>
        {years.map(({ year, description, concerts, albums }) => {
          return (
            <div key={year} className={styles.musicYear}>
              <h2 id={year}>{year}</h2>
              <h3>{description}</h3>
              <div>
                {concerts.map((entry) => {
                  return (
                    <Entry
                      key={entry.title}
                      title={entry.title}
                      image={entry.image}
                      description={entry.festival}
                    />
                  )
                })}
              </div>
              <div className={entryStyles.grid}>
                {albums.map((entry) => {
                  return (
                    <Entry
                      key={entry.title}
                      title={entry.title}
                      image={entry.image}
                      href={entry.url}
                      description={entry.artist}
                    />
                  )
                })}
              </div>
            </div>
          )
        })}
      </article>
    </Page>
  )
}

export default Music
