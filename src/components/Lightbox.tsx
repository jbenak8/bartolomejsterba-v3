import { useState, useEffect, useCallback } from 'react'
import './Lightbox.css'

interface LightboxProps {
  images: { src: string; alt: string }[]
  currentIndex: number
  onClose: () => void
}

export default function Lightbox({ images, currentIndex, onClose }: LightboxProps) {
  const [index, setIndex] = useState(currentIndex)
  const [prevCurrentIndex, setPrevCurrentIndex] = useState(currentIndex)

  if (prevCurrentIndex !== currentIndex) {
    setPrevCurrentIndex(currentIndex)
    setIndex(currentIndex)
  }

  const goPrev = useCallback(() => {
    if (images.length === 0) return
    setIndex((i) => (i > 0 ? i - 1 : images.length - 1))
  }, [images.length])

  const goNext = useCallback(() => {
    if (images.length === 0) return
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

  if (!images.length) return null

  const safeIndex = Math.min(Math.max(0, index), images.length - 1)
  const currentImage = images[safeIndex]

  return (
    <div className="lightbox-overlay" onClick={onClose}>
      <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
        <button className="lightbox-close" onClick={onClose} aria-label="Zavřít">
          ×
        </button>
        <button className="lightbox-arrow lightbox-arrow--left" onClick={goPrev} aria-label="Předchozí">
          ‹
        </button>
        {currentImage && (
          <img
            src={currentImage.src}
            alt={currentImage.alt}
            className="lightbox-image"
          />
        )}
        <button className="lightbox-arrow lightbox-arrow--right" onClick={goNext} aria-label="Další">
          ›
        </button>
        <div className="lightbox-counter">
          {safeIndex + 1} / {images.length}
        </div>
      </div>
    </div>
  )
}
