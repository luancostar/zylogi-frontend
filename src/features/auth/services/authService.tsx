// src/features/auth/services/authService.ts
import type { LoginResponse, ApiError } from '../types/auth.types';

const API_URL = 'http://localhost:3000';

export const loginUser = async (email: string, password: string): Promise<LoginResponse> => {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });

  const data: LoginResponse | ApiError = await response.json();

  if (!response.ok) {
    // Se a API retornar um erro específico no corpo da resposta, use-o
    const errorData = data as ApiError;
    throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
  }

  // Sucesso - retorna os dados (que incluem o access_token)
  return data as LoginResponse;
};