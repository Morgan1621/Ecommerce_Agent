# infrastructure/repositories/conversation_repository.py
from infrastructure.database.connection import get_connection
from domain.entities.conversation import Regla
from typing import List, Optional

class ConversationRepository:

    # --------------------------------------------------
    # 4. CARGAR REGLAS DESDE LA BD A UN ARREGLO EN PYTHON
    # --------------------------------------------------
    def cargar_reglas(self) -> List[Regla]:
        """
        Carga todas las reglas activas junto con sus palabras clave.
        Retorna una lista de objetos Regla listos para usarse en el flujo.
        """
        conn   = get_connection()
        cursor = conn.cursor(as_dict=True)

        cursor.execute("""
            SELECT
                R.ReglaID,
                R.NombreRegla,
                R.AccionDinamica,
                R.AccionPython,
                P.PalabraClave
            FROM ReglasChatbot R
            LEFT JOIN PalabrasClaveRegla P
                ON R.ReglaID = P.ReglaID AND P.Activo = 1
            WHERE R.Activo = 1
        """)

        filas = cursor.fetchall()
        conn.close()

        # Agrupar keywords por ReglaID
        reglas_dict = {}
        for fila in filas:
            rid = fila["ReglaID"]
            if rid not in reglas_dict:
                reglas_dict[rid] = {
                    "regla_id":        rid,
                    "nombre_regla":    fila["NombreRegla"],
                    "accion_dinamica": bool(fila["AccionDinamica"]),
                    "accion_python":   fila["AccionPython"],
                    "keywords":        []
                }
            if fila["PalabraClave"]:
                reglas_dict[rid]["keywords"].append(
                    fila["PalabraClave"].lower()
                )

        return list(reglas_dict.values())

    
    # Obtener respuesta aleatoria de PlantillasRespuesta
   
    def obtener_respuesta(self, regla_id: int) -> Optional[str]:
        conn   = get_connection()
        cursor = conn.cursor(as_dict=True)

        cursor.execute("""
            SELECT TOP 1 TextoRespuesta
            FROM PlantillasRespuesta
            WHERE ReglaID = %d AND Activo = 1
            ORDER BY NEWID()
        """, (regla_id,))

        fila = cursor.fetchone()
        conn.close()
        return fila["TextoRespuesta"] if fila else None

    
    # 6. CONSUMIR SP DE BÚSQUEDA (DB_ECOMMERCE)
   
    def buscar_productos(self, filtro: str) -> list:
        conn   = get_connection()
        cursor = conn.cursor(as_dict=True)

        # Llama al SP de búsqueda en DB_ECOMMERCE usando linked reference
        cursor.execute("""
            DECLARE @Code INT, @Msg VARCHAR(500)
            EXEC DB_ECOMMERCE.SQM_CATALOGS.SP_SEARCH_PRODUCT_IDENTIFICATORS
                @i_FilterText    = %s,
                @o_ResultCode    = @Code OUTPUT,
                @o_ResultMessage = @Msg  OUTPUT
        """, (filtro,))

        resultados = cursor.fetchall()
        conn.close()
        return resultados

    # Guardar mensaje en historial
   
    def guardar_mensaje(self, conversacion_id: int, es_bot: bool,
                        texto: str, regla_id: int = None):
        conn   = get_connection()
        cursor = conn.cursor()

        cursor.execute("""
            INSERT INTO HistorialMensajes
                (ConversacionID, ChatBot, Texto, FechaHora, ReglaActivadaID)
            VALUES (%d, %d, %s, GETDATE(), %s)
        """, (
            conversacion_id,
            1 if es_bot else 0,
            texto,
            regla_id
        ))

        conn.commit()
        conn.close()