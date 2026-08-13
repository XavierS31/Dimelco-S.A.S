export const apiUrl = (import.meta.env.VITE_API_URL || 'http://localhost:4000').replace(/\/$/, '');

export class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
    this.name = 'ApiError';
  }
}

type RequestOptions = RequestInit & { body?: BodyInit | null };

export async function api<T>(path: string, options: RequestOptions = {}): Promise<T> {
  const headers = new Headers(options.headers);
  if (options.body && !(options.body instanceof FormData) && !headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json');
  }

  const response = await fetch(`${apiUrl}${path}`, {
    ...options,
    headers,
    credentials: 'include',
  });
  const isJson = response.headers.get('content-type')?.includes('application/json');
  const payload = isJson ? await response.json() : null;

  if (!response.ok) {
    throw new ApiError(response.status, payload?.error || 'No fue posible completar la solicitud.');
  }

  return payload as T;
}

export async function signInWithGoogle(callbackPath = '/dashboard') {
  const { csrfToken } = await api<{ csrfToken: string }>('/api/auth/csrf');
  const form = document.createElement('form');
  form.method = 'post';
  form.action = `${apiUrl}/api/auth/signin/google`;
  form.style.display = 'none';

  [['csrfToken', csrfToken], ['callbackUrl', `${window.location.origin}${callbackPath}`]].forEach(([name, value]) => {
    const input = document.createElement('input');
    input.name = name;
    input.value = value;
    form.appendChild(input);
  });

  document.body.appendChild(form);
  form.submit();
}

export async function signOut() {
  const { csrfToken } = await api<{ csrfToken: string }>('/api/auth/csrf');
  const form = document.createElement('form');
  form.method = 'post';
  form.action = `${apiUrl}/api/auth/signout`;
  form.style.display = 'none';

  [['csrfToken', csrfToken], ['callbackUrl', window.location.origin]].forEach(([name, value]) => {
    const input = document.createElement('input');
    input.name = name;
    input.value = value;
    form.appendChild(input);
  });

  document.body.appendChild(form);
  form.submit();
}
