from infrastructure.repositories.conversation_repository import ChatbotRepository, REGLAS_MEMORIA

class ObtenerRespuestaUseCase:
    def __init__(self, repository: ChatbotRepository):
        self.repository = repository

    def ejecutar_flujo_completo(self, parametro: str):
        """5. Crea el flujo de petición utilizando el arreglo de reglas previamente cargadas."""
        historial_ejecuciones = {}

        # Iteramos sobre el arreglo de reglas en Python
        for sp_regla in REGLAS_MEMORIA:
            print(f"🤖 Procesando regla: {sp_regla}")
            
            # 6. Consumir el método (Procedimiento Almacenado) de la regla actual
            resultado_sp = self.repository.ejecutar_procedimiento_regla(sp_regla, parametro)
            
            # Vamos acumulando las respuestas de cada procedimiento si es necesario
            historial_ejecuciones[sp_regla] = resultado_sp
            
        return historial_ejecuciones