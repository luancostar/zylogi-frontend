// No seu arquivo de componente React (ex: MeuDropdownComponent.tsx)
import React, { useEffect }  from 'react';

// ... (outras importações e declarações de tipo se você tiver, como a do 'window.HSStaticMethods')
declare global {
  interface Window {
    HSStaticMethods?: { // Marque como opcional para checagem
      autoInit: (collection?: string | string[] | null) => void;
    };
    // Outras interfaces da Preline se necessário
  }
}

const MeuComponenteComDropdown: React.FC = () => {
  useEffect(() => {
    console.log('[EFFECT] Componente montado. Tentando inicializar Preline.');

    // Adicione um pequeno delay para dar tempo ao DOM renderizar e ao script da Preline carregar completamente
    const timerId = setTimeout(() => {
      console.log('[EFFECT DELAYED] Verificando window.HSStaticMethods...');
      if (window.HSStaticMethods && typeof window.HSStaticMethods.autoInit === 'function') {
        console.log('[EFFECT DELAYED] HSStaticMethods encontrado. Chamando autoInit("dropdown").');
        window.HSStaticMethods.autoInit(['dropdown']); // Ou apenas window.HSStaticMethods.autoInit(); para testar
        console.log('[EFFECT DELAYED] autoInit("dropdown") chamado.');
      } else {
        console.error('[EFFECT DELAYED] ERRO: window.HSStaticMethods ou window.HSStaticMethods.autoInit não está disponível!');
      }
    }, 100); // 100ms de delay, pode aumentar para 300ms para testar

    return () => {
      clearTimeout(timerId);
    };
  }, []); // Array de dependências vazio para rodar apenas na montagem

  return (
    <div>
      {/* SEU JSX DO DROPDOWN DA PRELINE VAI AQUI */}
      {/* Exemplo (substitua pelo seu código real): */}
      <div className="hs-dropdown relative inline-flex">
        <button
          id="hs-dropdown-default"
          type="button"
          className="hs-dropdown-toggle py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800"
        >
          Dropdown
          <svg
            className="hs-dropdown-open:rotate-180 size-4"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m6 9 6 6 6-6" />
          </svg>
        </button>

        <div
          className="hs-dropdown-menu transition-[opacity,margin] duration hs-dropdown-open:opacity-100 opacity-0 hidden min-w-60 bg-white shadow-md rounded-lg p-2 mt-2 dark:bg-neutral-800 dark:border dark:border-neutral-700 dark:divide-neutral-700 after:h-4 after:absolute after:-bottom-4 after:start-0 after:w-full before:h-4 before:absolute before:-top-4 before:start-0 before:w-full"
          aria-labelledby="hs-dropdown-default"
        >
          <a
            className="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500 dark:text-neutral-400 dark:hover:bg-neutral-700 dark:hover:text-neutral-300"
            href="#"
          >
            Opção 1
          </a>
          <a
            className="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500 dark:text-neutral-400 dark:hover:bg-neutral-700 dark:hover:text-neutral-300"
            href="#"
          >
            Opção 2
          </a>
        </div>
      </div>
      {/* FIM DO EXEMPLO DE JSX - USE O SEU! */}
    </div>
  );
};

export default MeuComponenteComDropdown;