import { memo } from 'react'
import Link from '@components/link'

import styles from './header.module.css'
import { Logo as LogoIcon } from '@components/icons'
import Command from '@components/command'

const Header = ({ title, content }) => {
  return (
    <nav className={styles.nav}>
      <div className={styles.header}>
        <Link href="/" aria-label="Navigate Home" className={styles.logo}>
          <LogoIcon />
        </Link>

        {title && title !== 404 ? (
          <Link href="#">{title}</Link>
        ) : (
          <p className={styles.content}>{title}</p>
        )}

        <Command />
      </div>
    </nav>
  )
}

Header.displayName = 'Header'
export default memo(Header)
