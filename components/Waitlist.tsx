'use client';

import { useId, useRef, useState } from 'react';

type Status = 'idle' | 'open' | 'sending' | 'invalid' | 'done' | 'error' | 'dup';

const MSG: Partial<Record<Status, string>> = {
  sending: 'Guardando…',
  invalid: 'Ese correo no se ve completo. ¿Lo revisas?',
  done: 'Listo. Te enviamos un correo para confirmar. Te escribimos de nuevo cuando Olna abra.',
  error: 'No pudimos guardarlo. Intenta otra vez o escríbenos a hola@olna.co.',
  dup: 'Ya estás en la lista. Te avisamos cuando abramos.',
};

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/**
 * La lista de espera. En el hero empieza como el botón del comp y se abre en el mismo lugar
 * para pedir el correo (el botón se vuelve campo). En el cierre llega abierta.
 */
export function Waitlist({ variant = 'hero', startOpen = false }: { variant?: 'hero' | 'close'; startOpen?: boolean }) {
  const [status, setStatus] = useState<Status>(startOpen ? 'open' : 'idle');
  const [email, setEmail] = useState('');
  const [notas, setNotas] = useState(false);
  const input = useRef<HTMLInputElement>(null);
  const id = useId();
  const open = status !== 'idle';

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === 'idle') {
      setStatus('open');
      requestAnimationFrame(() => input.current?.focus());
      return;
    }
    if (!EMAIL.test(email.trim())) {
      setStatus('invalid');
      input.current?.focus();
      return;
    }
    setStatus('sending');
    const hp = (e.currentTarget.elements.namedItem('empresa') as HTMLInputElement | null)?.value ?? '';
    try {
      const res = await fetch('/api/lista', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ email: email.trim(), notas, empresa: hp, origen: variant }),
      });
      const data = (await res.json().catch(() => ({}))) as { status?: string };
      if (data.status === 'dup') setStatus('dup');
      else if (res.ok) setStatus('done');
      else if (data.status === 'invalid') setStatus('invalid');
      else setStatus('error');
    } catch {
      setStatus('error');
    }
  }

  const finished = status === 'done' || status === 'dup';

  return (
    <form className={`wl wl--${variant}`} data-state={status} onSubmit={submit} noValidate>
      <div className="wl__pill">
        <label className="wl__label" htmlFor={`${id}-email`}>
          Tu correo
        </label>
        <input
          ref={input}
          id={`${id}-email`}
          className="wl__input"
          type="email"
          name="email"
          inputMode="email"
          autoComplete="email"
          placeholder="tu@correo.com"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (status === 'invalid') setStatus('open');
          }}
          tabIndex={open ? 0 : -1}
          aria-hidden={!open}
          aria-invalid={status === 'invalid'}
          aria-describedby={`${id}-msg`}
          disabled={finished}
          required
        />
        <button className="wl__button" type="submit" disabled={status === 'sending' || finished}>
          <span className="wl__button-full">Avísame cuando abra</span>
          <span className="wl__button-short" aria-hidden>
            Avísame
          </span>
        </button>
      </div>
      <input className="wl__hp" type="text" name="empresa" tabIndex={-1} autoComplete="off" aria-hidden />
      <p id={`${id}-msg`} className="wl__msg" role="status" aria-live="polite">
        {MSG[status] ?? ''}
      </p>
      <div className="wl__more" aria-hidden={!open}>
        <p className="wl__micro">Todavía no recibimos plata. Antes de tu primer aporte, verás cómo sacar tu plata.</p>
        <label className="wl__check">
          <input type="checkbox" checked={notas} onChange={(e) => setNotas(e.target.checked)} tabIndex={open ? 0 : -1} />
          <span>También quiero recibir notas cortas sobre cómo invertir (máximo dos al mes).</span>
        </label>
        <p className="wl__consent">
          Al dejar tu correo autorizas a [razón social] a usarlo para avisarte, según nuestra{' '}
          <a href="#legal" tabIndex={open ? 0 : -1}>Política de tratamiento de datos</a>. Puedes pedir que lo borremos cuando quieras.
        </p>
      </div>
    </form>
  );
}
