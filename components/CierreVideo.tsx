'use client';

import { useEffect, useRef } from 'react';

// El video de la enfermera con el pin. Corre una vez al entrar en pantalla y se queda en su último cuadro.
export function CierreVideo() {
  const v = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const el = v.current;
    if (!el || document.documentElement.dataset.motion === 'reduced') return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) el.play().catch(() => {});
      else el.pause();
    }, { threshold: 0.35 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <video
      ref={v}
      className="cierre__video"
      src="/media/A-video-enfermera-v2.mp4"
      poster="/media/enfermera-poster.webp"
      muted
      playsInline
      preload="metadata"
      aria-hidden
    />
  );
}
