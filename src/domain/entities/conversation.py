from pydantic import BaseModel

class RespuestaChatbot(BaseModel):
    Id: int
    Mensaje: str
    Tipo: str