import React from 'react';
import NotasModal from './NotasModal';
import axios from 'axios';
import { API_TAREAS_URL } from '../config/api';

const LinkIcon = ({ className = 'w-4 h-4' }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 010 5.656l-2 2a4 4 0 01-5.656-5.656l1-1m9.656-1.172a4 4 0 010-5.656l-2-2a4 4 0 00-5.656 5.656l1 1" />
  </svg>
);

const CopyIcon = ({ className = 'w-4 h-4' }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
  </svg>
);

const CheckIcon = ({ className = 'w-4 h-4' }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
  </svg>
);

const Modal = ({ tarea, onClose, onEdit }) => {
  const [showNotas, setShowNotas] = React.useState(false);
  const [copiedField, setCopiedField] = React.useState('');
  const [hasImportantNote, setHasImportantNote] = React.useState(false);

  React.useEffect(() => {
    const checkImportant = async () => {
      try {
        const response = await axios.get(`${API_TAREAS_URL}/${tarea.id}/notas`);
        const important = response.data.length > 0 && response.data[0].nota_desc && response.data[0].nota_desc.toLowerCase().includes('importante');
        setHasImportantNote(important);
      } catch (error) {
        setHasImportantNote(false);
      }
    };
    checkImportant();
  }, [tarea.id]);
  if (!tarea) return null;

  const handleCopy = async (text, fieldName) => {
    if (!text) return;

    try {
      await navigator.clipboard.writeText(text);
      setCopiedField(fieldName);
      setTimeout(() => setCopiedField(''), 1500);
    } catch (error) {
      const textArea = document.createElement('textarea');
      textArea.value = text;
      textArea.style.position = 'fixed';
      textArea.style.opacity = '0';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopiedField(fieldName);
      setTimeout(() => setCopiedField(''), 1500);
    }
  };

  const getEstadoBgColor = (nom_estado) => {
    switch (nom_estado) {
      case 'Backlog':
        return 'bg-gray-500 dark:bg-gray-800';
      case 'En curso':
        return 'bg-blue-500 dark:bg-blue-800';
      case 'Pruebas':
        return 'bg-yellow-400 dark:bg-yellow-700';
      case 'RetroAlimentacion':
        return 'bg-red-400 dark:bg-red-700';
      case 'Culminada':
        return 'bg-green-500 dark:bg-green-800';
      default:
        return 'bg-gray-400 dark:bg-gray-700';
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-900 rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-scroll" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
        <div className="bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 px-6 py-4 rounded-t-lg flex justify-between items-center border-b border-gray-200 dark:border-gray-700">
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
              className={`px-3 py-1 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded hover:bg-gray-300 dark:hover:bg-gray-600 text-sm flex items-center gap-1 ${hasImportantNote ? 'animate-pulse ring-2 ring-red-400' : ''}`}
              title={hasImportantNote ? "Notas - Importante" : "Ver Notas"}
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
            <p className="text-lg font-mono bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white px-3 py-2 rounded">
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
              <div className="flex items-center gap-2">
                <a
                  href={tarea.url_tarea}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 hover:underline break-all inline-flex items-center gap-1"
                >
                  <LinkIcon />
                  {tarea.url_tarea}
                </a>
                <button
                  type="button"
                  onClick={() => handleCopy(tarea.url_tarea, 'url_tarea')}
                  className="text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-gray-100"
                  title="Copiar URL"
                >
                  {copiedField === 'url_tarea' ? <CheckIcon /> : <CopyIcon />}
                </button>
              </div>
            </div>
          )}

          {tarea.empresa && (
            <div>
              <label className="block text-sm font-semibold text-gray-600 dark:text-gray-400 mb-1">
                Empresa
              </label>
              <div className="flex items-center gap-2">
                <a href={`http://${tarea.empresa}`} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 hover:underline inline-flex items-center gap-1">
                  <LinkIcon />
                  {tarea.empresa}
                </a>
                <button
                  type="button"
                  onClick={() => handleCopy(tarea.empresa, 'empresa')}
                  className="text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-gray-100"
                  title="Copiar empresa"
                >
                  {copiedField === 'empresa' ? <CheckIcon /> : <CopyIcon />}
                </button>
              </div>
            </div>
          )}

          {tarea.submodulo && (
            <div>
              <label className="block text-sm font-semibold text-gray-600 dark:text-gray-400 mb-1">
                Submódulo
              </label>
              <p className="text-gray-800 dark:text-gray-200">
                {(() => {
                  const spaceIndex = tarea.submodulo.indexOf(' ');
                  if (spaceIndex === -1) return <strong>{tarea.submodulo}</strong>;
                  return <><strong>{tarea.submodulo.slice(0, spaceIndex)}</strong>{tarea.submodulo.slice(spaceIndex)}</>;
                })()}
              </p>
            </div>
          )}

          {tarea.rama && (
            <div>
              <label className="block text-sm font-semibold text-gray-600 dark:text-gray-400 mb-1">
                Rama
              </label>
              <div className="flex items-center gap-2">
                <p className="font-mono text-gray-800 dark:text-gray-200 bg-gray-100 dark:bg-gray-700 px-3 py-2 rounded flex-1">
                  {tarea.rama}
                </p>
                <button
                  type="button"
                  onClick={() => handleCopy(tarea.rama, 'rama')}
                  className="text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-gray-100"
                  title="Copiar rama"
                >
                  {copiedField === 'rama' ? <CheckIcon /> : <CopyIcon />}
                </button>
              </div>
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

      {showNotas && <NotasModal tarea={tarea} onClose={() => setShowNotas(false)} onNotesLoaded={setHasImportantNote} />}
    </div>
  );
};

export default Modal;
