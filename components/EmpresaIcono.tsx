import type { Empresa } from '@/lib/empresas';

/** Círculo de una sola tinta con el logo de la empresa (o su inicial si no hay ícono libre). */
export function EmpresaIcono({ e, className }: { e: Empresa; className?: string }) {
  return (
    <span className={`emp-ico ${className ?? ''}`} title={e.nombre}>
      {e.icono ? (
        <svg viewBox="0 0 24 24" aria-hidden focusable="false">
          <path d={e.icono} />
        </svg>
      ) : (
        <span className="emp-ico__ini" aria-hidden>{e.inicial}</span>
      )}
      <span className="sr-only">{e.nombre}</span>
    </span>
  );
}
