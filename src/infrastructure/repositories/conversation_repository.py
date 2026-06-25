from infrastructure.database.connection import get_connection

# 4. Arreglo global en memoria para las reglas de negocio
REGLAS_MEMORIA = []

class ChatbotRepository:
    
    def cargar_reglas_en_arreglo(self):
        """Carga las reglas de la BD al arreglo global de Python al arrancar."""
        global REGLAS_MEMORIA
        try:
            conn = get_connection()
            cursor = conn.cursor()
            
            # Supongamos que tu tabla se llama 'Reglas' y la columna 'NombreProcedimiento'
            cursor.execute("SELECT NombreProcedimiento FROM Reglas WHERE Activo = 1")
            
            # Guardamos los nombres de los procedimientos directamente en el arreglo
            REGLAS_MEMORIA = [row[0] for row in cursor.fetchall()]
            
            cursor.close()
            conn.close()
            print(f"✅ Reglas cargadas con éxito en memoria: {REGLAS_MEMORIA}")
        except Exception as e:
            print(f"❌ Error al cargar reglas iniciales: {e}")
            # Fallback por si la tabla no existe aún o está vacía para que no rompa el arranque
            REGLAS_MEMORIA = ["sp_ObtenerRespuestaChatbot"] 

    def ejecutar_procedimiento_regla(self, nombre_sp: str, parametro: str):
        """6. Consume dinámicamente el procedimiento almacenado configurado en la regla."""
        conn = get_connection()
        cursor = conn.cursor()
        
        # Ejecución dinámica usando el nombre del SP que viene del arreglo
        cursor.execute(f"EXEC {nombre_sp} ?", parametro)

        # Si el procedimiento no retorna filas (es un INSERT/UPDATE de auditoría, etc.)
        if cursor.description is None:
            conn.commit()
            cursor.close()
            conn.close()
            return {"status": "procesado"}

        columnas = [col[0] for col in cursor.description]
        resultados = [dict(zip(columnas, row)) for row in cursor.fetchall()]

        conn.commit()
        cursor.close()
        conn.close()
        return resultados