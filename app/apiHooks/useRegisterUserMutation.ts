import { useMutation } from '@tanstack/react-query';

interface RegisterPayload {
  email: string;
  password: string;
}

interface RegisterResponse {
  success: boolean;
  message?: string;
}

const register = async (payload: RegisterPayload): Promise<RegisterResponse> => {
  const response = await fetch('/api/auth/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error('Registration failed');
  }

  return response.json();
};

export const useRegisterUserMutation = () => {
  return useMutation({
    mutationFn: register,
  });
};
