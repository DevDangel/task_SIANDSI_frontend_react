import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import RegistrarTareas from './components/RegistrarTareas';
import VerTareas from './components/VerTareas';

function App() {
  const [activeSection, setActiveSection] = useState('registrar');
  const [tareaEdit, setTareaEdit] = useState(null);

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar activeSection={activeSection} setActiveSection={setActiveSection} />
      
      <main className="ml-64 flex-1">
        {activeSection === 'registrar' ? (
          <RegistrarTareas tareaEdit={tareaEdit} setTareaEdit={setTareaEdit} />
        ) : (
          <VerTareas setActiveSection={setActiveSection} setTareaEdit={setTareaEdit} />
        )}
      </main>
    </div>
  );
}

export default App;
