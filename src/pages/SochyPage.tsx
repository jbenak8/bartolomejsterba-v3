import { FigureIcon, ColumnIcon, TreeIcon } from '../components/Icons'
import './PageStyles.css'

const types = [
  { icon: <FigureIcon size={44} />, name: 'Figurální sochy', desc: 'Lidské a zvířecí portréty, busty a celé postavy z kamene či dřeva' },
  { icon: <ColumnIcon size={44} />, name: 'Architektonické prvky', desc: 'Ozdobné hlavice, reliéfy, konzoly a další kamenné dekorace' },
  { icon: <TreeIcon size={44} />, name: 'Zahradní sochy', desc: 'Dekorativní prvky do zahrad, parků a veřejných prostranství' },
]

const galleryImages = [
  { src: 'https://www.bartolomejsterba.cz/galerie/sochy/2.jpg', alt: 'Dřevěná socha' },
  { src: 'https://www.bartolomejsterba.cz/galerie/sochy/5.jpg', alt: 'Řezbářské dílo' },
  { src: 'https://www.bartolomejsterba.cz/galerie/sochy/8.jpg', alt: 'Socha z pískovce' },
  { src: 'https://www.bartolomejsterba.cz/galerie/sochy/17.jpg', alt: 'Figurální socha' },
  { src: 'https://www.bartolomejsterba.cz/galerie/sochy/21.jpg', alt: 'Kamenná socha' },
  { src: 'https://www.bartolomejsterba.cz/galerie/sochy/25.jpg', alt: 'Dřevořezba' },
  { src: 'https://www.bartolomejsterba.cz/galerie/sochy/30.jpg', alt: 'Betlém' },
  { src: 'https://www.bartolomejsterba.cz/galerie/sochy/35.jpg', alt: 'Architektonický prvek' },
  { src: 'https://www.bartolomejsterba.cz/galerie/sochy/40.jpg', alt: 'Lovecký motiv' },
]

export default function SochyPage() {
  return (
    <div>
      <section className="page-hero">
        <div className="container">
          <h1>Sochy a sochařská díla</h1>
          <hr className="section-divider" />
          <p>
            Originální sochařská díla z kamene, pískovce i dřeva — od monumentálních
            soch po drobné figurky do interiéru i exteriéru.
          </p>
        </div>
      </section>

      <section className="page-content">
        <div className="container">
          <div className="content-grid">
            <div>
              <h2>Umění v kameni</h2>
              <p>
                Sochy jsou zajímavým prvkem uměleckého díla. Na rozdíl od malby
                jsou plně trojrozměrné, což zesiluje vnímání tohoto druhu umění.
                Historicky jsou sochy přítomny v naší kultuře již velmi dlouho,
                například Věstonická Venuše, a provázejí nás v různých podobách
                dodnes.
              </p>
              <p>
                V soše lze vyjádřit téměř cokoliv — od lidského či zvířecího
                portrétu po umělcovy pocity. Používají se různé materiály jako
                kámen, kov, sklo, hlína nebo různé imitace. My převážně
                používáme pískovec a dřevo. Můžeme však vytvořit sochy
                i z opuky nebo velmi vzácného bílého mramoru.
              </p>
            </div>
            <div>
              <div className="highlight-box">
                <p>
                  „Ať už si vyberete velkolepou kamennou sochu nadživotní
                  velikosti nebo drobnou dřevěnou figurku, vaše volba bude
                  velmi stylovým doplňkem jak do interiéru, tak do exteriéru."
                </p>
              </div>
            </div>
          </div>

          <h2 style={{ marginTop: '48px' }}>Druhy sochařských děl</h2>
          <div className="info-cards">
            {types.map((t) => (
              <div key={t.name} className="info-card">
                <span className="info-card-icon">{t.icon}</span>
                <h3>{t.name}</h3>
                <p>{t.desc}</p>
              </div>
            ))}
          </div>

          <h2 style={{ marginTop: '48px' }}>Ukázky prací</h2>
          <div className="gallery-grid">
            {galleryImages.map((img) => (
              <div key={img.src} className="gallery-item gallery-item--real">
                <img src={img.src} alt={img.alt} loading="lazy" />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
