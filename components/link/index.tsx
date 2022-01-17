import { memo } from 'react'
import NextLink from 'next/link'
import cn from 'classnames'

import styles from './link.module.css'

const canPrefetch = (href: string) => {
  if (!href || !href.startsWith('/')) {
    return false
  }

  return true
}

const Link = ({
  external,
  href,
  as,
  passHref,
  children,
  className,

  // Styling
  underline,
  gray,
  disabled,
  ...props
}: {
  external?: boolean
  href: string
  as?: string
  passHref?: boolean
  className?: string
  underline?: boolean
  gray?: boolean
  disabled?: boolean
  children: any
}) => {
  const c = cn(className, styles.reset, {
    [styles.gray]: gray,
    [styles.underline]: underline,
    [styles.disabled]: disabled
  })

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={c}
        {...props}
      >
        {children}
      </a>
    )
  }

  return (
    <>
      <NextLink
        href={href}
        as={as}
        prefetch={canPrefetch(href) ? undefined : false}
        passHref={passHref}
      >
        {passHref ? (
          children
        ) : (
          <a className={c} {...props}>
            {children}
          </a>
        )}
      </NextLink>
    </>
  )
}

Link.displayName = 'Link'
export default memo(Link)
