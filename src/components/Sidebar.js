import React from 'react';

const Sidebar = ({ activeSection, setActiveSection, onLogout, theme, toggleTheme }) => {
  return (
    <div className="w-64 bg-gray-800 dark:bg-gray-800 text-white dark:text-white h-screen fixed left-0 top-0">
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-8">Backlog Tareas</h1>
        <button
          onClick={toggleTheme}
          className="w-full text-left px-4 py-3 mb-4 rounded-lg transition-colors hover:bg-gray-700 dark:hover:bg-gray-600 flex items-center gap-2"
        >
          {theme === 'light' ? (
            <>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
              Modo Oscuro
            </>
          ) : (
            <>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
              Modo Claro
            </>
          )}
        </button>
        <nav>
          <button
            onClick={() => setActiveSection('registrar')}
            className={`w-full text-left px-4 py-3 mb-2 rounded-lg transition-colors ${
              activeSection === 'registrar'
                ? 'bg-blue-600 text-white'
                : 'hover:bg-gray-700 dark:hover:bg-gray-600'
            }`}
          >
            Registrar Tareas
          </button>
          <button
            onClick={() => setActiveSection('ver')}
            className={`w-full text-left px-4 py-3 mb-2 rounded-lg transition-colors ${
              activeSection === 'ver'
                ? 'bg-blue-600 text-white'
                : 'hover:bg-gray-700 dark:hover:bg-gray-600'
            }`}
          >
             Ver Tareas
          </button>
          <button
            onClick={onLogout}
            className="w-full text-left px-4 py-3 rounded-lg transition-colors hover:bg-red-600 mt-8"
          >
            Cerrar Sesión
          </button>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
