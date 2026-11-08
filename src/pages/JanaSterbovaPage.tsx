import { useState } from 'react'
import { Link } from 'react-router-dom'
import { FigureIcon, TreeIcon, SandstoneIcon } from '../components/Icons'
import Lightbox from '../components/Lightbox'
import { getGalleryImages } from '../utils/gallery'
import './PageStyles.css'

const disciplines = [
  { icon: <FigureIcon size={44} />, name: 'Figurální sochařství', desc: 'Portréty, busty a celé postavy s důrazem na výraz a proporce' },
  { icon: <TreeIcon size={44} />, name: 'Řezbářství', desc: 'Dřevěné plastiky, reliéfy a betlémy vyřezávané tradičními postupy' },
  { icon: <SandstoneIcon size={44} />, name: 'Kamenná plastika', desc: 'Sochy z pískovce, opuky a mramoru pro interiér i exteriér' },
]

const allImages = getGalleryImages('rejmanova')
const portrait = allImages.find((img) => /^portret\./i.test(img.alt))
const galleryImages = allImages.filter((img) => img !== portrait)

export default function JanaSterbovaPage() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  return (
    <div>
      <section className="page-hero">
        <div className="container">
          <h1>Jana Štěrbová Rejmanová</h1>
          <hr className="section-divider" />
          <p>
            Sochařka a řezbářka, nedílná součást našeho ateliéru a jedna
            z republikových špiček ve svém oboru.
          </p>
        </div>
      </section>

      <section className="page-content">
        <div className="container">
          <div className="content-grid">
            <div>
              <h2>Autorka našich soch</h2>
              <p>
                Jana Štěrbová Rejmanová je spoluautorkou sochařských a autorkou řezbářských
                děl, která vznikají v naší dílně. Její rukopis nesou figurální
                sochy, portréty, reliéfy i drobné dřevěné plastiky, které
                najdete v ukázkách prací na stránce{' '}
                <Link to="/sochy">Sochy</Link>.
              </p>
              <p>
                Jako integrální součást firmy Kamenosochařství Bartoloměj Štěrba
                se podílí na návrhu i realizaci zakázek — od prvních skic
                a modelů přes práci v kameni či dřevě až po finální povrchovou
                úpravu. Spojení sochařského citu s řemeslnou precizností
                řadí její tvorbu mezi republikovou špičku v oboru.
              </p>
              <p>
                Pracuje převážně s pískovcem, opukou a dřevem. Každé dílo vzniká jako originál podle
                přání zadavatele, ať už jde o sochu do zahrady, sakrální
                plastiku nebo portrétní bustu.
              </p>
            </div>
            <div>
              {portrait && (
                <div className="artist-portrait">
                  <img src={portrait.src} alt="Jana Štěrbová Rejmanová" />
                </div>
              )}
              <div className="highlight-box">
                <p>
                  „Pokud pohled na umělěcké dílo v člověku vzbuzuje pocit krásy a lásky, pak je to dobré dílo. A o to se snažím."
                </p>
              </div>
            </div>
          </div>

          <h2 style={{ marginTop: '48px' }}>Zaměření tvorby</h2>
          <div className="info-cards">
            {disciplines.map((d) => (
              <div key={d.name} className="info-card">
                <span className="info-card-icon">{d.icon}</span>
                <h3>{d.name}</h3>
                <p>{d.desc}</p>
              </div>
            ))}
          </div>

          <h2 style={{ marginTop: '48px' }}>Ukázky prací</h2>
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

          <div className="page-back-link">
            <Link to="/" className="btn btn-secondary">← Zpět na hlavní stránku</Link>
          </div>
        </div>
      </section>
    </div>
  )
}
