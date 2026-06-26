from infrastructure.repositories.conversation_repository import ConversationRepository
from typing import List

class ProcesarConversacion:

    def __init__(self):
        self.repo  = ConversationRepository()
        self.reglas = []           # Arreglo de reglas cargadas desde BD

    
    #Cargar reglas al iniciar el agente
    
    def cargar_reglas(self):
        self.reglas = self.repo.cargar_reglas()
        print(f"[AGENTE] {len(self.reglas)} regla(s) cargadas desde DB_EcommerceAgent.")

   
    #FLUJO PRINCIPAL: detectar intención y responder
    
    def procesar(self, texto_usuario: str, conversacion_id: int) -> str:
        texto_lower = texto_usuario.lower().strip()

        # Guardar mensaje del usuario en historial
        self.repo.guardar_mensaje(conversacion_id, es_bot=False, texto=texto_usuario)

        # Recorrer reglas y buscar coincidencia por keyword
        regla_activada = None
        for regla in self.reglas:
            for keyword in regla["keywords"]:
                if keyword in texto_lower:
                    regla_activada = regla
                    break
            if regla_activada:
                break

        #sin coincidencia → usar regla "No Entendido"
        if not regla_activada:
            regla_activada = next(
                (r for r in self.reglas if r["nombre_regla"] == "No Entendido"),
                None
            )

        # Obtener plantilla de respuesta
        respuesta = self.repo.obtener_respuesta(regla_activada["regla_id"]) \
                    if regla_activada else "No pude procesar tu solicitud."

        
        #Si la regla es dinámica → ejecutar SP de búsqueda

        respuesta = self.repo.obtener_respuesta(regla_activada["regla_id"]) \
                if regla_activada else "No pude procesar tu solicitud."
       
        if regla_activada and regla_activada["accion_dinamica"] \
                and regla_activada["accion_python"] == "buscar_producto_en_db":

            # Extraer el término de búsqueda eliminando keywords de la frase
            filtro = texto_lower
            for kw in regla_activada["keywords"]:
               if kw in filtro:
                filtro = filtro.split(kw, 1)[-1].strip()
                break

            # Si el filtro quedó vacío usw ek t3xto completo
            if not filtro:
                filtro = texto_lower

            productos   = self.repo.buscar_productos(filtro)
            tabla_texto = self._formatear_productos(productos)
            respuesta   = respuesta.replace("[@TABLA]", tabla_texto)


        # guarda las respuesta del bot en historial
        self.repo.guardar_mensaje(
            conversacion_id,
            es_bot=True,
            texto=respuesta,
            regla_id=regla_activada["regla_id"] if regla_activada else None
        )

        return respuesta

    
    # Helper: formatear resultados del SP como texto
    
    def _formatear_productos(self, productos: list) -> str:
        if not productos:
            return "No encontré productos con ese criterio."

        lineas = []
        for p in productos:
            lineas.append(
                f"• [{p.get('categoryName','')}] "
                f"{p.get('subCategoryName','')} - "
                f"{p.get('segmentName','')}"
            )
        return "\n".join(lineas)