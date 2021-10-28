import { useEffect } from 'react'
import useSWR from 'swr'

import fetcher from '@lib/fetcher'

export default function ViewCounter({ slug, string = true }) {
  const { data } = useSWR(`/api/views/${slug}`, fetcher)
  const views = data?.total

  useEffect(() => {
    const registerView = () =>
      fetch(`/api/views/${slug}`, {
        method: 'POST',
      })

    registerView()
  }, [slug])

  return string ? `${views ? views : '–––'} views` : null
}
