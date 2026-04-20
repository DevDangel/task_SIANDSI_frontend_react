import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from './Modal';
import { API_TAREAS_URL } from '../config/api';

const API_URL = API_TAREAS_URL;

const VerTareas = ({ setActiveSection, setTareaEdit }) => {
  const [tareas, setTareas] = useState([]);
  const [tareasFiltradas, setTareasFiltradas] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedEstado, setSelectedEstado] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [selectedTarea, setSelectedTarea] = useState(null);
  const [loading, setLoading] = useState(true);

  const getEstadoColor = (nom_estado) => {
    switch (nom_estado) {
      case 'Backlog':
        return 'from-gray-500 dark:from-gray-800 to-gray-600 dark:to-gray-900';
      case 'En curso':
        return 'from-blue-500 dark:from-blue-800 to-blue-600 dark:to-blue-900';
      case 'Pruebas':
        return 'from-yellow-400 dark:from-yellow-700 to-yellow-500 dark:to-yellow-800';
      case 'RetroAlimentacion':
        return 'from-red-400 dark:from-red-700 to-red-500 dark:to-red-800';
      case 'Culminada':
        return 'from-green-500 dark:from-green-800 to-green-600 dark:to-green-900';
      default:
        return 'from-gray-50 dark:from-gray-800 to-gray-50 dark:to-gray-900';
    }
  };

  const getTextColor = (nom_estado) => {
    switch (nom_estado) {
      case 'Backlog':
      case 'En curso':
      case 'Pruebas':
      case 'RetroAlimentacion':
      case 'Culminada':
        return 'text-white';
      default:
        return 'text-gray-900';
    }
  };

  const getEstadoDotColor = (nom_estado) => {
    switch (nom_estado) {
      case 'Backlog':
        return 'bg-gray-500';
      case 'En curso':
        return 'bg-blue-500';
      case 'Pruebas':
        return 'bg-yellow-500';
      case 'RetroAlimentacion':
        return 'bg-red-500';
      case 'Culminada':
        return 'bg-green-500';
      default:
        return 'bg-gray-300';
    }
  };

  const estadoItems = [
    { key: 'Backlog', label: 'Backlog' },
    { key: 'En curso', label: 'En curso' },
    { key: 'Pruebas', label: 'En pruebas' },
    { key: 'RetroAlimentacion', label: 'Retroalimentacion' },
    { key: 'Culminada', label: 'Culminada' },
  ];

  useEffect(() => {
    fetchTareas();
  }, []);

  const filterTareas = () => {
    let filtered = tareas;
    if (searchTerm.trim() !== '') {
      filtered = filtered.filter(
        (tarea) =>
          tarea.codigo_unico.toLowerCase().includes(searchTerm.toLowerCase()) ||
          tarea.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (tarea.empresa && tarea.empresa.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }
    if (selectedEstado) {
      filtered = filtered.filter((tarea) => tarea.nom_estado === selectedEstado);
    }
    if (startDate) {
      const start = new Date(startDate);
      filtered = filtered.filter((tarea) => new Date(tarea.created_at) >= start);
    }
    if (endDate) {
      const end = new Date(endDate);
      end.setHours(23, 59, 59, 999);
      filtered = filtered.filter((tarea) => new Date(tarea.created_at) <= end);
    }
    setTareasFiltradas(filtered);
  };

  useEffect(() => {
    filterTareas();
  }, [searchTerm, tareas, selectedEstado]);

  const fetchTareas = async () => {
    try {
      setLoading(true);
      const response = await axios.get(API_URL);
        // Orden personalizado: En curso, Pruebas, RetroAlimentacion, resto
        const order = ['Backlog','En curso', 'Pruebas', 'RetroAlimentacion'];
        const sortedTareas = response.data.slice().sort((a, b) => {
          const indexA = order.indexOf(a.nom_estado);
          const indexB = order.indexOf(b.nom_estado);
          if (indexA === -1 && indexB === -1) return 0;
          if (indexA === -1) return 1;
          if (indexB === -1) return -1;
          return indexA - indexB;
        });
        setTareas(sortedTareas);
        setTareasFiltradas(sortedTareas);
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

  const handleEdit = (tarea) => {
    setTareaEdit(tarea);
    setActiveSection('registrar');
  };

  return (
    <div className="p-8">
      <h2 className="text-3xl font-bold mb-6 text-gray-800 dark:text-gray-200">Ver Tareas</h2>

      {/* Barra de búsqueda */}
      <div className="bg-white dark:bg-gray-900 rounded-lg shadow-md p-6 mb-6">
        <div className="flex items-center gap-3">
          <span className="text-2xl">🔍</span>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar por código, título o empresa..."
            className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 caret-black dark:caret-white"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
            >
              ✕
            </button>
          )}
        </div>

        {/* Filtros de fecha */}
        <div className="mt-4 flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600 dark:text-gray-400">📅 Fecha inicio:</span>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="px-3 py-1 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600 dark:text-gray-400">📅 Fecha fin:</span>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="px-3 py-1 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            />
          </div>
          <button
            onClick={() => filterTareas()}
            className="px-4 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600 text-sm"
          >
            Filtrar
          </button>
          <button
            onClick={() => { setStartDate(''); setEndDate(''); filterTareas(); }}
            className="px-3 py-1 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 border border-gray-300 dark:border-gray-600 rounded-lg"
          >
            Limpiar fechas
          </button>
        </div>

        <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
          {tareasFiltradas.length} tarea(s) encontrada(s)
        </p>
        <div className="mt-4 flex flex-wrap gap-3 text-sm text-gray-700 dark:text-gray-300">
          {estadoItems.map((estado) => {
            const total = tareas.filter((tarea) => tarea.nom_estado === estado.key).length;
            const isActive = selectedEstado === estado.key;
            return (
              <button
                key={estado.key}
                type="button"
                onClick={() => setSelectedEstado(isActive ? '' : estado.key)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-full border transition-all hover:shadow-md hover:-translate-y-0.5 ${
                  isActive
                    ? 'border-gray-400 dark:border-gray-500 bg-gray-100 dark:bg-gray-800'
                    : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800'
                }`}
                title={isActive ? 'Quitar filtro' : `Filtrar por ${estado.label}`}
              >
                <span className={`w-3 h-3 rounded-full ${getEstadoDotColor(estado.key)}`} />
                <span className="font-semibold">{estado.label}:</span>
                <span>{total}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Grid de tareas */}
      {loading ? (
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">Cargando tareas...</p>
        </div>
      ) : tareasFiltradas.length === 0 ? (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-12 text-center">
          <p className="text-xl text-gray-600 dark:text-gray-400">
            {searchTerm ? '😕 No se encontraron tareas' : '📝 No hay tareas registradas'}
          </p>
          <p className="text-gray-500 dark:text-gray-400 mt-2">
            {!searchTerm && 'Comienza registrando tu primera tarea'}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tareasFiltradas.map((tarea) => (
            <div
              key={tarea.id}
              onClick={() => handleCardClick(tarea)}
              className="bg-white dark:bg-gray-900 rounded-lg shadow-md hover:shadow-xl transition-all cursor-pointer overflow-hidden border border-gray-200 dark:border-gray-700 hover:border-blue-400 hover:scale-105 duration-300"
            >
              <div className={`bg-gradient-to-r ${getEstadoColor(tarea.nom_estado)} px-4 py-3`}>
                <h3 className={`font-mono text-sm ${getTextColor(tarea.nom_estado)} font-semibold`}>
                  {tarea.codigo_unico}
                </h3>
              </div>
              <div className="p-4">
                <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3 line-clamp-2">
                  {tarea.titulo}
                </h4>
                <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                  {tarea.empresa && (
                    <div className="flex items-center gap-2">
                      <span className="text-gray-400 dark:text-gray-500">🏢</span>
                      <span className="truncate">{tarea.empresa}</span>
                    </div>
                  )}
                  {tarea.submodulo && (
                    <div className="flex items-center gap-2">
                      <span className="text-gray-400 dark:text-gray-500">📦</span>
                      <span className="truncate">{tarea.submodulo}</span>
                    </div>
                  )}
                  {tarea.rama && (
                    <div className="flex items-center gap-2">
                      <span className="text-gray-400 dark:text-gray-500">🌿</span>
                      <span className="font-mono text-xs truncate">{tarea.rama}</span>
                    </div>
                  )}
                  {tarea.nom_estado && (
                    <div className="flex items-center gap-2">
                      <span className="text-gray-400 dark:text-gray-500">📊</span>
                      <span className="truncate">{tarea.nom_estado}</span>
                    </div>
                  )}
                </div>
                <div className="mt-4 pt-3 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
                    <span>Creada: {new Date(tarea.created_at).toLocaleDateString('es-ES')}</span>
                    <span>Actualizada: {new Date(tarea.updated_at).toLocaleDateString('es-ES')}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {selectedTarea && <Modal tarea={selectedTarea} onClose={closeModal} onEdit={handleEdit} />}
    </div>
  );
};

export default VerTareas;
