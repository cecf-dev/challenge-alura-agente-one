# Manual Operativo de MangaTech AI

## 1. Acerca de MangaTech AI

MangaTech AI es una plataforma SaaS líder en la industria del entretenimiento digital, especializada en la **traducción automática, edición asistida por IA y distribución digital** de manga y manhwa. Fundada en 2023, la empresa opera desde Ciudad de México con equipos remotos en Japón, Corea del Sur y España.

### 1.1 Misión
Democratizar el acceso al manga y manhwa de calidad en idioma español mediante tecnología de inteligencia artificial de vanguardia, respetando la integridad artística de las obras originales.

### 1.2 Visión
Ser la plataforma número uno en Latinoamérica para la traducción y distribución de contenido manga/manhwa, con presencia en más de 15 países para 2027.

## 2. Estructura Organizacional

### 2.1 Departamentos

| Departamento | Director | Funciones |
|:---|:---|:---|
| Ingeniería de IA | Dra. Sakura Tanaka | Desarrollo de modelos de traducción, OCR manga, modelos de edición |
| Producto | Carlos Mendoza | Diseño de producto, UX/UI, roadmap de features |
| Operaciones | María García | Gestión de proyectos, control de calidad, coordinación |
| Comercial | Javier López | Ventas B2B, alianzas editoriales, marketing |
| Soporte | Ana Rodríguez | Atención al cliente, documentación, capacitación |

### 2.2 Horario de Trabajo
- **Horario flexible**: Core hours de 10:00 a 16:00 (hora CDMX)
- **Trabajo remoto**: 100% remoto con reuniones presenciales trimestrales
- **Zonas horarias**: Se respetan las zonas horarias de cada colaborador

## 3. Procesos Operativos

### 3.1 Pipeline de Traducción

El proceso de traducción de una obra sigue estos pasos:

1. **Ingesta**: El equipo de operaciones recibe los archivos RAW del manga/manhwa desde la editorial asociada.
2. **Pre-procesamiento**: La IA de MangaTech realiza OCR sobre las páginas para extraer el texto original en japonés/coreano.
3. **Traducción IA**: El modelo propietario MangaLLM v3.2 genera una traducción inicial al español.
4. **Revisión Humana**: Un traductor nativo revisa y ajusta la traducción para capturar matices culturales.
5. **Edición Visual**: El sistema de edición por IA reemplaza los globos de texto con la traducción en español, manteniendo la tipografía apropiada.
6. **QA Final**: El equipo de calidad verifica la precisión de la traducción y la calidad visual.
7. **Publicación**: La obra se publica en la plataforma de distribución digital.

### 3.2 Tiempos de Entrega

| Tipo de Proyecto | Páginas | Tiempo Estimado |
|:---|:---|:---|
| Capítulo estándar | 20-30 páginas | 24-48 horas |
| Volumen completo | 180-220 páginas | 5-7 días |
| Serie semanal | 15-20 páginas | 12-18 horas |
| Manhwa (scroll) | 60-80 paneles | 36-48 horas |

## 4. Herramientas y Sistemas

### 4.1 Stack Tecnológico
- **Frontend**: React + TypeScript + Tailwind CSS
- **Backend**: Node.js + Python (FastAPI)
- **IA**: PyTorch + Transformers (modelo propietario MangaLLM)
- **OCR**: Sistema propietario MangaOCR v2.1
- **Base de datos**: PostgreSQL + ChromaDB (vectores)
- **Infraestructura**: Oracle Cloud Infrastructure (OCI)
- **CI/CD**: GitHub Actions
- **Comunicación**: Slack, Notion, Google Meet

### 4.2 Accesos
- Cada colaborador recibe accesos a los sistemas necesarios el primer día.
- Los accesos se gestionan a través del departamento de Operaciones.
- Se requiere autenticación de dos factores (2FA) para todos los sistemas.

## 5. Políticas de Seguridad

### 5.1 Manejo de Datos Confidenciales
- Los archivos RAW de manga son **estrictamente confidenciales**.
- Prohibido compartir contenido no publicado fuera de los canales oficiales.
- Todo el contenido se almacena encriptado en OCI con llaves rotativas.

### 5.2 Incidentes de Seguridad
En caso de un incidente de seguridad:
1. Reportar inmediatamente al canal #seguridad en Slack.
2. No intentar resolver el incidente por cuenta propia.
3. El equipo de seguridad responderá en un máximo de 30 minutos.
