import { Closing } from './components/Closing'
import { Craft } from './components/Craft'
import { Film } from './components/Film'
import { Footer } from './components/Footer'
import { Gallery } from './components/Gallery'
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { ObjectSection } from './components/ObjectSection'
import { Story } from './components/Story'
import { useRevealOnScroll } from './hooks/useRevealOnScroll'

export default function App() {
  useRevealOnScroll()
  return (
    <>
      <a
        href="#object"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-ivory focus:px-4 focus:py-2 focus:text-espresso"
      >
        Skip to content
      </a>
      <Header />
      <main>
        <Hero />
        <ObjectSection />
        <Story />
        <Craft />
        <Film />
        <Gallery />
        <Closing />
      </main>
      <Footer />
    </>
  )
}
