// Genera las 500 cuentas de la "o" de Olna (una por empresa del S&P 500).
// Silueta: symbol de la marca (anillo r=1, hueco r=0.44 subido 0.14). Empaque orgánico con semilla fija.
import { writeFileSync } from 'node:fs';
let s = 500500;
const rnd = () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296);
const N = 500, HOLE_R = 0.44, HOLE_Y = -0.14;
const inside = (x, y, r) => Math.hypot(x, y) <= 1 - r && Math.hypot(x, y - HOLE_Y) >= HOLE_R + r;
const pts = [];
while (pts.length < N) {
  const x = rnd() * 2 - 1, y = rnd() * 2 - 1;
  const t = rnd();
  const r = 0.024 + 0.02 * t * t; // tamaños mezclados, más chicos que grandes
  if (inside(x, y, r)) pts.push({ x, y, r });
}
// escala los radios para cubrir ~78% del área del anillo
const ring = Math.PI * (1 - HOLE_R * HOLE_R);
const area = pts.reduce((a, p) => a + Math.PI * p.r * p.r, 0);
const k = Math.sqrt((ring * 0.8) / area);
for (const p of pts) p.r *= k;
for (let it = 0; it < 220; it++) {
  for (let i = 0; i < N; i++) for (let j = i + 1; j < N; j++) {
    const a = pts[i], b = pts[j];
    const dx = b.x - a.x, dy = b.y - a.y, d = Math.hypot(dx, dy) || 1e-6;
    const min = a.r + b.r + 0.004;
    if (d < min) { const m = (min - d) / 2 / d; a.x -= dx * m; a.y -= dy * m; b.x += dx * m; b.y += dy * m; }
  }
  for (const p of pts) {
    const d = Math.hypot(p.x, p.y);
    if (d > 1 - p.r) { const f = (1 - p.r) / d; p.x *= f; p.y *= f; }
    const dh = Math.hypot(p.x, p.y - HOLE_Y);
    if (dh < HOLE_R + p.r) { const f = (HOLE_R + p.r) / (dh || 1e-6); p.x *= f; p.y = HOLE_Y + (p.y - HOLE_Y) * f; }
  }
}
// orden de abajo hacia arriba (la "o" se llena como la tierra), 24 estratos
pts.sort((a, b) => b.y - a.y || a.x - b.x);
const out = pts.map((p, i) => [+p.x.toFixed(4), +p.y.toFixed(4), +p.r.toFixed(4), Math.min(23, Math.floor((i / N) * 24))]);
writeFileSync(new URL('../lib/beads.json', import.meta.url), JSON.stringify(out));
console.log('beads', out.length);
