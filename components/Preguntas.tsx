// §8 Preguntas. <details> nativos: funcionan sin JavaScript.
const QA: [string, string][] = [
  ['¿Necesito saber de bolsa?', 'No. Eliges cuánto y cada cuánto, y Olna hace el resto. Por defecto, tu plata va al S&P 500: 500 empresas de EE. UU. en un solo aporte. Si un día quieres armar tu propia cartera, puedes. Nosotros no te decimos qué comprar.'],
  ['¿Es segura?', 'No te pedimos confiar. Te mostramos dónde está tu plata, cuánto cuesta y cómo sales. Tu inversión está a tu nombre, y lo compruebas en la app. Lo que nadie puede quitar es el riesgo del mercado: tu plata puede subir o bajar.'],
  ['¿Cuánto cuesta?', '1 % de cada aporte. Si en un mes pones más de $1.000.000, lo que pase de ahí paga 0,5 %. No cobramos suscripción ni mínimo. Tampoco cobramos por orden, por retirar o por no abrir la app. El cambio a dólares lo hace nuestro proveedor a su tasa. Te la mostramos al lado de la TRM y no le ponemos margen. Ejemplo: en un aporte de $35.000, la comisión es $350.'],
  ['¿Cómo saco mi plata?', 'Cuando quieras, desde la app, sin comisión nuestra. Vendemos, cambiamos a pesos con la tasa al lado de la TRM y te llega a tu cuenta en Colombia. Antes de tu primer aporte te mostramos cuánto tarda: medido, no prometido.'],
  ['¿Qué pasa si el mercado cae?', 'Tu plata baja también, y puede tardar en volver. No te mandamos alertas para asustarte. Medida en pesos, la peor caída fue de 39,3 %, entre enero de 2007 y febrero de 2009. Tardó 74 meses en volver a ese nivel. Lo que pasó antes no garantiza lo que viene. Tu plan sigue comprando, a menos que decidas bajar, saltar o pausar.'],
  ['¿Y si Olna desaparece?', 'Tu inversión sigue en tu cuenta, no en la nuestra. Publicamos paso a paso cómo recuperarla sin nosotros.'],
  ['¿Por qué no un CDT o una cajita?', 'Porque no hacen lo mismo. Un CDT te paga una tasa pactada. Olna invierte en 500 empresas: sube y baja, y se mide en años. No reemplaza tu colchón para emergencias. Es la plata que quieres dejar quieta mucho tiempo.'],
  ['¿Olna es un banco?', 'No. No recibimos depósitos ni damos tarjetas o créditos. Olna es una app que invierte por ti con las reglas que tú pones.'],
  ['¿Tengo que declarar esto ante la DIAN?', 'Sí, lo que tienes en el exterior se declara. Cada año verás en la app un resumen en pesos para tu contador: lo que pusiste, sacaste y pagaste. La DIAN todavía no define cómo clasificar este tipo de inversión. Tu contador te dice cómo declararla.'],
  ['Me pagan en dólares. ¿Me sirve?', 'Sí. Programas tus aportes desde tu cuenta en Colombia, en pesos, como cualquiera.'],
];

export function Preguntas() {
  return (
    <section id="preguntas" className="sec sec--clay faq" aria-labelledby="faq-h">
      <div className="wrap faq__grid">
        <div className="faq__side">
          <h2 id="faq-h" className="h2" data-reveal>
            Preguntas que nos hacen
          </h2>
          <p className="faq__mail" data-reveal>
            ¿Otra pregunta? Escríbenos a <a href="mailto:hola@olna.co">hola@olna.co</a>. Te responde una persona.
          </p>
        </div>
        <div className="faq__list">
          {QA.map(([q, a], i) => (
            <details key={q} className="qa" open={i === 0} data-reveal>
              <summary>
                <span>{q}</span>
                <i className="qa__icon" aria-hidden />
              </summary>
              <p>{a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
