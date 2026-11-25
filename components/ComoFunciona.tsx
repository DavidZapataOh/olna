'use client';

// §3 Cómo funciona. La escena con pin: el scroll llena la "o" de 24 estratos (Rive, `aportes` = round(p × 24)) y el teléfono cambia de pantalla.
// En pantallas chicas corre una vez al entrar (4,6 s) y se repite con "Ver de nuevo".

import { useEffect, useRef, useState } from 'react';
import { RiveO } from './RiveO';
import { Phone } from './Phone';
import { ScreenAviso, ScreenCadencia, ScreenInicio } from './AppScreens';

const STEPS = [
  { t: 'Eliges cuánto y cada cuánto.', d: 'Desde $5.000 al día, en pesos. Sale de tu cuenta en Colombia cada quincena o cada mes, como te paguen.' },
  { t: 'El día antes, te avisamos.', d: 'Si esa quincena viene apretada, lo bajas o lo saltas.' },
  { t: 'Olna invierte. Tú la dejas quieta.', d: 'No tienes que abrir la app. Y no te cobramos por no abrirla.' },
];

const fmt = (n: number) => '$' + n.toLocaleString('es-CO');
const smooth = (p: number) => p * p * (3 - 2 * p);

export function ComoFunciona() {
  const scene = useRef<HTMLDivElement>(null);
  const [p, setP] = useState(0); // 0–1
  const [pinned, setPinned] = useState(true);
  const [playKey, setPlayKey] = useState(0);
  const rows = Math.round(p * 24);
  const step = p < 0.33 ? 0 : p < 0.66 ? 1 : 2;

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px) and (min-height: 700px)');
    const reduced = () => document.documentElement.dataset.motion === 'reduced';
    let raf = 0;
    let timer = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const el = scene.current;
        if (!el) return;
        const r = el.getBoundingClientRect();
        const total = r.height - window.innerHeight;
        const raw = Math.min(1, Math.max(0, -r.top / Math.max(1, total)));
        setP(smooth(raw));
      });
    };
    let io: IntersectionObserver | undefined;
    const setup = () => {
      window.removeEventListener('scroll', onScroll);
      io?.disconnect();
      if (reduced()) {
        setPinned(false);
        setP(1);
        return;
      }
      if (mq.matches) {
        setPinned(true);
        window.addEventListener('scroll', onScroll, { passive: true });
        onScroll();
      } else {
        setPinned(false);
        setP(0);
        io = new IntersectionObserver(
          ([e]) => {
            if (e.isIntersecting) {
              io?.disconnect();
              setPlayKey((k) => k + 1);
            }
          },
          { threshold: 0.4 },
        );
        if (scene.current) io.observe(scene.current);
      }
    };
    setup();
    mq.addEventListener('change', setup);
    return () => {
      mq.removeEventListener('change', setup);
      window.removeEventListener('scroll', onScroll);
      io?.disconnect();
      cancelAnimationFrame(raf);
      clearInterval(timer);
    };
  }, []);

  // reproducción por tiempo (móvil): 24 estratos, uno cada 190 ms
  useEffect(() => {
    if (!playKey) return;
    let n = 0;
    setP(0);
    const id = window.setInterval(() => {
      n++;
      setP(n / 24);
      if (n >= 24) clearInterval(id);
    }, 190);
    return () => clearInterval(id);
  }, [playKey]);

  return (
    <section id="como-funciona" className="sec sec--petrol como" aria-labelledby="como-h">
      <div ref={scene} className={`como__scene ${pinned ? 'is-pinned' : ''}`}>
        <div className="como__sticky">
          <div className="wrap como__grid">
            <div className="como__copy">
              <h2 id="como-h" className="h2">
                Lo programas una vez. Después pasa solo, <em>cada</em> quincena.
              </h2>
              <ol className="como__steps">
                {STEPS.map((s, i) => (
                  <li key={s.t} className={i === step ? 'is-on' : ''} aria-current={i === step ? 'step' : undefined}>
                    <span className="como__dot" aria-hidden>
                      <i style={{ transform: `scale(${Math.min(1, Math.max(0, (p - i * 0.33) / 0.33))})` }} />
                    </span>
                    <div>
                      <h3>{s.t}</h3>
                      <p>{s.d}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
            <div className="como__phone">
              <Phone>
                <div className={`como__screen ${step === 0 ? 'is-on' : ''}`}>
                  <ScreenCadencia />
                </div>
                <div className={`como__screen como__screen--down ${step === 1 ? 'is-on' : ''}`}>
                  <ScreenAviso />
                </div>
                <div className={`como__screen ${step === 2 ? 'is-on' : ''}`}>
                  <ScreenInicio filled={rows} />
                </div>
              </Phone>
              <p className="como__phonelabel">Pantalla simplificada. En la app también ves cuánto vale hoy tu plata.</p>
            </div>
            <figure className="como__o">
              <div className="como__o-canvas">
                {/* Rive: cada cambio de `aportes` deposita o retira estratos, y cada estrato que se asienta manda su pulso */}
                <RiveO className="como__o-rive" artboard="O500Oscuro" aportes={rows} fallbackPalette="petrol" />
              </div>
              <figcaption>
                <p className="como__count num">
                  <span>Aporte {Math.max(1, rows)}</span>
                  <strong>Llevas {fmt(Math.max(1, rows) * 75000)} puestos</strong>
                </p>
                <p className="como__legend">Ejemplo ilustrativo: muestra lo que pones, no lo que gana.</p>
                <span className="sr-only">Ilustración: cada aporte agrega una capa. Con 24 aportes de $75.000, pusiste $1.800.000.</span>
              </figcaption>
              {!pinned ? (
                <button type="button" className="ghost-btn como__replay" onClick={() => setPlayKey((k) => k + 1)}>
                  Ver de nuevo
                </button>
              ) : null}
            </figure>
          </div>
        </div>
      </div>
    </section>
  );
}
