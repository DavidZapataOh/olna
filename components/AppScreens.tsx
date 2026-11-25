// Pantallas de la app de Olna en código (no imágenes). Todo se mide en cqw del ancho de la pantalla.
// Copia fiel de los flujos descritos en COPY_LANDING.md §3; la app está en construcción (A10).
import { BeadO } from './BeadO';
import { Wordmark } from './Wordmark';
import { EmpresaIcono } from './EmpresaIcono';
import { HERO_EMPRESAS } from '@/lib/empresas';

export function StatusBar() {
  return (
    <div className="scr-status" aria-hidden>
      <span>9:41</span>
      <span className="scr-status__icons">
        <svg viewBox="0 0 18 12"><rect x="0" y="8" width="3" height="4" rx="1" /><rect x="5" y="5.5" width="3" height="6.5" rx="1" /><rect x="10" y="3" width="3" height="9" rx="1" /><rect x="15" y="0" width="3" height="12" rx="1" /></svg>
        <svg viewBox="0 0 16 12"><path d="M8 11.5 5.6 9a3.4 3.4 0 0 1 4.8 0L8 11.5Zm-4-4.1L2.6 6a7.6 7.6 0 0 1 10.8 0L12 7.4a5.6 5.6 0 0 0-8 0ZM.6 4 0 3.4a11.3 11.3 0 0 1 16 0l-.6.6-.8.8a10 10 0 0 0-13.2 0L.6 4Z" /></svg>
        <svg viewBox="0 0 26 12"><rect x="0.5" y="0.5" width="22" height="11" rx="3.2" fill="none" stroke="currentColor" opacity=".45" /><rect x="2.2" y="2.2" width="17" height="7.6" rx="1.8" /><rect x="23.6" y="4" width="1.8" height="4" rx=".9" opacity=".45" /></svg>
      </span>
    </div>
  );
}

function Check({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M3.2 8.6 6.4 11.6 12.8 4.6" pathLength={1} />
    </svg>
  );
}

function Chevron() {
  return (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M6 3.5 10.5 8 6 12.5" />
    </svg>
  );
}

/** "Tu plan": la pantalla del hero (comp aprobado). */
export function ScreenPlan() {
  return (
    <div className="scr scr--plan">
      <StatusBar />
      <Wordmark className="scr-plan__logo" title={null} />
      <p className="scr-plan__title">Tu plan</p>
      <div className="scr-plan__amount">
        <strong>$75.000</strong>
        <span>cada quincena</span>
      </div>
      <div className="scr-plan__row scr-plan__row--emp">
        <span className="scr-plan__logos" aria-hidden>
          {HERO_EMPRESAS.map((e) => (
            <EmpresaIcono key={e.nombre} e={e} className="emp-ico--sm" />
          ))}
        </span>
        <span className="scr-plan__mas">+495</span>
        <Chevron />
      </div>
      <div className="scr-plan__o" aria-hidden>
        <img className="scr-plan__o-pending" src="/plates/app-o-pending.webp" alt="" width={1168} height={1056} decoding="async" />
        <picture>
          <source srcSet="/plates/app-o.webp" type="image/webp" />
          <img className="scr-plan__o-fill" src="/plates/app-o.png" alt="" width={1168} height={1056} decoding="async" />
        </picture>
      </div>
      <div className="scr-plan__button">
        <span>Aporte programado</span>
        <Check className="scr-check" />
      </div>
      <i className="scr-home" aria-hidden />
    </div>
  );
}

/** Paso 01: cada cuánto y cuánto. */
export function ScreenCadencia() {
  return (
    <div className="scr scr--light">
      <StatusBar />
      <div className="scr-top">
        <span className="scr-back"><svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"><path d="M10 3.5 5.5 8l4.5 4.5" /></svg></span>
        <span className="scr-progress"><i style={{ width: '33%' }} /></span>
      </div>
      <p className="scr-h">¿Cómo te pagan?</p>
      <div className="scr-choices">
        <span className="scr-choice is-on">Cada quincena<Check className="scr-choice__check" /></span>
        <span className="scr-choice">Cada mes</span>
      </div>
      <div className="scr-total">
        <span>$5.000 al día =</span>
        <strong>$75.000</strong>
        <span>cada quincena</span>
      </div>
      <span className="scr-cta">Seguir</span>
      <i className="scr-home" aria-hidden />
    </div>
  );
}

/** Paso 02: el aviso de víspera sobre la pantalla bloqueada. */
export function ScreenAviso({ state = 'idle' }: { state?: 'idle' | 'saltado' }) {
  return (
    <div className="scr scr--lock">
      <StatusBar />
      <p className="scr-lock__date">martes 14</p>
      <p className="scr-lock__time">7:30</p>
      <div className="scr-notif">
        <div className="scr-notif__head">
          <span className="scr-notif__icon"><Wordmark title={null} /></span>
          <span>Olna</span>
          <span className="scr-notif__when">ahora</span>
        </div>
        {state === 'idle' ? (
          <>
            <p className="scr-notif__msg">Mañana invertimos $75.000 de tu cuenta.</p>
            <div className="scr-notif__actions">
              <span>Listo</span>
              <span>Bajar</span>
              <span>Saltar esta vez</span>
            </div>
          </>
        ) : (
          <p className="scr-notif__msg">Listo, saltamos este aporte. Tu plan sigue el 30.</p>
        )}
      </div>
      <i className="scr-home scr-home--light" aria-hidden />
    </div>
  );
}

/** Paso 03: Inicio, versión del landing (sin valor de hoy). */
export function ScreenInicio({ filled = 24 }: { filled?: number }) {
  return (
    <div className="scr scr--light">
      <StatusBar />
      <div className="scr-inicio__head">
        <Wordmark className="scr-inicio__logo" title={null} />
      </div>
      <div className="scr-inicio__o">
        <BeadO palette="screen" filled={filled} />
      </div>
      <p className="scr-inicio__sum">Llevas <strong>$1.800.000</strong> puestos</p>
      <div className="scr-next">
        <span>Próximo aporte</span>
        <strong>$75.000 el 30</strong>
        <span className="scr-link">Cambiar</span>
      </div>
      <div className="scr-pair">
        <span className="scr-btn scr-btn--ghost">Retirar</span>
        <span className="scr-btn scr-btn--ghost">Cambiar</span>
      </div>
      <i className="scr-home" aria-hidden />
    </div>
  );
}

/** Retiro. */
export function ScreenRetiro() {
  return (
    <div className="scr scr--light">
      <StatusBar />
      <div className="scr-top">
        <span className="scr-back"><svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"><path d="M10 3.5 5.5 8l4.5 4.5" /></svg></span>
      </div>
      <p className="scr-h">Sacar tu plata</p>
      <div className="scr-big">$100.000</div>
      <ol className="scr-steps">
        <li><Check className="scr-steps__check" />Vendemos</li>
        <li><Check className="scr-steps__check" />Cambiamos a pesos, al lado de la TRM</li>
        <li><Check className="scr-steps__check" />Llega a tu cuenta en Colombia</li>
      </ol>
      <p className="scr-note">Sin comisión nuestra.</p>
      <span className="scr-cta">Retirar</span>
      <i className="scr-home" aria-hidden />
    </div>
  );
}

/** Verificar mis fondos (demostración). */
export function ScreenVerificar() {
  return (
    <div className="scr scr--light">
      <StatusBar />
      <div className="scr-top">
        <span className="scr-back"><svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"><path d="M10 3.5 5.5 8l4.5 4.5" /></svg></span>
      </div>
      <p className="scr-h">Verificar mis fondos</p>
      <p className="scr-sub">Prueba de esta semana</p>
      <ul className="scr-proof">
        <li><Check className="scr-proof__check" />Tu saldo está en la prueba de esta semana</li>
        <li><Check className="scr-proof__check" />Lo de tus aportes está en tu cuenta</li>
        <li><Check className="scr-proof__check" />Olna no guarda plata de nadie</li>
      </ul>
      <span className="scr-cta scr-cta--petrol">Ver cómo se verifica</span>
      <i className="scr-home" aria-hidden />
    </div>
  );
}

/** Día rojo. */
export function ScreenDiaRojo() {
  return (
    <div className="scr scr--light">
      <StatusBar />
      <div className="scr-inicio__head">
        <Wordmark className="scr-inicio__logo" title={null} />
      </div>
      <div className="scr-rojo">
        <p className="scr-rojo__k">Pusiste</p>
        <p className="scr-rojo__v">$450.000</p>
        <p className="scr-rojo__k">Por ahora vas</p>
        <p className="scr-rojo__d">−$7.200</p>
      </div>
      <div className="scr-calm">
        <p>Hoy el mercado bajó. Tu plata también. Tu aporte de esta quincena compra a un precio más bajo.</p>
      </div>
      <span className="scr-cta scr-cta--ghost">Retirar</span>
      <i className="scr-home" aria-hidden />
    </div>
  );
}
