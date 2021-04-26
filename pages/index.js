import Page from '@components/page'
import Link from '@components/link'
import { Hostelworld } from '@components/icons'

const About = () => {
  return (
    <Page description="Hi, I'm Afonso. Backend developer, open-source & competitive programming enthusiast, music lover & concerts front-liner, beer afficionado, peripatetic by nature.">
      <article>
        <h1>Afonso Ramos</h1>

        <p>
          Backend developer,{' '}
          <Link underline href="/keyboards">
            open-Source
          </Link>{' '}
          &{' '}
          <Link underline href="/keyboards">
            competitive programming
          </Link>{' '}
          enthusiast,{' '}
          <Link underline href="/music">
            music lover & concerts front-liner,
          </Link>{' '}
          <Link underline href="https://untappd.com/user/afonsojramos" external>
            beer afficionado
          </Link>
          , {/* <Link underline href="/travels"> */}
          peripatetic
          {/* </Link>*/} by nature.
        </p>

        <p>
          Working at{' '}
          <Link href="https://hostelworld.com" external>
            <Hostelworld style={{ width: 40, 'vertical-align': 'middle' }} />
          </Link>{' '}
          <Link underline href="https://hostelworld.com" external>
            Hostelworld
          </Link>{' '}
          to bring better travelling experiences to the world.
        </p>
      </article>
    </Page>
  )
}

export default About
