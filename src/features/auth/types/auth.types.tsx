// Em: src/types/auth.types.ts (ou o caminho que você usa)
export interface LoginResponse {
  access_token: string; // Essencial, já que você usa data.access_token
  token_type?: string;
  expires_in?: number;
  user?: {
    id: string | number;
    name?: string;
    email?: string;
    // ...outros dados do usuário
  };
  // ...quaisquer outros campos que sua API de login retorne
}