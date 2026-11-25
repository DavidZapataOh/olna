import { Waitlist } from './Waitlist';
import { Wordmark } from './Wordmark';
import { CierreVideo } from './CierreVideo';

// §9 Cierre y pie.
export function Cierre() {
  return (
    <>
      <section id="lista" className="sec sec--petrol cierre" aria-labelledby="cierre-h">
        <div className="wrap cierre__grid">
          <div className="cierre__copy">
            <h2 id="cierre-h" className="display" data-reveal>
              <span><em>Poquito</em> a poco.</span> <span>Déjala quieta.</span>
            </h2>
            <p className="lead cierre__line" data-reveal>
              El S&amp;P&nbsp;500, en automático, desde $5.000 al día.
            </p>
            <div className="cierre__form" data-reveal>
              <Waitlist variant="close" startOpen />
              <p className="cierre__risk">Invertir tiene riesgo: tu plata puede subir o bajar.</p>
            </div>
          </div>
          <div className="cierre__media" data-reveal>
            <CierreVideo />
            <span className="tag">Imagen ilustrativa</span>
          </div>
        </div>
      </section>

      <footer className="foot" id="legal">
        <div className="wrap">
          <Wordmark className="foot__mark" />
          <nav className="foot__links" aria-label="Pie de página">
            <a href="#como-funciona">Cómo funciona</a>
            <a href="#costos">Cuánto cuesta</a>
            <a href="#tu-plata">Custodia</a>
            <a href="#preguntas">Preguntas</a>
            <a href="#legal">Política de tratamiento de datos</a>
            <a href="#legal" data-cookie-settings>
              Privacidad y cookies
            </a>
            <a href="#legal">Términos</a>
          </nav>
          <p className="foot__legal">
            Olna todavía no presta servicios de inversión ni recibe dinero. Esta página describe un producto en construcción; sus condiciones pueden cambiar y quedarán en los términos que aceptes. Invertir tiene riesgo: el valor de tu inversión puede subir o bajar y puedes recibir menos de lo que pusiste. Lo que pasó antes no garantiza lo que viene. Nada en esta página es una recomendación personal de inversión. Las imágenes de personas son ilustrativas y no muestran clientes. S&amp;P 500 es una marca de sus respectivos dueños; Olna no está afiliada a ellos.
          </p>
          <p className="foot__data">[razón social] · NIT [—] · [dirección] · hola@olna.co</p>
        </div>
      </footer>
    </>
  );
}
