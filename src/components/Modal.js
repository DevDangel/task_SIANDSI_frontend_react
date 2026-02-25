import React from 'react';
import NotasModal from './NotasModal';

const Modal = ({ tarea, onClose, onEdit }) => {
  const [showNotas, setShowNotas] = React.useState(false);
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
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-scroll" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
        <div className="bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 px-6 py-4 rounded-t-lg flex justify-between items-center border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-4">
            <h3 className="text-xl font-bold">📋 Detalles de la Tarea</h3>
            <button
              onClick={() => onEdit(tarea)}
              className="text-gray-800 dark:text-gray-200 hover:text-gray-600 dark:hover:text-gray-400 text-lg"
              title="Ir a actualizarla"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </button>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setShowNotas(true)}
              className="px-3 py-1 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded hover:bg-gray-300 dark:hover:bg-gray-600 text-sm flex items-center gap-1"
              title="Ver Notas"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </button>
            <button
              onClick={onClose}
              className="text-gray-800 dark:text-gray-200 hover:text-gray-600 dark:hover:text-gray-400 text-2xl font-bold"
              title='Cerrar'
            >
              ×
            </button>
          </div>
        </div>

        <div className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-600 dark:text-gray-400 mb-1">
              Código Único
            </label>
            <p className="text-lg font-mono bg-gray-100 dark:bg-gray-700 px-3 py-2 rounded">
              {tarea.codigo_unico}
            </p>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-600 dark:text-gray-400 mb-1">
              Título
            </label>
            <p className="text-lg text-gray-800 dark:text-gray-200">{tarea.titulo}</p>
          </div>

          {tarea.url_tarea && (
            <div>
              <label className="block text-sm font-semibold text-gray-600 dark:text-gray-400 mb-1">
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
              <label className="block text-sm font-semibold text-gray-600 dark:text-gray-400 mb-1">
                Empresa
              </label>
              <p className="text-gray-800 dark:text-gray-200">{tarea.empresa}</p>
            </div>
          )}

          {tarea.submodulo && (
            <div>
              <label className="block text-sm font-semibold text-gray-600 dark:text-gray-400 mb-1">
                Submódulo
              </label>
              <p className="text-gray-800 dark:text-gray-200">{tarea.submodulo}</p>
            </div>
          )}

          {tarea.rama && (
            <div>
              <label className="block text-sm font-semibold text-gray-600 dark:text-gray-400 mb-1">
                Rama
              </label>
              <p className="font-mono text-gray-800 dark:text-gray-200 bg-gray-100 dark:bg-gray-700 px-3 py-2 rounded">
                {tarea.rama}
              </p>
            </div>
          )}

          {tarea.nom_estado && (
            <div>
              <label className="block text-sm font-semibold text-gray-600 dark:text-gray-400 mb-1">
                Estado
              </label>
              <p className={`${getEstadoBgColor(tarea.nom_estado)} text-white px-2 py-1 rounded font-semibold inline-block`}>{tarea.nom_estado}</p>
            </div>
          )}

          {tarea.hash_commit && (
            <div>
              <label className="block text-sm font-semibold text-gray-600 dark:text-gray-400 mb-1">
                Hash Commit
              </label>
              <p className="font-mono text-gray-800 dark:text-gray-200 bg-gray-100 dark:bg-gray-700 px-3 py-2 rounded">
                {tarea.hash_commit}
              </p>
            </div>
          )}

          <div className="pt-4 border-t">
            <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 dark:text-gray-400">
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

        <div className="px-6 py-4 bg-gray-50 dark:bg-gray-900 rounded-b-lg">
          <button
            onClick={onClose}
            className="w-full px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
          >
            Cerrar
          </button>
        </div>
      </div>

      {showNotas && <NotasModal tarea={tarea} onClose={() => setShowNotas(false)} />}
    </div>
  );
};

export default Modal;
