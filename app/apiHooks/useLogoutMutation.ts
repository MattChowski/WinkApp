import { useMutation } from '@tanstack/react-query';

const logout = async (): Promise<void> => {
  const response = await fetch('/api/auth/logout', {
    method: 'POST',
    credentials: 'include',
  });

  if (!response.ok) {
    throw new Error('Logout failed');
  }
};

export const useLogoutMutation = () => {
  return useMutation({
    mutationFn: logout,
  });
};
