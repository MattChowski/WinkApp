import { useMutation } from '@tanstack/react-query';

interface LoginPayload {
  email: string;
  password: string;
}

interface LoginResponse {
  success: boolean;
  message?: string;
}

const login = async (payload: LoginPayload): Promise<LoginResponse> => {
  const response = await fetch('/api/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include', // Important: includes cookies in request/response
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error('Login failed');
  }

  return response.json();
};

export const useLoginMutation = () => {
  return useMutation({
    mutationFn: login,
  });
};
