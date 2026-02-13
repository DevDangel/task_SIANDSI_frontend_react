import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from './Modal';

const API_URL = 'https://tasksiandsibackendnodejs-production.up.railway.app/api/tareas';

const VerTareas = () => {
  const [tareas, setTareas] = useState([]);
  const [tareasFiltradas, setTareasFiltradas] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTarea, setSelectedTarea] = useState(null);
  const [loading, setLoading] = useState(true);

  const getEstadoColor = (nom_estado) => {
    switch (nom_estado) {
      case 'Backlog':
        return 'from-gray-500 to-gray-600';
      case 'En curso':
        return 'from-blue-500 to-blue-600';
      case 'Pruebas':
        return 'from-yellow-400 to-yellow-500';
      case 'RetroAlimentacion':
        return 'from-red-400 to-red-500';
      case 'Culminada':
        return 'from-green-500 to-green-600';
      default:
        return 'from-blue-600 to-blue-700';
    }
  };

  useEffect(() => {
    fetchTareas();
  }, []);

  useEffect(() => {
    if (searchTerm.trim() === '') {
      setTareasFiltradas(tareas);
    } else {
      const filtered = tareas.filter(
        (tarea) =>
          tarea.codigo_unico.toLowerCase().includes(searchTerm.toLowerCase()) ||
          tarea.titulo.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setTareasFiltradas(filtered);
    }
  }, [searchTerm, tareas]);

  const fetchTareas = async () => {
    try {
      setLoading(true);
      const response = await axios.get(API_URL);
      setTareas(response.data);
      setTareasFiltradas(response.data);
    } catch (error) {
      console.error('Error al obtener tareas:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCardClick = (tarea) => {
    setSelectedTarea(tarea);
  };

  const closeModal = () => {
    setSelectedTarea(null);
  };

  return (
    <div className="p-8">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Ver Tareas</h2>

      {/* Barra de búsqueda */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex items-center gap-3">
          <span className="text-2xl">🔍</span>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar por código o título..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="px-4 py-2 text-gray-600 hover:text-gray-800"
            >
              ✕
            </button>
          )}
        </div>
        <p className="text-sm text-gray-600 mt-2">
          {tareasFiltradas.length} tarea(s) encontrada(s)
        </p>
      </div>

      {/* Grid de tareas */}
      {loading ? (
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <p className="mt-4 text-gray-600">Cargando tareas...</p>
        </div>
      ) : tareasFiltradas.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md p-12 text-center">
          <p className="text-xl text-gray-600">
            {searchTerm ? '😕 No se encontraron tareas' : '📝 No hay tareas registradas'}
          </p>
          <p className="text-gray-500 mt-2">
            {!searchTerm && 'Comienza registrando tu primera tarea'}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tareasFiltradas.map((tarea) => (
            <div
              key={tarea.id}
              onClick={() => handleCardClick(tarea)}
              className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow cursor-pointer overflow-hidden border border-gray-200 hover:border-blue-400"
            >
              <div className={`bg-gradient-to-r ${getEstadoColor(tarea.nom_estado)} px-4 py-3`}>
                <h3 className="font-mono text-sm text-white font-semibold">
                  {tarea.codigo_unico}
                </h3>
              </div>
              <div className="p-4">
                <h4 className="text-lg font-semibold text-gray-800 mb-3 line-clamp-2">
                  {tarea.titulo}
                </h4>
                <div className="space-y-2 text-sm text-gray-600">
                  {tarea.empresa && (
                    <div className="flex items-center gap-2">
                      <span className="text-gray-400">🏢</span>
                      <span className="truncate">{tarea.empresa}</span>
                    </div>
                  )}
                  {tarea.submodulo && (
                    <div className="flex items-center gap-2">
                      <span className="text-gray-400">📦</span>
                      <span className="truncate">{tarea.submodulo}</span>
                    </div>
                  )}
                  {tarea.rama && (
                    <div className="flex items-center gap-2">
                      <span className="text-gray-400">🌿</span>
                      <span className="font-mono text-xs truncate">{tarea.rama}</span>
                    </div>
                  )}
                  {tarea.nom_estado && (
                    <div className="flex items-center gap-2">
                      <span className="text-gray-400">📊</span>
                      <span className="truncate">{tarea.nom_estado}</span>
                    </div>
                  )}
                </div>
                <div className="mt-4 pt-3 border-t border-gray-200">
                  <p className="text-xs text-gray-500">
                    Actualizada: {new Date(tarea.updated_at).toLocaleDateString('es-ES')}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {selectedTarea && <Modal tarea={selectedTarea} onClose={closeModal} />}
    </div>
  );
};

export default VerTareas;
