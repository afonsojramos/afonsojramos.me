import commandStyles from '@components/command/command.module.scss';
import Entry from '@components/entry';
import entryStyles from '@components/entry/entry.module.scss';
import Error from '@components/error';
import Link from '@components/link';
import NowPlaying from '@components/now-playing';
import Page from '@components/page';
import styles from '@components/page/page.module.scss';
import { IYear } from '@interfaces/music';
import fetcher from '@lib/fetcher';
import * as Popover from '@radix-ui/react-popover';
import cn from 'classnames';
import { useState } from 'react';
import { BrowserView, isMobile, MobileView } from 'react-device-detect';
import useSWR from 'swr';

const Music = () => {
  const [modalShow, setModalShow] = useState(false);

  const { data, error } = useSWR('/api/music', fetcher);
  if (error) return <Error title="Error loading data" />;
  if (!data) return <Error title="Loading..." loading />;

  const music: IYear[] = JSON.parse(data).music;

  const YearList = () => (
    <div className={cn(styles.sidenav)}>
      <ul>
        {music.map(({ year }) => {
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
        <BrowserView>
          <YearList />
        </BrowserView>
        <article>
          {music.map(({ year, description, concerts, albums }) => {
            return (
              <div key={year} className={styles.musicYear}>
                <h2 onClick={() => isMobile && setModalShow(true)}>{year}</h2>
                <p id={year} />
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
