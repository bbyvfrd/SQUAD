const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function isValidEmail(value: unknown): boolean {
  if (typeof value !== 'string') return false;
  const trimmed = value.trim();
  if (!trimmed || trimmed.length > 254) return false;
  return EMAIL_RE.test(trimmed);
}

export function isHoneypotTripped(value: unknown): boolean {
  if (value === undefined || value === null) return false;
  if (typeof value !== 'string') return true;
  return value.length > 0;
}

export type ParsedBody =
  | { ok: true; email: string; turnstileToken: string; hp: string }
  | { ok: false; reason: string };

export function parseSubscribeBody(input: unknown): ParsedBody {
  if (input === null || typeof input !== 'object') {
    return { ok: false, reason: 'body must be an object' };
  }
  const obj = input as Record<string, unknown>;
  if (typeof obj.email !== 'string') {
    return { ok: false, reason: 'email must be a string' };
  }
  if (typeof obj.turnstileToken !== 'string') {
    return { ok: false, reason: 'turnstileToken must be a string' };
  }
  const hp = typeof obj.hp === 'string' ? obj.hp : '';
  return {
    ok: true,
    email: obj.email.trim().toLowerCase(),
    turnstileToken: obj.turnstileToken,
    hp,
  };
}
