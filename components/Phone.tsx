// Marco de teléfono en código (petróleo casi negro, como el del hero). La pantalla es un .scr.
export function Phone({ children, className, label }: { children: React.ReactNode; className?: string; label?: string }) {
  return (
    <figure className={`phone ${className ?? ''}`}>
      <div className="phone__body">
        <div className="phone__glass">{children}</div>
      </div>
      {label ? <figcaption className="phone__label">{label}</figcaption> : null}
    </figure>
  );
}
