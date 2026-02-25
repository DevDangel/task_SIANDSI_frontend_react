import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import RegistrarTareas from './components/RegistrarTareas';
import VerTareas from './components/VerTareas';
import Login from './components/Login';

function App() {
  const [activeSection, setActiveSection] = useState('registrar');
  const [tareaEdit, setTareaEdit] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    }
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
    document.documentElement.classList.toggle('dark', savedTheme === 'dark');
  }, []);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    setIsLoggedIn(false);
  };

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
  };

  if (!isLoggedIn) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900">
      <Sidebar activeSection={activeSection} setActiveSection={setActiveSection} onLogout={handleLogout} theme={theme} toggleTheme={toggleTheme} />
      
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
