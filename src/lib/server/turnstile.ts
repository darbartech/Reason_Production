export interface TurnstileResult {
  success?: boolean;
  'error-codes'?: string[];
}

export async function verifyTurnstile(response: string, remoteip: string): Promise<TurnstileResult> {
  try {
    const res = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        secret: process.env.TURNSTILE_SECRET_KEY || '',
        response,
        remoteip,
      }),
      signal: AbortSignal.timeout(5000),
      cache: 'no-store',
    });
    return (await res.json()) as TurnstileResult;
  } catch {
    return { success: false };
  }
}
