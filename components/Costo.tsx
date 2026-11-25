'use client';

// §4 Cuánto cuesta. Calculadora real con la regla de precio de PRODUCT.md:
// 1 % por aporte, y 0,5 % sobre lo que pase de $1.000.000 en el mes.

import { useId, useMemo, useState } from 'react';
import { RivePhone } from './RivePhone';

const DAILY = [3000, 5000, 10000];
const fmt = (n: number) => '$' + Math.round(n).toLocaleString('es-CO');
const TOPE = 1_000_000;

function calc(daily: number, cadencia: 'quincena' | 'mes') {
  const aporte = cadencia === 'quincena' ? daily * 15 : daily * 30;
  const porMes = cadencia === 'quincena' ? 2 : 1;
  // comisión del primer aporte del mes (el que muestra el recibo)
  const tramo1 = Math.min(aporte, TOPE);
  const comision = tramo1 * 0.01 + Math.max(0, aporte - TOPE) * 0.005;
  // comisión de un mes completo, para la línea del año
  const mes = aporte * porMes;
  const comisionMes = Math.min(mes, TOPE) * 0.01 + Math.max(0, mes - TOPE) * 0.005;
  return { aporte, comision, neto: aporte - comision, anio: mes * 12, comisionAnio: comisionMes * 12, pasaTope: mes > TOPE, mes };
}

export function Costo() {
  const [daily, setDaily] = useState(5000);
  const [otro, setOtro] = useState<string | null>(null);
  const [cadencia, setCadencia] = useState<'quincena' | 'mes'>('quincena');
  const id = useId();
  const r = useMemo(() => calc(daily, cadencia), [daily, cadencia]);

  return (
    <section id="costos" className="sec sec--clay costo" aria-labelledby="costo-h">
      <div className="wrap">
        <div className="costo__head" data-reveal>
          <h2 id="costo-h" className="h2">1&nbsp;% de lo que pones, así pongas <em>poquito</em>.</h2>
          <p className="lead">Si en un mes pones más de $1.000.000, lo que pase de ahí paga 0,5&nbsp;%.</p>
        </div>

        <div className="costo__grid">
          <div className="calc" data-reveal>
            <fieldset className="calc__q">
              <legend>¿Cuánto al día?</legend>
              <div className="chips" role="radiogroup">
                {DAILY.map((d) => (
                  <button
                    key={d}
                    type="button"
                    role="radio"
                    aria-checked={otro === null && daily === d}
                    className="chip"
                    onClick={() => {
                      setOtro(null);
                      setDaily(d);
                    }}
                  >
                    {fmt(d)}
                  </button>
                ))}
                <button
                  type="button"
                  role="radio"
                  aria-checked={otro !== null}
                  className="chip"
                  onClick={() => setOtro(otro ?? String(daily))}
                >
                  Otro
                </button>
              </div>
              {otro !== null ? (
                <label className="calc__otro" htmlFor={`${id}-otro`}>
                  <span>$</span>
                  <input
                    id={`${id}-otro`}
                    inputMode="numeric"
                    autoFocus
                    value={otro}
                    aria-label="Otro monto al día, en pesos"
                    onChange={(e) => {
                      const v = e.target.value.replace(/\D/g, '').slice(0, 7);
                      setOtro(v);
                      const n = parseInt(v || '0', 10);
                      if (n > 0) setDaily(n);
                    }}
                  />
                  <span>al día</span>
                </label>
              ) : null}
            </fieldset>
            <fieldset className="calc__q">
              <legend>¿Cada cuánto?</legend>
              <div className="chips" role="radiogroup">
                <button type="button" role="radio" aria-checked={cadencia === 'quincena'} className="chip" onClick={() => setCadencia('quincena')}>
                  Cada quincena
                </button>
                <button type="button" role="radio" aria-checked={cadencia === 'mes'} className="chip" onClick={() => setCadencia('mes')}>
                  Cada mes
                </button>
              </div>
            </fieldset>

            <p className="calc__result" aria-live="polite">
              {fmt(daily)} al día son <strong className="num">{fmt(r.aporte)}</strong> cada {cadencia}.
            </p>
            <dl className="calc__rows num">
              <div>
                <dt>Pones</dt>
                <dd>{fmt(r.aporte)}</dd>
              </div>
              <div className="is-fee">
                <dt>Nuestra comisión ({r.aporte > TOPE ? '1 % y 0,5 %' : '1 %'})</dt>
                <dd>−{fmt(r.comision)}</dd>
              </div>
              <div className="is-total">
                <dt>Va a dólares</dt>
                <dd>{fmt(r.neto)}</dd>
              </div>
            </dl>
            <p className="calc__year">
              En un año pones <strong className="num">{fmt(r.anio)}</strong> y pagas <strong className="num">{fmt(r.comisionAnio)}</strong> de comisión.
            </p>
            {r.pasaTope ? (
              <p className="calc__tramo">
                Cada mes, $1.000.000 pagan 1&nbsp;% ({fmt(10000)}) y {fmt(r.mes - TOPE)} pagan 0,5&nbsp;% ({fmt((r.mes - TOPE) * 0.005)}).
              </p>
            ) : null}
            <p className="calc__fx">
              Cambiamos a dólares con la tasa de nuestro proveedor, al lado de la TRM (el dólar oficial del día). No le ponemos margen.
            </p>
            <p className="fineprint">Ejemplo ilustrativo. El dólar cambia cada día. Lo mismo verás en el recibo de cada aporte.</p>
          </div>

          <div className="costo__rive" data-reveal>
            <RivePhone />
          </div>
        </div>

        <ul className="sin" aria-label="Lo que no cobramos" data-reveal>
          {['Sin suscripción', 'Sin mínimo', 'Sin cobro por orden', 'Sin comisión por retirar', 'Sin cobro por no abrir la app'].map((t) => (
            <li key={t}>
              <i className="bead" aria-hidden />
              {t}
            </li>
          ))}
        </ul>
        <p className="costo__gana" data-reveal>
          <strong>Así ganamos plata:</strong> con esa comisión, y ya. No cobramos sobre tu saldo ni le ganamos al dólar.
        </p>
      </div>
    </section>
  );
}
