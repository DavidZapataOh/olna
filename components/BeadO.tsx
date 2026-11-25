'use client';

// La "o" de 500 cuentas: una por empresa del S&P 500, 24 estratos (uno por quincena).
// Canvas 2D sin librerías. Se llena de abajo hacia arriba; cada cuenta cae y se asienta.
// Punto de integración Rive: cuando `o500.riv` esté firmado (`rive brand/rive/o500 --publish`),
// este componente puede cambiarse por el artboard `O500` con `aportes` = filled (ver README de Rive).

import { useEffect, useRef } from 'react';
import beads from '@/lib/beads.json';

type Palette = 'screen' | 'petrol' | 'pin' | 'sand';

const PALETTES: Record<Palette, { pending: string | null; pendingAlpha: number; fill: string; fillAlt: string }> = {
  screen: { pending: '#F0D2B0', pendingAlpha: 1, fill: '#B9442A', fillAlt: '#AD3E26' },
  petrol: { pending: '#2C5A5E', pendingAlpha: 0.9, fill: '#C8553D', fillAlt: '#D9694F' },
  pin: { pending: '#B8462F', pendingAlpha: 0.9, fill: '#F7DFC0', fillAlt: '#F1D4B0' },
  sand: { pending: '#D6BE9F', pendingAlpha: 1, fill: '#C8553D', fillAlt: '#A23F2B' },
};

type Props = {
  palette?: Palette;
  /** Estratos llenos, 0–24 (admite fracciones). */
  filled: number;
  /** Desde dónde arranca al montar (para la animación de entrada). */
  from?: number;
  /** Estratos por segundo cuando se anima hacia `filled`. */
  speed?: number;
  /** Retraso antes de empezar a llenar, en ms. */
  delay?: number;
  /** Las cuentas se levantan bajo el puntero. */
  interactive?: boolean;
  className?: string;
  label?: string;
};

const DATA = beads as [number, number, number, number][];

function shade(hex: string, amt: number) {
  const n = parseInt(hex.slice(1), 16);
  const r = (n >> 16) & 255, g = (n >> 8) & 255, b = n & 255;
  const f = (c: number) => Math.max(0, Math.min(255, Math.round(amt < 0 ? c * (1 + amt) : c + (255 - c) * amt)));
  return `rgb(${f(r)},${f(g)},${f(b)})`;
}

const spriteCache = new Map<string, HTMLCanvasElement>();
function sprite(color: string, rpx: number) {
  const r = Math.max(2, Math.round(rpx * 2) / 2);
  const key = color + r;
  const hit = spriteCache.get(key);
  if (hit) return hit;
  const pad = Math.ceil(r * 0.7);
  const size = Math.ceil(r * 2 + pad * 2);
  const c = document.createElement('canvas');
  c.width = c.height = size;
  const g = c.getContext('2d')!;
  const cx = size / 2, cy = size / 2 - pad * 0.25;
  // sombra de contacto, suave y hacia abajo a la derecha
  const sh = g.createRadialGradient(cx + r * 0.18, cy + r * 0.42, r * 0.2, cx + r * 0.18, cy + r * 0.42, r * 1.25);
  sh.addColorStop(0, 'rgba(40,18,10,0.42)');
  sh.addColorStop(1, 'rgba(18,20,18,0)');
  g.fillStyle = sh;
  g.beginPath();
  g.arc(cx + r * 0.18, cy + r * 0.42, r * 1.25, 0, Math.PI * 2);
  g.fill();
  // cuerpo con luz desde arriba a la izquierda
  const body = g.createRadialGradient(cx - r * 0.38, cy - r * 0.42, r * 0.05, cx, cy, r);
  body.addColorStop(0, shade(color, 0.38));
  body.addColorStop(0.4, color);
  body.addColorStop(0.85, shade(color, -0.3));
  body.addColorStop(1, shade(color, -0.42));
  g.fillStyle = body;
  g.beginPath();
  g.arc(cx, cy, r, 0, Math.PI * 2);
  g.fill();
  // brillo
  const hl = g.createRadialGradient(cx - r * 0.4, cy - r * 0.45, 0, cx - r * 0.4, cy - r * 0.45, r * 0.5);
  hl.addColorStop(0, 'rgba(255,250,240,0.55)');
  hl.addColorStop(1, 'rgba(255,250,240,0)');
  g.fillStyle = hl;
  g.beginPath();
  g.arc(cx, cy, r, 0, Math.PI * 2);
  g.fill();
  spriteCache.set(key, c);
  return c;
}

const easeSettle = (t: number) => 1 - Math.pow(1 - t, 3.2);

export function BeadO({ palette = 'screen', filled, from, speed = 1.7, delay = 0, interactive = false, className, label }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const state = useRef({ f: from ?? filled, target: filled, raf: 0, w: 0, h: 0, dpr: 1, px: -9, py: -9, lift: new Float32Array(DATA.length), start: 0, visible: true });

  useEffect(() => {
    state.current.target = filled;
    kick();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filled]);

  function reduced() {
    return document.documentElement.dataset.motion === 'reduced';
  }

  function kick() {
    const s = state.current;
    if (!s.raf && s.visible) s.raf = requestAnimationFrame(tick);
  }

  function tick(now: number) {
    const s = state.current;
    s.raf = 0;
    if (!s.start) s.start = now;
    let moving = false;
    if (reduced()) s.f = s.target;
    else if (now - s.start >= delay) {
      const d = s.target - s.f;
      if (Math.abs(d) > 0.001) {
        const step = (speed / 60) * Math.sign(d) * Math.max(1, Math.abs(d) / 6);
        s.f = Math.abs(step) >= Math.abs(d) ? s.target : s.f + step;
        moving = true;
      }
    } else moving = true;
    // la cuenta que acaba de caer sigue asentándose un poco después de que f llega
    const settling = draw();
    if (moving || settling) s.raf = requestAnimationFrame(tick);
  }

  function draw() {
    const c = canvasRef.current;
    const s = state.current;
    if (!c || !s.w) return false;
    const g = c.getContext('2d')!;
    const pal = PALETTES[palette];
    g.setTransform(s.dpr, 0, 0, s.dpr, 0, 0);
    g.clearRect(0, 0, s.w, s.h);
    const R = Math.min(s.w, s.h) / 2 - Math.min(s.w, s.h) * 0.012;
    const ox = s.w / 2, oy = s.h / 2;
    let settling = false;
    const f = s.f + 0.35; // cada estrato termina de asentarse 0,35 después de empezar
    for (let i = 0; i < DATA.length; i++) {
      const [x, y, r, k] = DATA[i];
      const bx = ox + x * R, by = oy + y * R;
      const rr = r * R;
      // barrido de izquierda a derecha dentro del estrato
      const sweep = (x + 1) / 2;
      const local = Math.max(0, Math.min(1, (f - k) * 1.35 - sweep * 0.35));
      let lift = 0;
      if (interactive) {
        const d = Math.hypot(bx - s.px, by - s.py);
        const want = d < R * 0.32 ? 1 - d / (R * 0.32) : 0;
        s.lift[i] += (want - s.lift[i]) * 0.18;
        if (Math.abs(want - s.lift[i]) > 0.01) settling = true;
        lift = s.lift[i];
      }
      if (local < 1 && pal.pending) {
        g.globalAlpha = pal.pendingAlpha;
        const sp = sprite(pal.pending, rr * 0.92);
        g.drawImage(sp, bx - sp.width / 2, by - sp.height / 2 + sp.width * 0.02);
      }
      if (local > 0) {
        const e = easeSettle(local);
        if (local < 1) settling = true;
        const col = k % 2 === 1 ? pal.fillAlt : pal.fill;
        const sp = sprite(col, rr * (1 + lift * 0.18));
        g.globalAlpha = Math.min(1, e * 1.4);
        const drop = (1 - e) * R * 0.09 + lift * rr * 0.5;
        g.drawImage(sp, bx - sp.width / 2, by - sp.height / 2 - drop);
      }
    }
    g.globalAlpha = 1;
    return settling;
  }

  useEffect(() => {
    const c = canvasRef.current!;
    const s = state.current;
    const ro = new ResizeObserver(() => {
      const rect = c.getBoundingClientRect();
      s.dpr = Math.min(3, Math.max(2, window.devicePixelRatio || 1));
      s.w = rect.width;
      s.h = rect.height;
      c.width = Math.round(rect.width * s.dpr);
      c.height = Math.round(rect.height * s.dpr);
      draw();
      kick();
    });
    ro.observe(c);
    const io = new IntersectionObserver(([e]) => {
      s.visible = e.isIntersecting;
      if (s.visible) kick();
      else if (s.raf) {
        cancelAnimationFrame(s.raf);
        s.raf = 0;
      }
    });
    io.observe(c);
    let onMove: ((e: PointerEvent) => void) | undefined;
    let onLeave: (() => void) | undefined;
    if (interactive) {
      onMove = (e) => {
        const r = c.getBoundingClientRect();
        s.px = e.clientX - r.left;
        s.py = e.clientY - r.top;
        kick();
      };
      onLeave = () => {
        s.px = s.py = -9999;
        kick();
      };
      c.addEventListener('pointermove', onMove);
      c.addEventListener('pointerleave', onLeave);
    }
    return () => {
      ro.disconnect();
      io.disconnect();
      if (s.raf) cancelAnimationFrame(s.raf);
      s.raf = 0;
      if (onMove) c.removeEventListener('pointermove', onMove);
      if (onLeave) c.removeEventListener('pointerleave', onLeave);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      role={label ? 'img' : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
    />
  );
}
