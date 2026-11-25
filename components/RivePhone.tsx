'use client';

// La escena Rive "¿Cuánto al día?" (brand/rive/heroTelefono). No usa scripts, así que corre en la web sin firma.
// Se monta cuando entra en pantalla (arranca sola al cargar) y "Ver de nuevo" dispara el trigger `repetir`.

import { useEffect, useRef, useState } from 'react';
import type { Rive } from '@rive-app/canvas';

export function RivePhone({ className }: { className?: string }) {
  const box = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const rive = useRef<Rive | null>(null);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const el = box.current!;
    let cancelled = false;
    const io = new IntersectionObserver(
      async ([e]) => {
        if (!e.isIntersecting || rive.current) return;
        io.disconnect();
        try {
          const { Rive, Layout, Fit, Alignment, RuntimeLoader } = await import('@rive-app/canvas');
          // sin peticiones a terceros: el wasm se sirve desde el mismo dominio
          RuntimeLoader.setWasmUrl('/rive/rive.wasm');
          if (cancelled || !canvas.current) return;
          const reduced = document.documentElement.dataset.motion === 'reduced';
          if (reduced) {
            // movimiento reducido: el cuadro final como imagen
            setFailed(true);
            return;
          }
          const r = new Rive({
            src: '/rive/heroTelefono.riv',
            canvas: canvas.current,
            stateMachine: 'Olna',
            autoplay: true,
            autoBind: true,
            layout: new Layout({ fit: Fit.Contain, alignment: Alignment.Center }),
            onLoad: () => {
              r.resizeDrawingSurfaceToCanvas();
              setReady(true);
            },
            onLoadError: () => setFailed(true),
          });
          rive.current = r;
        } catch {
          setFailed(true);
        }
      },
      { rootMargin: '0px 0px -15% 0px' },
    );
    io.observe(el);
    const onResize = () => rive.current?.resizeDrawingSurfaceToCanvas();
    window.addEventListener('resize', onResize);
    return () => {
      cancelled = true;
      io.disconnect();
      window.removeEventListener('resize', onResize);
      rive.current?.cleanup();
      rive.current = null;
    };
  }, []);

  function replay() {
    const vmi = rive.current?.viewModelInstance;
    const t = vmi?.trigger('repetir');
    if (t) t.trigger();
    else rive.current?.reset({ stateMachine: 'Olna', autoplay: true, autoBind: true });
  }

  return (
    <div ref={box} className={`rivephone ${className ?? ''}`} data-ready={ready} data-failed={failed}>
      <canvas ref={canvas} className="rivephone__canvas" aria-hidden />
      <img className="rivephone__poster" src="/brand/rive-telefono-final.png" alt="" aria-hidden />
      <span className="sr-only">
        Animación de la app: eliges $5.000 al día, que son $75.000 cada quincena con una comisión de $750, eliges el S&amp;P 500 y queda tu aporte programado.
      </span>
      <button type="button" className="rivephone__replay" onClick={replay} disabled={!ready}>
        <svg viewBox="0 0 20 20" aria-hidden fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3.5 10a6.5 6.5 0 1 0 2-4.7" />
          <path d="M3.5 3.5v3.6h3.6" />
        </svg>
        Ver de nuevo
      </button>
    </div>
  );
}
