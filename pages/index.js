import Page from '@components/page'
import Link from '@components/link'
import { EDreams, Ensico } from '@components/icons'
import NowPlaying from '../components/now-playing'
import iconStyles from '@components/icons/icons.module.css'
import ViewCounter from '@components/view-counter'

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
          <Link href="https://edreams.com/" external>
            <EDreams className={iconStyles.inline} />
          </Link>{' '}
          <Link underline href="https://edreams.com/" external>
            eDreams ODIGEO
          </Link>{' '}
          to help create the one stop travel company.
        </p>
        <p>
          Bringing accessible coding lessons to 5th to 9th grade students at{' '}
          <Link href="https://www.ensico.pt/" external>
            <Ensico className={iconStyles.inline} />
          </Link>{' '}
          <Link underline href="https://www.ensico.pt/" external>
            Ensico
          </Link>{' '}
          .
        </p>
      </article>
      <NowPlaying />
      <ViewCounter slug={'home'} />
    </Page>
  )
}

export default About
