import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import RegistrarTareas from './components/RegistrarTareas';
import VerTareas from './components/VerTareas';
import Login from './components/Login';

function App() {
  const [activeSection, setActiveSection] = useState('registrar');
  const [tareaEdit, setTareaEdit] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    setIsLoggedIn(false);
  };

  if (!isLoggedIn) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar activeSection={activeSection} setActiveSection={setActiveSection} onLogout={handleLogout} />
      
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
