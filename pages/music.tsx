import { useState } from 'react';
import cn from 'classnames';
import Page from '@components/page';
import Entry from '@components/entry';
import Link from '@components/link';

import entryStyles from '../components/entry/entry.module.css';
import commandStyles from '../components/command/command.module.scss';
import styles from '../components/page/page.module.css';

// Data
import music from '@data/music.json';
import NowPlaying from '@components/now-playing';
import * as Popover from '@radix-ui/react-popover';
import { isMobile, MobileView } from 'react-device-detect';

const Music = () => {
  const { data: years } = music;
  const [modalShow, setModalShow] = useState(false);

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
          );
        })}
      </ul>
    </div>
  );

  return (
    <Page
      title="Music"
      description="Collection of pictures of the most memorable concerts so far."
    >
      <Popover.Root modal open={modalShow} onOpenChange={setModalShow}>
        <h1>Favorite Albums & Concerts</h1>
        <NowPlaying bigPicture />
        <Popover.Content>
          <MobileView>
            <div
              className={cn(commandStyles.screen, {
                [commandStyles.show]: modalShow
              })}
            >
              <div
                style={{
                  boxShadow: '0px 10px 50px hsla(0, 0%, 0%, 0.33)'
                }}
                className={commandStyles['dialog-content']}
                aria-label="Year Selector"
              >
                <YearList />
              </div>
            </div>
          </MobileView>
        </Popover.Content>
        <article>
          {years.map(({ year, description, concerts, albums }) => {
            return (
              <div key={year} className={styles.musicYear}>
                <h2 id={year} onClick={() => isMobile && setModalShow(true)}>
                  {year}
                </h2>
                <h3>{description}</h3>
                <div>
                  {concerts?.map((entry) => {
                    return (
                      <Entry
                        key={entry.title}
                        title={entry.title}
                        image={entry.image}
                        description={entry.festival}
                      />
                    );
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
                    );
                  })}
                </div>
              </div>
            );
          })}
        </article>
      </Popover.Root>
    </Page>
  );
};

export default Music;
