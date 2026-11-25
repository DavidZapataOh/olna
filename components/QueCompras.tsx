import { BeadO } from './BeadO';
import { RiveO } from './RiveO';
import { EmpresaIcono } from './EmpresaIcono';
import { HERO_EMPRESAS } from '@/lib/empresas';

const PIN_LABEL = 'La o de Olna hecha con 500 puntos, uno por cada empresa del S&P 500.';

// §5 Qué compras. La "o" de 500 puntos explicada: el pin gigante, artboard `Pin` de Rive (en reposo: el archivo no
// tiene entradas de puntero). Si Rive falla, vuelve el pin en código que reacciona al puntero.
export function QueCompras() {
  return (
    <section id="sp500" className="sec sec--petrol compras" aria-labelledby="compras-h">
      <div className="wrap compras__grid">
        <div className="compras__art" data-reveal>
          <div className="bigpin">
            <RiveO
              artboard="Pin"
              aportes={24}
              className="bigpin__rive"
              label={PIN_LABEL}
              fallback={
                <>
                  <div className="bigpin__disc" aria-hidden />
                  <div className="bigpin__beads">
                    <BeadO palette="pin" filled={24} interactive label={PIN_LABEL} />
                  </div>
                </>
              }
            />
          </div>
          <p className="compras__caption">Por eso la o de Olna tiene 500 puntos.</p>
        </div>
        <div className="compras__copy">
          <h2 id="compras-h" className="h2" data-reveal>
            500 empresas de EE.&nbsp;UU., en un solo aporte.
          </h2>
          <p className="lead" data-reveal>
            Eso es el S&amp;P&nbsp;500. No tienes que elegir acciones ni comprar una entera: cada aporte va a las 500 a la vez.
          </p>
          <p className="compras__honest" data-reveal>
            Si a una le va mal, es una entre 500. Si cae el mercado, caen casi todas.
          </p>
          <div className="riesgo" data-reveal>
            <p className="riesgo__label">
              <strong>Riesgo 6 de 7</strong> · Sube y baja bastante
            </p>
            <ol className="riesgo__scale" aria-hidden>
              {[1, 2, 3, 4, 5, 6, 7].map((n) => (
                <li key={n} className={n === 6 ? 'is-on' : ''}>
                  {n}
                </li>
              ))}
            </ol>
          </div>
          <details className="more" data-reveal>
            <summary>¿Qué tengo exactamente?</summary>
            <p>
              Exposición económica al S&amp;P&nbsp;500, a través del fondo SPY, respaldada 1:1 por el emisor. No es una acción a tu nombre en una bolsa. Puede subir o bajar.
            </p>
          </details>
          <div className="top10">
            <p className="top10__title">Entre ellas</p>
            <ul className="top10__logos">
              {HERO_EMPRESAS.map((e) => (
                <li key={e.nombre}>
                  <EmpresaIcono e={e} />
                  <span>{e.nombre}</span>
                </li>
              ))}
              <li className="top10__mas">y 495 más</li>
            </ul>
            <p className="fineprint">Olna no está afiliada a estas empresas; sus marcas son de sus dueños.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
