import { useMutation } from "@tanstack/react-query";

interface LoginPayload {
  email: string;
  password: string;
}

interface LoginResponse {
  success: boolean;
  message?: string;
}

const login = async (payload: LoginPayload): Promise<LoginResponse> => {
  // Test delay - remove in production
  await new Promise((resolve) => setTimeout(resolve, 2000));

  const response = await fetch("/api/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include", // Important: includes cookies in request/response
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error("Login failed");
  }

  return response.json();
};

export const useLoginUserMutation = () => {
  return useMutation({
    mutationFn: login,
  });
};
