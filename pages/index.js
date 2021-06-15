import Page from '@components/page'
import Link from '@components/link'
import { Hostelworld } from '@components/icons'
import NowPlaying from '../components/now-playing'
import iconStyles from '@components/icons/icons.module.css'

const About = () => {
  return (
    <Page description="Afonso Jorge Ramos - Software developer, open-source & competitive programming enthusiast, music lover & concerts front-liner, beer afficionado, peripatetic by nature.">
      <article>
        <h1>Afonso Ramos</h1>

        <p>
          Software developer,{' '}
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
            beer afficionado
          </Link>
          ,{' '}
          <Link underline href="/world">
            peripatetic
          </Link>{' '}
          by nature.
        </p>

        <p>
          Working at{' '}
          <Link href="https://hostelworld.com" external>
            <Hostelworld className={iconStyles.inline} />
          </Link>
          <Link underline href="https://hostelworld.com" external>
            Hostelworld
          </Link>{' '}
          to bring better travelling experiences to the world.
        </p>
      </article>
      <NowPlaying />
    </Page>
  )
}

export default About
