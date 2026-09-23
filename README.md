# Portfolio | Agustín Spataro

Portfolio personal donde presento mi perfil como desarrollador Full Stack, mis proyectos y mis medios de contacto.

El sitio incluye un asistente con Gemini que responde preguntas sobre mí y mi trabajo a partir de la información definida en `api/chat.js`.

## Tecnologías

- HTML, CSS y JavaScript
- Vercel Functions
- Gemini API

## Proyectos destacados

| Proyecto | Descripción | Enlaces |
| --- | --- | --- |
| NomaPay | Billetera virtual simulada desarrollada en equipo. Participé en el frontend con React y TypeScript. | [Visitar aplicación](https://noma-pay-frontend.vercel.app/) · [Ver código](https://github.com/nomapayapp-collab/NomaPay_Frontend) |
| MiniBlog API | API REST de autores y publicaciones con Node.js, Express y PostgreSQL. | [Ver código](https://github.com/spataro787/miniblog-api) |
| Fantasy AI Chat | Chat con personajes de ficción que utiliza inteligencia artificial y funciones serverless. | [Visitar aplicación](https://proyecto-m3-spataro-agustin-fs-ft-7.vercel.app/) · [Ver código](https://github.com/spataro787/Proyecto-M3-Spataro-Agustin-FS-FT-74) |
| GitHub MCP Server | Servidor MCP para interactuar con GitHub mediante herramientas para agentes de IA. | [Ver código](https://github.com/spataro787/Proyecto-M5--Agustin-Spataro) |
| Colorfly Studio | Generador interactivo de paletas de colores. | [Visitar aplicación](https://spataro787.github.io/colorfly-studio/) · [Ver código](https://github.com/spataro787/colorfly-studio) |

## Estructura del proyecto

```text
.
├── api/
│   └── chat.js       # Función que consulta Gemini
├── img/
│   └── agustin.png   # Foto del portfolio
├── chat.js           # Interfaz y comportamiento del asistente
├── index.html        # Contenido del sitio
├── styles.css        # Estilos
└── README.md
```

## Ver el sitio en tu computadora

Abrí `index.html` en el navegador. Para probar también el asistente, necesitás ejecutar el proyecto con un entorno que sirva la función `/api/chat` y configurar `GEMINI_API_KEY`.

## Configuración en Vercel

1. Importá este repositorio desde tu cuenta personal de Vercel.
2. Configurá `GEMINI_API_KEY` en las variables de entorno del proyecto.
3. Desplegá el sitio.

La clave de Gemini debe permanecer en las variables de entorno de Vercel. **No la agregues al código ni al repositorio.**

## Contacto

- [LinkedIn](https://www.linkedin.com/in/agustin-spataro-dev/)
- [GitHub](https://github.com/spataro787)
- [Correo electrónico](mailto:spataro787@gmail.com)

---

Desarrollado por Agustín Spataro.