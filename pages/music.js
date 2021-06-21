import Page from '@components/page'
import Entry from '@components/entry'
import entryStyles from '../components/entry/entry.module.css'

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
      <article>
        {years.map(({ year, concerts, albums }) => {
          return (
            <div key={year}>
              <h2 id={year}>{year}</h2>
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
