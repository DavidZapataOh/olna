'use client';

// §6 Dónde está tu plata. Pestañas con la pantalla real de cada respuesta.
import { useId, useRef, useState } from 'react';
import { Phone } from './Phone';
import { ScreenInicio, ScreenRetiro, ScreenVerificar } from './AppScreens';
import { Wordmark } from './Wordmark';

function Arrow() {
  return (
    <svg className="arrow" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M4 10h11M11 5.5 15.5 10 11 14.5" />
    </svg>
  );
}

const TABS = ['A tu nombre', 'Cómo sacas tu plata', 'Compruébalo', 'Quién responde'] as const;

export function TuPlata() {
  const [tab, setTab] = useState(0);
  const id = useId();
  const refs = useRef<(HTMLButtonElement | null)[]>([]);

  function onKey(e: React.KeyboardEvent, i: number) {
    let n = i;
    if (e.key === 'ArrowRight') n = (i + 1) % TABS.length;
    else if (e.key === 'ArrowLeft') n = (i - 1 + TABS.length) % TABS.length;
    else if (e.key === 'Home') n = 0;
    else if (e.key === 'End') n = TABS.length - 1;
    else return;
    e.preventDefault();
    setTab(n);
    refs.current[n]?.focus();
  }

  return (
    <section id="tu-plata" className="sec sec--clay-deep plata" aria-labelledby="plata-h">
      <div className="wrap">
        <h2 id="plata-h" className="h2 plata__h" data-reveal>
          Tu plata, a tu nombre. Y lo puedes <em>comprobar</em>.
        </h2>
        <div className="tabs" role="tablist" aria-label="Dónde está tu plata" data-reveal>
          {TABS.map((t, i) => (
            <button
              key={t}
              ref={(el) => {
                refs.current[i] = el;
              }}
              role="tab"
              id={`${id}-t${i}`}
              aria-selected={tab === i}
              aria-controls={`${id}-p${i}`}
              tabIndex={tab === i ? 0 : -1}
              className="tab"
              onClick={() => setTab(i)}
              onKeyDown={(e) => onKey(e, i)}
            >
              {t}
            </button>
          ))}
        </div>

        <div className="plata__stage">
          <div className="plata__panels">
            <div role="tabpanel" id={`${id}-p0`} aria-labelledby={`${id}-t0`} hidden={tab !== 0} className="panel">
              <p className="panel__big">Nosotros no guardamos tu plata. Tu inversión está en tu cuenta, a tu nombre.</p>
              <p>
                Lo que va en camino, por unas horas, está en un contrato público sin dueño. Solo te lo puede entregar a ti. Eso se llama auto custodia.
              </p>
              <p className="panel__note">Es exposición económica al S&amp;P&nbsp;500, respaldada 1:1 por el emisor. No está cubierta por Fogafín.</p>
              <a className="panel__link" href="#preguntas">
                Si Olna deja de existir, así la recuperas <Arrow />
              </a>
            </div>
            <div role="tabpanel" id={`${id}-p1`} aria-labelledby={`${id}-t1`} hidden={tab !== 1} className="panel">
              <ol className="flow">
                <li>Vendemos.</li>
                <li>Cambiamos a pesos, con la tasa al lado de la TRM.</li>
                <li>Llega a tu cuenta en Colombia.</li>
              </ol>
              <p className="panel__big">Sin comisión nuestra.</p>
              <p>Antes de tu primer aporte, te mostramos cuánto tarda.</p>
            </div>
            <div role="tabpanel" id={`${id}-p2`} aria-labelledby={`${id}-t2`} hidden={tab !== 2} className="panel">
              <p className="panel__big">Compruébalo sin confiar en nosotros.</p>
              <ul className="checks">
                <li>Tu saldo está en la prueba de esta semana</li>
                <li>Lo de tus aportes está en tu cuenta</li>
                <li>Olna no guarda plata de nadie</li>
              </ul>
              <a className="panel__link" href="#preguntas">
                Ver cómo se verifica <Arrow />
              </a>
              <p className="panel__note">Demostración. En la app lo haces con tu propia cuenta.</p>
            </div>
            <div role="tabpanel" id={`${id}-p3`} aria-labelledby={`${id}-t3`} hidden={tab !== 3} className="panel">
              <p className="panel__big">Olna todavía no opera ni recibe plata.</p>
              <p>
                Estamos cerrando el acuerdo con una entidad vigilada por la Superintendencia Financiera de Colombia. Aquí pondremos su nombre cuando esté firmado.
              </p>
              <p className="panel__note">Empresa: [razón social] · NIT [—] · [ciudad] · hola@olna.co</p>
            </div>
          </div>

          <div className="plata__phone" aria-hidden={tab === 3}>
            <Phone>
              <div className={`como__screen ${tab === 0 ? 'is-on' : ''}`}>
                <ScreenInicio filled={24} />
              </div>
              <div className={`como__screen ${tab === 1 ? 'is-on' : ''}`}>
                <ScreenRetiro />
              </div>
              <div className={`como__screen ${tab === 2 ? 'is-on' : ''}`}>
                <ScreenVerificar />
              </div>
              <div className={`como__screen ${tab === 3 ? 'is-on' : ''}`}>
                <div className="scr scr--seal">
                  <Wordmark className="scr-seal__logo" title={null} />
                  <p>Lista de espera</p>
                  <span>Todavía no recibimos plata.</span>
                </div>
              </div>
            </Phone>
          </div>
        </div>
      </div>
    </section>
  );
}
