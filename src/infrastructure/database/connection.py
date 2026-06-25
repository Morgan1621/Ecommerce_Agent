import pyodbc

def get_connection():
    return pyodbc.connect(
        "DRIVER={ODBC Driver 17 for SQL Server};"
        "SERVER=localhost;"
        "DATABASE=TuBaseDeDatos;"
        "UID=tu_usuario;"
        "PWD=tu_password;"
    )