# Frontend - Dashboard de Tareas

Frontend en React con Tailwind CSS para el dashboard de tareas.

## 📋 Requisitos Previos

- Node.js (v14 o superior)
- npm o yarn
- Backend corriendo en `http://localhost:5000`

## 🚀 Instalación

1. **Instalar dependencias:**
```bash
npm install
```

2. **Iniciar la aplicación:**
```bash
npm start
```

La aplicación se abrirá automáticamente en `http://localhost:3000`

## ✨ Características

### 📝 Registrar Tareas
- Formulario completo con todos los campos
- Búsqueda por código único para editar tareas existentes
- Validación de campos requeridos
- Mensajes de éxito/error
- Botón para limpiar formulario

### 👁️ Ver Tareas
- Grid responsive con cards de tareas
- Barra de búsqueda en tiempo real
- Modal con detalles completos al hacer click
- URLs como hipervínculos funcionales
- Contador de tareas filtradas

## 🎨 Tecnologías

- **React** 18.2.0
- **Tailwind CSS** 3.4.0
- **Axios** para peticiones HTTP
- **Create React App** como base

## 📁 Estructura del Proyecto

```
frontend/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── Sidebar.js          # Menú lateral
│   │   ├── RegistrarTareas.js  # Formulario y búsqueda
│   │   ├── VerTareas.js        # Grid de tareas
│   │   └── Modal.js            # Modal de detalles
│   ├── App.js                  # Componente principal
│   ├── index.js                # Punto de entrada
│   └── index.css               # Estilos globales + Tailwind
├── package.json
├── tailwind.config.js
└── postcss.config.js
```

## 🔧 Configuración

### API URL
Si tu backend corre en otro puerto, edita la constante `API_URL` en:
- `src/components/RegistrarTareas.js`
- `src/components/VerTareas.js`

```javascript
const API_URL = 'http://localhost:TU_PUERTO/api/tareas';
```

## 📱 Características Responsive

- Sidebar fijo en desktop
- Grid adaptable: 1, 2 o 3 columnas según el tamaño de pantalla
- Formulario en 1 o 2 columnas según el espacio
- Modal scrolleable en pantallas pequeñas

## 🎯 Funcionalidades Implementadas

✅ Sidebar con navegación entre secciones
✅ Formulario de registro/edición de tareas
✅ Búsqueda por código único en formulario
✅ Grid de tareas con diseño de cards
✅ Búsqueda en tiempo real en grid
✅ Modal con detalles completos
✅ URLs como hipervínculos
✅ Estilos profesionales con Tailwind
✅ Feedback visual (mensajes de éxito/error)
✅ Loading states
✅ Timestamps formateados

## 🚫 Sin Funcionalidad de Eliminar

Como especificaste, NO hay opción para eliminar tareas.

## 💡 Tips de Uso

1. **Crear tarea:** Rellena el formulario y dale "Crear Tarea"
2. **Editar tarea:** Busca por código, modifica y dale "Actualizar Tarea"
3. **Ver detalles:** En "Ver Tareas", haz click en cualquier card
4. **Buscar:** Usa las barras de búsqueda en ambas secciones

## 🐛 Troubleshooting

**Error de CORS:**
- Verifica que el backend tenga CORS habilitado
- Asegúrate que el backend esté corriendo

**No se cargan las tareas:**
- Verifica la consola del navegador (F12)
- Confirma que el backend esté en `http://localhost:5000`

**Estilos no se ven:**
- Ejecuta `npm install` de nuevo
- Verifica que Tailwind esté configurado correctamente
