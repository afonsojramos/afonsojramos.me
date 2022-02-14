import Head from 'next/head'

import Navigation from './navigation'
import Page from '@components/page'
import styles from './post.module.css'
import ViewCounter from '@components/view-counter'

export interface PostProps {
  title: string
  slug: string
  html: string
  hidden: boolean
  og: string
  description: string
  date: string
}

export interface PostNavigationProps {
  previous: PostProps
  next: PostProps
}

function escapeHtml(unsafe: string) {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}

const Post = ({
  title,
  slug,
  html,
  hidden,
  og,
  description,
  date,
  previous,
  next
}: PostProps & PostNavigationProps) => {
  return (
    <Page
      title={title}
      description={description}
      showHeaderTitle={false}
      image={
        og
          ? `https://res.cloudinary.com/afonsojramos/image/upload/${slug}.png`
          : og
      }
    >
      <Head>
        {hidden && <meta name="robots" content="noindex" />}
        {date && <meta name="date" content={date} />}
      </Head>

      <article
        dangerouslySetInnerHTML={{
          __html: `<span class="${styles.date}">${date}</span><h1 class="${
            styles.title
          }">${escapeHtml(title)}</h1>${html}`
        }}
      />

      <Navigation previous={previous} next={next} />
      <ViewCounter slug={slug} />
    </Page>
  )
}

export default Post
