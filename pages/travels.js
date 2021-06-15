import Page from '@components/page'
import Globe from '@components/globe'
import getMarkdown from '@lib/get-markdown'

const Travels = ({ html }) => {
  return (
    <Page
      title="World Travels"
      description="Register of places I've visited so far."
    >
      <Globe />
      <article dangerouslySetInnerHTML={{ __html: html }} />
    </Page>
  )
}

export const getStaticProps = async () => {
  const md = await getMarkdown('data/travels.md')

  return {
    props: {
      html: md,
    },
  }
}

export default Travels
