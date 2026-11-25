'use client';

// §7 Tú mandas, y el día rojo. El aviso de víspera funciona: Listo, Bajar y Saltar responden de verdad.
import { useEffect, useRef, useState } from 'react';
import { Phone } from './Phone';
import { ScreenDiaRojo } from './AppScreens';
import { Wordmark } from './Wordmark';
import { RiveO, type RiveOHandle } from './RiveO';

type Estado = 'aviso' | 'listo' | 'bajado' | 'saltado';

export function TuMandas() {
  const [estado, setEstado] = useState<Estado>('aviso');
  const [monto, setMonto] = useState(75000);
  const video = useRef<HTMLVideoElement>(null);
  // Día rojo: cuando la tarjeta está a la vista y la "o" ya cargó, se dispara `diaRojo`.
  // La "o" deja de respirar y se enfría, pero no pierde ningún punto: lo puesto sigue ahí.
  const rojoCard = useRef<HTMLDivElement>(null);
  const rojoO = useRef<RiveOHandle>(null);
  const rojoState = useRef({ ready: false, seen: false, fired: false, timer: 0 });
  const tryRojo = () => {
    const st = rojoState.current;
    if (st.fired || !st.ready || !st.seen) return;
    st.fired = true;
    st.timer = window.setTimeout(() => rojoO.current?.diaRojo(), 900);
  };

  useEffect(() => {
    const el = rojoCard.current;
    if (!el) return;
    const st = rojoState.current;
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      st.seen = true;
      io.disconnect();
      tryRojo();
    }, { threshold: 0.6 });
    io.observe(el);
    return () => {
      io.disconnect();
      clearTimeout(st.timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const v = video.current;
    if (!v) return;
    if (document.documentElement.dataset.motion === 'reduced') return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) v.play().catch(() => {});
      else v.pause();
    }, { threshold: 0.3 });
    io.observe(v);
    return () => io.disconnect();
  }, []);

  const msg: Record<Estado, string> = {
    aviso: `Mañana invertimos $${monto.toLocaleString('es-CO')} de tu cuenta.`,
    listo: `Listo. Mañana invertimos $${monto.toLocaleString('es-CO')}.`,
    bajado: `Mañana invertimos $${monto.toLocaleString('es-CO')} de tu cuenta.`,
    saltado: 'Listo, saltamos este aporte. Tu plan sigue el 30.',
  };

  return (
    <section id="tu-mandas" className="sec sec--petrol mandas" aria-labelledby="mandas-h">
      <div className="wrap mandas__grid">
        <div className="mandas__copy">
          <h2 id="mandas-h" className="h2" data-reveal>
            Si el mes viene malo, bajas. No paras.
          </h2>
          <p className="lead" data-reveal>
            Cada aporte es una instrucción tuya. Puedes bajarlo, saltarlo o pausarlo hasta la fecha que elijas. Cancelar toma los mismos pasos que empezar.
          </p>
          <ul className="controls" aria-label="Lo que puedes hacer con cada aporte" data-reveal>
            <li>Bajar</li>
            <li>Saltar</li>
            <li>Pausar</li>
            <li>Cancelar</li>
          </ul>
        </div>

        <div className="mandas__scene" data-reveal>
          <video
            ref={video}
            className="mandas__video"
            src="/media/B-video-bus-recortado.mp4"
            poster="/media/bus-poster.webp"
            muted
            playsInline
            preload="metadata"
            aria-hidden
          />
          <span className="tag">Imagen ilustrativa</span>
          <div className="notif" role="group" aria-label="Ejemplo del aviso del día antes">
            <div className="notif__head">
              <span className="notif__icon">
                <Wordmark title={null} />
              </span>
              <span>Olna</span>
              <span className="notif__when">ahora</span>
            </div>
            <p className="notif__msg" aria-live="polite">
              {msg[estado]}
            </p>
            {estado === 'aviso' || estado === 'bajado' ? (
              <div className="notif__actions">
                <button type="button" onClick={() => setEstado('listo')}>
                  Listo
                </button>
                <button
                  type="button"
                  disabled={monto <= 25000}
                  onClick={() => {
                    setMonto((m) => Math.max(25000, m - 25000));
                    setEstado('bajado');
                  }}
                >
                  Bajar
                </button>
                <button type="button" onClick={() => setEstado('saltado')}>
                  Saltar esta vez
                </button>
              </div>
            ) : (
              <button
                type="button"
                className="notif__undo"
                onClick={() => {
                  setEstado('aviso');
                  setMonto(75000);
                }}
              >
                Volver a ver el aviso
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="wrap rojo">
        <div className="rojo__copy">
          <h3 className="h3" data-reveal>
            ¿Y el día rojo?
          </h3>
          <p className="lead" data-reveal>
            Habrá días en que el mercado baje, y tu plata con él. Te lo contamos con calma. Tú decides si sigues, bajas o pausas.
          </p>
          <div ref={rojoCard} className="rojo__card rojo__card--o" data-reveal>
            <RiveO
              ref={rojoO}
              className="rojo__o"
              aportes={6}
              onReady={() => {
                rojoState.current.ready = true;
                tryRojo();
              }}
            />
            <p>
              Hoy el mercado bajó. Tu plata también: <strong className="num">−$7.200 (−1,6&nbsp;%)</strong>. Tu aporte de esta quincena compra a un precio más bajo.
            </p>
            <span>Así te lo contamos en la app.</span>
          </div>
          <p className="fineprint" data-reveal>
            En pesos, 4 de cada 10 meses del S&amp;P&nbsp;500 cerraron en rojo (dic-1991 a oct-2026). Lo que pasó antes no garantiza lo que viene.
          </p>
        </div>
        <div className="rojo__phone" data-reveal>
          <Phone>
            <ScreenDiaRojo />
          </Phone>
        </div>
      </div>
    </section>
  );
}
