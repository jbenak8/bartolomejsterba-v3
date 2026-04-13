interface IconProps {
  size?: number
  className?: string
}

export function HeadstoneIcon({ size = 48, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <path d="M16 58V28C16 16 24 8 32 8C40 8 48 16 48 28V58" stroke="url(#headstone-grad)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M12 58H52" stroke="url(#headstone-grad)" strokeWidth="2" strokeLinecap="round"/>
      <path d="M20 58V32C20 22 26 14 32 14C38 14 44 22 44 32V58" stroke="url(#headstone-grad)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.5"/>
      <path d="M32 22V38" stroke="url(#headstone-grad)" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M26 30H38" stroke="url(#headstone-grad)" strokeWidth="1.5" strokeLinecap="round"/>
      <defs>
        <linearGradient id="headstone-grad" x1="12" y1="8" x2="52" y2="58" gradientUnits="userSpaceOnUse">
          <stop stopColor="#c9a96e"/>
          <stop offset="1" stopColor="#8b7355"/>
        </linearGradient>
      </defs>
    </svg>
  )
}

export function SculptureIcon({ size = 48, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <path d="M32 6C28 6 25 9 25 14C25 17 26 19 27 21C24 24 22 28 22 32C22 34 23 36 24 38L20 56" stroke="url(#sculpt-grad)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M32 6C36 6 39 9 39 14C39 17 38 19 37 21C40 24 42 28 42 32C42 34 41 36 40 38L44 56" stroke="url(#sculpt-grad)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M27 21C29 20 31 19.5 32 19.5C33 19.5 35 20 37 21" stroke="url(#sculpt-grad)" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M24 38C27 39 30 40 32 40C34 40 37 39 40 38" stroke="url(#sculpt-grad)" strokeWidth="1.5" strokeLinecap="round"/>
      <ellipse cx="29" cy="13" rx="1.5" ry="1.5" stroke="url(#sculpt-grad)" strokeWidth="1.2"/>
      <ellipse cx="35" cy="13" rx="1.5" ry="1.5" stroke="url(#sculpt-grad)" strokeWidth="1.2"/>
      <path d="M16 56H48" stroke="url(#sculpt-grad)" strokeWidth="2" strokeLinecap="round"/>
      <defs>
        <linearGradient id="sculpt-grad" x1="16" y1="6" x2="48" y2="56" gradientUnits="userSpaceOnUse">
          <stop stopColor="#c9a96e"/>
          <stop offset="1" stopColor="#8b7355"/>
        </linearGradient>
      </defs>
    </svg>
  )
}

export function RestorationIcon({ size = 48, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <path d="M12 52L28 36" stroke="url(#resto-grad)" strokeWidth="2" strokeLinecap="round"/>
      <path d="M28 36L32 32C34 30 34 27 32 25L30 23" stroke="url(#resto-grad)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M10 54C10 54 11 53 12 52C13 51 14 52 14 52" stroke="url(#resto-grad)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <rect x="36" y="8" width="20" height="28" rx="4" stroke="url(#resto-grad)" strokeWidth="2" transform="rotate(5 46 22)"/>
      <path d="M40 16H52" stroke="url(#resto-grad)" strokeWidth="1.2" strokeLinecap="round" opacity="0.6"/>
      <path d="M39 22H51" stroke="url(#resto-grad)" strokeWidth="1.2" strokeLinecap="round" opacity="0.6"/>
      <path d="M38 28H50" stroke="url(#resto-grad)" strokeWidth="1.2" strokeLinecap="round" opacity="0.6"/>
      <path d="M44 40C44 40 48 44 52 44" stroke="url(#resto-grad)" strokeWidth="1.5" strokeLinecap="round" opacity="0.5"/>
      <circle cx="46" cy="12" r="2" stroke="url(#resto-grad)" strokeWidth="1.2"/>
      <defs>
        <linearGradient id="resto-grad" x1="10" y1="8" x2="54" y2="54" gradientUnits="userSpaceOnUse">
          <stop stopColor="#c9a96e"/>
          <stop offset="1" stopColor="#8b7355"/>
        </linearGradient>
      </defs>
    </svg>
  )
}

export function StarIcon({ size = 48, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <path d="M32 8L38 24H54L41 34L46 50L32 40L18 50L23 34L10 24H26L32 8Z" stroke="url(#star-grad)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <defs>
        <linearGradient id="star-grad" x1="10" y1="8" x2="54" y2="50" gradientUnits="userSpaceOnUse">
          <stop stopColor="#c9a96e"/>
          <stop offset="1" stopColor="#8b7355"/>
        </linearGradient>
      </defs>
    </svg>
  )
}

export function PaletteIcon({ size = 48, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <path d="M32 8C18 8 8 20 8 32C8 44 16 52 24 52C28 52 28 46 32 46C36 46 36 52 44 48C52 44 56 36 56 28C56 16 46 8 32 8Z" stroke="url(#palette-grad)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="22" cy="24" r="3" stroke="url(#palette-grad)" strokeWidth="1.5"/>
      <circle cx="34" cy="18" r="3" stroke="url(#palette-grad)" strokeWidth="1.5"/>
      <circle cx="44" cy="26" r="3" stroke="url(#palette-grad)" strokeWidth="1.5"/>
      <circle cx="20" cy="36" r="3" stroke="url(#palette-grad)" strokeWidth="1.5"/>
      <defs>
        <linearGradient id="palette-grad" x1="8" y1="8" x2="56" y2="52" gradientUnits="userSpaceOnUse">
          <stop stopColor="#c9a96e"/>
          <stop offset="1" stopColor="#8b7355"/>
        </linearGradient>
      </defs>
    </svg>
  )
}

export function MountainIcon({ size = 48, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <path d="M4 52L22 16L34 36L40 28L60 52H4Z" stroke="url(#mount-grad)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M22 16L18 24" stroke="url(#mount-grad)" strokeWidth="1.2" strokeLinecap="round" opacity="0.5"/>
      <path d="M40 28L36 36" stroke="url(#mount-grad)" strokeWidth="1.2" strokeLinecap="round" opacity="0.5"/>
      <defs>
        <linearGradient id="mount-grad" x1="4" y1="16" x2="60" y2="52" gradientUnits="userSpaceOnUse">
          <stop stopColor="#c9a96e"/>
          <stop offset="1" stopColor="#8b7355"/>
        </linearGradient>
      </defs>
    </svg>
  )
}

export function HandshakeIcon({ size = 48, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <path d="M8 28L20 20L32 28L44 20L56 28" stroke="url(#hand-grad)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M20 20V40" stroke="url(#hand-grad)" strokeWidth="2" strokeLinecap="round"/>
      <path d="M44 20V40" stroke="url(#hand-grad)" strokeWidth="2" strokeLinecap="round"/>
      <path d="M20 40C24 44 28 46 32 46C36 46 40 44 44 40" stroke="url(#hand-grad)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M26 34H38" stroke="url(#hand-grad)" strokeWidth="1.5" strokeLinecap="round" opacity="0.5"/>
      <defs>
        <linearGradient id="hand-grad" x1="8" y1="20" x2="56" y2="46" gradientUnits="userSpaceOnUse">
          <stop stopColor="#c9a96e"/>
          <stop offset="1" stopColor="#8b7355"/>
        </linearGradient>
      </defs>
    </svg>
  )
}

export function SearchIcon({ size = 48, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <circle cx="28" cy="28" r="16" stroke="url(#search-grad)" strokeWidth="2"/>
      <path d="M40 40L54 54" stroke="url(#search-grad)" strokeWidth="2" strokeLinecap="round"/>
      <path d="M22 24C24 20 28 18 32 20" stroke="url(#search-grad)" strokeWidth="1.5" strokeLinecap="round" opacity="0.5"/>
      <defs>
        <linearGradient id="search-grad" x1="12" y1="12" x2="54" y2="54" gradientUnits="userSpaceOnUse">
          <stop stopColor="#c9a96e"/>
          <stop offset="1" stopColor="#8b7355"/>
        </linearGradient>
      </defs>
    </svg>
  )
}

export function ShieldIcon({ size = 48, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <path d="M32 6L10 18V34C10 46 20 54 32 58C44 54 54 46 54 34V18L32 6Z" stroke="url(#shield-grad)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M24 32L30 38L42 26" stroke="url(#shield-grad)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <defs>
        <linearGradient id="shield-grad" x1="10" y1="6" x2="54" y2="58" gradientUnits="userSpaceOnUse">
          <stop stopColor="#c9a96e"/>
          <stop offset="1" stopColor="#8b7355"/>
        </linearGradient>
      </defs>
    </svg>
  )
}

export function FigureIcon({ size = 48, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <circle cx="32" cy="14" r="8" stroke="url(#figure-grad)" strokeWidth="2"/>
      <path d="M20 56V36C20 30 24 26 32 26C40 26 44 30 44 36V56" stroke="url(#figure-grad)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M24 42H40" stroke="url(#figure-grad)" strokeWidth="1.5" strokeLinecap="round" opacity="0.5"/>
      <defs>
        <linearGradient id="figure-grad" x1="20" y1="6" x2="44" y2="56" gradientUnits="userSpaceOnUse">
          <stop stopColor="#c9a96e"/>
          <stop offset="1" stopColor="#8b7355"/>
        </linearGradient>
      </defs>
    </svg>
  )
}

export function ColumnIcon({ size = 48, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <path d="M16 10H48" stroke="url(#col-grad)" strokeWidth="2" strokeLinecap="round"/>
      <path d="M16 54H48" stroke="url(#col-grad)" strokeWidth="2" strokeLinecap="round"/>
      <path d="M22 10V54" stroke="url(#col-grad)" strokeWidth="2" strokeLinecap="round"/>
      <path d="M32 10V54" stroke="url(#col-grad)" strokeWidth="2" strokeLinecap="round"/>
      <path d="M42 10V54" stroke="url(#col-grad)" strokeWidth="2" strokeLinecap="round"/>
      <path d="M18 10L22 6H42L46 10" stroke="url(#col-grad)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M18 54L22 58H42L46 54" stroke="url(#col-grad)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <defs>
        <linearGradient id="col-grad" x1="16" y1="6" x2="48" y2="58" gradientUnits="userSpaceOnUse">
          <stop stopColor="#c9a96e"/>
          <stop offset="1" stopColor="#8b7355"/>
        </linearGradient>
      </defs>
    </svg>
  )
}

export function TreeIcon({ size = 48, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <path d="M32 6L16 28H24L14 46H50L40 28H48L32 6Z" stroke="url(#tree-grad)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M28 46V58H36V46" stroke="url(#tree-grad)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <defs>
        <linearGradient id="tree-grad" x1="14" y1="6" x2="50" y2="58" gradientUnits="userSpaceOnUse">
          <stop stopColor="#c9a96e"/>
          <stop offset="1" stopColor="#8b7355"/>
        </linearGradient>
      </defs>
    </svg>
  )
}

export function RockIcon({ size = 48, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <path d="M8 44L16 20L28 12L44 16L56 28L52 44H8Z" stroke="url(#rock-grad)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M16 20L24 28L44 16" stroke="url(#rock-grad)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" opacity="0.5"/>
      <path d="M24 28L20 44" stroke="url(#rock-grad)" strokeWidth="1.2" strokeLinecap="round" opacity="0.5"/>
      <path d="M24 28L40 44" stroke="url(#rock-grad)" strokeWidth="1.2" strokeLinecap="round" opacity="0.5"/>
      <path d="M4 48H60" stroke="url(#rock-grad)" strokeWidth="2" strokeLinecap="round"/>
      <defs>
        <linearGradient id="rock-grad" x1="4" y1="12" x2="60" y2="48" gradientUnits="userSpaceOnUse">
          <stop stopColor="#c9a96e"/>
          <stop offset="1" stopColor="#8b7355"/>
        </linearGradient>
      </defs>
    </svg>
  )
}

export function MarbleIcon({ size = 48, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <rect x="10" y="14" width="44" height="36" rx="4" stroke="url(#marble-grad)" strokeWidth="2"/>
      <path d="M18 14C22 24 26 34 34 50" stroke="url(#marble-grad)" strokeWidth="1.2" strokeLinecap="round" opacity="0.4"/>
      <path d="M38 14C34 24 30 34 22 50" stroke="url(#marble-grad)" strokeWidth="1.2" strokeLinecap="round" opacity="0.4"/>
      <path d="M48 20C40 28 32 36 20 44" stroke="url(#marble-grad)" strokeWidth="1.2" strokeLinecap="round" opacity="0.4"/>
      <defs>
        <linearGradient id="marble-grad" x1="10" y1="14" x2="54" y2="50" gradientUnits="userSpaceOnUse">
          <stop stopColor="#c9a96e"/>
          <stop offset="1" stopColor="#8b7355"/>
        </linearGradient>
      </defs>
    </svg>
  )
}

export function SandstoneIcon({ size = 48, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <rect x="8" y="8" width="48" height="48" rx="8" stroke="url(#sand-grad)" strokeWidth="2"/>
      <path d="M8 24H56" stroke="url(#sand-grad)" strokeWidth="1.2" strokeLinecap="round" opacity="0.4"/>
      <path d="M8 40H56" stroke="url(#sand-grad)" strokeWidth="1.2" strokeLinecap="round" opacity="0.4"/>
      <circle cx="20" cy="16" r="2" stroke="url(#sand-grad)" strokeWidth="1"/>
      <circle cx="40" cy="32" r="2" stroke="url(#sand-grad)" strokeWidth="1"/>
      <circle cx="28" cy="48" r="2" stroke="url(#sand-grad)" strokeWidth="1"/>
      <defs>
        <linearGradient id="sand-grad" x1="8" y1="8" x2="56" y2="56" gradientUnits="userSpaceOnUse">
          <stop stopColor="#c9a96e"/>
          <stop offset="1" stopColor="#8b7355"/>
        </linearGradient>
      </defs>
    </svg>
  )
}
