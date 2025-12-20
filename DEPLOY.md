## Deploy del proyecto

Este proyecto está desplegado en producción:

- **Frontend:** [https://crud-full-stack-fast-eat-fa8q.vercel.app](https://crud-full-stack-fast-eat-fa8q.vercel.app)
- **Backend:** [https://crud-fullstack-fasteat.onrender.com](https://crud-fullstack-fasteat.onrender.com)

### Configuración

- El frontend apunta al backend usando la variable de entorno `REACT_APP_API_URL`.
- El backend tiene configurado CORS para permitir peticiones desde el dominio de Vercel.
- Para redeployar:
    - Backend: Push al repo de Render
    - Frontend: Push al repo de Vercel o redeploy desde la interfaz

### Notas

- Todas las rutas de la API (`/clientes`, `/pedidos`) están disponibles públicamente desde el frontend.
- Esto permite probar el proyecto sin necesidad de instalarlo localmente.
