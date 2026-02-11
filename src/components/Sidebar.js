import React from 'react';

const Sidebar = ({ activeSection, setActiveSection }) => {
  return (
    <div className="w-64 bg-gray-800 text-white h-screen fixed left-0 top-0">
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-8">Backlog Tareas</h1>
        <nav>
          <button
            onClick={() => setActiveSection('registrar')}
            className={`w-full text-left px-4 py-3 mb-2 rounded-lg transition-colors ${
              activeSection === 'registrar'
                ? 'bg-blue-600 text-white'
                : 'hover:bg-gray-700'
            }`}
          >
            Registrar Tareas
          </button>
          <button
            onClick={() => setActiveSection('ver')}
            className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
              activeSection === 'ver'
                ? 'bg-blue-600 text-white'
                : 'hover:bg-gray-700'
            }`}
          >
             Ver Tareas
          </button>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
