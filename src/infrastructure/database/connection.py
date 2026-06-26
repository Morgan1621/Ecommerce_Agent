import pymssql
from dotenv import load_dotenv
import os

load_dotenv()

def get_connection():
    """
    Conexión a DB_EcommerceAgent usando autenticación de Windows (Trusted Connection).
    """
    connection = pymssql.connect(
        server   = os.getenv("DB_SERVER"),
        database = os.getenv("DB_NAME")
    )
    return connection