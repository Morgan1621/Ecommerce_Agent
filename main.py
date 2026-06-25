from fastapi import FastAPI
from presentation.controllers import conversation_controller
from infrastructure.repositories.conversation_repository import ChatbotRepository
from contextlib import asynccontextmanager

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Al arrancar la aplicación: Carga las reglas al arreglo en memoria (Punto 4)
    repo = ChatbotRepository()
    repo.cargar_reglas_en_arreglo()
    yield
    # Código aquí si quisieras hacer algo al apagar el servidor

app = FastAPI(lifespan=lifespan)

app.include_router(conversation_controller.router)