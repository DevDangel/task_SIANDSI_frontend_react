import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const API_URL = 'https://tasksiandsibackendnodejs-production.up.railway.app/api/tareas';

const NotasModal = ({ tarea, onClose }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [notaDesc, setNotaDesc] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchNotas = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}/${tarea.id}/notas`);
      if (response.data.length > 0) {
        setNotaDesc(response.data[0].nota_desc || '');
      } else {
        setNotaDesc('');
      }
    } catch (error) {
      console.error('Error al obtener notas:', error);
    } finally {
      setLoading(false);
    }
  }, [tarea.id]);

  useEffect(() => {
    fetchNotas();
  }, [fetchNotas]);

  const handleSave = async () => {
    try {
      await axios.post(`${API_URL}/${tarea.id}/notas`, { nota_desc: notaDesc });
      setIsEditing(false);
      fetchNotas(); // Recargar notas
    } catch (error) {
      console.error('Error al guardar nota:', error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-5xl w-full h-[90vh] flex flex-col overflow-hidden">
        <div className="bg-white text-gray-800 px-6 py-4 rounded-t-lg flex justify-between items-center border-b border-gray-200 flex-shrink-0">
          <h3 className="text-xl font-bold">📝 Notas de la Tarea: {tarea.titulo}</h3>
          <button
            onClick={onClose}
            className="text-gray-800 hover:text-gray-600 text-2xl font-bold"
            title='Cerrar'
          >
            ×
          </button>
        </div>

        <div className="p-6 flex-1 flex flex-col overflow-hidden">
          <div className="mb-4 flex-shrink-0 flex justify-between items-center">
            <div>
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                {isEditing ? 'Cancelar' : '+ Agregar Nota'}
              </button>
              {isEditing && (
                <button
                  onClick={handleSave}
                  className="ml-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  💾 Guardar Nota
                </button>
              )}
            </div>
            {!isEditing && (
              <button
                onClick={onClose}
                className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
              >
                Cerrar
              </button>
            )}
          </div>

          {loading ? (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                <p className="mt-4 text-gray-600">Cargando notas...</p>
              </div>
            </div>
          ) : (
            <textarea
              value={notaDesc}
              onChange={(e) => setNotaDesc(e.target.value)}
              readOnly={!isEditing}
              className="flex-1 w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none overflow-auto"
              placeholder="Escribe tus notas aquí..."
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default NotasModal;