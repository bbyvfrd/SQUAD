import { describe, it, expect } from 'vitest';
import { isValidEmail, isHoneypotTripped, parseSubscribeBody } from './validation';

describe('isValidEmail', () => {
  it('accepts a normal address', () => {
    expect(isValidEmail('a@b.co')).toBe(true);
    expect(isValidEmail('first.last+tag@sub.domain.az')).toBe(true);
  });

  it('rejects empty / whitespace / missing parts', () => {
    expect(isValidEmail('')).toBe(false);
    expect(isValidEmail('   ')).toBe(false);
    expect(isValidEmail('no-at-sign')).toBe(false);
    expect(isValidEmail('no@dot')).toBe(false);
    expect(isValidEmail('@nope.com')).toBe(false);
  });

  it('rejects strings over 254 characters', () => {
    const local = 'a'.repeat(250);
    expect(isValidEmail(`${local}@b.co`)).toBe(false);
  });
});

describe('isHoneypotTripped', () => {
  it('returns false when honeypot is empty / missing', () => {
    expect(isHoneypotTripped('')).toBe(false);
    expect(isHoneypotTripped(undefined)).toBe(false);
  });

  it('returns true when anything is in the honeypot', () => {
    expect(isHoneypotTripped('bot was here')).toBe(true);
    expect(isHoneypotTripped(' ')).toBe(true);
  });
});

describe('parseSubscribeBody', () => {
  it('returns the parsed shape for valid input', () => {
    const out = parseSubscribeBody({
      email: 'a@b.co',
      turnstileToken: 'tok-123',
      hp: '',
    });
    expect(out).toEqual({
      ok: true,
      email: 'a@b.co',
      turnstileToken: 'tok-123',
      hp: '',
    });
  });

  it('lowercases and trims the email', () => {
    const out = parseSubscribeBody({
      email: '  Hello@Example.COM  ',
      turnstileToken: 'tok',
    });
    expect(out).toEqual({
      ok: true,
      email: 'hello@example.com',
      turnstileToken: 'tok',
      hp: '',
    });
  });

  it('rejects non-object input', () => {
    expect(parseSubscribeBody(null).ok).toBe(false);
    expect(parseSubscribeBody('string').ok).toBe(false);
    expect(parseSubscribeBody(42).ok).toBe(false);
  });

  it('rejects missing or non-string fields', () => {
    expect(parseSubscribeBody({}).ok).toBe(false);
    expect(parseSubscribeBody({ email: 'a@b.co' }).ok).toBe(false);
    expect(parseSubscribeBody({ email: 1, turnstileToken: 't' }).ok).toBe(false);
  });
});
