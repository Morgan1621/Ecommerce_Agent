from dataclasses import dataclass
from typing import Optional

@dataclass
class Regla:
    regla_id:        int
    nombre_regla:    str
    accion_dinamica: bool
    accion_python:   Optional[str]

@dataclass
class Mensaje:
    usuario_id:  str
    texto:       str
    es_bot:      bool = False
    respuesta:   Optional[str] = None