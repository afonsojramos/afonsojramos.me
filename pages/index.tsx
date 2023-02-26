import { Ensico, NewDay, YLD } from '@components/icons';
import iconStyles from '@components/icons/icons.module.scss';
import linkStyles from '@components/link/link.module.scss';
import Link from '@components/link';
import NowPlaying from '@components/now-playing';
import Page from '@components/page';
import ViewCounter from '@components/view-counter';

const Home = () => {
  return (
    <Page description="Afonso Jorge Ramos - Software developer, open-source & competitive programming enthusiast, music lover & concerts front-liner, beer afficionado, peripatetic by nature.">
      <article>
        <h1>Afonso Ramos</h1>

        <p>
          Full-Stack Software Engineer,{' '}
          <Link underline href="https://github.com/afonsojramos" external>
            open-source
          </Link>{' '}
          &{' '}
          <Link
            underline
            href="https://github.com/afonsojramos/competitive-programming"
            external
          >
            competitive programming
          </Link>{' '}
          enthusiast,{' '}
          <Link underline href="/music">
            music lover & concerts front-liner,
          </Link>{' '}
          <Link underline href="https://untappd.com/user/afonsojramos" external>
            craft beer afficionado
          </Link>
          ,{' '}
          <Link underline href="/world">
            peripatetic
          </Link>{' '}
          by nature.
        </p>

        <p>
          Working at{' '}
          <Link href="https://yld.io/" external>
            <YLD className={iconStyles.inline} />
          </Link>{' '}
          helping{' '}
          <Link href="https://www.newday.co.uk/" external>
            <NewDay className={iconStyles.inline} style={{ width: 60 }} />
          </Link>{' '}
          grow and fulfill their mission.
        </p>

        <p>
          Bringing accessible coding lessons to 5th to 9th grade students at{' '}
          <Link href="https://www.ensico.pt/" external>
            <Ensico className={iconStyles.inline} />{' '}
            <span className={linkStyles.underlink}>Ensico</span>
          </Link>{' '}
          .
        </p>
      </article>
      <NowPlaying />
      <ViewCounter slug={'home'} string={false} />
    </Page>
  );
};

export default Home;
