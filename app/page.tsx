import { Hero } from '@/components/Hero';
import { Problema } from '@/components/Problema';
import { ComoFunciona } from '@/components/ComoFunciona';
import { Costo } from '@/components/Costo';
import { QueCompras } from '@/components/QueCompras';
import { TuPlata } from '@/components/TuPlata';
import { TuMandas } from '@/components/TuMandas';
import { Preguntas } from '@/components/Preguntas';
import { Cierre } from '@/components/Cierre';
import { Consent, Reveal, StickyNav } from '@/components/Chrome';

export default function Page() {
  return (
    <>
      <a className="skip" href="#como-funciona">
        Saltar al contenido
      </a>
      <StickyNav />
      <Hero />
      <main>
        <Problema />
        <ComoFunciona />
        <Costo />
        <QueCompras />
        <TuPlata />
        <TuMandas />
        <Preguntas />
      </main>
      <Cierre />
      <Reveal />
      <Consent />
    </>
  );
}
