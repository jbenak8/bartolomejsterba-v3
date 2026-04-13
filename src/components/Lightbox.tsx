import { useState, useEffect, useCallback } from 'react'
import './Lightbox.css'

interface LightboxProps {
  images: { src: string; alt: string }[]
  currentIndex: number
  onClose: () => void
}

export default function Lightbox({ images, currentIndex, onClose }: LightboxProps) {
  const [index, setIndex] = useState(currentIndex)

  const goPrev = useCallback(() => {
    setIndex((i) => (i > 0 ? i - 1 : images.length - 1))
  }, [images.length])

  const goNext = useCallback(() => {
    setIndex((i) => (i < images.length - 1 ? i + 1 : 0))
  }, [images.length])

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') goPrev()
      if (e.key === 'ArrowRight') goNext()
    }
    document.addEventListener('keydown', handleKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handleKey)
      document.body.style.overflow = ''
    }
  }, [onClose, goPrev, goNext])

  useEffect(() => {
    setIndex(currentIndex)
  }, [currentIndex])

  return (
    <div className="lightbox-overlay" onClick={onClose}>
      <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
        <button className="lightbox-close" onClick={onClose} aria-label="Zavřít">
          ×
        </button>
        <button className="lightbox-arrow lightbox-arrow--left" onClick={goPrev} aria-label="Předchozí">
          ‹
        </button>
        <img
          src={images[index].src}
          alt={images[index].alt}
          className="lightbox-image"
        />
        <button className="lightbox-arrow lightbox-arrow--right" onClick={goNext} aria-label="Další">
          ›
        </button>
        <div className="lightbox-counter">
          {index + 1} / {images.length}
        </div>
      </div>
    </div>
  )
}
