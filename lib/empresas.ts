// Empresas reconocibles del S&P 500 que se muestran como ejemplo, sin pesos ni ranking,
// para que la página no dependa de datos que cambian. Logos de una sola tinta de simple-icons.
// Olna no está afiliada a estas empresas.
import { siApple, siNvidia, siGoogle, siMeta, siTesla } from 'simple-icons';

export type Empresa = { nombre: string; icono?: string; inicial: string };

export const HERO_EMPRESAS: Empresa[] = [
  { nombre: 'Apple', icono: siApple.path, inicial: 'A' },
  { nombre: 'NVIDIA', icono: siNvidia.path, inicial: 'N' },
  { nombre: 'Google', icono: siGoogle.path, inicial: 'G' },
  { nombre: 'Meta', icono: siMeta.path, inicial: 'M' },
  { nombre: 'Tesla', icono: siTesla.path, inicial: 'T' },
];
