import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = 'https://tasksiandsibackendnodejs-production.up.railway.app/api/tareas';

const RegistrarTareas = ({ tareaEdit, setTareaEdit }) => {
  const [formData, setFormData] = useState({
    codigo_unico: '',
    titulo: '',
    url_tarea: '',
    empresa: '',
    submodulo: '',
    rama: '',
    estado: '',
    hash_commit: ''
  });

  const [searchCodigo, setSearchCodigo] = useState('');
  const [mensaje, setMensaje] = useState({ tipo: '', texto: '' });
  const [isEditing, setIsEditing] = useState(false);
  const [estados, setEstados] = useState([]);

  useEffect(() => {
    fetchEstados();
  }, []);

  useEffect(() => {
    if (tareaEdit && estados.length > 0) {
      const estadoEncontrado = estados.find(est => est.nom_estado === tareaEdit.nom_estado);
      setFormData({
        codigo_unico: tareaEdit.codigo_unico || '',
        titulo: tareaEdit.titulo || '',
        url_tarea: tareaEdit.url_tarea || '',
        empresa: tareaEdit.empresa || '',
        submodulo: tareaEdit.submodulo || '',
        rama: tareaEdit.rama || '',
        estado: estadoEncontrado ? estadoEncontrado.id_estado : '',
        hash_commit: tareaEdit.hash_commit || ''
      });
      setIsEditing(true);
      setTareaEdit(null); // Limpiar después de cargar
    }
  }, [tareaEdit, estados, setTareaEdit]);

  const fetchEstados = async () => {
    try {
      const response = await axios.get(`${API_URL}/estados`);
      setEstados(response.data);
    } catch (error) {
      console.error('Error al cargar estados:', error);
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSearch = async () => {
    if (!searchCodigo.trim()) {
      setMensaje({ tipo: 'error', texto: 'Ingresa un código para buscar' });
      return;
    }

    try {
      const response = await axios.get(`${API_URL}/buscar/${searchCodigo}`);
      setFormData(response.data);
      setIsEditing(true);
      setMensaje({ tipo: 'success', texto: 'Tarea encontrada. Puedes editarla.' });
    } catch (error) {
      setMensaje({ tipo: 'error', texto: 'Tarea no encontrada' });
      setFormData({
        codigo_unico: searchCodigo,
        titulo: '',
        url_tarea: '',
        empresa: '',
        submodulo: '',
        rama: '',
        estado: '',
        hash_commit: ''
      });
      setIsEditing(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.codigo_unico || !formData.titulo) {
      setMensaje({ tipo: 'error', texto: 'Código único y título son obligatorios' });
      return;
    }

    try {
      if (isEditing) {
        await axios.put(`${API_URL}/${formData.codigo_unico}`, formData);
        setMensaje({ tipo: 'success', texto: '✅ Tarea actualizada exitosamente' });
      } else {
        await axios.post(API_URL, formData);
        setMensaje({ tipo: 'success', texto: '✅ Tarea creada exitosamente' });
      }
      
      // Limpiar formulario
      setFormData({
        codigo_unico: '',
        titulo: '',
        url_tarea: '',
        empresa: '',
        submodulo: '',
        rama: '',
        hash_commit: ''
      });
      setIsEditing(false);
      setSearchCodigo('');
    } catch (error) {
      setMensaje({ 
        tipo: 'error', 
        texto: error.response?.data?.error || 'Error al guardar la tarea' 
      });
    }
  };

  const limpiarFormulario = () => {
    setFormData({
      codigo_unico: '',
      titulo: '',
      url_tarea: '',
      empresa: '',
      submodulo: '',
      rama: '',
      estado: '',
      hash_commit: ''
    });
    setIsEditing(false);
    setSearchCodigo('');
    setMensaje({ tipo: '', texto: '' });
  };

  return (
    <div className="p-8">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Registrar Tareas</h2>

      {/* Barra de búsqueda */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h3 className="text-lg font-semibold mb-4 text-gray-700">🔍 Buscar por Código</h3>
        <div className="flex gap-3">
          <input
            type="text"
            value={searchCodigo}
            onChange={(e) => setSearchCodigo(e.target.value)}
            placeholder="Ingresa el código único"
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
          />
          <button
            onClick={handleSearch}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Buscar
          </button>
        </div>
      </div>

      {/* Mensaje de feedback */}
      {mensaje.texto && (
        <div
          className={`p-4 rounded-lg mb-6 ${
            mensaje.tipo === 'success'
              ? 'bg-green-100 text-green-800 border border-green-300'
              : 'bg-red-100 text-red-800 border border-red-300'
          }`}
        >
          {mensaje.texto}
        </div>
      )}

      {/* Formulario */}
      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Código Único <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="codigo_unico"
              value={formData.codigo_unico}
              onChange={handleInputChange}
              disabled={isEditing}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Título <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="titulo"
              value={formData.titulo}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              URL Tarea
            </label>
            <input
              type="url"
              name="url_tarea"
              value={formData.url_tarea}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="https://..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Empresa
            </label>
            <input
              type="text"
              name="empresa"
              value={formData.empresa}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Submódulo
            </label>
            <input
              type="text"
              name="submodulo"
              value={formData.submodulo}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Rama
            </label>
            <input
              type="text"
              name="rama"
              value={formData.rama}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Estado
            </label>
            <select
              name="estado"
              value={formData.estado}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Selecciona un estado</option>
              {estados.map((estado) => (
                <option key={estado.id_estado} value={estado.id_estado}>
                  {estado.nom_estado}
                </option>
              ))}
            </select>
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Hash Commit
            </label>
            <input
              type="text"
              name="hash_commit"
              value={formData.hash_commit}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="flex gap-4 mt-6">
          <button
            type="submit"
            className="flex-1 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-semibold"
          >
            {isEditing ? '💾 Actualizar Tarea' : '➕ Crear Tarea'}
          </button>
          <button
            type="button"
            onClick={limpiarFormulario}
            className="px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
          >
            🔄 Limpiar
          </button>
        </div>
      </form>
    </div>
  );
};

export default RegistrarTareas;
