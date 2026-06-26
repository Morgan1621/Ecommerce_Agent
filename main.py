# main.py
import sys
import os
sys.path.append(os.path.join(os.path.dirname(__file__), "src"))

from fastapi            import FastAPI, WebSocket, WebSocketDisconnect
from domain.use_cases.procesar_conversacion import ProcesarConversacion
from infrastructure.database.connection     import get_connection

app    = FastAPI(title="ECommerce Agent API")
agente = ProcesarConversacion()

# Carga lasd reglas una sola vez al arrancar el servidor
@app.on_event("startup")
async def startup():
    agente.cargar_reglas()


# 7. WEBSOCKET ENDPOINT

@app.websocket("/ws/chat/{usuario_id}")
async def websocket_chat(websocket: WebSocket, usuario_id: str):
    await websocket.accept()

    # Crear conversación en historial
    conn   = get_connection()
    cursor = conn.cursor()
    cursor.execute("""
        INSERT INTO HistorialConversaciones (UsuarioID, FechaInicio, Activo)
        VALUES (%s, GETDATE(), 1)
    """, (usuario_id,))
    conn.commit()
    conversacion_id = cursor.lastrowid
    conn.close()

    print(f"[WS] Usuario '{usuario_id}' conectado. ConversacionID: {conversacion_id}")

    try:
        while True:
            # Recibe mensaje del cliente
            texto = await websocket.receive_text()
            print(f"[WS] Recibido de '{usuario_id}': {texto}")

            # Procesa con el agente
            respuesta = agente.procesar(texto, conversacion_id)

            # Envia respuesta
            await websocket.send_text(respuesta)

    except WebSocketDisconnect:
        print(f"[WS] Usuario '{usuario_id}' desconectado.")
