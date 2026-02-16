import React from 'react';

const Modal = ({ tarea, onClose, onEdit }) => {
  if (!tarea) return null;

  const getEstadoBgColor = (nom_estado) => {
    switch (nom_estado) {
      case 'Backlog':
        return 'bg-gray-500';
      case 'En curso':
        return 'bg-blue-500';
      case 'Pruebas':
        return 'bg-yellow-400';
      case 'RetroAlimentacion':
        return 'bg-red-400';
      case 'Culminada':
        return 'bg-green-500';
      default:
        return 'bg-gray-400';
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="bg-blue-600 text-white px-6 py-4 rounded-t-lg flex justify-between items-center">
          <div className="flex items-center gap-4">
            <h3 className="text-xl font-bold">📋 Detalles de la Tarea</h3>
            <button
              onClick={() => onEdit(tarea)}
              className="text-white hover:text-gray-200 text-lg"
              title="Ir a actualizarla"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </button>
          </div>
          <button
            onClick={onClose}
            className="text-white hover:text-gray-200 text-2xl font-bold"
            title='Cerrar'
          >
            ×
          </button>
        </div>

        <div className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-600 mb-1">
              Código Único
            </label>
            <p className="text-lg font-mono bg-gray-100 px-3 py-2 rounded">
              {tarea.codigo_unico}
            </p>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-600 mb-1">
              Título
            </label>
            <p className="text-lg text-gray-800">{tarea.titulo}</p>
          </div>

          {tarea.url_tarea && (
            <div>
              <label className="block text-sm font-semibold text-gray-600 mb-1">
                URL Tarea
              </label>
              <a
                href={tarea.url_tarea}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 hover:underline break-all"
              >
                🔗 {tarea.url_tarea}
              </a>
            </div>
          )}

          {tarea.empresa && (
            <div>
              <label className="block text-sm font-semibold text-gray-600 mb-1">
                Empresa
              </label>
              <p className="text-gray-800">{tarea.empresa}</p>
            </div>
          )}

          {tarea.submodulo && (
            <div>
              <label className="block text-sm font-semibold text-gray-600 mb-1">
                Submódulo
              </label>
              <p className="text-gray-800">{tarea.submodulo}</p>
            </div>
          )}

          {tarea.rama && (
            <div>
              <label className="block text-sm font-semibold text-gray-600 mb-1">
                Rama
              </label>
              <p className="font-mono text-gray-800 bg-gray-100 px-3 py-2 rounded">
                {tarea.rama}
              </p>
            </div>
          )}

          {tarea.nom_estado && (
            <div>
              <label className="block text-sm font-semibold text-gray-600 mb-1">
                Estado
              </label>
              <p className={`${getEstadoBgColor(tarea.nom_estado)} text-white px-2 py-1 rounded font-semibold inline-block`}>{tarea.nom_estado}</p>
            </div>
          )}

          {tarea.hash_commit && (
            <div>
              <label className="block text-sm font-semibold text-gray-600 mb-1">
                Hash Commit
              </label>
              <p className="font-mono text-gray-800 bg-gray-100 px-3 py-2 rounded">
                {tarea.hash_commit}
              </p>
            </div>
          )}

          <div className="pt-4 border-t">
            <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
              <div>
                <span className="font-semibold">Creada:</span>{' '}
                {new Date(tarea.created_at).toLocaleString('es-ES')}
              </div>
              <div>
                <span className="font-semibold">Actualizada:</span>{' '}
                {new Date(tarea.updated_at).toLocaleString('es-ES')}
              </div>
            </div>
          </div>
        </div>

        <div className="px-6 py-4 bg-gray-50 rounded-b-lg">
          <button
            onClick={onClose}
            className="w-full px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
