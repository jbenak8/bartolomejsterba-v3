import { useEffect, useRef } from 'react'
import './SculptingAnimation.css'

export default function SculptingAnimation() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Generate random particles on mount
    const container = containerRef.current
    if (!container) return
    const particleLayer = container.querySelector('.sculpting-particles')
    if (!particleLayer) return

    for (let i = 0; i < 12; i++) {
      const p = document.createElement('div')
      p.className = 'sculpting-particle'
      p.style.setProperty('--delay', `${(i * 0.35).toFixed(2)}s`)
      p.style.setProperty('--x', `${-30 + Math.random() * 60}px`)
      p.style.setProperty('--y', `${-40 - Math.random() * 50}px`)
      p.style.setProperty('--size', `${2 + Math.random() * 3}px`)
      particleLayer.appendChild(p)
    }
  }, [])

  return (
    <div className="sculpting-animation" ref={containerRef}>
      <svg
        className="sculpting-svg"
        viewBox="0 0 400 400"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="sa-grad" x1="0" y1="0" x2="400" y2="400" gradientUnits="userSpaceOnUse">
            <stop stopColor="#c9a96e" />
            <stop offset="1" stopColor="#8b7355" />
          </linearGradient>
          <linearGradient id="sa-grad-light" x1="0" y1="0" x2="400" y2="400" gradientUnits="userSpaceOnUse">
            <stop stopColor="#c9a96e" stopOpacity="0.3" />
            <stop offset="1" stopColor="#8b7355" stopOpacity="0.15" />
          </linearGradient>
        </defs>

        {/* Pedestal / base */}
        <path
          d="M120 360H280V340H130V360Z"
          stroke="url(#sa-grad)" strokeWidth="1.5" strokeLinejoin="round"
          className="sa-draw" style={{ strokeDasharray: 500, strokeDashoffset: 500 }}
        />
        <path
          d="M110 380H290V360H120V380Z"
          stroke="url(#sa-grad)" strokeWidth="1.5" strokeLinejoin="round"
          className="sa-draw" style={{ strokeDasharray: 600, strokeDashoffset: 600 }}
        />

        {/* Rough stone block / emerging sculpture */}
        <g className="sa-statue">
          {/* Outer rough block shape */}
          <path
            d="M160 340V200C160 180 165 160 175 145C185 130 195 120 200 110C205 120 215 130 225 145C235 160 240 180 240 200V340"
            stroke="url(#sa-grad)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
            className="sa-draw" style={{ strokeDasharray: 600, strokeDashoffset: 600 }}
          />

          {/* Head shape */}
          <ellipse cx="200" cy="135" rx="22" ry="28"
            stroke="url(#sa-grad)" strokeWidth="1.8" strokeLinecap="round"
            className="sa-draw sa-draw-delayed" style={{ strokeDasharray: 200, strokeDashoffset: 200 }}
          />

          {/* Facial features - subtle lines */}
          <path d="M192 128C194 130 196 131 200 131C204 131 206 130 208 128"
            stroke="url(#sa-grad)" strokeWidth="1.2" strokeLinecap="round"
            className="sa-draw sa-draw-delayed2" style={{ strokeDasharray: 50, strokeDashoffset: 50 }}
            opacity="0.7"
          />
          <circle cx="193" cy="124" r="1.5" stroke="url(#sa-grad)" strokeWidth="1"
            className="sa-draw sa-draw-delayed2" style={{ strokeDasharray: 12, strokeDashoffset: 12 }}
            opacity="0.6"
          />
          <circle cx="207" cy="124" r="1.5" stroke="url(#sa-grad)" strokeWidth="1"
            className="sa-draw sa-draw-delayed2" style={{ strokeDasharray: 12, strokeDashoffset: 12 }}
            opacity="0.6"
          />

          {/* Neck */}
          <path d="M192 160V150" stroke="url(#sa-grad)" strokeWidth="1.5" strokeLinecap="round"
            className="sa-draw sa-draw-delayed" style={{ strokeDasharray: 20, strokeDashoffset: 20 }}
          />
          <path d="M208 160V150" stroke="url(#sa-grad)" strokeWidth="1.5" strokeLinecap="round"
            className="sa-draw sa-draw-delayed" style={{ strokeDasharray: 20, strokeDashoffset: 20 }}
          />

          {/* Shoulders / torso lines */}
          <path d="M170 200C175 185 185 175 192 168"
            stroke="url(#sa-grad)" strokeWidth="1.5" strokeLinecap="round"
            className="sa-draw sa-draw-delayed" style={{ strokeDasharray: 60, strokeDashoffset: 60 }}
          />
          <path d="M230 200C225 185 215 175 208 168"
            stroke="url(#sa-grad)" strokeWidth="1.5" strokeLinecap="round"
            className="sa-draw sa-draw-delayed" style={{ strokeDasharray: 60, strokeDashoffset: 60 }}
          />

          {/* Drapery / robe lines */}
          <path d="M170 220C180 215 190 225 200 220C210 215 220 225 230 220"
            stroke="url(#sa-grad)" strokeWidth="1.2" strokeLinecap="round"
            className="sa-draw sa-draw-delayed2" style={{ strokeDasharray: 80, strokeDashoffset: 80 }}
            opacity="0.5"
          />
          <path d="M165 260C178 255 188 265 200 260C212 255 222 265 235 260"
            stroke="url(#sa-grad)" strokeWidth="1.2" strokeLinecap="round"
            className="sa-draw sa-draw-delayed2" style={{ strokeDasharray: 90, strokeDashoffset: 90 }}
            opacity="0.5"
          />
          <path d="M162 300C178 295 190 305 200 300C210 295 222 305 238 300"
            stroke="url(#sa-grad)" strokeWidth="1.2" strokeLinecap="round"
            className="sa-draw sa-draw-delayed2" style={{ strokeDasharray: 100, strokeDashoffset: 100 }}
            opacity="0.4"
          />
        </g>

        {/* Chisel hitting point - spark origin */}
        <g className="sa-chisel-group">
          {/* Hand with chisel */}
          <path
            d="M280 170L250 155L235 150"
            stroke="url(#sa-grad)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
            className="sa-chisel"
          />
          {/* Chisel tip */}
          <path
            d="M235 150L228 148"
            stroke="url(#sa-grad)" strokeWidth="2.5" strokeLinecap="round"
            className="sa-chisel"
          />

          {/* Hammer */}
          <g className="sa-hammer">
            <path
              d="M310 120L270 155"
              stroke="url(#sa-grad)" strokeWidth="1.8" strokeLinecap="round"
              className="sa-hammer-handle"
            />
            <rect x="300" y="108" width="22" height="14" rx="3"
              stroke="url(#sa-grad)" strokeWidth="1.8"
              transform="rotate(-40 311 115)"
              className="sa-hammer-head"
            />
          </g>
        </g>

        {/* Spark lines at chisel point */}
        <g className="sa-sparks">
          <line x1="228" y1="148" x2="218" y2="138" stroke="url(#sa-grad)" strokeWidth="1.2" strokeLinecap="round" opacity="0" className="sa-spark sa-spark-1" />
          <line x1="228" y1="148" x2="222" y2="134" stroke="url(#sa-grad)" strokeWidth="1" strokeLinecap="round" opacity="0" className="sa-spark sa-spark-2" />
          <line x1="228" y1="148" x2="216" y2="144" stroke="url(#sa-grad)" strokeWidth="1.2" strokeLinecap="round" opacity="0" className="sa-spark sa-spark-3" />
          <line x1="228" y1="148" x2="220" y2="156" stroke="url(#sa-grad)" strokeWidth="1" strokeLinecap="round" opacity="0" className="sa-spark sa-spark-4" />
          <line x1="228" y1="148" x2="214" y2="148" stroke="url(#sa-grad)" strokeWidth="1" strokeLinecap="round" opacity="0" className="sa-spark sa-spark-5" />
        </g>

        {/* Floating stone dust / debris */}
        <g className="sa-dust">
          <circle cx="220" cy="140" r="1.5" fill="url(#sa-grad)" opacity="0" className="sa-dust-p sa-dust-1" />
          <circle cx="215" cy="150" r="1" fill="url(#sa-grad)" opacity="0" className="sa-dust-p sa-dust-2" />
          <circle cx="225" cy="135" r="1.2" fill="url(#sa-grad)" opacity="0" className="sa-dust-p sa-dust-3" />
          <circle cx="210" cy="145" r="0.8" fill="url(#sa-grad)" opacity="0" className="sa-dust-p sa-dust-4" />
        </g>
      </svg>

      <div className="sculpting-particles" />
    </div>
  )
}
