import PageHero from '../components/PageHero'
import Gallery from '../components/Gallery'
import { lookbook, lookbookFilters } from '../data/products'
import { usePageMeta } from '../hooks/usePageMeta'

export default function Lookbook() {
  usePageMeta('Lookbook | Majestic Designer, Surat', 'The Majestic Designer lookbook — an editorial gallery of designer wear from Surat, Gujarat.')
  return (
    <>
      <PageHero title="THE LOOKBOOK" lead="An editorial view of the Majestic point of view." />
      <Gallery items={lookbook} filters={lookbookFilters} />
    </>
  )
}
