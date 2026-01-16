import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { components } from '~/types/api';

interface LoginPayload {
  email: string;
  password: string;
}

const login = async (payload: LoginPayload): Promise<components['schemas']['UserDto']> => {
  // Test delay - remove in production
  await new Promise(resolve => setTimeout(resolve, 1000));

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

export const useLoginUserMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: login,
    onSuccess: data => {
      queryClient.setQueryData(['session'], data);
    },
  });
};
