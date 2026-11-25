// Wordmark "asentado" de Olna, desde brand/logo/kit/olna-wordmark.svg (viewBox recortado a la tinta).
export function Wordmark({ className, title = 'Olna' }: { className?: string; title?: string | null }) {
  return (
    <svg
      className={className}
      viewBox="10 34 388 170"
      fill="currentColor"
      role={title ? 'img' : undefined}
      aria-label={title ?? undefined}
      aria-hidden={title ? undefined : true}
      focusable="false"
    >
      <path fillRule="evenodd" d="M12.00,152.00 a50.00,50.00 0 1,0 100.00,0 a50.00,50.00 0 1,0 -100.00,0 Z M41.00,142.00 a21.00,21.00 0 1,0 42.00,0 a21.00,21.00 0 1,0 -42.00,0 Z" />
      <path d="M130,50 A14,14 0 0,1 144,36 H144 A14,14 0 0,1 158,50 V186 A14,14 0 0,1 130,186 Z" />
      <path d="M182,186 V118 A14,14 0 0,1 196,104 H210 A68,68 0 0,1 278,172 V186 A14,14 0 0,1 250,186 V172 A40,40 0 0,0 210,132 V186 A14,14 0 0,1 182,186 Z" />
      <path fillRule="evenodd" d="M296.00,152.00 a50.00,50.00 0 1,0 100.00,0 a50.00,50.00 0 1,0 -100.00,0 Z M325.00,142.00 a21.00,21.00 0 1,0 42.00,0 a21.00,21.00 0 1,0 -42.00,0 Z" />
      <path d="M368,107.1 H382 A14,14 0 0,1 396,121.1 V186 A14,14 0 0,1 368,186 Z" />
    </svg>
  );
}

export function Symbol({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="28 28 200 200" fill="currentColor" aria-hidden focusable="false">
      <path fillRule="evenodd" d="M28.00,128.00 a100.00,100.00 0 1,0 200.00,0 a100.00,100.00 0 1,0 -200.00,0 Z M84.00,114.00 a44.00,44.00 0 1,0 88.00,0 a44.00,44.00 0 1,0 -88.00,0 Z" />
    </svg>
  );
}
