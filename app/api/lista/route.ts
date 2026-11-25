import { NextResponse } from 'next/server';

// Lista de espera. Punto de integración: aquí se guarda el lead (con copy_version, variante y utm_*)
// y se manda el correo de confirmación (doble opt-in). Hoy solo valida: no hay base de datos conectada.
// Antes de publicar: almacenamiento, límite por IP y el texto legal de la Ley 1581 (COPY_LANDING.md §5, L14).

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export async function POST(req: Request) {
  let body: { email?: unknown; notas?: unknown; empresa?: unknown; origen?: unknown };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ status: 'invalid' }, { status: 400 });
  }
  // honeypot: un bot llena el campo oculto; se responde igual que un éxito
  if (typeof body.empresa === 'string' && body.empresa.length > 0) {
    return NextResponse.json({ status: 'ok' });
  }
  const email = typeof body.email === 'string' ? body.email.trim().toLowerCase() : '';
  if (!EMAIL.test(email) || email.length > 254) {
    return NextResponse.json({ status: 'invalid' }, { status: 422 });
  }
  return NextResponse.json({ status: 'ok' });
}
