export class AuthError extends Error {
  constructor(message = 'Unauthorized') {
    super(message);
    this.name = 'AuthError';
  }
}

export const fetchWithAuth = async (url: string, options?: RequestInit): Promise<Response> => {
  const response = await fetch(url, {
    ...options,
    credentials: 'include',
  });

  if (response.status === 401) {
    // Session expired - redirect to login
    window.location.href = '/login';
    throw new AuthError();
  }

  if (!response.ok) {
    throw new Error(`Request failed: ${response.status}`);
  }

  return response;
};
