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
  try {
    const form = new FormData();
    form.append('secret', secret);
    form.append('response', token);
    if (ip) form.append('remoteip', ip);
    const res = await fetch(TURNSTILE_VERIFY_URL, { method: 'POST', body: form });
    if (!res.ok) return false;
    const data = (await res.json()) as { success?: boolean };
    return data.success === true;
  } catch {
    return false;
  }
}

interface ButtondownResult {
  ok: boolean;
  alreadySubscribed: boolean;
  blockedByFirewall: boolean;
  status?: number;
  detail?: string;
}

async function subscribeToButtondown(
  email: string,
  apiKey: string,
  ip: string | null,
): Promise<ButtondownResult> {
  try {
    const res = await fetch(BUTTONDOWN_URL, {
      method: 'POST',
      headers: {
        Authorization: `Token ${apiKey}`,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        email_address: email,
        tags: ['squad-waitlist'],
        ...(ip ? { ip_address: ip } : {}),
      }),
    });

    const text = await res.text();

    if (res.status === 201 || res.status === 200) {
      return { ok: true, alreadySubscribed: false, blockedByFirewall: false, status: res.status };
    }

    const isDuplicateSubscriberError =
      res.status === 400 &&
      /email|subscriber|subscrib/i.test(text) &&
      /already|exists|duplicate|collision|overwrite|preserve/i.test(text);

    if (isDuplicateSubscriberError) {
      return { ok: true, alreadySubscribed: true, blockedByFirewall: false, status: res.status };
    }

    const isFirewallBlockedError =
      res.status === 400 &&
      /firewall|blocked|spam|abuse|risk|suspicious/i.test(text);

    if (isFirewallBlockedError) {
      return {
        ok: false,
        alreadySubscribed: false,
        blockedByFirewall: true,
        status: res.status,
        detail: text.slice(0, 300),
      };
    }

    return {
      ok: false,
      alreadySubscribed: false,
      blockedByFirewall: false,
      status: res.status,
      detail: text.slice(0, 300),
    };
  } catch (error) {
    return {
      ok: false,
      alreadySubscribed: false,
      blockedByFirewall: false,
      detail: error instanceof Error ? error.message : 'unknown_fetch_error',
    };
  }
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

  // Local-dev bypass: when running under `wrangler pages dev` without `.dev.vars`
  // configured, both secrets are unbound and the real Turnstile + Buttondown calls
  // would fail. Allow the success path so UI work is unblockable without prod keys.
  // Two gates so this never trips in production:
  //   1) hostname must be localhost / 127.0.0.1 (Cloudflare Pages always serves on
  //      a real hostname like squad.az or *.pages.dev)
  //   2) at least one secret must be missing (Pages binds both in every env)
  // The response carries `dev:true` so it's obvious in network logs.
  const requestUrl = new URL(request.url);
  const isLocalHost = requestUrl.hostname === 'localhost' || requestUrl.hostname === '127.0.0.1';
  const secretsMissing = !env.TURNSTILE_SECRET || !env.BUTTONDOWN_API_KEY;
  if (isLocalHost && secretsMissing) {
    return jsonResponse({ ok: true, dev: true });
  }

  const ip = request.headers.get('CF-Connecting-IP');
  const turnstileOk = await verifyTurnstile(parsed.turnstileToken, env.TURNSTILE_SECRET, ip);
  if (!turnstileOk) {
    return jsonResponse({ ok: false, error: 'challenge_failed' }, 403);
  }

  const result = await subscribeToButtondown(parsed.email, env.BUTTONDOWN_API_KEY, ip);
  if (!result.ok) {
    return jsonResponse(
      {
        ok: false,
        error: result.blockedByFirewall ? 'buttondown_firewall_blocked' : 'upstream_error',
        upstreamStatus: result.status,
        upstreamDetail: result.detail,
      },
      result.blockedByFirewall ? 403 : 502,
    );
  }

  return jsonResponse({ ok: true, alreadySubscribed: result.alreadySubscribed });
};

export const onRequest: PagesFunction<Env> = async () => {
  return new Response('Method Not Allowed', {
    status: 405,
    headers: { Allow: 'POST', 'Content-Type': 'text/plain' },
  });
};
