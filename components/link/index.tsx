import { memo, MouseEventHandler, ReactNode } from 'react';
import NextLink from 'next/link';
import cn from 'classnames';

import styles from './link.module.scss';

const canPrefetch = (href: string) => {
  if (!href || !href.startsWith('/')) {
    return false;
  }

  return true;
};

const Link = ({
  external,
  href,
  as,
  passHref,
  children,
  className,
  scroll,

  // Styling
  underline,
  gray,
  disabled,

  onClick,
  title,
  ...props
}: {
  external?: boolean;
  href: string;
  as?: string;
  passHref?: boolean;
  className?: string;
  scroll?: boolean;
  underline?: boolean;
  gray?: boolean;
  disabled?: boolean;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
  title?: string;
  children: ReactNode;
}) => {
  const c = cn(className, styles.checkbox, {
    [styles.gray]: gray,
    [styles.underline]: underline,
    [styles.disabled]: disabled
  });

  if (external) {
    return (
      <a
        href={href}
        target={!href.startsWith('#') ? '_blank' : undefined}
        rel={!href.startsWith('#') ? 'noopener noreferrer' : undefined}
        className={c}
        onClick={onClick}
        title={title}
        {...props}
      >
        {children}
      </a>
    );
  }

  return (
    <NextLink
      href={href}
      as={as}
      prefetch={canPrefetch(href) ? undefined : false}
      passHref={passHref}
      className={c}
      onClick={onClick}
      scroll={scroll}
      {...props}
    >
      {children}
    </NextLink>
  );
};

Link.displayName = 'Link';
export default memo(Link);
