import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { Bars3Icon, XMarkIcon, ChevronDownIcon } from '@heroicons/react/24/outline';
import logoLight from '../../../assets/images/name-logo-light-no-bg.png';
import { Link } from 'react-router-dom';

// Se estiver usando React Router para navegação, importe useNavigate
// import { useNavigate } from 'react-router-dom';

const navigation = [
  { name: 'Cadastros', href: '#', current: false, isDropdown: true },
  { name: 'Team', href: '#', current: false },
  { name: 'Projects', href: '#', current: false },
  { name: 'Calendar', href: '#', current: false },
];

const cadastrosSubMenuItems = [
  { name: 'Usuários', to: '/users' }, // Mudança aqui: href para to
 
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

export default function NavbarHome() {
  // Se estiver usando React Router:
  // const navigate = useNavigate();

  const handleSignOut = async () => {
    console.log("Iniciando processo de sign out...");

    localStorage.removeItem('accessToken');  
    sessionStorage.removeItem('accessToken');  
 
    window.location.href = '/login';  

  };

  return (
    <Disclosure as="nav" className="bg-gray-800">
      {() => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              {/* ... (código do mobile menu button, logo, menu desktop) ... */}
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:ring-2 focus:ring-white focus:outline-none focus:ring-inset">
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open main menu</span>
                  <Bars3Icon aria-hidden="true" className="block size-6 group-data-[open]:hidden" />
                  <XMarkIcon aria-hidden="true" className="hidden size-6 group-data-[open]:block" />
                </DisclosureButton>
              </div>
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex shrink-0 items-center">
                  <img
                    alt="Your Company"
                    src={logoLight}
                    className="h-10 w-auto"
                  />
                </div>
                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-4">
                    {navigation.map((item) =>
                      item.name === 'Cadastros' ? (
                        <Menu as="div" key={item.name} className="relative">
                          <div>
                            <MenuButton className={classNames(
                              item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                              'rounded-md px-3 py-2 text-sm font-medium flex items-center focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800'
                            )}>
                              {item.name}
                              <ChevronDownIcon className="ml-1 -mr-1 h-5 w-5 text-gray-400" aria-hidden="true" />
                            </MenuButton>
                          </div>
                          <MenuItems
                            transition
                            className="absolute left-0 z-10 mt-2 w-48 origin-top-left rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[enter]:ease-out data-[leave]:duration-75 data-[leave]:ease-in"
                          >
                            {cadastrosSubMenuItems.map((subItem) => (
                               <MenuItem key={subItem.name}>
    {({ active }) => (
      <Link
        to={subItem.to} // Usando <Link> com a prop 'to'
        className={/* ... classes de estilo ... */
          `${active ? 'bg-gray-100' : ''} block px-4 py-2 text-sm text-gray-700`
        }
      >
        {subItem.name}
      </Link>
    )}
  </MenuItem>
                            ))}
                          </MenuItems>
                        </Menu>
                      ) : (
                        <a
                          key={item.name}
                          href={item.href}
                          aria-current={item.current ? 'page' : undefined}
                          className={classNames(
                            item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                            'rounded-md px-3 py-2 text-sm font-medium',
                          )}
                        >
                          {item.name}
                        </a>
                      )
                    )}
                  </div>
                </div>
              </div>


              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                {/* Profile dropdown */}
                <Menu as="div" className="relative ml-3">
                  <div>
                    <MenuButton className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                      <span className="absolute -inset-1.5" />
                      <span className="sr-only">Abrir Menu</span>
                      <img
                        alt=""
                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                        className="size-8 rounded-full"
                      />
                    </MenuButton>
                  </div>
                  <MenuItems
                    transition
                    className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[enter]:ease-out data-[leave]:duration-75 data-[leave]:ease-in"
                  >
                   
                    <MenuItem>
                      {/* O 'a' aqui pode ser um 'button' se não houver navegação antes do logout */}
                      {/* Usando 'button' para evitar que o href="#" cause scroll para o topo */}
                      <button
                        onClick={handleSignOut}
                        className="block w-full px-4 py-2 text-left text-sm  text-gray-700 data-[focus]:bg-gray-100"
                      >
                        Sair
                      </button>
                    </MenuItem>
                  </MenuItems>
                </Menu>
              </div>
            </div>
          </div>

          <DisclosurePanel className="sm:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              {navigation.map((item) =>
                item.name === 'Cadastros' ? (
                  <Disclosure as="div" key={item.name} className="space-y-1">
                    {({ open }) => (
                      <>
                        <DisclosureButton className={classNames(
                          item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                          'group flex w-full items-center rounded-md px-3 py-2 text-base font-medium justify-between'
                        )}>
                          {item.name}
                          <ChevronDownIcon
                            className={classNames(
                              open ? '-rotate-180 text-white' : 'text-gray-400 group-hover:text-white',
                              'ml-2 size-5 transform transition-transform duration-150 ease-in-out'
                            )}
                          />
                        </DisclosureButton>
                    
                      </>
                    )}
                  </Disclosure>
                ) : (
                  <DisclosureButton
                    key={item.name}
                    as="a"
                    href={item.href}
                    aria-current={item.current ? 'page' : undefined}
                    className={classNames(
                      item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                      'block rounded-md px-3 py-2 text-base font-medium',
                    )}
                  >
                    {item.name}
                  </DisclosureButton>
                )
              )}
              {/* Adicionar botão de Sign out no menu mobile também, se desejado */}
              <DisclosureButton
                as="button"
                onClick={handleSignOut}
                className="block w-full rounded-md px-3 py-2 text-left text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
              >
                Sign out
              </DisclosureButton>
            </div>
          </DisclosurePanel>
        </>
      )}
    </Disclosure>
  );
}