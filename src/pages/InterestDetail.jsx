// 兴趣专题详情分发：与项目详情共用 hash 路由，但页面壳层和视觉由各专题自行决定。

import { useEffect } from 'react'
import { LightboxProvider } from '../components/Lightbox.jsx'
import { topicBySlug } from '../content/interests/index.js'
import MusicPage from './interests/MusicPage.jsx'
import PhotographyPage from './interests/PhotographyPage.jsx'
import ModelingPage from './interests/ModelingPage.jsx'
import NotFound from './NotFound.jsx'

const pages = {
  music: MusicPage,
  photography: PhotographyPage,
  modeling: ModelingPage,
}

export default function InterestDetail({ slug }) {
  const topic = topicBySlug(slug)
  const Page = topic ? pages[topic.slug] : null

  useEffect(() => {
    if (!topic) return undefined

    const previousTitle = document.title
    const meta = document.querySelector('meta[name="description"]')
    const previousDescription = meta?.getAttribute('content')

    document.title = `${topic.seoTitle} — Gavin Sun`
    if (meta) meta.setAttribute('content', topic.description)

    const nodes = document.querySelectorAll('.ix-page .ix-reveal')
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.06, rootMargin: '0px 0px -6% 0px' },
    )
    nodes.forEach((node) => observer.observe(node))

    return () => {
      observer.disconnect()
      document.title = previousTitle
      if (meta && previousDescription != null) meta.setAttribute('content', previousDescription)
    }
  }, [topic])

  if (!Page) return <NotFound />

  return (
    <LightboxProvider key={topic.slug}>
      <Page />
    </LightboxProvider>
  )
}
