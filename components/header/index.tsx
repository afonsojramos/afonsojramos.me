import { memo } from 'react';
import Link from 'components/link';

import styles from './header.module.scss';
import { Logo as LogoIcon } from 'components/icons';
import Command from 'components/command';

const Header = ({ title }: { title?: string }) => {
  return (
    <nav className={styles.nav}>
      <div className={styles.header}>
        <Link href="/" aria-label="Navigate Home" className={styles.logo}>
          <LogoIcon />
        </Link>

        {title !== '404' ? (
          <a className={styles.content} href="#">
            {title}
          </a>
        ) : (
          <p className={styles.content}>{title}</p>
        )}

        <Command />
      </div>
    </nav>
  );
};

Header.displayName = 'Header';
export default memo(Header);
