<div align="center">
  <img width="300" src="https://github.com/Morgan1621/Ecommerce_Agent/blob/main/log_oficial.jpeg?raw=true"/>
</div>

<p align="center">
  <a href="LICENSE">
    <img src="https://ziadoua.github.io/m3-Markdown-Badges/badges/LicenceMIT/licencemit1.svg" alt="MIT License"/>
  </a>
</p>

<p align="center">
  <a href="https://skillicons.dev">
    <img src="https://skillicons.dev/icons?i=react,py,fastapi,vscode,git"/>
  </a>
</p>

# Agente Conversacional para Tienda Electrónica 🤖🗣

Agente conversacional inteligente basado en un **sistema experto de reglas** que permite a los usuarios buscar productos, consultar categorías y segmentos de una tienda electrónica en tiempo real mediante **WebSockets**.

---

## 🏗 Arquitectura del Proyecto

```
ECOMMERCE_AGENT/
├── main.py                          # Servidor FastAPI + WebSocket
├── requirements.txt                 # Dependencias Python
├── .env                             # Variables de entorno (no se sube a GitHub)
├── .gitignore
└── src/
    ├── domain/
    │   ├── entities/
    │   │   └── conversation.py      # Entidades: Regla, Mensaje
    │   └── use_cases/
    │       └── procesar_conversacion.py  # Flujo principal del agente
    └── infrastructure/
        ├── database/
        │   └── connection.py        # Conexión a SQL Server (pymssql)
        └── repositories/
            └── conversation_repository.py  # Acceso a datos y SPs
```

---

## 🗄 Bases de Datos

El proyecto utiliza **dos bases de datos en SQL Server**:

| Base de datos | Descripción |
|---|---|
| `DB_EcommerceAgent` | Cerebro del agente: reglas, palabras clave, plantillas de respuesta e historial de conversaciones |
| `DB_ECOMMERCE` | Negocio: catálogo de productos, categorías, subcategorías y segmentos |

### Tablas principales en `DB_EcommerceAgent`

| Tabla | Descripción |
|---|---|
| `ReglasChatbot` | Reglas del sistema experto (Saludo, Búsqueda, No Entendido) |
| `PalabrasClaveRegla` | Keywords que activan cada regla |
| `PlantillasRespuesta` | Respuestas del agente con soporte para placeholder `[@TABLA]` |
| `HistorialConversaciones` | Registro de sesiones por usuario |
| `HistorialMensajes` | Log de mensajes enviados y recibidos |

---

## ⚙️ Requisitos

- Python 3.12+
- SQL Server 2022
- Node.js (para el frontend React Native / Expo)
- Postman (para pruebas de WebSocket)

---

## 🐍 Instalación del Backend (Python)

**1. Clona el repositorio:**
```bash
git clone https://github.com/Morgan1621/Ecommerce_Agent.git
cd Ecommerce_Agent
```

**2. Crea y activa el entorno virtual:**
```bash
python -m venv .venv
# Windows
.venv\Scripts\activate
# Linux/Mac
source .venv/bin/activate
```

**3. Instala las dependencias:**
```bash
pip install -r requirements.txt
```

**4. Crea el archivo `.env` en la raíz del proyecto:**
```env
DB_SERVER=TU_SERVIDOR:1433
DB_NAME=DB_EcommerceAgent
```
> Reemplaza `TU_SERVIDOR` con el nombre de tu instancia SQL Server (ejemplo: `LIZ:1433`).
> El proyecto usa **autenticación de Windows**, no requiere usuario ni contraseña.

**5. Inicia el servidor:**
```bash
uvicorn main:app --reload
```

Deberías ver:
```
INFO:     Uvicorn running on http://127.0.0.1:8000
[AGENTE] 3 regla(s) cargadas desde DB_EcommerceAgent.
INFO:     Application startup complete.
```

---

## 📦 Dependencias Python

```txt
fastapi==0.111.0
uvicorn==0.29.0
pymssql==2.3.1
websockets==12.0
python-dotenv==1.0.1
```

---

## 🔌 WebSocket — Pruebas con Postman

**1.** Abre Postman → Nueva request → tipo **WebSocket**

**2.** Conecta a:
```
ws://127.0.0.1:8000/ws/chat/{usuario_id}
```

**3.** Envía mensajes de prueba:

| Mensaje | Regla activada | Respuesta esperada |
|---|---|---|
| `hola` | Saludo Inicial | Mensaje de bienvenida |
| `buenos dias` | Saludo Inicial | Mensaje de bienvenida |
| `buscar CALZADO` | Búsqueda de Productos | Lista de productos de calzado |
| `buscar TECNOLOGIA` | Búsqueda de Productos | Celulares, Computadoras |
| `buscar DEPORTIVO` | Búsqueda de Productos | Segmento deportivo |
| `xyz abc 123` | No Entendido | Mensaje de fallback |

---

## 🧠 Flujo del Sistema Experto

```
Usuario escribe mensaje
        ↓
Detectar keyword en arreglo de reglas (cargadas desde BD)
        ↓
┌───────────────────────────────────┐
│  ¿Coincide con alguna keyword?    │
└───────────────────────────────────┘
       ↓ Sí                  ↓ No
  Regla activada        Regla "No Entendido"
       ↓
  ¿AccionDinamica = true?
       ↓ Sí                  ↓ No
  Ejecutar SP             Respuesta estática
  DB_ECOMMERCE            desde PlantillasRespuesta
       ↓
  Reemplazar [@TABLA]
  con resultados del SP
       ↓
  Enviar respuesta por WebSocket
       ↓
  Guardar en HistorialMensajes
```

---

## 📱 Frontend (React Native / Expo)

**Instala dependencias:**
```bash
npm install
```

**Inicia la app:**
```bash
npx expo start
```

Opciones disponibles:
- [Development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go)

---

## 🛡 Seguridad

El archivo `.env` está incluido en `.gitignore` y **nunca debe subirse al repositorio**. Contiene la configuración de conexión al servidor SQL.

---

## 📄 Licencia

Este proyecto está bajo la licencia [MIT](LICENSE).
