import { BeadO } from './BeadO';
import { Symbol } from './Wordmark';

// §2 El problema. Campo de arcilla: la frase grande y la gente común con el pin.
const PEOPLE = [
  { src: '/people/A-retrato-1-1.webp', who: 'Enfermera', pos: '42% 30%' },
  { src: '/people/A-retrato-3-1.webp', who: 'Diseñadora', pos: '55% 30%' },
  { src: '/people/A-retrato-4-1.webp', who: 'Profesor', pos: '50% 26%' },
  { src: '/people/A-retrato-2-2.webp', who: 'Mensajero', pos: '52% 28%' },
  { src: '/people/A-retrato-5-1.webp', who: 'Barista', pos: '45% 30%' },
  { src: '/people/A-retrato-6-1.webp', who: 'Estudiante', pos: '58% 30%' },
];

export function Problema() {
  return (
    <section className="sec sec--clay problema" aria-labelledby="problema-h">
      <div className="wrap">
        <h2 id="problema-h" className="problema__h" data-reveal>
          Invertir parece cosa de expertos, de mucha plata <span className="problema__o"><span className="sr-only">o</span><Symbol /></span> de estafa.
        </h2>
        <div className="problema__grid">
          <p className="problema__body" data-reveal>
            Y quien empieza solo se cansa o se asusta el primer día rojo. <strong>Olna es al revés: en automático, poquito a poco y a la vista.</strong>
          </p>
          <div className="problema__pin" data-reveal>
            <span className="pin" aria-hidden>
              <BeadO palette="pin" filled={24} interactive />
            </span>
            <p>Un punto por cada empresa del S&amp;P&nbsp;500.</p>
          </div>
        </div>
      </div>
      <ul className="people" aria-label="Personas comunes con el pin de Olna (imágenes ilustrativas)">
        {PEOPLE.map((p, i) => (
          <li key={p.src} className="people__item" style={{ ['--i' as string]: i }}>
            <img src={p.src} alt={`Imagen ilustrativa: ${p.who.toLowerCase()} con el pin de Olna`} loading="lazy" style={{ objectPosition: p.pos }} />
            <span className="people__who">{p.who}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
