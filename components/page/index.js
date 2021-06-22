import Head from '@components/head'
import Header from '@components/header'
import Link from '@components/link'
import styles from './page.module.css'

const Page = ({
  header = true,
  footer = true,
  title,
  description,
  image,
  showHeaderTitle = true,
  children,
}) => {
  return (
    <div className={styles.wrapper}>
      <Head
        title={`${title ? `${title} - ` : ''}Afonso Ramos`}
        description={description}
        image={image}
      />

      {header && (
        <Link href="#">
          <Header title={showHeaderTitle && title} />
        </Link>
      )}
      <main className={styles.main}>{children}</main>
    </div>
  )
}

export default Page
