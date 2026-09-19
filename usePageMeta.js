import { useEffect } from 'react'

const DEFAULT_DESC =
  'Majestic Designer, Surat — discover refined designer wear, occasion fashion and personalized styling for memorable moments.'

export function usePageMeta(title, description = DEFAULT_DESC) {
  useEffect(() => {
    document.title = title
    const setMeta = (selector, value) => {
      const el = document.querySelector(selector)
      if (el) el.setAttribute('content', value)
    }
    setMeta('meta[name="description"]', description)
    setMeta('meta[property="og:title"]', title)
    setMeta('meta[property="og:description"]', description)
  }, [title, description])
}
