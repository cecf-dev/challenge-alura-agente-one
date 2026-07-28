# MangaTech AI - Asistente Corporativo RAG

Chatbot interno de inteligencia artificial para **MangaTech AI**, una plataforma SaaS de traducción, edición y distribución digital de manga y manhwa. Responde preguntas de los colaboradores basándose estrictamente en los documentos operativos de la empresa mediante arquitectura **RAG** (Retrieval-Augmented Generation).

---

## Arquitectura

```
┌─────────────────────────────────────────────────────────────┐
│                       Frontend (React)                       │
│                   localhost:5173                             │
│         Chat UI · Tailwind CSS · Vite                        │
└────────────────────────┬────────────────────────────────────┘
                         │  POST /api/chat
                         ▼
┌─────────────────────────────────────────────────────────────┐
│                    Backend API (Express)                      │
│                   localhost:3001                             │
│           Router · Proxy al servicio AI                      │
└────────────────────────┬────────────────────────────────────┘
                         │  POST /query
                         ▼
┌─────────────────────────────────────────────────────────────┐
│                  AI Service (FastAPI)                         │
│                   localhost:8000                             │
│                                                              │
│  ┌──────────────┐  ┌──────────────┐  ┌───────────────────┐  │
│  │  Processors   │  │  ChromaDB    │  │  Groq LLM         │  │
│  │  PDF, DOCX,   │  │  Vector DB   │  │  llama-3.3-70b    │  │
│  │  XLSX, CSV,   │  │  (local)     │  │  (inference)      │  │
│  │  MD, JSON, HTML│  │              │  │                   │  │
│  └──────────────┘  └──────────────┘  └───────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

**Flujo RAG:**
1. Coloca documentos en `ai-service/documents/`
2. Al iniciar, el servicio los procesa y genera chunks con **tiktoken**
3. ChromaDB almacena los chunks con embeddings (modelo local `all-MiniLM-L6-v2`)
4. Al recibir una pregunta, se buscan los 5 chunks más relevantes (similitud coseno)
5. Se construye un prompt con el contexto recuperado
6. **Groq** (llama-3.3-70b-versatile) genera la respuesta basándose exclusivamente en ese contexto

---

## Stack Tecnológico

| Capa | Tecnología | Versión |
|------|-----------|---------|
| Frontend | React + Tailwind CSS + Vite | 18.x / 3.x / 5.x |
| Backend | Node.js + Express.js | 20.x / 4.x |
| AI Service | Python + FastAPI + Uvicorn | 3.11+ / 0.111+ |
| Vector DB | ChromaDB (persistente local) | 1.5+ |
| LLM | Groq (llama-3.3-70b-versatile) | API |
| Tokenización | tiktoken | 0.13+ |
| Orquestación | Docker Compose | 3.9 |

---

## Estructura del Proyecto

```
Manga Tech AI/
├── ai-service/                    # Servicio Python de IA
│   ├── app/
│   │   ├── config.py              # Variables de entorno
│   │   ├── processors/
│   │   │   └── document_processor.py   # Lector multi-formato
│   │   ├── vectorstore/
│   │   │   └── chroma_client.py   # Cliente ChromaDB
│   │   ├── llm/
│   │   │   └── llm_client.py      # Cliente Groq
│   │   └── utils/
│   │       └── text_splitter.py   # Chunking por tokens
│   ├── documents/                 # Carpeta de documentos a indexar
│   ├── main.py                    # FastAPI app (startup ingestion)
│   ├── requirements.txt
│   └── Dockerfile
│
├── server/                        # Backend Node.js
│   ├── src/
│   │   ├── config/index.js
│   │   ├── routes/
│   │   │   ├── chat.js            # POST /api/chat
│   │   │   └── documents.js       # GET/POST/DELETE /api/documents
│   │   ├── middleware/upload.js
│   │   └── index.js
│   ├── package.json
│   └── Dockerfile
│
├── client/                        # Frontend React
│   ├── src/
│   │   ├── components/
│   │   │   ├── ChatMessage.jsx    # Burbuja de mensaje
│   │   │   ├── ChatInput.jsx      # Campo de entrada
│   │   │   ├── DocumentPanel.jsx  # Panel de gestión de docs
│   │   │   ├── Header.jsx         # Barra superior
│   │   │   └── WelcomeScreen.jsx  # Pantalla de bienvenida
│   │   ├── hooks/
│   │   │   ├── useChat.js         # Estado del chat
│   │   │   └── useDocuments.js    # Estado de documentos
│   │   ├── services/api.js        # Cliente HTTP
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── Dockerfile
│
├── docker-compose.yml
├── .env.example
├── setup.bat
└── README.md
```

---

## Formatos de Documento Soportados

| Formato | Extensión | Librería | Descripción |
|---------|-----------|----------|-------------|
| PDF | `.pdf` | PyPDF2 | Extracción por página con numeración |
| Word | `.docx` / `.doc` | python-docx | Párrafos no vacíos |
| Excel | `.xlsx` / `.xls` | openpyxl + pandas | Todas las hojas, conversión a texto |
| CSV | `.csv` | csv (stdlib) | Filas con encabezados |
| Markdown | `.md` | markdown | Texto raw preservado |
| JSON | `.json` | json (stdlib) | Formateo indentado |
| HTML | `.html` / `.htm` | BeautifulSoup | Limpieza de tags, solo texto |

---

## Instalación y Configuración

### Prerrequisitos

- [Node.js](https://nodejs.org/) v18+
- [Python](https://python.org/) 3.11+
- [Docker](https://docs.docker.com/get-docker/) + Docker Compose (opcional)
- API key de [Groq](https://console.groq.com/) (gratis, sin tarjeta de crédito)

### 1. Clonar el repositorio

```bash
git clone https://github.com/cecf-dev/challenge-alura-agente-one.git
cd challenge-alura-agente-one
```

### 2. Configurar variables de entorno

```bash
cp .env.example ai-service/.env
```

Edita `ai-service/.env` y reemplaza `PEGA_TU_KEY_AQUI` con tu API key de Groq:

```env
GROQ_API_KEY=gsk_xxxxxxxxxxxxxxxxxxxxxxxx
LLM_MODEL=llama-3.3-70b-versatile
```

### 3. Colocar documentos

Copia los documentos corporativos a `ai-service/documents/`. Se indexan automáticamente al iniciar el servicio.

### 4A. Ejecutar con Docker (recomendado)

```bash
docker-compose up -d --build
```

### 4B. Ejecutar manualmente (3 terminales)

**Terminal 1 — AI Service (Python):**
```bash
cd ai-service
python -m venv .venv
.venv\Scripts\activate          # Windows
# source .venv/bin/activate    # Linux/Mac
pip install -r requirements.txt
python main.py
```

**Terminal 2 — Server (Node.js):**
```bash
cd server
npm install
npm run dev
```

**Terminal 3 — Client (React):**
```bash
cd client
npm install
npm run dev
```

### 5. Abrir la aplicación

Visita [http://localhost:5173](http://localhost:5173)

---

## API Endpoints

### AI Service (`localhost:8000`)

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| `GET` | `/health` | Health check |
| `POST` | `/query` | Consulta RAG `{ question, session_id }` |
| `POST` | `/ingest` | Subir archivos vía multipart |
| `POST` | `/ingest-local` | Re-escanear carpeta `documents/` |
| `GET` | `/documents` | Listar documentos indexados |
| `DELETE` | `/documents/{filename}` | Eliminar documento |

### Server API (`localhost:3001`)

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| `GET` | `/api/health` | Health check |
| `POST` | `/api/chat` | Enviar mensaje `{ message, sessionId }` |
| `POST` | `/api/documents/upload` | Subir archivos |
| `POST` | `/api/documents/rescan` | Re-escanear carpeta |
| `GET` | `/api/documents` | Listar documentos |
| `DELETE` | `/api/documents/:filename` | Eliminar documento |

---

## Despliegue en OCI (Oracle Cloud Infrastructure)

### 1. Crear instancia Compute

- Shape: `VM.Standard.E4.Flex` (2 OCPU, 16 GB RAM)
- Image: Ubuntu 22.04
- Security List: abrir puertos 80, 443

### 2. Configurar el servidor

```bash
# Conectar vía SSH
ssh -i clave.pem ubuntu@<IP_PUBLICA>

# Instalar Docker
sudo apt update && sudo apt install -y docker.io docker-compose-plugin
sudo usermod -aG docker $USER
newgrp docker

# Clonar el repo
git clone https://github.com/cecf-dev/challenge-alura-agente-one.git
cd challenge-alura-agente-one

# Configurar variables de entorno en la raíz
nano .env
```

Agregar al archivo `.env`:

```env
GROQ_API_KEY=gsk_tu-api-key-aqui
LLM_MODEL=llama-3.3-70b-versatile
```

> **Importante:** El `.env` va en la raíz del proyecto, no dentro de `ai-service/`. Docker Compose lee las variables de la raíz y las inyecta a los contenedores.

```bash
# Agregar documentos
# (copiar archivos a ai-service/documents/)

# Levantar servicios
docker compose up -d --build
```

### 3. Verificar que funciona

```bash
# Ver logs
docker compose logs -f

# Verificar conectividad del contenedor con Groq
docker compose exec ai-service env | grep GROQ
```

### 4. (Opcional) Nginx + SSL

```bash
sudo apt install -y nginx certbot python3-certbot-nginx
# Configurar proxy reverso → localhost:5173
# Certificado SSL con Let's Encrypt
```

---

## Variables de Entorno

| Variable | Default | Descripción |
|----------|---------|-------------|
| `GROQ_API_KEY` | — | API key de Groq (requerida) |
| `LLM_MODEL` | `llama-3.3-70b-versatile` | Modelo de lenguaje |
| `PORT` | `3001` | Puerto del servidor Express |
| `AI_SERVICE_URL` | `http://localhost:8000` | URL del servicio Python |
| `DOCUMENTS_DIR` | `documents` | Carpeta de documentos |
| `CHROMA_PERSIST_DIR` | `chroma_data` | Carpeta de persistencia ChromaDB |
| `MAX_FILE_SIZE_MB` | `50` | Tamaño máximo de upload |

---

## Demo

<video src="docs/demo.mp4" controls width="100%">Video</video>

---

## Licencia

Proyecto realizado para el **Challenge Alura One - Oracle**.
