import { checkCsrf, getUser, type StaffUser } from './session';
import { fail, isMutating, readJsonBody, sameOrigin, clientIp, NO_STORE } from './http';

export interface AdminContext {
  user: StaffUser;
  ip: string;
  body: Record<string, any>;
}

const SERVER_ERROR = 'Something went wrong on the server. Please try again.';

// Replaces the Express chain on /api/admin: no-store, same-origin, session, CSRF.
// `bodyLimit` reads and parses the JSON body first, so an unparsable body is a 400.
export async function runAdmin(
  req: Request,
  opts: { bodyLimit?: number; skipAuth?: boolean } = {},
  fn: (ctx: AdminContext) => Promise<Response>
): Promise<Response> {
  try {
    let ctx: AdminContext = { user: undefined as unknown as StaffUser, ip: clientIp(req), body: {} };

    if (!opts.skipAuth) {
      if (isMutating(req.method) && !sameOrigin(req)) return stamp(fail(403, 'Request blocked.'));
      const user = await getUser(req);
      if (!user) return stamp(fail(401, 'Please sign in to continue.'));
      if (isMutating(req.method) && !checkCsrf(req)) return stamp(fail(403, 'CSRF check failed.'));
      ctx = { user, ip: ctx.ip, body: ctx.body };
    }

    if (opts.bodyLimit) {
      const parsed = await readJsonBody(req, opts.bodyLimit);
      if ('message' in parsed) return stamp(fail(400, parsed.message));
      ctx = { ...ctx, body: parsed.value };
    }

    return stamp(await fn(ctx));
  } catch (err) {
    console.error('[admin] error:', err);
    return stamp(fail(500, SERVER_ERROR));
  }
}

const stamp = (res: Response) => {
  res.headers.set('Cache-Control', NO_STORE['Cache-Control']);
  return res;
};

export const requireAdminRole = (user: StaffUser) =>
  user.role === 'ADMIN' ? null : fail(403, 'Only admins can manage staff accounts.');
