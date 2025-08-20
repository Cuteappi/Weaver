import { createServerFileRoute } from '@tanstack/react-start/server';
import { getWorkOS } from '@/authkit/ssr/workos';
import { getConfig } from '@/authkit/ssr/config';
import { saveSession } from '@/authkit/ssr/session';

function decodeReturnPath(state?: string): string | undefined {
  try {
    if (!state) return undefined;
    // Use atob in browsers, Buffer in Node, and fail gracefully otherwise
    const json =
      typeof atob === 'function'
        ? atob(state)
        : (globalThis as any).Buffer?.from?.(state, 'base64')?.toString?.('utf-8') ?? '';
    const parsed = json ? JSON.parse(json) : undefined;
    if (parsed && typeof parsed.returnPathname === 'string') {
      return parsed.returnPathname;
    }
  } catch {
    // ignore
  }
  return undefined;
}

export const ServerRoute = createServerFileRoute('/api/auth/callback').methods({
  GET: async ({ request }) => {
    const url = new URL(request.url);

    const error = url.searchParams.get('error');
    if (error) {
      // Optional: surface error_description
      const returnTo = '/';
      return new Response(null, { status: 302, headers: { Location: returnTo } });
    }

    const code = url.searchParams.get('code');
    if (!code) {
      return new Response('Missing code parameter', { status: 400 });
    }

    const clientId = getConfig('clientId');

    const auth = await getWorkOS().userManagement.authenticateWithCode({
      clientId,
      code,
    });

    // Persist session cookie (wos-session by default)
    await saveSession(auth);

    const state = url.searchParams.get('state') || undefined;
    const returnPath = decodeReturnPath(state) ?? '/';

    return new Response(null, { status: 302, headers: { Location: returnPath } });
  },
});
