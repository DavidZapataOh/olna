'use client';

// Barra fija, entradas por scroll y consentimiento. Un solo IntersectionObserver para [data-reveal].
import { useEffect, useState } from 'react';
import { Wordmark } from './Wordmark';

export function StickyNav() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const hero = document.getElementById('inicio');
    if (!hero) return;
    const io = new IntersectionObserver(([e]) => setShow(!e.isIntersecting), { rootMargin: '-120px 0px 0px 0px' });
    io.observe(hero);
    return () => io.disconnect();
  }, []);
  return (
    <div className={`bar ${show ? 'is-on' : ''}`} aria-hidden={!show}>
      <div className="bar__inner">
        <a href="#inicio" className="bar__logo" aria-label="Olna, inicio" tabIndex={show ? 0 : -1}>
          <Wordmark title={null} />
        </a>
        <nav className="bar__links" aria-label="Secciones">
          <a href="#como-funciona" tabIndex={show ? 0 : -1}>Cómo funciona</a>
          <a href="#sp500" tabIndex={show ? 0 : -1}>Qué compras</a>
          <a href="#preguntas" tabIndex={show ? 0 : -1}>Preguntas</a>
        </nav>
        <a href="#lista" className="bar__cta" tabIndex={show ? 0 : -1}>
          <span className="bar__cta-full">Avísame cuando abra</span>
          <span className="bar__cta-short">Avísame</span>
        </a>
      </div>
    </div>
  );
}

export function Reveal() {
  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]'));
    const vh = window.innerHeight;
    // lo que ya está en pantalla al cargar aparece sin animar
    for (const el of els) if (el.getBoundingClientRect().top < vh) el.classList.add('is-in', 'is-instant');
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          const el = e.target as HTMLElement;
          const sibs = el.parentElement ? Array.from(el.parentElement.children).filter((c) => c.hasAttribute('data-reveal')) : [];
          const idx = Math.min(4, Math.max(0, sibs.indexOf(el)));
          el.style.setProperty('--stagger', `${idx * 90}ms`);
          el.classList.add('is-in');
          io.unobserve(el);
        }
      },
      { rootMargin: '0px 0px -10% 0px' },
    );
    els.forEach((el) => !el.classList.contains('is-in') && io.observe(el));
    document.documentElement.classList.add('reveal-ready');
    return () => io.disconnect();
  }, []);
  return null;
}

const KEY = 'olna-consent';

/** Analítica solo con consentimiento (Ley 1581). Hasta decidir: cero cookies no necesarias y cero terceros. */
export function Consent() {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const v = localStorage.getItem(KEY);
    if (!v) setOpen(true);
    else if (v === 'si') loadAnalytics();
    const onClick = (e: Event) => {
      const t = (e.target as HTMLElement).closest('[data-cookie-settings]');
      if (t) {
        e.preventDefault();
        setOpen(true);
      }
    };
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, []);
  function decide(v: 'si' | 'no') {
    localStorage.setItem(KEY, v);
    setOpen(false);
    if (v === 'si') loadAnalytics();
  }
  if (!open) return null;
  return (
    <div className="consent" role="region" aria-label="Analítica">
      <p>
        Usamos analítica para mejorar esta página, solo si nos dejas. <a href="#legal">Política de tratamiento de datos</a>
      </p>
      <div className="consent__actions">
        <button type="button" onClick={() => decide('si')}>
          Aceptar
        </button>
        <button type="button" onClick={() => decide('no')}>
          Rechazar
        </button>
      </div>
    </div>
  );
}

// Punto de integración PostHog (LANDING_OLNA.md §6.4): instalar posthog-js, poner NEXT_PUBLIC_POSTHOG_KEY
// y hacer aquí el import dinámico con api_host '/ingest', autocapture false y sin grabación de sesión.
function loadAnalytics() {
  if (!process.env.NEXT_PUBLIC_POSTHOG_KEY) return;
}
