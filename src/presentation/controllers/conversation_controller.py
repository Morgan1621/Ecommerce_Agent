from fastapi import APIRouter, WebSocket, WebSocketDisconnect
from domain.use_cases.procesar_conversacion import ObtenerRespuestaUseCase
from infrastructure.repositories.conversation_repository import ChatbotRepository

router = APIRouter()

# 7. EXPOSICION DE WEBSOCKETS DE PYTHON UTILIZANDO FASTAPI
@router.websocket("/ws/chatbot")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    print("🔌 Cliente conectado al WebSocket")
    
    repository = ChatbotRepository()
    use_case = ObtenerRespuestaUseCase(repository)
    
    try:
        while True:
            # Recibe el mensaje en formato JSON desde Postman/Cliente
            data = await websocket.receive_json()
            parametro_cliente = data.get("mensaje", "")
            
            # Ejecuta todo el flujo del caso de uso (itera el arreglo y corre los SP)
            resultados_flujo = use_case.ejecutar_flujo_completo(parametro_cliente)
            
            # Devuelve la respuesta en tiempo real al cliente
            await websocket.send_json({
                "status": "success",
                "datos_procesados": resultados_flujo
            })
            
    except WebSocketDisconnect:
        print("❌ Cliente desconectado del WebSocket")