import { useState } from 'react'
import { SearchIcon, PaletteIcon, ShieldIcon } from '../components/Icons'
import Lightbox from '../components/Lightbox'
import './PageStyles.css'

const principles = [
  { icon: <SearchIcon size={44} />, name: 'Průzkum a dokumentace', desc: 'Důkladná analýza stavu díla před zahájením restaurátorských prací' },
  { icon: <PaletteIcon size={44} />, name: 'Respekt k originálu', desc: 'Restaurátor musí potlačit vlastní kreativitu a sloužit dílu' },
  { icon: <ShieldIcon size={44} />, name: 'Šetrné postupy', desc: 'Používáme speciální technologie pro maximálně šetrný postup' },
]

const galleryImages = [
  { src: 'https://www.bartolomejsterba.cz/galerie/obnova/01.jpg', alt: 'Restaurování sochy' },
  { src: 'https://www.bartolomejsterba.cz/galerie/obnova/02.jpg', alt: 'Obnova památky' },
  { src: 'https://www.bartolomejsterba.cz/galerie/obnova/03.jpg', alt: 'Restaurátorské práce' },
  { src: 'https://www.bartolomejsterba.cz/galerie/obnova/04.jpg', alt: 'Oprava kamenné sochy' },
  { src: 'https://www.bartolomejsterba.cz/galerie/obnova/05.jpg', alt: 'Restaurování detailu' },
  { src: 'https://www.bartolomejsterba.cz/galerie/obnova/06.jpg', alt: 'Obnova historické památky' },
  { src: 'https://www.bartolomejsterba.cz/galerie/obnova/07.jpg', alt: 'Restaurování reliéfu' },
  { src: 'https://www.bartolomejsterba.cz/galerie/obnova/08.jpg', alt: 'Dokončená restaurace' },
  { src: 'https://www.bartolomejsterba.cz/galerie/obnova/09.jpg', alt: 'Restaurování kříže' },
]

export default function RestaurovamiPage() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  return (
    <div>
      <section className="page-hero">
        <div className="container">
          <h1>Restaurátorské práce</h1>
          <hr className="section-divider" />
          <p>
            Odborná restaurace historických památek, soch a uměleckých děl
            s maximální úctou k originálu a jeho autenticitě.
          </p>
        </div>
      </section>

      <section className="page-content">
        <div className="container">
          <div className="content-grid">
            <div>
              <h2>Profesionální restaurování</h2>
              <p>
                Umělecká díla, historické památky a starožitnosti jsou velmi
                citlivé na plynutí času, povětrnostní podmínky a zásahy lidí,
                kteří se je snažili neprofesionálně restaurovat nebo „vylepšit".
              </p>
              <p>
                Restaurátor musí především sloužit uměleckému dílu s maximální
                úctou. Musí potlačit svou osobnost, vlastní kreativitu a nápady,
                které jsou při restaurování nepřípustné. Ne každý umělec je
                schopen být restaurátorem.
              </p>
              <p>
                Na restaurátora jsou kladeny zvláštní nároky, protože
                restaurování vyžaduje různé kvality, které jsou jak umělecké,
                tak technické. Výtvarné umění je prvořadé pro schopnost
                restaurovat nebo případně doplnit umělecké dílo, stejně jako
                znalost dějin umění a uměleckých a řemeslných technik.
              </p>
            </div>
            <div>
              <div className="highlight-box">
                <p>
                  „Naše dovednosti a technologie zaručují maximálně šetrný
                  postup a autentický tvar. Ke každému dílu přistupujeme
                  individuálně s plným respektem k jeho historické hodnotě."
                </p>
              </div>
            </div>
          </div>

          <h2 style={{ marginTop: '48px' }}>Naše zásady</h2>
          <div className="info-cards">
            {principles.map((p) => (
              <div key={p.name} className="info-card">
                <span className="info-card-icon">{p.icon}</span>
                <h3>{p.name}</h3>
                <p>{p.desc}</p>
              </div>
            ))}
          </div>

          <h2 style={{ marginTop: '48px' }}>Ukázky restaurátorských prací</h2>
          <div className="gallery-grid">
            {galleryImages.map((img, i) => (
              <div key={img.src} className="gallery-item gallery-item--real" onClick={() => setLightboxIndex(i)}>
                <img src={img.src} alt={img.alt} loading="lazy" />
              </div>
            ))}
          </div>

          {lightboxIndex !== null && (
            <Lightbox
              images={galleryImages}
              currentIndex={lightboxIndex}
              onClose={() => setLightboxIndex(null)}
            />
          )}
        </div>
      </section>
    </div>
  )
}
