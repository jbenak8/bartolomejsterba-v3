import { useEffect, useRef } from 'react'
import './ParallaxSection.css'

interface ParallaxSectionProps {
  image: string
  height?: string
  speed?: number
  overlay?: boolean
  children?: React.ReactNode
}

export default function ParallaxSection({
  image,
  height = '60vh',
  speed = 0.4,
  overlay = true,
  children,
}: ParallaxSectionProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const onScroll = () => {
      const rect = el.getBoundingClientRect()
      const windowH = window.innerHeight
      if (rect.bottom < 0 || rect.top > windowH) return
      const offset = (rect.top - windowH / 2) * speed
      const bg = el.querySelector('.parallax-bg') as HTMLElement | null
      if (bg) bg.style.transform = `translate3d(0, ${offset}px, 0)`
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [speed])

  return (
    <div className="parallax-section" ref={ref} style={{ height }}>
      <div
        className="parallax-bg"
        style={{ backgroundImage: `url(${image})` }}
      />
      {overlay && <div className="parallax-overlay" />}
      {children && <div className="parallax-content">{children}</div>}
    </div>
  )
}
