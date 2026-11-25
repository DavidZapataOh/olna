import { ScreenPlan } from './AppScreens';
import { Waitlist } from './Waitlist';
import { Wordmark } from './Wordmark';

export function Hero() {
  return (
    <header className="hero" id="inicio">
      <div className="hero__frame">
        <div className="hero__window">
          <div className="hero__stage">
            <picture>
              <source srcSet="/plates/scene.webp" type="image/webp" />
              <img
                className="hero__plate"
                src="/plates/scene.png"
                alt="Imagen ilustrativa: un mensajero con el pin de Olna en la chaqueta muestra su teléfono con la app abierta."
                width={2304}
                height={1536}
                fetchPriority="high"
                decoding="async"
              />
            </picture>
            <div className="hero__screen">
              <ScreenPlan />
            </div>
          </div>
        </div>

        <nav className="hero__nav" aria-label="Principal">
          <a className="hero__logo" href="#inicio" aria-label="Olna, inicio">
            <Wordmark title={null} />
          </a>
          <ul className="hero__links">
            <li><a href="#como-funciona">Cómo funciona</a></li>
            <li><a href="#sp500">Qué compras</a></li>
            <li><a href="#preguntas">Preguntas</a></li>
          </ul>
          <a className="hero__navcta" href="#lista">Avísame cuando abra</a>
        </nav>

        <div className="hero__copy">
          <h1 className="hero__h1">
            <span>Invierte en</span> <span>las empresas</span> <span>que usas</span> <span><em>todos los días</em>.</span>
          </h1>
          <p className="hero__sub">
            <span>Desde $5.000 al día, en automático.</span> <span>Empiezas con 500 de las más grandes</span> <span>de EE. UU. o eliges las tuyas.</span>
          </p>
          <div className="hero__action">
            <Waitlist variant="hero" />
          </div>
        </div>
      </div>
    </header>
  );
}
