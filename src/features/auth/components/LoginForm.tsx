import React, { useState, type FormEvent, type ChangeEvent, type JSX } from 'react';
import { useNavigate } from 'react-router-dom'; // 1. Importar useNavigate
import { loginUser } from '../services/authService';
// import type { LoginResponse } from '../types/auth.types'; // Comentado temporariamente
import formWall from '../../../assets/images/wallpaper-login.png';

// --- Definição Placeholder para LoginResponse ---
// IMPORTANTE: Mova esta definição para o seu arquivo ../types/auth.types.ts
// e ajuste os campos conforme a resposta da sua API.
interface LoginResponse {
  access_token: string;
  // Adicione outros campos que sua API de login retorna e que você possa precisar
  // Ex: user?: { id: string; name: string; };
}
// --- Fim da Definição Placeholder ---


const EyeIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"></path>
    <circle cx="12" cy="12" r="3"></circle>
  </svg>
);

const EyeOffIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"></path>
    <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"></path>
    <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"></path>
    <line x1="2" x2="22" y1="2" y2="22"></line>
  </svg>
);

export default function LoginFormNewLayout(): JSX.Element {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [loginSuccess, setLoginSuccess] = useState<boolean>(false);
  const navigate = useNavigate(); // 2. Inicializar useNavigate

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setLoading(true);
    setLoginSuccess(false);

    try {
      const data: LoginResponse = await loginUser(email, password);
      console.log('Login successful:', data);
      localStorage.setItem('accessToken', data.access_token); // Armazena o token
      setLoginSuccess(true); // Mostra a mensagem de sucesso

      // 3. Redirecionar após um curto período para que a mensagem seja visível
      setTimeout(() => {
        navigate('/home');
      }, 1500); // Redireciona após 1.5 segundos

    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else if (typeof err === 'string') {
        setError(err);
      } else {
        setError('Falha ao logar. Um erro desconhecido ocorreu.');
      }
    } finally {
      setLoading(false);
    }
  };

  const backgroundStyle = {
    backgroundImage: `url(${formWall})`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    backgroundSize: 'cover',
  };

  return (
    <>
      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl w-full mx-auto py-12 px-4 sm:px-6 md:py-20 lg:py-32 md:px-8">
          <div className="md:pe-8 md:w-1/2 xl:pe-0 xl:w-5/12">
            {/* Title */}
            <h1 className="text-gray-800 font-bold md:text-2xl md:leading-tight lg:text-3xl lg:leading-tight dark:text-neutral-200">
              Acesse sua conta <span className="text-blue-600 dark:text-blue-500">com facilidade</span>
            </h1>
            <p className="mt-3 text-base text-gray-500 dark:text-neutral-500">
              Bem-vindo de volta! Insira suas credenciais para continuar explorando nossos serviços.
            </p>
            {/* End Title */}

            <div className="py-6 flex items-center text-sm text-gray-400 uppercase before:flex-1 before:border-t before:border-gray-200 before:me-6 after:flex-1 after:border-t after:border-gray-200 after:ms-6 dark:text-neutral-500 dark:before:border-neutral-700 dark:after:border-neutral-700">Login</div>

            {/* Form */}
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="login-email" className="block text-sm font-medium dark:text-white sr-only">Email</label>
                <input
                  type="email"
                  id="login-email"
                  className="py-2.5 sm:py-3 px-4 block w-full border-gray-200 rounded-lg sm:text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                  placeholder="Seu email"
                  value={email}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                  required
                  disabled={loading || loginSuccess} // Desabilita após o sucesso para evitar duplo submit
                />
              </div>

              <div className="mb-4 relative">
                <label htmlFor="login-password" className="block text-sm font-medium dark:text-white sr-only">Senha</label>
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="login-password"
                  className="py-2.5 sm:py-3 px-4 block w-full border-gray-200 rounded-lg sm:text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600 pr-12"
                  placeholder="Sua senha"
                  value={password}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                  required
                  disabled={loading || loginSuccess} // Desabilita após o sucesso
                />
                <div className="absolute inset-y-0 end-0 flex items-center pe-3">
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="text-gray-500 hover:text-gray-700 dark:text-neutral-500 dark:hover:text-neutral-300 focus:outline-none"
                    aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
                    aria-pressed={showPassword}
                    disabled={loading || loginSuccess} // Desabilita após o sucesso
                  >
                    {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                  </button>
                </div>
              </div>

              {/* Mensagens de erro e sucesso */}
              {error && (
                <p className="mt-2 mb-4 text-sm text-red-600 dark:text-red-500">{error}</p>
              )}
              {loginSuccess && (
                <p className="mt-2 mb-4 text-sm text-green-600 dark:text-green-500">Logado com sucesso! Redirecionando...</p>
              )}

              <div className="grid">
                <button
                  type="submit"
                  disabled={loading || loginSuccess} // Desabilita durante o loading e após o sucesso
                  className="py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-hidden focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
                >
                  {loading ? 'Entrando...' : 'Entrar'}
                </button>
              </div>
            </form>
            {/* End Form */}
          </div>
        </div>

        <div
          className="hidden md:block md:absolute md:top-0 md:start-1/2 md:end-0 h-full"
          style={backgroundStyle}
        ></div>
        {/* End Col */}
      </div>
      {/* End Hero */}
    </>
  );
}