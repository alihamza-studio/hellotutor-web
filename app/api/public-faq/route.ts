import { publicFaqConfig } from '@/lib/public-faq-config';

export const runtime = 'nodejs';
export const maxDuration = 90;

const MAX_REQUEST_BYTES = 4096;

async function readBody(request: Request): Promise<Record<string, unknown> | undefined> {
  const reader = request.body?.getReader();
  if (!reader) return;
  try {
    const decoder = new TextDecoder('utf-8', { fatal: true });
    let size = 0;
    let json = '';
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > MAX_REQUEST_BYTES) {
        void reader.cancel().catch(() => {});
        return;
      }
      json += decoder.decode(value, { stream: true });
    }
    const parsed: unknown = JSON.parse(json + decoder.decode());
    if (parsed && typeof parsed === 'object' && !Array.isArray(parsed)) {
      return parsed as Record<string, unknown>;
    }
  } catch {
    return;
  } finally {
    reader.releaseLock();
  }
}

export async function POST(request: Request) {
  const config = publicFaqConfig();
  if (!config) return Response.json({ error: 'not_enabled' }, { status: 404 });

  if (request.headers.get('origin') !== config.browserOrigin) {
    return Response.json({ error: 'invalid_origin' }, { status: 403 });
  }
  if (request.headers.get('content-type')?.split(';', 1)[0].trim().toLowerCase() !== 'application/json') {
    return Response.json({ error: 'invalid_request' }, { status: 415 });
  }

  const body = await readBody(request);
  if (
    !body ||
    (body.locale !== 'ae-en' && body.locale !== 'ae-ar') ||
    typeof body.question !== 'string' ||
    !body.question.trim() ||
    body.question.length > 400 ||
    (body.page !== undefined &&
      (typeof body.page !== 'string' ||
        body.page.length > 160 ||
        !/^\/(?:[a-z0-9-]+\/)*[a-z0-9-]*$/.test(body.page)))
  ) {
    return Response.json({ error: 'invalid_request' }, { status: 400 });
  }

  const token = config.token ?? request.headers.get('x-vercel-oidc-token');
  if (!token) return Response.json({ error: 'unavailable' }, { status: 503 });

  try {
    const upstream = await fetch(config.endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ locale: body.locale, question: body.question, page: body.page }),
      cache: 'no-store',
      redirect: 'error',
      signal: AbortSignal.timeout(78_000),
    });
    if (!upstream.ok) throw new Error('Public FAQ unavailable');
    return Response.json(await upstream.json(), { headers: { 'Cache-Control': 'no-store' } });
  } catch {
    return Response.json({ error: 'unavailable' }, { status: 503 });
  }
}
