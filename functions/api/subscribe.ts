import { isValidEmail, isHoneypotTripped, parseSubscribeBody } from './_lib/validation';

interface Env {
  BUTTONDOWN_API_KEY: string;
  TURNSTILE_SECRET: string;
}

const TURNSTILE_VERIFY_URL = 'https://challenges.cloudflare.com/turnstile/v0/siteverify';
const BUTTONDOWN_URL = 'https://api.buttondown.email/v1/subscribers';

function jsonResponse(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
  });
}

async function verifyTurnstile(token: string, secret: string, ip: string | null): Promise<boolean> {
  const form = new FormData();
  form.append('secret', secret);
  form.append('response', token);
  if (ip) form.append('remoteip', ip);
  const res = await fetch(TURNSTILE_VERIFY_URL, { method: 'POST', body: form });
  if (!res.ok) return false;
  const data = (await res.json()) as { success?: boolean };
  return data.success === true;
}

interface ButtondownResult {
  ok: boolean;
  alreadySubscribed: boolean;
}

async function subscribeToButtondown(email: string, apiKey: string): Promise<ButtondownResult> {
  const res = await fetch(BUTTONDOWN_URL, {
    method: 'POST',
    headers: {
      Authorization: `Token ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email_address: email, tags: ['squad-waitlist'] }),
  });

  if (res.status === 201) return { ok: true, alreadySubscribed: false };

  // Buttondown returns 400 with detail "already subscribed" for duplicates.
  if (res.status === 400) {
    const text = await res.text();
    if (/already.*subscrib/i.test(text)) {
      return { ok: true, alreadySubscribed: true };
    }
  }
  return { ok: false, alreadySubscribed: false };
}

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return jsonResponse({ ok: false, error: 'invalid_json' }, 400);
  }

  const parsed = parseSubscribeBody(body);
  if (!parsed.ok) {
    return jsonResponse({ ok: false, error: 'invalid_body' }, 400);
  }

  // Honeypot tripped → respond 200 OK without doing anything (don't tip off bots).
  if (isHoneypotTripped(parsed.hp)) {
    return jsonResponse({ ok: true });
  }

  if (!isValidEmail(parsed.email)) {
    return jsonResponse({ ok: false, error: 'invalid_email' }, 400);
  }

  const ip = request.headers.get('CF-Connecting-IP');
  const turnstileOk = await verifyTurnstile(parsed.turnstileToken, env.TURNSTILE_SECRET, ip);
  if (!turnstileOk) {
    return jsonResponse({ ok: false, error: 'challenge_failed' }, 403);
  }

  const result = await subscribeToButtondown(parsed.email, env.BUTTONDOWN_API_KEY);
  if (!result.ok) {
    return jsonResponse({ ok: false, error: 'upstream_error' }, 502);
  }

  return jsonResponse({ ok: true, alreadySubscribed: result.alreadySubscribed });
};

export const onRequest: PagesFunction<Env> = async () => {
  return new Response('Method Not Allowed', {
    status: 405,
    headers: { Allow: 'POST', 'Content-Type': 'text/plain' },
  });
};
