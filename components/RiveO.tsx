'use client';

// La "o" de 500 cuentas en Rive (brand/rive/o500, firmado con `rive . --publish`).
// Toda la lógica vive en el script Luau del archivo; aquí solo se escriben las propiedades del view model `O500`:
//   aportes (número 0–24) · aporte (trigger) · diaRojo (trigger) · reducido (booleano)
// Se carga cuando se acerca a la pantalla, se pausa fuera de ella y, si el runtime o el archivo fallan
// (o el canvas queda en blanco porque el script no corrió), muestra la "o" en canvas de siempre (BeadO).

import { forwardRef, useEffect, useImperativeHandle, useRef, useState, type ReactNode } from 'react';
import type { Rive } from '@rive-app/canvas';
import { BeadO } from './BeadO';

export type RiveOHandle = {
  /** Un estrato más, con el pulso suave. Con 24 estratos solo hace el pulso. */
  aporte: () => void;
  /** Estado quieto del día rojo. Dura hasta el siguiente aporte o cambio de `aportes`. */
  diaRojo: () => void;
};

type Props = {
  artboard?: 'O500' | 'O500Oscuro' | 'Pin' | 'Hero';
  /** Estratos llenos, 0–24. Un cambio se anima estrato por estrato dentro del archivo. */
  aportes?: number;
  className?: string;
  /** Texto accesible. Sin él, la ilustración queda oculta para lectores de pantalla. */
  label?: string;
  /** Qué mostrar si Rive no carga. Por defecto, la "o" en canvas (BeadO). */
  fallback?: ReactNode;
  fallbackPalette?: 'screen' | 'petrol' | 'pin' | 'sand';
  /** Se llama una vez, cuando el archivo cargó y ya pintó. */
  onReady?: () => void;
};

let warned = false;
function warnOnce(msg: string, err?: unknown) {
  if (warned || process.env.NODE_ENV === 'production') return;
  warned = true;
  console.warn(`[RiveO] ${msg}. Se usa la "o" en canvas.`, err ?? '');
}

const clampAportes = (n: number) => Math.max(0, Math.min(24, Math.round(n)));

// ¿El canvas tiene algo más que el fondo crema? Si el script Luau no corrió, solo se pinta el relleno del artboard.
function looksBlank(c: HTMLCanvasElement) {
  if (!c.width || !c.height) return false; // sin tamaño todavía: no se puede saber
  const s = document.createElement('canvas');
  s.width = s.height = 24;
  const g = s.getContext('2d', { willReadFrequently: true });
  if (!g) return false;
  g.drawImage(c, 0, 0, 24, 24);
  const d = g.getImageData(0, 0, 24, 24).data;
  let min = 255;
  let max = 0;
  for (let i = 0; i < d.length; i += 4) {
    const l = (d[i] * 3 + d[i + 1] * 6 + d[i + 2]) / 10;
    if (l < min) min = l;
    if (l > max) max = l;
  }
  return max - min < 12;
}

export const RiveO = forwardRef<RiveOHandle, Props>(function RiveO(
  { artboard = 'O500', aportes = 24, className, label, fallback, fallbackPalette = 'sand', onReady },
  ref,
) {
  const box = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const rive = useRef<Rive | null>(null);
  const loaded = useRef(false);
  const aportesRef = useRef(clampAportes(aportes));
  const onReadyRef = useRef(onReady);
  onReadyRef.current = onReady;
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);

  aportesRef.current = clampAportes(aportes);

  useImperativeHandle(
    ref,
    () => ({
      aporte: () => rive.current?.viewModelInstance?.trigger('aporte')?.trigger(),
      diaRojo: () => rive.current?.viewModelInstance?.trigger('diaRojo')?.trigger(),
    }),
    [],
  );

  // aportes → view model (el script anima la diferencia)
  useEffect(() => {
    if (!loaded.current) return;
    const p = rive.current?.viewModelInstance?.number('aportes');
    if (p && p.value !== aportesRef.current) p.value = aportesRef.current;
  }, [aportes]);

  useEffect(() => {
    const el = box.current!;
    const cv = canvas.current!;
    let cancelled = false;
    let checkTimer = 0;
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const fail = (msg: string, err?: unknown) => {
      if (cancelled) return;
      warnOnce(msg, err);
      rive.current?.cleanup();
      rive.current = null;
      loaded.current = false;
      setFailed(true);
    };
    const setReduced = () => {
      const b = rive.current?.viewModelInstance?.boolean('reducido');
      if (b) b.value = mq.matches;
    };

    // pausa fuera de pantalla
    const vis = new IntersectionObserver(([e]) => {
      const r = rive.current;
      if (!r || !loaded.current) return;
      if (e.isIntersecting) r.startRendering();
      else r.stopRendering();
    });

    const load = new IntersectionObserver(
      async ([e]) => {
        if (!e.isIntersecting || rive.current) return;
        load.disconnect();
        try {
          const { Rive, Layout, Fit, Alignment, RuntimeLoader } = await import('@rive-app/canvas');
          RuntimeLoader.setWasmUrl('/rive/rive.wasm');
          if (cancelled) return;
          const r = new Rive({
            src: '/rive/o500.riv',
            canvas: cv,
            artboard,
            stateMachine: 'Olna',
            autoplay: true,
            autoBind: true,
            shouldDisableRiveListeners: true,
            layout: new Layout({ fit: Fit.Layout, alignment: Alignment.Center }),
            onLoad: () => {
              if (cancelled) return;
              const vmi = r.viewModelInstance;
              const n = vmi?.number('aportes');
              if (!vmi || !n) return fail('El archivo cargó sin el view model O500');
              // valor inicial antes del primer avance: el script lo pinta sin animar
              n.value = aportesRef.current;
              setReduced();
              r.resizeDrawingSurfaceToCanvas();
              loaded.current = true;
              vis.observe(el);
              // si el script Luau no corrió (sin firma, runtime viejo), solo queda el fondo crema
              checkTimer = window.setTimeout(() => {
                if (cancelled) return;
                if (looksBlank(cv)) return fail('El canvas de Rive quedó en blanco (¿script sin firmar?)');
                setReady(true);
                onReadyRef.current?.();
              }, 450);
            },
            onLoadError: (ev) => fail('No se pudo cargar o500.riv', ev?.data),
          });
          rive.current = r;
        } catch (err) {
          fail('No se pudo cargar el runtime de Rive', err);
        }
      },
      { rootMargin: '400px 0px' },
    );
    load.observe(el);

    const ro = new ResizeObserver(() => {
      if (loaded.current) rive.current?.resizeDrawingSurfaceToCanvas();
    });
    ro.observe(cv);
    mq.addEventListener('change', setReduced);

    return () => {
      cancelled = true;
      clearTimeout(checkTimer);
      load.disconnect();
      vis.disconnect();
      ro.disconnect();
      mq.removeEventListener('change', setReduced);
      rive.current?.cleanup();
      rive.current = null;
      loaded.current = false;
    };
  }, [artboard]);

  if (failed) {
    return (
      <div className={`riveo riveo--fallback ${className ?? ''}`}>
        {fallback ?? <BeadO palette={fallbackPalette} filled={aportes} from={0} label={label} />}
      </div>
    );
  }

  return (
    <div
      ref={box}
      className={`riveo ${className ?? ''}`}
      data-ready={ready}
      role={label ? 'img' : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
    >
      <canvas ref={canvas} className="riveo__canvas" />
    </div>
  );
});
