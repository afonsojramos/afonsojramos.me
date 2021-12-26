import { useState } from 'react'
import cn from 'classnames'
import Page from '@components/page'
import Entry from '@components/entry'
import Link from '@components/link'
import Device from '@components/device'

import entryStyles from '../components/entry/entry.module.css'
import commandStyles from '../components/command/command.module.css'
import styles from '../components/page/page.module.css'
import { DialogContent, DialogOverlay } from '@reach/dialog'

// Data
import music from '@data/music.json'
import NowPlaying from '@components/now-playing'

const Music = ({ deviceType }) => {
  const { data: years } = music
  const [modalShow, setModalShow] = useState(false)

  const YearList = () => (
    <div className={cn(styles.sidenav)}>
      <ul>
        {years.map(({ year }) => {
          return (
            <li key={year}>
              <Link href={'#' + year} onClick={() => setModalShow(false)}>
                {year}
              </Link>
            </li>
          )
        })}
      </ul>
    </div>
  )

  return (
    <Page
      title="Music"
      description="Collection of pictures of the most memorable concerts so far."
    >
      <h1>Favorite Albums & Concerts</h1>
      <NowPlaying bigPicture />
      <Device>
        {({ isMobile }) => {
          if (isMobile)
            return (
              <DialogOverlay
                isOpen={modalShow}
                className={cn(commandStyles.screen, {
                  [commandStyles.show]: modalShow
                })}
                onDismiss={() => setModalShow(false)}
              >
                <DialogContent
                  style={{ boxShadow: '0px 10px 50px hsla(0, 0%, 0%, 0.33)' }}
                  aria-label="Year Selector"
                >
                  <YearList />
                </DialogContent>
              </DialogOverlay>
            )
          return <YearList />
        }}
      </Device>
      <article>
        {years.map(({ year, description, concerts, albums }) => {
          return (
            <div key={year} className={styles.musicYear}>
              <h2 id={year} onClick={() => setModalShow(true)}>
                {year}
              </h2>
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
                      key={`${entry.title} - ${entry.artist}`}
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
