import { useQuery } from '@tanstack/react-query';

export interface User {
  id: string;
  username: string;
}

const fetchSession = async (): Promise<User | null> => {
  const response = await fetch('/api/auth/me', {
    credentials: 'include',
  });

  if (response.status === 401) {
    return null;
  }

  if (!response.ok) {
    throw new Error('Failed to fetch session');
  }

  return response.json();
};

export const useSessionQuery = () => {
  return useQuery({
    queryKey: ['session'],
    queryFn: fetchSession,
    retry: false,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};
